"""Download brand-critical images to scrape-output/brand-assets/."""
import json
import sys
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "scrape-output" / "brand-assets"
OUT_DIR.mkdir(parents=True, exist_ok=True)

images = json.loads((ROOT / "scrape-output" / "images.json").read_text(encoding="utf-8"))

queue = []
queue.append(("logo.svg", images["brand"]["logo"]))
queue.append(("logo-white.png", images["brand"]["logo_white"]))
queue.append(("thirty-years-icon.png", images["brand"]["thirty_years_icon"]))
queue.append(("thirty-years-hero.jpg", images["brand"]["thirty_years_hero"]))
for slug, url in images["skill_icons"].items():
    if url:
        ext = url.rsplit(".", 1)[-1]
        queue.append((f"skill-icon-{slug.replace('_','-')}.{ext}", url))
for sport, levels in images["sport_meters"].items():
    for lvl, url in levels.items():
        ext = url.rsplit(".", 1)[-1]
        queue.append((f"meter-{sport}-{lvl}.{ext}", url))
queue.append(("portrait-mike.jpg", images["portraits"]["mike_frascogna"]))
queue.append(("portrait-philip.jpg", images["portraits"]["phillip_short"]))

results = []
for fname, url in queue:
    out = OUT_DIR / fname
    if out.exists():
        results.append((fname, "exists"))
        continue
    try:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(req, timeout=30) as r:
            out.write_bytes(r.read())
        results.append((fname, "ok"))
    except Exception as e:
        results.append((fname, f"FAIL: {e}"))
        print(f"FAIL {fname}: {e}", file=sys.stderr)

for fname, status in results:
    print(f"{status:10s} {fname}")
print(f"\n{sum(1 for _,s in results if s in ('ok','exists'))}/{len(results)} ok")
