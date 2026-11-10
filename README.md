# expensepilot.in

Static site on GitHub Pages (`CNAME` → www.expensepilot.in). No build step: edit the HTML/CSS and push to `main`.

## Design (Warm Ink, 2026-11)
The site uses the app 2.0 design system (*Warm Ink*, `new_designs/DESIGN_SYSTEM.md` in the app repo): the same colour tokens (light and dark), the ink hero gradient with the orange pace bar, Manrope (Google Fonts), radii 12 / 20 / 28 / pill. All tokens are at the top of `styles.css`.

| File | What |
|---|---|
| `index.html` | Home: hero, promise, features, screenshots, Free & Pro, reviews, about |
| `privacy.html`, `terms.html`, `delete-account.html` | Legal pages (Play links to these URLs: never rename them) |
| `styles.css` | One stylesheet for every page |
| `script.js` | Theme toggle (saved per browser), mobile menu, header border |
| `images/shots/*.jpg` | App screenshots, 540 × 960, from the store-listing kit's INR `raw/` set |
| `images/icon-*.png`, `images/og.png` | Favicons / app icon and the share image (Play feature graphic) |
| `images/google-play-badge.png` | Google's official "Get it on Google Play" badge |

## Updating the screenshots
Re-shoot the store-listing set (app repo, `store-listing/README.md`), then:
```
for n in 01_home 02_add 03_activity 04_analytics 05_budget 06_bills 07_goals 09_explained 10_home_dark 11_widget; do
  sips -s format jpeg -s formatOptions 82 --resampleWidth 540 <store-listing>/images/phone/inr/raw/$n.png --out images/shots/${n#*_}.jpg
done
```

## Rules
- The legal texts change only together with the app's data-safety answers.
- Feature text follows `store-listing/text/full-description.txt` so the site and Play say the same thing.
