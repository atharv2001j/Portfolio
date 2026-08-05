import json
from pathlib import Path
from typing import TypedDict


class Chunk(TypedDict):
    id: str
    text: str


def load_chunks(content_json_path: Path) -> list[Chunk]:
    with open(content_json_path, encoding="utf-8") as f:
        content = json.load(f)

    chunks: list[Chunk] = []

    profile = content["profile"]
    chunks.append(
        {
            "id": "profile",
            "text": f"{profile['name']} — {profile['role']} at {profile['company']}, "
            f"{profile['location']}. {profile['summary']}",
        }
    )

    for exp in content["experience"]:
        chunks.append(
            {
                "id": f"experience-{exp['company']}",
                "text": f"Experience at {exp['company']} ({exp['role']}, {exp['period']}): {exp['details']}",
            }
        )

    for proj in content["projects"]:
        chunks.append(
            {
                "id": f"project-{proj['name']}",
                "text": f"Project: {proj['name']}. {proj['details']}",
            }
        )

    for category, items in content["skills"].items():
        chunks.append(
            {
                "id": f"skills-{category}",
                "text": f"Atharv's skills in {category}: {', '.join(items)}.",
            }
        )

    edu = content["education"]
    chunks.append(
        {
            "id": "education",
            "text": f"Education: {edu['details']}",
        }
    )

    return chunks
