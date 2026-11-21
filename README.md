# Kamakura Gomi — trash sorting app

An offline app for iPhone, iPad and Android that tells you which Kamakura bin something goes in, and sets alarms for collection days.

- **Scan**: take a photo. Recognition runs on the phone itself (nothing is uploaded) and you see the best match plus a few alternatives.
- **PET bottle checker**: cap, ring and label go to Plastic Packaging. A white (non-PET) screw top sends the whole bottle to Plastic Packaging. Coloured bottles go to Combustible.
- **Search**: 130+ items, in English or Japanese.
- **Days**: all 23 Kamakura districts (April 2026 schedule), adjustable.
- **Reminder alarms**: puts the next 12 months of pickup days into the phone's own Calendar, with alarms.
- **Guide**: rules for each bin, bag types and city phone numbers.

Data source: Kamakura City's FY2026 English pamphlet "How to Sort and Dispose of Recyclable Items and Waste" (April 2026). Items marked ★ are house rules.

## Installing on a phone (for users)

1. **iPhone/iPad**: open the app's address in **Safari**, tap Share, then **Add to Home Screen**.
   **Android**: open it in Chrome, tap ⋮, then **Install app**.
2. Open the app from the home screen. On Wi-Fi, tap **Download now** (about 105 MB, one time). After that it works with no internet.
3. Go to **Days**, pick your district, tap **Add alarms to my Calendar**, then **Add All**. Repeat once a year.

## For maintainers (group owners)

The site is published by GitLab Pages: every change to the `main` branch republishes the `public/` folder automatically (see `.gitlab-ci.yml`). Check progress under **Build → Pipelines**.

**Updating the rules** (e.g. when the city publishes a new pamphlet each April): open `public/data.js` on gitlab.com, click **Edit**, change it, and commit to `main`. No tools are needed.
- `CATEGORIES`: each bin's bag type and instructions.
- `ITEMS`: every item, the bin it goes to (`cat`), and optional notes.
- `DISTRICTS`: collection days. Weekdays are 1 = Mon … 5 = Fri. `nc` / `pg` are the "nth weekday of the month" for Non-Combustible (+ Hazardous + Oil) and Plastic Goods, and `md` is that weekday.

**After changing anything in `public/`**, also bump the cache version in `public/sw.js` (`kg-shell-v1` → `kg-shell-v2`). That makes phones pick up the new version.

**Adding photo recognition for a new item**: add `clip: ['a short description of how it looks']` to the item, then regenerate `public/embeddings.json` on a computer with Node.js:

```bash
cd tools && npm install && node embed.mjs
```

**Layout**
- `public/`: the app itself (HTML/CSS/JS, `data.js`, icons).
- `public/models/`, `public/lib/`: the on-device image model (CLIP ViT-B/32, quantized) and runtime (transformers.js 3.0.2). Don't edit these.
- `tools/`: the script that pre-computes photo-matching data.
