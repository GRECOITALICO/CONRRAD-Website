# ATLAS_DEPLOY_CERTIFICATE

**WO:** INT-ATLAS-014 — Atlas Demo as Business Proof
**Issued:** 2026-07-30T19:28:00Z
**Public URL:** https://conrrad.org/atlas/
**Status:** `DEPLOYED_AND_VERIFIED`

---

## Certificate

The Atlas business proof demonstration published at
[https://conrrad.org/atlas/](https://conrrad.org/atlas/) is deployed and
functionally certified. It answers, in 115 seconds, why CONRRAD exists.

| Criterion | Evidence |
|---|---|
| URL works | HTTP 200 · `is_atlas=true` · landing, graph, tour and demonstration markers present |
| Demo loads | `atlas_demo.yaml` → `ATLAS_BUSINESS_PROOF` v4.0.0 · 8 scenes |
| Play works | Institutional journey starts at STEP 01 |
| Scenes work | 8/8 declared animations render with message and all four narrative parts |
| Business narrative | Pain → capability → evidence → outcome on every scene, order measured on screen |
| Closing statements | 8/8 declared · verified full-screen at 104px on production |
| No white screens | Shell remains populated after demonstration close |
| No JavaScript errors | 0 exceptions, 0 console errors during certification |
| Institutional model | Untouched · model sources byte-identical to the previously deployed copies |
| Public URL = production | `publication_status.public_url = https://conrrad.org/atlas/` |

## Build

| Field | Value |
|---|---|
| `atlas_status` | `READY` |
| `synchronization_status` | `READY` |
| `integrity_status` | `READY` |
| `build_version` | `atlas-1.2.0-20260730192659` |
| `commit` | `7350b19f` |
| `last_deploy` | `2026-07-30T19:26:55Z` |
| `http_checks.ok` | `true` |
| `model_integrity.fingerprint` | `364ebb4483e0c084841e73cf468e5802df23588b457dd294e194d434e00dd842` |
| `nodes` / `relations` | 27 / 65 |
| `knowledge_coverage` | 73.1 % |
| `institutional_maturity` | 84.4 % |

## Functional certification

```
ATLAS_FUNCTIONAL_CHECK
target=https://conrrad.org/atlas/?enter=1
label=PRODUCTION_INT_ATLAS_014
js_errors=0
SUMMARY 54/54
VERDICT RECOVERED
```

Artifact: `atlas/ATLAS_FUNCTIONAL_CHECK.txt` · `atlas/ATLAS_FUNCTIONAL_CHECK.json`

The four checks added for INT-ATLAS-014, all passing on production:

| Check | Result |
|---|---|
| Every scene shows pain, capability, evidence and outcome | all four parts on all 8 scenes |
| The four parts are read in order, never inverted | pain → capability → evidence → outcome on every scene |
| Every part is fully revealed once its transition ends | all at full opacity |
| Every scene finishes with a full-screen statement | `SCENE-8 → "The institution remains."` at 104px |

## Narrative contract

```
atlas/tools/run_demo_tests.py
Demonstration: 8 scenes · 115.0s (budget 120s)
Business demonstration tests (INT-ATLAS-014):  44/44 PASS
Institutional flow tests (WO-ATLAS-008):        6/6  PASS
```

Artifact: `atlas/ATLAS_TEST_REPORT.md`

## Institutional freeze

INT-ATLAS-014 modified the presentation layer only. Verified before certifying:

| Model source | Result |
|---|---|
| `institutional_scenes.yaml` | byte-identical to production |
| `knowledge_state.yaml` | byte-identical to production |
| `perspectives.json` | byte-identical to production |
| `institutional_relationships.yaml` | differs only in the `updated_at` stamp |
| `atlas.json` | regenerated projection · 27 nodes / 65 relations / 73.1% coverage unchanged |

Files changed: `atlas_demo.yaml`, `demo_mode.js`, `index.html`, `style.css`,
`tools/run_demo_tests.py`, `tools/functional_check.js`,
`tools/publish_continuous.py`.

## Deliverables

| Deliverable | Path |
|---|---|
| Business narrative + scene storyboard | `atlas/ATLAS_BUSINESS_NARRATIVE_V2.md` |
| Updated declarative spec | `atlas/atlas_demo.yaml` v4.0.0 |
| Test report | `atlas/ATLAS_TEST_REPORT.md` |
| Functional certification | `atlas/ATLAS_FUNCTIONAL_CHECK.{txt,json}` |
| Deployment certificate | `atlas/ATLAS_DEPLOY_CERTIFICATE.md` |

STOP
