from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
INDEX_DIR = DATA_DIR / "faiss_index"
CONTENT_JSON_PATH = DATA_DIR / "content.json"

EMBEDDING_MODEL = "models/gemini-embedding-001"
CHAT_MODEL = "gemini-flash-latest"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    gemini_api_key: str = ""
    allowed_origin: str = "http://localhost:5173"


settings = Settings()
