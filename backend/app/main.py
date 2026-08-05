import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.config import settings
from app.rag import cosine_similarity, embed_for_similarity, generate_reply, load_index

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        load_index()
    except FileNotFoundError as e:
        logger.warning("Startup without FAISS index: %s", e)
    yield


app = FastAPI(title="Atharv Joshi Portfolio API", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.allowed_origin],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)


class ChatResponse(BaseModel):
    reply: str


class SimilarityRequest(BaseModel):
    text_a: str = Field(min_length=1, max_length=300)
    text_b: str = Field(min_length=1, max_length=300)


class SimilarityResponse(BaseModel):
    similarity: float


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/similarity", response_model=SimilarityResponse)
@limiter.limit("10/minute")
def similarity(request: Request, body: SimilarityRequest):
    try:
        vectors = embed_for_similarity([body.text_a, body.text_b])
        score = cosine_similarity(vectors[0], vectors[1])
        return SimilarityResponse(similarity=max(0.0, min(1.0, score)))
    except Exception:
        logger.exception("Similarity computation failed")
        return JSONResponse(
            status_code=502,
            content={"detail": "Something went wrong computing similarity. Please try again shortly."},
        )


@app.post("/api/chat", response_model=ChatResponse)
@limiter.limit("10/minute")
def chat(request: Request, body: ChatRequest):
    try:
        reply = generate_reply(body.message)
        return ChatResponse(reply=reply)
    except (FileNotFoundError, RuntimeError):
        return JSONResponse(
            status_code=503,
            content={"reply": "The assistant's knowledge base isn't ready yet. Please try again shortly."},
        )
    except Exception:
        logger.exception("Chat generation failed")
        return JSONResponse(
            status_code=502,
            content={"reply": "Something went wrong reaching the assistant. Please try again shortly."},
        )
