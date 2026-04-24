"""Parse raw firecrawl output and emit copy.md, videos.json, images.json."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "scrape-output" / "raw"
OUT = ROOT / "scrape-output"


def load(slug):
    d = json.loads((RAW / f"{slug}.json").read_text(encoding="utf-8"))
    data = d.get("data", d)
    return data.get("markdown", "") or "", data.get("html", "") or ""


def fix_unicode(s: str) -> str:
    # Firecrawl returned smart quotes/dashes as latin-1 mojibake; normalize the most common offenders
    return (
        s.replace("’", "'")
         .replace("‘", "'")
         .replace("“", '"')
         .replace("”", '"')
         .replace("–", "-")
         .replace("—", "—")
         .replace("…", "...")
         .replace("�", "'")  # firecrawl returned bad replacement chars; assume apostrophe
    )


def vimeo_ids_in_order(html: str):
    raw = re.findall(r"player\.vimeo\.com/video/(\d+)", html)
    seen, ordered = set(), []
    for x in raw:
        if x not in seen:
            seen.add(x)
            ordered.append(x)
    return ordered


def vimeo_titles_in_order(md: str):
    return re.findall(r"^(.+?) from Frascogna IP on Vimeo", md, re.MULTILINE)


def vimeo_url(vid):
    return f"https://player.vimeo.com/video/{vid}"


# ---- VIDEOS ----------------------------------------------------------------

def build_videos():
    home_md, home_html = load("mississippispeed_com")
    home_ids = vimeo_ids_in_order(home_html)
    home_titles = vimeo_titles_in_order(home_md)
    # map title->id by position
    home_map = list(zip(home_titles, home_ids))

    mike_md, mike_html = load("mississippispeed_com_mike-frascogna-iii")
    mike_ids = vimeo_ids_in_order(mike_html)
    mike_titles = vimeo_titles_in_order(mike_md)
    mike_map = list(zip(mike_titles, mike_ids))

    phil_md, phil_html = load("mississippispeed_com_philip-short")
    phil_ids = vimeo_ids_in_order(phil_html)
    phil_titles = vimeo_titles_in_order(phil_md)
    phil_map = list(zip(phil_titles, phil_ids))

    # Skill page videos (one per page, matching skill name)
    skills = [
        "acceleration", "balance-body-control", "change-of-direction",
        "core-strength", "flexibility", "foot-quickness", "jumping",
        "lateral-speed", "top-speed", "visual-acuity",
    ]
    skill_videos = []
    for s in skills:
        _, html = load(f"mississippispeed_com_skill_{s}")
        ids = vimeo_ids_in_order(html)
        if ids:
            skill_videos.append({
                "skill": s,
                "title": f"Skill Overview: {s.replace('-', ' ').title()}",
                "vimeo_id": ids[0],
                "vimeo_url": vimeo_url(ids[0]),
            })

    # Categorize coach prefix in title -> coach name
    coach_map = {
        "Coach Epsy": "Epsy",
        "Coach NS": "NS",
        "Coach PS": "PS",
        "Coach SB": "SB",
        "Coach M4": "M4",
        "Coach M3": "M3",
    }
    def coach_of(title):
        for k, v in coach_map.items():
            if title.startswith(k):
                return v
        return None

    # Hero is the first home video; the rest are featured
    hero_title, hero_id = home_map[0]
    featured = []
    for title, vid in home_map[1:]:
        # crude category guess
        cat = None
        tlow = title.lower()
        if "acceleration" in tlow:
            cat = "acceleration"
        elif "tether" in tlow:
            cat = "acceleration"
        elif "wall" in tlow:
            cat = "top-speed"
        featured.append({
            "title": title,
            "vimeo_id": vid,
            "vimeo_url": vimeo_url(vid),
            "coach": coach_of(title),
            "category": cat,
        })

    mike_videos = []
    for title, vid in mike_map:
        ttype = "bio" if "Bio" in title else "drill"
        mike_videos.append({
            "title": title,
            "vimeo_id": vid,
            "vimeo_url": vimeo_url(vid),
            "type": ttype,
        })

    phil_videos = []
    for title, vid in phil_map:
        ttype = "bio" if "Bio" in title else "drill"
        phil_videos.append({
            "title": title,
            "vimeo_id": vid,
            "vimeo_url": vimeo_url(vid),
            "type": ttype,
        })

    return {
        "home_hero": {
            "title": hero_title,
            "vimeo_id": hero_id,
            "vimeo_url": vimeo_url(hero_id),
            "page_source": "home",
        },
        "home_featured": featured,
        "mike_bio_videos": mike_videos,
        "phillip_bio_videos": phil_videos,
        "skill_videos": skill_videos,
        "camp_videos": [],  # No camp videos found on the live site
    }


# ---- IMAGES ----------------------------------------------------------------

WP_URL_RE = re.compile(r"https://mississippispeed\.com/wp-content/uploads/[^\s\")]+\.(?:png|jpg|jpeg|svg|webp|gif)", re.IGNORECASE)


def all_image_urls():
    urls = set()
    for f in RAW.glob("*.json"):
        d = json.loads(f.read_text(encoding="utf-8"))
        data = d.get("data", d)
        for src in (data.get("html", "") or "", data.get("markdown", "") or ""):
            urls.update(WP_URL_RE.findall(src))
    return sorted(urls)


def build_images():
    urls = all_image_urls()
    catalog = {
        "brand": {
            "logo": "",
            "logo_white": "",
            "hare_icon": "",
            "thirty_years_icon": "",
            "thirty_years_hero": "",
        },
        "skill_icons": {
            "acceleration": "",
            "balance_body_control": "",
            "change_of_direction": "",
            "core_strength": "",
            "flexibility": "",
            "foot_quickness": "",
            "jumping": "",
            "lateral_speed": "",
            "top_speed": "",
            "visual_acuity": "",
        },
        "sport_meters": {},  # filled per-skill below
        "portraits": {
            "mike_frascogna": "",
            "phillip_short": "",
        },
        "camp_photos": [],
        "other": [],
    }

    skill_icon_map = {
        "ico-acceleration": "acceleration",
        "ico-balance-and-body-control": "balance_body_control",
        "ico-change-of-direction": "change_of_direction",
        "ico-core-strength": "core_strength",
        "ico-flexibility": "flexibility",
        "Foot-Quickness": "foot_quickness",
        "ico-jumping": "jumping",
        "ico-lateral-speed": "lateral_speed",
        "ico-top-speed": "top_speed",
        "ico-visual-acuity": "visual_acuity",
    }

    sport_meter_re = re.compile(r"/(Baseball|Basketball|Football|Soccer|Volleyball)-(\d+)\.png$", re.IGNORECASE)
    for u in urls:
        low = u.lower()
        fname = u.rsplit("/", 1)[-1]
        if "msi_cheetah_logo" in low:
            catalog["brand"]["logo"] = u
        elif "msi-logo-white" in low:
            catalog["brand"]["logo_white"] = u
        elif "30-years-icon" in low:
            catalog["brand"]["thirty_years_icon"] = u
        elif "30-years-of-speed" in low:
            catalog["brand"]["thirty_years_hero"] = u
        elif "about-mike-frascogna" in low:
            catalog["portraits"]["mike_frascogna"] = u
        elif "about-philip-short" in low:
            catalog["portraits"]["phillip_short"] = u
        elif "camp-photo" in low or "summer-speed-camp" in low:
            catalog["camp_photos"].append(u)
        elif (m := sport_meter_re.search(u)):
            sport = m.group(1).lower()
            level = int(m.group(2))
            catalog["sport_meters"].setdefault(sport, {})[str(level)] = u
        else:
            matched = False
            for token, key in skill_icon_map.items():
                if token.lower() in low:
                    catalog["skill_icons"][key] = u
                    matched = True
                    break
            if not matched:
                catalog["other"].append(u)

    return catalog, urls


# ---- COPY ------------------------------------------------------------------

SPORT_LIST = ["Baseball", "Basketball", "Football", "Soccer", "Volleyball"]
METER_RE = re.compile(r"/uploads/\d+/\d+/(Baseball|Basketball|Football|Soccer|Volleyball)-(\d+)\.png", re.IGNORECASE)


def parse_skill_page(slug):
    md, html = load(f"mississippispeed_com_skill_{slug}")
    md = fix_unicode(md)
    # Skill name from H1
    h1 = re.search(r"^# (.+)$", md, re.MULTILINE)
    title = h1.group(1) if h1 else slug

    # Definition paragraph: text between H1 and the "from Frascogna IP on Vimeo" line
    after_h1 = md.split(h1.group(0), 1)[1] if h1 else md
    before_video = re.split(r" from Frascogna IP on Vimeo", after_h1, 1)[0]
    # The definition is the last non-image paragraph block before the video title
    # Strip the video title trailing line
    paragraphs = [p.strip() for p in before_video.split("\n\n") if p.strip()]
    # Drop the trailing video title (last paragraph that's just text — it'll be the title line)
    # Actually the video title appears on a single line just before "from Frascogna IP".
    # Remove image-only paragraphs
    body_paras = [p for p in paragraphs if not p.startswith("!")]
    # The very last is the video title line — drop it
    if body_paras:
        body_paras = body_paras[:-1]
    definition = "\n\n".join(body_paras).strip() or "(no body copy on live site)"

    # Importance by sport: each "**Sport** - <copy>"
    sports = {}
    for m in re.finditer(r"\*\*(Baseball|Basketball|Football|Soccer|Volleyball)\*\*\s*\\?-?\s*(.+?)(?=\n\n|\Z)", md, re.DOTALL):
        sport = m.group(1)
        copy = m.group(2).strip()
        sports[sport] = {"copy": copy}

    # Meter values from image filenames
    for m in METER_RE.finditer(html):
        sport = m.group(1).title()
        meter = int(m.group(2))
        if sport in sports:
            sports[sport]["meter"] = meter
        else:
            sports[sport] = {"copy": "", "meter": meter}

    return title, definition, sports


SKILLS_ORDERED = [
    ("acceleration", "Acceleration"),
    ("balance-body-control", "Balance & Body Control"),
    ("change-of-direction", "Change of Direction"),
    ("core-strength", "Core Strength"),
    ("flexibility", "Flexibility"),
    ("foot-quickness", "Foot Quickness"),
    ("jumping", "Jumping"),
    ("lateral-speed", "Lateral Speed"),
    ("top-speed", "Top Speed"),
    ("visual-acuity", "Visual Acuity"),
]


def build_copy_md():
    home_md, _ = load("mississippispeed_com")
    home_md = fix_unicode(home_md)
    classes_md, _ = load("mississippispeed_com_classes")
    classes_md = fix_unicode(classes_md)
    contact_md, _ = load("mississippispeed_com_contact")
    contact_md = fix_unicode(contact_md)
    mike_md, _ = load("mississippispeed_com_mike-frascogna-iii")
    mike_md = fix_unicode(mike_md)
    phil_md, _ = load("mississippispeed_com_philip-short")
    phil_md = fix_unicode(phil_md)

    # Home: pull "High Speed Thrills" hero, "Featured Videos" titles, "30 Years" intro,
    # and "Learn The Elements of Speed" list.
    hero_h2 = re.search(r"## (High Speed Thrills.*?)\n", home_md)
    hero_headline = hero_h2.group(1) if hero_h2 else "High Speed Thrills"
    register_cta = "Register For A Class"
    over_three = re.search(r"### Over Three Decades of Speed\s*\n\s*(.+?)(?=\n\n|\[Learn More\])", home_md, re.DOTALL)
    over_three_copy = (over_three.group(1).strip() if over_three else "").replace("\n", " ")

    # Boys camp facts from /classes/
    cb = re.search(
        r"#### Boys Summer Speed Camp\s*\n\s*\|.*?\| --- \| --- \|\s*\n((?:\|.*\|\s*\n)+)\s*\n(.+?)(?=\[Register Now\])",
        classes_md, re.DOTALL,
    )
    boys_facts = {}
    boys_desc = ""
    if cb:
        for row in re.finditer(r"\| (.+?): \| (.+?) \|", cb.group(1)):
            boys_facts[row.group(1).strip()] = row.group(2).strip()
        boys_desc = cb.group(2).strip()

    # Mike bio paragraphs: between "## Mike Frascogna III\n\n### FOUNDER / OWNER" and "M3 Bio from Frascogna IP"
    mike_section = re.search(
        r"## Mike Frascogna III\s*\n\s*### FOUNDER / OWNER\s*\n+(.+?)(?=M3 Bio from Frascogna IP)",
        mike_md, re.DOTALL,
    )
    mike_bio = (mike_section.group(1).strip() if mike_section else "").strip()

    phil_section = re.search(
        r"## Philip Short\s*\n\s*### Quarterback specialist\s*\n+(.+?)(?=Philip Short Bio Video from Frascogna IP)",
        phil_md, re.DOTALL,
    )
    phil_bio = (phil_section.group(1).strip() if phil_section else "").strip()

    # Contact intro
    contact_intro = re.search(r"### Get in Touch with Us!\s*\n+(.+?)(?=\nName)", contact_md, re.DOTALL)
    contact_intro_copy = (contact_intro.group(1).strip() if contact_intro else "").strip()

    # Skill page details
    skill_blocks = []
    for slug, label in SKILLS_ORDERED:
        title, definition, sports = parse_skill_page(slug)
        block = [f"### {label}", "- **Definition paragraph:**", "", "  " + definition.replace("\n", "\n  ")]
        block.append("")
        block.append("- **Importance by Sport:**")
        for sport in SPORT_LIST:
            row = sports.get(sport, {})
            copy = row.get("copy", "(no copy)")
            meter = row.get("meter")
            meter_str = f" *(meter: {meter}/5)*" if meter is not None else ""
            block.append(f"  - **{sport}**{meter_str}: {copy}")
        skill_blocks.append("\n".join(block))

    out = []
    out.append("# MSI Copy Archive\n")
    out.append("_Source: scrape of mississippispeed.com (raw responses in `/scrape-output/raw/`)_\n")
    out.append("_Note: Body copy preserved verbatim from the live site. Where the site shows Lorem ipsum, that is captured as-is — nothing was rewritten._\n")

    out.append("\n## Home Page\n")
    out.append("### Hero\n")
    out.append(f"- **Headline:** {hero_headline}")
    out.append(f"- **Sub-copy:** (none on live site — hero is video-only)")
    out.append(f"- **Primary CTA:** {register_cta} -> /classes/\n")

    out.append("### Featured Videos Section\n")
    out.append("- **Heading:** Featured Videos")
    out.append("- **Intro copy:** (none)")
    out.append("- **Video titles (in order):** Coach Epsy Acceleration Drill, Coach NS tether Drill, Coach PS Wall drill\n")

    out.append("### Over Three Decades of Speed\n")
    out.append(f"- **Heading:** Over Three Decades of Speed")
    out.append(f"- **Body:** {over_three_copy}")
    out.append("- **CTA:** Learn More -> /mike-frascogna-iii/\n")

    out.append("### Learn the Elements of Speed\n")
    out.append("- **Section headline:** Learn The Elements of Speed")
    out.append("- **Intro copy:** (none on live site)")
    out.append("- **Element list (linked grid):**")
    for _, label in SKILLS_ORDERED:
        out.append(f"  - {label}")
    out.append("")

    out.append("\n## Camp Pages\n")
    out.append("### Boys Speed Camp\n")
    field_order = ["DATE", "LOCATION", "TIME", "GENDER", "SPORTS", "LIMIT", "COST"]
    for field in field_order:
        out.append(f"- **{field.title()}:** {boys_facts.get(field, '(not listed)')}")
    out.append(f"- **Description:** {boys_desc}")
    out.append("- **CTA:** Register Now -> https://portal.campnetwork.com/Register/Register.php?camp_id=398473\n")

    out.append("### Girls Speed Camp\n")
    out.append("- **Status:** No girls speed camp page or section exists on the live site as of the scrape date. Only the Boys Summer Speed Camp is listed on /classes/.\n")

    out.append("\n## Mike Frascogna III Bio\n")
    out.append("### Headline\nMike Frascogna III — Founder / Owner\n")
    out.append("### Full Bio Copy\n")
    out.append(mike_bio + "\n")
    out.append("### Videos on Mike's page\n")
    out.append("- M3 Bio (bio)")
    out.append("- Coach Epsy Acceleration Drill (drill)")
    out.append("- Coach NS tether Drill (drill)")
    out.append("- Coach PS Wall drill (drill)")
    out.append("- Coach SB change in direction Drill (drill)")
    out.append("- Ladder Drills - 1 & 2 Foot Runs (drill)")
    out.append("- Coach M4 Ball Drop Drill (drill)\n")

    out.append("\n## Philip Short Bio\n")
    out.append("_(Note: live site spells the first name 'Philip' with one L — preserved verbatim. Original prompt referred to 'Phillip')_\n")
    out.append("### Headline\nPhilip Short — Quarterback Specialist\n")
    out.append("### Full Bio Copy\n")
    out.append(phil_bio + "\n")
    out.append("### Videos on Philip's page\n")
    out.append("- Philip Short Bio Video (bio)")
    out.append("- Drop Back Drills (drill)")
    out.append("- Medicine Ball Drill (drill)")
    out.append("- Disassociate Drill (drill)")
    out.append("- Football Grip (drill)")
    out.append("- 1234 Drill (drill)\n")

    out.append("\n## Skill Pages (all 10)\n")
    out.append("_All 10 skill pages on the live site use Lorem ipsum placeholder copy for both the definition and per-sport importance text. Only the meter values (encoded in the sport graphic filenames) are real. The placeholders are preserved verbatim below — Mike will need to provide real copy for the rebuild._\n")
    out.extend(skill_blocks)
    out.append("")

    out.append("\n## Contact Page\n")
    out.append(f"### Form intro copy\n- **Heading:** Get in Touch with Us!")
    out.append(f"- **Description:** {contact_intro_copy}\n")
    out.append("### Form fields\n- Name\n- Email\n- Message\n- reCAPTCHA\n- Submit button: Send\n")

    out.append("\n## Footer\n")
    out.append("- **Quick Links:** Classes, Contact")
    out.append("- **About:** Mike Frascogna III, Philip Short")
    out.append("- **Brand marks:** MSI white logo + 30 Years icon")
    out.append("- **Social:** Facebook (https://www.facebook.com/profile.php?id=61564652301436), Instagram (https://www.instagram.com/mississippispeed/)")
    out.append("- **No copyright line is present on the live site.**")

    return "\n".join(out)


def main():
    videos = build_videos()
    (OUT / "videos.json").write_text(json.dumps(videos, indent=2), encoding="utf-8")
    print(f"wrote {OUT / 'videos.json'}")

    images, all_urls = build_images()
    (OUT / "images.json").write_text(json.dumps(images, indent=2), encoding="utf-8")
    print(f"wrote {OUT / 'images.json'} ({len(all_urls)} urls)")

    copy = build_copy_md()
    (OUT / "copy.md").write_text(copy, encoding="utf-8")
    print(f"wrote {OUT / 'copy.md'} ({len(copy.splitlines())} lines)")


if __name__ == "__main__":
    main()
