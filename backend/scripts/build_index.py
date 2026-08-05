"""Rebuild the local FAISS index from data/content.json.

Run whenever content.json is updated:

    cd backend
    python scripts/build_index.py
"""

import json
import sys
from pathlib import Path

import faiss
import google.generativeai as genai

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.chunking import load_chunks
from app.config import CONTENT_JSON_PATH, INDEX_DIR, settings
from app.rag import embed_documents


def main() -> None:
    if not settings.gemini_api_key:
        raise SystemExit("GEMINI_API_KEY is not set. Copy .env.example to .env and fill it in.")

    genai.configure(api_key=settings.gemini_api_key)

    chunks = load_chunks(CONTENT_JSON_PATH)
    print(f"Loaded {len(chunks)} chunks from {CONTENT_JSON_PATH}")

    texts = [c["text"] for c in chunks]
    vectors = embed_documents(texts)
    faiss.normalize_L2(vectors)

    dim = vectors.shape[1]
    index = faiss.IndexFlatIP(dim)
    index.add(vectors)

    INDEX_DIR.mkdir(parents=True, exist_ok=True)
    faiss.write_index(index, str(INDEX_DIR / "index.faiss"))

    with open(INDEX_DIR / "chunks.json", "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)

    print(f"Wrote FAISS index ({dim}-dim, {index.ntotal} vectors) to {INDEX_DIR}")


if __name__ == "__main__":
    main()
