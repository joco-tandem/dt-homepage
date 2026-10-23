"""Inline the images into src/dt-homepage.js -> dist/dt-homepage.js.

`python build.py [tag]` also sets the fallback folder for the Spork images
(dist/spork-blinking*.webp) to that jsDelivr tag, default v1.0.0.
"""
import sys
from pathlib import Path

TAG = sys.argv[1] if len(sys.argv) > 1 else "v1.0.0"
ASSET_BASE = f"https://cdn.jsdelivr.net/gh/joco-tandem/dt-homepage@{TAG}/dist/"

root = Path(__file__).parent
src = (root / "src" / "dt-homepage.js").read_text(encoding="utf-8")
inline = {
    "__LOGO__": "logo.b64",
    "__HERO__": "hero.b64",
    "__SINK__": "sink.b64",
    "__BOOK__": "book.b64",
}
out = src
for placeholder, name in inline.items():
    assert placeholder in out, placeholder
    out = out.replace(placeholder, (root / "src" / name).read_text().strip())
assert "__ASSET_BASE__" in out, "__ASSET_BASE__"
out = out.replace("__ASSET_BASE__", ASSET_BASE)
(root / "dist").mkdir(exist_ok=True)
(root / "dist" / "dt-homepage.js").write_text(out, encoding="utf-8")
print(f"dist/dt-homepage.js {len(out.encode()) / 1024:.1f} KB, assets {ASSET_BASE}")
