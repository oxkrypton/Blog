# Ronyu’s website

Personal website and blog: https://ronyu.me/

Based on https://github.com/magicuidesign/portfolio.

## Local development

Use Node.js 22 and npm:

```sh
npm ci
npm run dev
```

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` builds and deploys the website automatically
when changes are pushed to `main`. It can also be run manually from the Actions tab.
The workflow uses the built-in `GITHUB_TOKEN`; no personal access token is needed.

Before the first deployment, open the repository’s **Settings → Pages**:

1. Set **Build and deployment → Source** to **GitHub Actions**.
2. Keep **Custom domain** set to `ronyu.me`, as recorded in `public/CNAME`.

The website uses this custom domain at the site root. If you remove the domain and
switch to a project URL such as `oxkrypton.github.io/Blog/`, the app’s base path and
public asset URLs must be adjusted first.

`npm run build` exports the complete website to `out/`. Pages serves these files
without a Node.js server. Blog pagination runs in the browser and retains
`/blog/?page=2` URLs; link preview images are generated during the build using local
fonts and the local avatar image.

To preview the exported website locally:

```sh
npm run build
python3 -m http.server 3000 --directory out
```

Then visit http://localhost:3000/ and http://localhost:3000/blog/.
Next.js server response headers are not part of the static export; response
headers are managed by GitHub Pages.
