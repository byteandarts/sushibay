#!/usr/bin/env python3
"""
Generate menu images for sushi items using Google Gemini API.
Images match the style of existing cafe menu images (1024x1024 webp, 
professional food photography on blue-grey tablecloth with white plates).

Usage:
  python3 generate_sushi_images.py          # Generate 1 test image (first item)
  python3 generate_sushi_images.py --all    # Generate all missing images
"""

import json
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

# ── Config ──────────────────────────────────────────────────────────────────
SUSHI_JSON = Path(__file__).parent / "sushi.json"
OUTPUT_DIR = Path(__file__).parent / "images" / "menu" / "sushi"
TARGET_SIZE = (1024, 1024)
WEBP_QUALITY = 90
DELAY_BETWEEN_REQUESTS = 3  # seconds between API calls to avoid rate limits
MODEL = "gemini-2.5-flash-image"

# ── Base style (shared across all categories) ───────────────────────────────
BASE_STYLE = (
    "Professional food photography for a high-end restaurant menu. "
    "Cool steel-blue grey fabric tablecloth background. "
    "Flat, even studio lighting with very soft minimal shadows. "
    "Cool color temperature, muted tones. Clean minimalist composition. "
    "No text, no watermarks, no logos. Photorealistic. "
)

# ── Category-specific style prompts ─────────────────────────────────────────
# Soup: slightly angled view, white bowl on square plate, blurred blue bg
STYLE_SOUP = (
    BASE_STYLE +
    "Slightly angled camera view, not perfectly overhead. "
    "Served in a deep round white ceramic bowl sitting on a white square plate. "
    "Blurred blue-grey background. A silver spoon beside the bowl. "
    "The dish is: "
)

# Salad: overhead flat-lay, white plate, fork + knife
STYLE_SALAD = (
    BASE_STYLE +
    "Perfectly overhead bird's-eye flat-lay view. "
    "Beautifully plated on a round white matte ceramic plate. "
    "A silver fork on the left and a silver knife on the right. "
    "The plate fills most of the frame. "
    "The dish is: "
)

# Appetizers: overhead flat-lay, white plate, fork + knife, dipping sauce
STYLE_APPETIZER = (
    BASE_STYLE +
    "Perfectly overhead bird's-eye flat-lay view. "
    "Beautifully arranged on a round white matte ceramic plate. "
    "A silver fork on the left and a silver knife on the right. "
    "Small dipping sauce bowl on the plate. "
    "The plate fills most of the frame. "
    "The dish is: "
)

# Noodles: overhead flat-lay, white plate/bowl, wooden chopsticks on right
STYLE_NOODLES = (
    BASE_STYLE +
    "Perfectly overhead bird's-eye flat-lay view. "
    "Served in a round white ceramic plate or shallow bowl. "
    "A pair of wooden bamboo chopsticks placed on the right side. "
    "The plate fills most of the frame. "
    "The dish is: "
)

# Sweet & Sour / Asian main: overhead, white plate, chopsticks
STYLE_ASIAN_MAIN = (
    BASE_STYLE +
    "Perfectly overhead bird's-eye flat-lay view. "
    "Beautifully plated on a round white matte ceramic plate. "
    "A pair of wooden bamboo chopsticks placed on the right side. "
    "The plate fills most of the frame. "
    "The dish is: "
)

# Shellfish / Seafood: overhead, served in a rustic bowl or bucket-style presentation
STYLE_SHELLFISH = (
    BASE_STYLE +
    "Perfectly overhead bird's-eye flat-lay view. "
    "Served in a deep white ceramic bowl. "
    "A silver fork on the left side. A small lemon wedge garnish. "
    "The bowl fills most of the frame. "
    "The dish is: "
)

# Sushi items (nigiri, sashimi, maki, rolls, gunkan, temaki, combos, platters):
# Japanese style - slate/wood board or white plate, chopsticks, soy sauce, wasabi, ginger
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

# Sushi sandwiches / burgers / specials: overhead, round white plate, chopsticks
STYLE_SUSHI_SPECIAL = (
    BASE_STYLE +
    "Perfectly overhead bird's-eye flat-lay view. "
    "Beautifully plated on a round white matte ceramic plate. "
    "A pair of dark wooden chopsticks on a ceramic chopstick rest to the right. "
    "Japanese fusion restaurant presentation. "
    "The plate fills most of the frame. "
    "The dish is: "
)

# Map each sushi.json category to its style prompt
CATEGORY_STYLE_MAP = {
    "Soup": STYLE_SOUP,
    "Salad": STYLE_SALAD,
    "Appetizers": STYLE_APPETIZER,
    "Noodles": STYLE_NOODLES,
    "Sweet & Sour": STYLE_ASIAN_MAIN,
    "Shellfish & Crustaceans": STYLE_SHELLFISH,
    "Nigiri": STYLE_SUSHI,
    "Sashimi": STYLE_SUSHI,
    "Hosso Maki (6pcs)": STYLE_SUSHI,
    "Platters & Chirashi": STYLE_SUSHI,
    "Maki Rolls": STYLE_SUSHI,
    "Signature Rolls": STYLE_SUSHI,
    "Fried Rolls": STYLE_SUSHI,
    "Premium Rolls": STYLE_SUSHI,
    "Dynamite Rolls (5pcs)": STYLE_SUSHI,
    "Sushi Sandwiches & Specials": STYLE_SUSHI_SPECIAL,
    "Gunkan & Temaki": STYLE_SUSHI,
    "Combinations": STYLE_SUSHI,
}


