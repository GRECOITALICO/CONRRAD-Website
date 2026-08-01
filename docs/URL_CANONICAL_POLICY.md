# URL Canonical Policy — conrrad.org

**Serial:** INT-WEB-CANONICAL-REDIRECT-001  
**Policy:** directory URLs are canonical **with trailing slash**  

## Official Demo URL

```text
https://conrrad.org/demo/
```

| Variant | Required behavior |
|---------|-------------------|
| `/demo` | **301** → `/demo/` |
| `/demo/` | **200** Demo (absolute assets under `/demo/…`) |

## Other public directories

| Canonical | Non-canonical |
|-----------|---------------|
| `/atlas/` | `/atlas` → 301 |
| `/atlas/status/` | `/atlas/status` → 301 |
| `/documentation/` | `/docs`, `/docs/` → 301 → `/documentation/` |
| `/download/` | Official Citizen Seed gate (Download → GitHub Releases only) |
| `/releases/` | Current Stable · Previous · Integrity · Dates |
| `/install/` | Instalación → Alive |
| `/verify/` | SHA256 · Firma · Integridad · Verificación |

## Citizen public release

```text
https://conrrad.org/download/  →  GitHub Releases (never host binaries on website)
```

ONE RESOURCE · ONE URL · ONE CANONICAL PATH.


## Absolute assets (Demo)

Never ship relative `demo.css` / `demo.js` / `atlas_demo.yaml`. Always:

- `/demo/demo.css`
- `/demo/demo.js`
- `/demo/atlas_demo.yaml`

## Implementation

- `vercel.json` — `trailingSlash: true` + `statusCode: 301` redirects  
- `public/_redirects` — mirror for static hosts  
- `src/lib/identity.ts` — `DEMO_URL` / `ATLAS_URL` with trailing slash  
