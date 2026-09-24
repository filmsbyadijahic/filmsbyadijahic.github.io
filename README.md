# adijahicfilm

Film site for Adi Jahić. Plain static HTML/CSS — no build step, no dependencies.
Open `index.html` in a browser to view it locally.

## Structure

```
index.html                  Home — leads with Yesterday, Nothing In My Life Changed
about.html                  Bio and contact
photography.html            All three photo series on one page, with jump links
films/
  yesterday-nothing-in-my-life-changed.html
  things-we-like.html
  shorts.html               HIDDEN — index of the short films
  short-film-one.html       HIDDEN — placeholder
  short-film-two.html       HIDDEN — placeholder
  _template.html            copy this to add a film
css/styles.css              all styling
js/site.js                  mobile nav toggle + footer year (site works without JS)
images/                     posters, portrait
images/stills/              (empty) drop film stills here
images/favicon_io/          favicons + web manifest (all pages point here)
images/photography/         loose archive of old photos (see below)
  americana/  summer/  skin-mag/   the images used by photography.html
```

## Adding a film

1. Copy `films/_template.html` to `films/<slug>.html`.
2. Replace every `{{TOKEN}}` in the new file.
3. Add `aria-current="page"` to that film's own link in its nav.
4. For a **feature**, add one `<li>` for it to the nav in **every** page —
   `index.html`, `about.html`, and each file in `films/` — and add a card to the
   "Filmography" grid in `index.html`.
5. For a **short**, leave the nav alone (it already has one "Shorts" tab) and add
   a card to the grid in `films/shorts.html`. Set `aria-current="page"` on the
   Shorts tab in the new page's nav.

## What still needs filling in

Search the files for `TODO` and `Placeholder` — both are marked in the HTML:

- Director's note on the home page
- Synopsis, runtime, and full crew for *Yesterday, Nothing In My Life Changed*
- Remaining festivals and crew credits for *Things We Like*
- The two short films (titles, years, loglines, artwork) — currently placeholders,
  listed on `films/shorts.html`
- Stills: drop images into `images/stills/` and swap the `.still-empty` blocks
- Contact email on `about.html` (currently the university address)

## Posters

`images/ynimlc-poster.jpg` and `images/things-we-like-poster.webp` were copied
from the `adijahic.github.io` repo. They are line art on white, so the site
mounts them as lit paper against the dark background rather than inverting them.

## Hidden pages

The three short-film pages are still here but are not linked from anywhere and
carry `<meta name="robots" content="noindex">`. To bring them back:

1. Add `<li><a href="films/shorts.html">Shorts</a></li>` to the nav in every page
   (use `shorts.html` inside `films/`).
2. Restore the two cards in the "Filmography" grid in `index.html` — the comment
   marking where they were is still there.
3. Delete the `robots` meta tag from the three pages.

## Publishing

Any static host works. All paths are relative, so the site runs from a domain
root or a subpath either way.

For GitHub Pages: this lives on its own account, `filmsbyadijahic`. The repo is
named `filmsbyadijahic.github.io` (a *user site* — the name must match the
account exactly), so it publishes at the root: `https://filmsbyadijahic.github.io/`.
That is what the academic site's two "filmmaker" links point to.

**Push with the `.gitignore` in place.** Without it the loose archive in
`images/photography/` (~319 MB) goes into the repo; with it, the published site
is about 32 MB. GitHub Pages caps a published site at 1 GB.

For a custom domain, set it in the film repo's Settings → Pages (this writes a
`CNAME` file), point the DNS at GitHub, tick "Enforce HTTPS", and update the two
`filmmaker` links in `adijahic.github.io/index.html` and `film.html`.

## Photography

`photography.html` holds all three series on one page. The buttons under the
header are anchor links (`#americana`, `#summer`, `#skin-mag`) that scroll down
to each series; `js/site.js` highlights whichever series is in view and measures
the header so the sticky bar never covers a heading.

The images were matched against the old Wix site
(`godspeedprod.wixsite.com/home`), in the order they appeared there:

| Series   | Camera             | Images |
|----------|--------------------|--------|
| Americana| Asahi Pentax K1000 | 26     |
| Summer   | Nikon D8000        | 16     |
| Skin Mag | Nikon F3 (35mm)    | 11     |

Summer is 16 rather than the old site's 22: two photos were never in the local
archive, and four more were removed from the page at Adi's request (the files
`IMG_7534`, `IMG_7536`, `IMG_7537` and `IMG_7559` may still sit in
`images/photography/summer/` — they are no longer referenced and can be deleted).

The two that were never in the archive: To add them, download and drop them into
`images/photography/summer/`, then add a `<figure class="shot">` for each:

- `IMG_7553.jpg` — https://static.wixstatic.com/media/4d5652_9465fce3ec604bf9a6cf8a0b3ed71a38~mv2.jpg
- `IMG_7541.JPG` — https://static.wixstatic.com/media/4d5652_74cf65cf1bd34c8bbb0f0d8897608f8b~mv2.jpg

`images/photography/` still contains the full unsorted archive (~230 files, 319 MB)
it was copied from — laurels, stills, unrelated photos. Only the three subfolders
are used by the site. Deleting the loose files would cut the repo down a lot.

The galleries load full-size originals with `loading="lazy"`. If the page feels
heavy, resize the copies in the three subfolders (the originals in the parent
folder stay untouched).
