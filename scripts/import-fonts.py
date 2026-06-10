#!/usr/bin/env python3
"""Import the MB Type WOFF2 library into the site.

- Copies every .woff2 into public/fonts/<kebab-family>/<kebab-file>.woff2
- Converts each family's bundled sample.css into src/css/fonts/<kebab-family>.css
  with kebab-case font-family names, absolute /fonts/... URLs, font-display: swap.
"""
import os
import re
import shutil
from pathlib import Path

HOME = Path(os.path.expanduser("~"))
SRC = HOME / "Documents" / "MB Type" / "WOFF2 font files (best for web)"
ROOT = Path("/Users/ben/Developer/www")
DEST_FONTS = ROOT / "public" / "fonts"
DEST_CSS = ROOT / "src" / "css" / "fonts"


def kebab(name: str) -> str:
    name = name.lower()
    name = name.replace("+", " ")
    name = re.sub(r"[^a-z0-9]+", "-", name)
    return name.strip("-")


def kebab_file(filename: str) -> str:
    stem, ext = os.path.splitext(filename)
    return kebab(stem) + ext.lower()


WEIGHTS = [
    ("extrablack", 950), ("ultrablack", 950),
    ("extrabold", 800), ("ultrabold", 800),
    ("semibold", 600), ("demibold", 600),
    ("black", 900), ("heavy", 900),
    ("bold", 700),
    ("medium", 500),
    ("semilight", 350),
    ("light", 300),
    ("extralight", 200), ("ultralight", 200),
    ("thin", 100), ("hairline", 100),
    ("book", 400), ("regular", 400), ("roman", 400),
]


def guess_face(filename: str):
    n = os.path.splitext(filename)[0].lower()
    style = "italic" if "italic" in n else "normal"
    weight = 400
    for token, w in WEIGHTS:
        if token in n:
            weight = w
            break
    return style, weight


def transform_sample(sample_text: str, kdir: str) -> str:
    # kebab everything (font-family ids + url filenames use underscores)
    css = sample_text.replace("_", "-")
    # rewrite url('foo.woff2') -> url('/fonts/<kdir>/foo.woff2')
    def fix_url(m):
        base = os.path.basename(m.group(1))
        return f"url('/fonts/{kdir}/{base}') format('woff2')"
    css = re.sub(r"url\(\s*['\"]?([^'\")]+\.woff2)['\"]?\s*\)\s*format\(\s*['\"]woff2['\"]\s*\)", fix_url, css)
    css = css.replace("font-display: auto", "font-display: swap")
    return css.strip() + "\n"


def generate_css(files, kdir, family):
    blocks = []
    for f in sorted(files):
        kf = kebab_file(f)
        style, weight = guess_face(f)
        blocks.append(
            "@font-face {\n"
            f"  font-family: {family};\n"
            f"  font-style: {style};\n"
            f"  font-weight: {weight};\n"
            "  font-display: swap;\n"
            f"  src: url('/fonts/{kdir}/{kf}') format('woff2');\n"
            "}\n"
        )
    return "\n".join(blocks)


def main():
    if DEST_FONTS.exists():
        shutil.rmtree(DEST_FONTS)
    if DEST_CSS.exists():
        shutil.rmtree(DEST_CSS)
    DEST_FONTS.mkdir(parents=True)
    DEST_CSS.mkdir(parents=True)

    # group woff2 by leaf dir
    families = {}
    for path in SRC.rglob("*.woff2"):
        families.setdefault(path.parent, []).append(path)

    no_sample = []
    summary = []
    for leaf_dir, paths in sorted(families.items()):
        leaf_name = leaf_dir.name
        kdir = kebab(leaf_name)
        family = kdir  # kebab font-family identifier
        out_dir = DEST_FONTS / kdir
        out_dir.mkdir(parents=True, exist_ok=True)

        for p in paths:
            shutil.copy2(p, out_dir / kebab_file(p.name))

        sample = leaf_dir / "sample.css"
        if sample.exists():
            css = transform_sample(sample.read_text(), kdir)
        else:
            no_sample.append(leaf_name)
            css = generate_css([p.name for p in paths], kdir, family)

        (DEST_CSS / f"{kdir}.css").write_text(css)
        summary.append((kdir, len(paths)))

    total_files = sum(n for _, n in summary)
    print(f"Families: {len(summary)}   WOFF2 copied: {total_files}   CSS written: {len(summary)}")
    if no_sample:
        print(f"No sample.css (generated heuristically): {len(no_sample)}")
        for n in no_sample:
            print("  -", n)
    else:
        print("All families had a bundled sample.css.")


if __name__ == "__main__":
    main()
