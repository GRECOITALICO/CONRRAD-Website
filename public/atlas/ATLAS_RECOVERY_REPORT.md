# ATLAS_RECOVERY_REPORT

**WO:** WO-ATLAS-013 — Mission: Institutional Recovery  
**Date:** 2026-07-30  
**Public URL:** https://conrrad.org/atlas/  
**Verdict:** `ATLAS_RECOVERY_COMPLETE`

---

## What was recovered

The Atlas public demonstration was restored to a fully functional state. No new
features were added. No UI was redesigned. The institutional model (IKM) was not
modified. The frontend only consumes.

See `ATLAS_RECOVERY_AUDIT.md` for the Phase 1 / Phase 2 comparison.

## Root causes repaired

| Defect | Cause | Repair |
|---|---|---|
| Page freezes after Enter Atlas | `renderDomainTree()` rebuilt itself on every synthetic `<details>` toggle | Ignore the synthetic event; re-render only on a real collapse change |
| 5 of 8 scenes blank | `atlas_demo.yaml` v3.0.0 declared animations the interpreter did not implement | Restored the five missing renderers by composing the existing visual vocabulary |
| Final scene leaked `[object Object]` | Outcomes became objects; the renderer still expected strings | Accept both shapes |
| Declared `hero_text` / `institutional_property` invisible | Interpreter never read those fields | Render them |
| False `OUT_OF_SYNC` | Live verifier searched only the first 800 bytes of each response | Search the whole document |
| Contract suite crashed | Tests pinned to superseded v2.0.0 wording | Derive expectations from the specification's own `acceptance` block |

## Phase 3 — Restored surfaces

| Surface | Status |
|---|---|
| Navigation | Restored |
| Layout | Restored |
| Inspector | Restored |
| Timeline | Restored |
| Play | Restored |
| Scenes (8/8) | Restored |
| Animations (every declared type) | Restored |
| Panels (health, metrics, maturity, tests, domains, legends) | Restored |
| Institutional model | Untouched |

## Phase 4 — Certification

### Functional certification (production)

```
target=https://conrrad.org/atlas/?enter=1
label=WO-ATLAS-013 PRODUCTION after recovery
SUMMARY 50/50
VERDICT RECOVERED
js_errors=0
```

Covered explicitly:

- Navigation, search, timeline, play, replay
- Responsive layout at 390 px
- Integrity of `atlas.json` (27 nodes / 65 relations / fingerprint present)
- Integrity of `atlas_demo.yaml` (`ATLAS_BUSINESS_OUTCOME_DEMO` v3.0.0 · 8 scenes · 116 s)
- Every scene, every animation, every mandatory triad
- Inspector, metrics, knowledge states
- No white screen, no JavaScript errors

### Contract certification

```
demo checks: 33 / 33
all_pass: True
```

### Local build

```
SUMMARY 50/50
VERDICT RECOVERED
```

## Phase 5 — Deployment

| Check | Result |
|---|---|
| URL works | https://conrrad.org/atlas/ → HTTP 200 |
| Demo loads | Spec `ATLAS_BUSINESS_OUTCOME_DEMO` v3.0.0 loaded |
| Play works | Institutional journey STEP 01 starts |
| Scenes work | 8/8 declared animations render |
| No white screens | 5336 visible characters after close |
| No JavaScript errors | 0 |
| Public URL matches production | `publication_status.public_url = https://conrrad.org/atlas/` |
| Publication status | `READY` · build `atlas-1.2.0-20260730185052` · `http_checks.ok = true` |

## Before → After

| | Before recovery | After recovery |
|---|---|---|
| Production main thread | Frozen within ~2 s of Enter Atlas | Responsive, 50/50 |
| Scenes rendering | 3 of 8 | 8 of 8 |
| Publication status | `OUT_OF_SYNC` | `READY` |
| JavaScript errors | (unreachable) | 0 |

## Files touched (recovery only)

- `atlas/app.js` — freeze fix
- `atlas/demo_mode.js` — missing declared renderers + hero/property
- `atlas/index.html` — `#demo-hero`
- `atlas/style.css` — additive styles for restored elements
- `atlas/tools/run_demo_tests.py` — contract derived from the live specification
- `atlas/tools/publish_continuous.py` — whole-document live markers
- `atlas/tools/run_functional_check.py` + `functional_check.js` — CDP certification harness

**Not modified:** `atlas.json`, `atlas_demo.yaml`, `public_experience.js`, any IKM source.
