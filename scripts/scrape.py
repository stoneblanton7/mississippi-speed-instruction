"""Firecrawl scrape runner for mississippispeed.com.

Reads FIRECRAWL_API_KEY from project .env and writes raw JSON
responses to scrape-output/raw/{slug}.json.
"""
import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "scrape-output" / "raw"
RAW_DIR.mkdir(parents=True, exist_ok=True)


def load_env():
    env_file = ROOT / ".env"
    env = {}
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def slugify(url: str) -> str:
    s = url.replace("https://", "").replace("http://", "")
    s = s.rstrip("/").replace("/", "_").replace(".", "_")
    return re.sub(r"[^a-zA-Z0-9_-]", "_", s) or "index"


def scrape(url: str, api_key: str, retries: int = 3, sleep_s: float = 3.0) -> dict | None:
    payload = {
        "url": url,
        "formats": ["markdown", "html", "links"],
        "onlyMainContent": False,
        "waitFor": 1500,
    }
    body = json.dumps(payload).encode("utf-8")
    req = Request(
        "https://api.firecrawl.dev/v1/scrape",
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    last_err = None
    for attempt in range(1, retries + 1):
        try:
            with urlopen(req, timeout=120) as resp:
                return json.loads(resp.read())
        except HTTPError as e:
            last_err = f"HTTP {e.code}: {e.read().decode('utf-8', errors='replace')[:300]}"
        except URLError as e:
            last_err = f"URL error: {e.reason}"
        except Exception as e:
            last_err = f"{type(e).__name__}: {e}"
        print(f"  attempt {attempt} failed: {last_err}", file=sys.stderr)
        time.sleep(sleep_s * attempt)
    return {"error": last_err, "url": url}


def main():
    env = load_env()
    api_key = env.get("FIRECRAWL_API_KEY")
    if not api_key:
        print("FIRECRAWL_API_KEY missing from .env", file=sys.stderr)
        sys.exit(1)

    if len(sys.argv) > 1:
        urls = sys.argv[1:]
    else:
        # Read from stdin
        urls = [u.strip() for u in sys.stdin.read().splitlines() if u.strip()]

    if not urls:
        print("usage: python scrape.py <url> [url ...]   or pipe urls via stdin", file=sys.stderr)
        sys.exit(1)

    results = []
    for url in urls:
        slug = slugify(url)
        out_path = RAW_DIR / f"{slug}.json"
        if out_path.exists() and "--force" not in sys.argv:
            print(f"[skip] {url} -> {out_path.name} (exists)")
            results.append({"url": url, "slug": slug, "skipped": True})
            continue
        print(f"[scrape] {url}")
        data = scrape(url, api_key)
        if data is None:
            data = {"error": "unknown"}
        # Wrap with the canonical url for traceability
        data["_source_url"] = url
        out_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
        ok = "error" not in data and data.get("success", True)
        print(f"  -> {out_path.name} ({'ok' if ok else 'ERROR: ' + str(data.get('error'))[:120]})")
        results.append({"url": url, "slug": slug, "ok": ok})
        time.sleep(1.0)  # polite spacing

    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