def validate_api_key() -> genai.Client:
    """Verify the GEMINI_KEY env var is set and the API is reachable."""
    api_key = os.environ.get("GEMINI_KEY")
    if not api_key:
        print("ERROR: GEMINI_KEY environment variable is not set.")
        sys.exit(1)

    client = genai.Client(api_key=api_key)

    # Quick validation: list models to confirm the key works
    try:
        models = list(client.models.list())
        model_names = [m.name for m in models]
        if not any(MODEL in name for name in model_names):
            print(f"WARNING: Model '{MODEL}' not found in available models.")
            print("Available image models:")
            for name in model_names:
                if "image" in name.lower() or "flash" in name.lower():
                    print(f"  - {name}")
        else:
            print(f"API key valid. Model '{MODEL}' is available.")
    except Exception as e:
        print(f"ERROR: Failed to validate API key: {e}")
        sys.exit(1)

    return client


def load_menu_items() -> list[dict]:
    """Load all sushi menu items from the JSON file, including category."""
    with open(SUSHI_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    items = []
    for category in data["menu"]:
        for item in category["items"]:
            item["_category"] = category["category"]
            items.append(item)
    return items


def generate_image(client: genai.Client, item: dict) -> Image.Image | None:
    """Generate an image for a single menu item using Gemini."""
    dish_name = item["name_en"]
    description = item.get("desc_en", "")
    dish_type = item.get("type", "")
    category = item.get("_category", "")

    # Pick the style prompt based on category
    style = CATEGORY_STYLE_MAP.get(category, STYLE_SUSHI)

    prompt = (
        f"{style}"
        f"{dish_name}. {description} "
        f"Category: {dish_type}."
    )

    print(f"  Prompt: {prompt[:120]}...")

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
                image_bytes = part.inline_data.data
                return Image.open(io.BytesIO(image_bytes))

        print("  WARNING: No image returned in response.")
        return None

    except Exception as e:
        print(f"  ERROR generating image: {e}")
        return None


def postprocess_and_save(img: Image.Image, output_path: Path) -> None:
    """Resize to target dimensions and save as webp."""
    # Resize to 1024x1024 maintaining quality
    if img.size != TARGET_SIZE:
        img = img.resize(TARGET_SIZE, Image.LANCZOS)

    # Convert to RGB if needed (webp doesn't need alpha for these)
    if img.mode != "RGB":
        img = img.convert("RGB")

    img.save(output_path, format="WEBP", quality=WEBP_QUALITY)
    file_size_kb = output_path.stat().st_size / 1024
    print(f"  Saved: {output_path} ({img.size[0]}x{img.size[1]}, {file_size_kb:.0f} KB)")


def main():
    run_all = "--all" in sys.argv

    print("=" * 60)
    print("Sushi Menu Image Generator")
    print("=" * 60)

    # Step 1: Validate API key
    print("\n[1/3] Validating API key...")
    client = validate_api_key()

    # Step 2: Load menu items
    print("\n[2/3] Loading menu items...")
    items = load_menu_items()
    print(f"  Found {len(items)} menu items.")

    # Determine which items to process
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    if run_all:
        # Filter to only items that don't have an image yet
        to_generate = [
            item for item in items
            if not (OUTPUT_DIR / item["image"]).exists()
        ]
        print(f"  {len(to_generate)} items missing images.")
    else:
        # Allow testing a specific item by index: --index 26
        test_idx = 0
        for arg in sys.argv:
            if arg.startswith("--index="):
                test_idx = int(arg.split("=")[1])
            elif arg == "--index" and sys.argv.index(arg) + 1 < len(sys.argv):
                test_idx = int(sys.argv[sys.argv.index(arg) + 1])
        to_generate = [items[test_idx]]
        print(f"  Test mode: generating 1 image ({to_generate[0]['name_en']} [{to_generate[0].get('_category', '')}])")

    if not to_generate:
        print("\n  All images already exist. Nothing to do.")
        return

    # Step 3: Generate images
    print(f"\n[3/3] Generating {len(to_generate)} image(s)...")
    success = 0
    failed = 0

    for i, item in enumerate(to_generate, 1):
        output_path = OUTPUT_DIR / item["image"]

        if output_path.exists():
            print(f"\n[{i}/{len(to_generate)}] SKIP: {item['name_en']} (already exists)")
            continue

        print(f"\n[{i}/{len(to_generate)}] Generating: {item['name_en']} [{item.get('_category', '')}]")
        img = generate_image(client, item)

        if img:
            postprocess_and_save(img, output_path)
            success += 1
        else:
            failed += 1

        # Rate limiting between requests
        if i < len(to_generate):
            print(f"  Waiting {DELAY_BETWEEN_REQUESTS}s before next request...")
            time.sleep(DELAY_BETWEEN_REQUESTS)

    print(f"\n{'=' * 60}")
    print(f"Done! Success: {success}, Failed: {failed}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
