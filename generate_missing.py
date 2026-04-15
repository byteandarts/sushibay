#!/usr/bin/env python3
"""
Generate specific missing images:
  - 3 failed sushi items (Assorted Sashimi & Nigiri, Spoiled Shrimp, Special One)
  - 4 missing cafe cocktails (Coconut Avocado, Country Club, Supreme Dream, Guava Mint)
"""

import os
import sys
import time
import io
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image

# Load .env file from project root
load_dotenv(Path(__file__).parent / ".env")

PROJECT_ROOT = Path(__file__).parent
MODEL = "gemini-2.5-flash-image"
WEBP_QUALITY = 90
DELAY = 5

# ── Style prompts ───────────────────────────────────────────────────────────

BASE_STYLE = (
    "Professional food photography for a high-end restaurant menu. "
    "Cool steel-blue grey fabric tablecloth background. "
    "Flat, even studio lighting with very soft minimal shadows. "
    "Cool color temperature, muted tones. Clean minimalist composition. "
    "No text, no watermarks, no logos. Photorealistic. "
)

STYLE_SUSHI = (
    BASE_STYLE +
    "Perfectly overhead bird's-eye flat-lay view. "
    "Beautifully arranged on a rectangular white ceramic sushi plate or a dark slate board. "
    "A pair of dark wooden chopsticks on a ceramic chopstick rest to the right. "
    "A small dish of soy sauce and a small mound of wasabi and pickled ginger on the side. "
    "Japanese restaurant presentation style. "
    "The plate fills most of the frame. "
    "The dish is: "
)

STYLE_COCKTAIL = (
    "Professional beverage photography for a high-end restaurant menu. "
    "Front-facing straight-on view of a single tall cocktail glass. "
    "Blurred cool steel-blue grey painted wall background. "
    "Light grey surface the glass sits on. "
    "The glass has ice, a decorative straw, fresh fruit garnish and mint leaves. "
    "Soft studio lighting, cool color temperature, muted tones. "
    "The glass is centered and fills most of the frame. "
    "No text, no watermarks, no logos. Photorealistic. "
    "The cocktail is: "
)

# ── Items to generate ───────────────────────────────────────────────────────

ITEMS = [
    # 3 failed sushi items
    {
        "name": "Assorted Sashimi & Nigiri",
        "desc": "An assortment of our finest sushi selections. A beautiful platter with various nigiri and sashimi pieces.",
        "filename": "assorted_sashimi_and_nigiri.webp",
        "output_dir": PROJECT_ROOT / "images" / "menu" / "sushi",
        "style": STYLE_SUSHI,
        "size": (1024, 1024),
    },
    {
        "name": "Spoiled Shrimp",
        "desc": "Classic sushi roll with fresh shrimp, rice, nori and special sauce. 8 pieces.",
        "filename": "spoiled_shrimp.webp",
        "output_dir": PROJECT_ROOT / "images" / "menu" / "sushi",
        "style": STYLE_SUSHI,
        "size": (1024, 1024),
    },
    {
        "name": "Special One",
        "desc": "Chef's special premium sushi roll crafted with unique ingredients. 8 pieces.",
        "filename": "special_one.webp",
        "output_dir": PROJECT_ROOT / "images" / "menu" / "sushi",
        "style": STYLE_SUSHI,
        "size": (1024, 1024),
    },
    # 4 missing cafe cocktails
    {
        "name": "Coconut Avocado Cocktail",
        "desc": "Refreshing tropical blend of coconut cream and ripe avocado, served chilled with ice.",
        "filename": "coconut_avocado_cocktail.webp",
        "output_dir": PROJECT_ROOT / "images" / "menu" / "cafe",
        "style": STYLE_COCKTAIL,
        "size": (1152, 896),
    },
    {
        "name": "Country Club Cocktail",
        "desc": "Refreshing citrus blend of mixed fruits and flavors, served in a tall glass with ice.",
        "filename": "country_club_cocktail.webp",
        "output_dir": PROJECT_ROOT / "images" / "menu" / "cafe",
        "style": STYLE_COCKTAIL,
        "size": (1152, 896),
    },
    {
        "name": "Supreme Dream Cocktail",
        "desc": "Refreshing tropical blend of exotic fruits with a creamy finish, served chilled.",
        "filename": "supreme_dream_cocktail.webp",
        "output_dir": PROJECT_ROOT / "images" / "menu" / "cafe",
        "style": STYLE_COCKTAIL,
        "size": (1152, 896),
    },
    {
        "name": "Guava Mint Cocktail",
        "desc": "Refreshing guava juice blended with fresh mint leaves, served over ice.",
        "filename": "guava_mint_cocktail.webp",
        "output_dir": PROJECT_ROOT / "images" / "menu" / "cafe",
        "style": STYLE_COCKTAIL,
        "size": (1152, 896),
    },
]


def validate_api_key() -> genai.Client:
    api_key = os.environ.get("GEMINI_KEY")
    if not api_key:
        print("ERROR: GEMINI_KEY not set.")
        sys.exit(1)
    client = genai.Client(api_key=api_key)
    try:
        list(client.models.list())
        print("API key valid.")
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)
    return client


def generate_and_save(client: genai.Client, item: dict) -> bool:
    output_dir = item["output_dir"]
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / item["filename"]

    if output_path.exists():
        print(f"  SKIP (already exists): {output_path.name}")
        return True

    prompt = f"{item['style']}{item['name']}. {item['desc']}"
    print(f"  Prompt: {prompt[:100]}...")

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE"],
            ),
        )

        for part in response.parts:
            if part.inline_data is not None:
                img = Image.open(io.BytesIO(part.inline_data.data))
                target = item["size"]
                if img.size != target:
                    img = img.resize(target, Image.LANCZOS)
                if img.mode != "RGB":
                    img = img.convert("RGB")
                img.save(output_path, format="WEBP", quality=WEBP_QUALITY)
                size_kb = output_path.stat().st_size / 1024
                print(f"  Saved: {output_path.name} ({img.size[0]}x{img.size[1]}, {size_kb:.0f} KB)")
                return True

        print("  WARNING: No image in response.")
        return False

    except Exception as e:
        print(f"  ERROR: {e}")
        return False


def main():
    print("=" * 60)
    print("Generate Missing Images (3 sushi + 4 cafe cocktails)")
    print("=" * 60)

    client = validate_api_key()

    success = 0
    failed = 0

    for i, item in enumerate(ITEMS, 1):
        print(f"\n[{i}/{len(ITEMS)}] {item['name']} -> {item['output_dir'].name}/{item['filename']}")
        if generate_and_save(client, item):
            success += 1
        else:
            failed += 1

        if i < len(ITEMS):
            print(f"  Waiting {DELAY}s...")
            time.sleep(DELAY)

    print(f"\n{'=' * 60}")
    print(f"Done! Success: {success}, Failed: {failed}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
