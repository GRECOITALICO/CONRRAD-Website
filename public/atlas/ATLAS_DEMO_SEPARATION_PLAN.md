# ATLAS_DEMO_SEPARATION_PLAN

**R = INT-ATLAS-019-A**  
**Title:** Separate Atlas Product from Atlas Demo  
**Mode:** Audit only · **no move · no rename · no code · no deploy**  
**Issued:** 2026-07-30T21:35:00Z  
**Law:** Atlas is the product. Demo is a consumer of Atlas. Never the opposite.

---

## 0. Scope of this audit

Two trees named “Atlas” exist in the repository:

| Path | Role today |
|---|---|
| `atlas/` (lowercase) | **Public product surface** at `https://conrrad.org/atlas/` — WO-ATLAS-* |
| `Atlas/` (capital A) | Earlier Digital Twin foundation (WO-3122A / WO-3123A) — `graph/`, `foundation/`, `interactive/` |

This plan focuses on **`atlas/` + publish mirror `conrrad-website/public/atlas/`**, where product and demo are fused. Capital-`Atlas/` is inventory-noted as an upstream/parallel SoT, not the public demo mixer.

---

## 1. Inventory — belongs to Atlas (product)

Atlas = institutional digital twin: model, projection, navigation, health, evidence. Not a pitch deck.

### 1.1 Institutional model (data)

| Asset | Path(s) | Concern |
|---|---|---|
| Compiled twin | `atlas/atlas.json`, `atlas/data/atlas.json` | Nodes, relations, domains, coverage, health |
| Schema | `atlas/data/atlas.schema.json` | Model contract |
| Domains | inside `atlas.json` · `domain.*` | CONRRAD, ANNY, HARLEMM, SULLY, Workers, Evidence, Runtime, Citizen, Infra, Twins, Governance, Assets, UNMAPPED |
| Nodes (examples) | `conrrad`, `anny`, `harlemm`, `sully`, `workers`, `evidence`, `runtime`, `governance`, `assets`, `institutional_state`, `commit_mutation`, `mission`, `planner`, `certification`, `atlas_publication`, … | Institutional entities |
| Relations | `atlas.json` + `institutional_relationships.yaml` | Graph edges |
| Institutional health | `atlas.json` → `institutional_health` | Coverage, debt, discovery queue, counters |
| Knowledge states | `knowledge_states.json`, `knowledge_state.yaml` | KNOWN / PARTIAL / UNMAPPED / DISCOVERY_REQUIRED |
| Perspectives | `perspectives.json` | Founder, Runtime, Auditor, … |
| Institutional scenes (model paths) | `scenes.json`, `institutional_scenes.yaml` | Graph highlight journeys — **not** business demo scenes |
| Relation types | `relation_types.json` | Edge vocabulary / colors |
| Certification / publication metadata | nodes + `publication` / `model_integrity` / `institutional_maturity` in `atlas.json` | Product integrity |
| Capital-A graph SoT (parallel) | `Atlas/graph/nodes/*.yaml`, `Atlas/graph/atlas.graph.yaml`, `Atlas/foundation/*`, `Atlas/schema/*` | Authoring / compile pipeline for twin |

### 1.2 Product runtime (UI)

| Asset | Path | Concern |
|---|---|---|
| Graph / tree projection | `app.js` (`AtlasUI`, `AtlasBoot`) | d3 graph, inspector, perspectives, scene-select (institutional), download model |
| Validator | `validator.js` | Model validation status |
| Status page | `status/index.html`, `status/status.js` | Build / readiness diagnostics |
| Product chrome (partial) | `#atlas-app`, graph/tree views, inspector, domain tree, health/metrics/maturity panels, search | Living twin shell |
| Institutional tour (model walk) | parts of `public_experience.js` (tour over institutional stops) | Product onboarding of the twin — **not** business-proof scenes |
| Regen / institutional tests | `tools/regenerate_atlas.py`, `tools/run_institutional_tests.py`, `tools/verify_live.py` | Model pipeline |
| Product docs (subset) | `README.md`, `ATLAS_INSTITUTIONAL_AUDIT.md`, institutional recovery docs when describing the twin | Product |

### 1.3 Product CSS (by intent)

Approximate product band in `style.css`: **lines ~1–677** (shell tokens, topbar, sidebars, graph, inspector, status) before WO-ATLAS-008 landing block.

---

## 2. Inventory — belongs only to the Demo

Demo = sequenced business narrative that **consumes** Atlas (optional highlights / health bindings). It must not own the twin.

| Concern | Path / locus | Notes |
|---|---|---|
| Declarative story | `atlas_demo.yaml` | Scenes, timers, triad copy, CEO/investor messages, animation declarations, counters, budget |
| Interpreter / timers / sequencing | `demo_mode.js` (`AtlasDemo`) | `startDemo`, `goTo`, `armTimer`, `RENDERERS`, pause/next/prev/replay |
| Business narrative docs | `ATLAS_BUSINESS_NARRATIVE_V2.md` | Pitch storyboard |
| Demo stage DOM | `#demo-stage` and all `#demo-*` nodes in `index.html` | Overlay stage |
| Demo entry CTAs | `#btn-start-demo`, `#btn-demo-header`, `.btn-demo` | “Start Institutional Demonstration” |
| Landing-as-demo-gate (marketing) | `#landing` + demo-first CTA order | Currently gates product boot |
| Demo thesis injection | `#demo-thesis` | Overwritten from `atlas_demo.yaml` |
| Demo CSS | `style.css` from ~L678 (landing) and ~L1027–end (stage + animations + triad + WO-012/013) | ~65 `.demo-*` selectors |
| Demo contract tests | `tools/run_demo_tests.py`, large share of `tools/functional_check.js` | Triad, scene budget, YAML acceptance |
| Demo visual audits | `ATLAS_VISUAL_RENDER_AUDIT.md`, `ATLAS_RENDER_FAILURE_ANALYSIS.md`, `audit_visual_018/` | Evidence of demo perception |
| Narrative / Keynote history | VISUAL_* recovery docs, INT-ATLAS-014 narrative artifacts | Demo presentation history |
| Comparative outputs / animation vocabulary | RENDERERS + CSS anim blocks (bifurcation, cost, converge, outcome_board, …) | Demo-only presentation |

**Allowed Demo→Atlas consumption (keep direction):**

- Optional `AtlasUI.setHighlights` / `selectNode` from `highlightModel`
- Optional read of `institutional_health` / `atlas.json` for metric bindings  
Demo may know Atlas. Atlas must not know Demo.

---

## 3. Files currently mixing both concerns

| File | Atlas product | Demo | Mix mechanism |
|---|---|---|---|
| **`atlas/index.html`** | `#atlas-app`, graph, inspector, tour buttons | `#landing` (demo-first), `#demo-stage`, script `demo_mode.js`, title “Institutional Demonstration” | Single document owns product + demo |
| **`atlas/style.css`** | Shell / graph / panels | Landing + full demo stage + all animation CSS | One stylesheet, two products |
| **`atlas/public_experience.js`** | Enter Atlas, tour, graph/tree, search chrome | Landing show/hide; shares page with demo CTAs | Shell orchestrates product entry; cohabits with demo entry |
| **`atlas/app.js`** | Twin UI | Boot deferred if `#landing` exists (demo/marketing gate) | Product load depends on demo landing presence |
| **`atlas/demo_mode.js`** | Calls `AtlasBoot`, `AtlasUI`, fetches `atlas.json` | Entire file is demo | Correct direction, but lives inside product tree and mutates shared landing chrome |
| **`atlas/tools/publish_continuous.py`** | Publishes `atlas.json`, app, status | Requires `has_demo_entry`, `has_demo_stage`, demo YAML scene count for READY | **Publication readiness couples product to demo** |
| **`atlas/tools/functional_check.js`** | Enter Atlas, tour, graph checks | Majority: AtlasDemo scenes, triad, controls | One harness certifies both |
| **`atlas/tools/run_demo_tests.py`** | Asserts demo containers in Atlas `index.html` | YAML/JS contract | Treats product HTML as demo surface |
| **`atlas/ATLAS_TEST_REPORT.md` / functional check artifacts** | Institutional tests section | Business demo tests section | Combined report |
| **`atlas/publication_status.json`** | Atlas URLs | Lists `demo_mode.js`, `atlas_demo.yaml` as first-class publication assets | Product publication inventory includes demo |
| **`conrrad-website/public/atlas/*`** | Mirror of fused tree | Same mix | Deploy unit is the mixture |
| **`conrrad-website/vercel.json`** | `/atlas/` routes | Serves fused `index.html` | Routing does not distinguish `/atlas` vs `/atlas/demo` |

**Largely product-clean (low mix):**  
`atlas.json`, `data/*`, `scenes.json`, `perspectives.json`, `knowledge_states*.json/yaml`, `relation_types.json`, `institutional_*.yaml`, `validator.js`, `status/*`, `tools/regenerate_atlas.py`, `tools/run_institutional_tests.py` (paths still under the mixed tree).

**Largely demo-clean (should leave product root):**  
`atlas_demo.yaml`, `demo_mode.js`, demo-centric markdown audits.

---

## 4. Target directory structure

Illustrative target (not executed). Principle: **separate publishable roots**, shared model by reference only.

```text
atlas/                          # PRODUCT root (public /atlas/)
  index.html                    # Product only: twin shell; optional link out to Demo
  app.js
  style.css                     # Product styles only
  validator.js
  atlas.json
  data/
    atlas.json
    atlas.schema.json
  scenes.json                   # Institutional model scenes
  perspectives.json
  knowledge_states.json
  knowledge_state.yaml
  relation_types.json
  institutional_relationships.yaml
  institutional_scenes.yaml
  status/
  tools/
    regenerate_atlas.py
    run_institutional_tests.py
    verify_live.py
    publish_product.py          # (future) product publish without demo gates
  README.md

demo/                           # DEMO root (public /atlas/demo/ or /demo/)
  index.html                    # Demo shell; loads Atlas model/API as consumer
  demo_mode.js
  atlas_demo.yaml
  demo.css                      # Stage + animation CSS extracted from style.css
  tools/
    run_demo_tests.py
    functional_check_demo.js
  docs/                         # Narrative / visual audits (optional)
  README.md

shared/                         # Thin shared tokens only (optional)
  tokens.css                    # Color/type tokens if both need them
  # NO demo narrative · NO graph runtime · NO scene YAML

assets/                         # Static marks/favicons if shared (optional)
  …

# Existing capital-A authoring tree remains separate SoT:
Atlas/                          # Graph authoring / foundation (unchanged by this WO)
  graph/
  foundation/
  …
```

**URL intent (target):**

| URL | Serves |
|---|---|
| `/atlas/` | Product twin only |
| `/atlas/demo/` (or `/demo/`) | Business demonstration consumer |
| `/atlas/status/` | Product health |

**Dependency rule (target):**

```text
demo ──reads──► atlas.json / AtlasUI public API
atlas ──✗──► demo_*  (forbidden)
```

---

## 5. Dependencies that force Atlas to know about the Demo

These must disappear (direction: remove Atlas→Demo knowledge).

| ID | Dependency | Why it is inverted | Target |
|---|---|---|---|
| D1 | `index.html` embeds `#demo-stage` + loads `demo_mode.js` | Product page cannot exist without demo markup/scripts | Demo owns its HTML; product links optionally |
| D2 | Page `<title>` / meta sell “Institutional Demonstration” | Product identity subordinated to demo | Product title = Atlas twin; demo has its own |
| D3 | `#landing` + primary `#btn-start-demo` before Enter Atlas | Demo is the default product entry | Product entry = Enter Atlas (or direct twin); demo is secondary consumer entry |
| D4 | `app.js` skips `AtlasBoot()` when `#landing` present | Product boot controlled by demo/marketing gate | Product boots when product shell is shown; landing/demo must not own boot law |
| D5 | `style.css` ships demo animation CSS on every Atlas load | Product payload includes demo presentation | Split `demo.css` |
| D6 | `publish_continuous.py` READY requires `has_demo_entry` + `has_demo_stage` + demo YAML | **Product cannot certify without demo** | Split publish gates: product READY ≠ demo READY |
| D7 | `functional_check.js` / `run_demo_tests.py` assert demo containers inside Atlas `index.html` | Product HTML is the demo contract surface | Demo tests target `demo/` only |
| D8 | `publication_status.json` lists demo JS/YAML as Atlas publication essentials | Ops treats demo as Atlas core | Demo listed under demo publication |
| D9 | Shared single deploy folder `public/atlas/` | Impossible to ship product without demo bytes | Separate publish paths |

**Acceptable (keep):** Demo→Atlas (`highlightModel`, health bindings, optional `AtlasBoot` when demo needs graph backdrop).

---

## 6. Current architecture

```text
                    ┌─────────────────────────────────────┐
                    │  https://conrrad.org/atlas/         │
                    │  ONE index.html                     │
                    └─────────────────────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          ▼                           ▼                           ▼
   #landing (gate)              #atlas-app (twin)           #demo-stage
   demo CTA first               graph / inspector           AtlasDemo
          │                           ▲                           │
          │                     AtlasBoot / AtlasUI               │
          │                           │                           │
          └──────── public_experience ┴──── demo_mode ────────────┘
                                      │
                                      ▼
                               atlas.json (model)
                                      ▲
                         publish_continuous READY
                         requires demo entry+stage
```

**Characterization:** Atlas product is hosted *inside* a demonstration shell. Demo is not a consumer package; it is the page identity.

---

## 7. Target architecture

```text
  /atlas/  (PRODUCT)                    /atlas/demo/  (DEMO CONSUMER)
  ┌─────────────────────┐               ┌──────────────────────────┐
  │ index.html          │               │ index.html               │
  │ app.js · style.css  │◄── fetch ─────│ demo_mode.js             │
  │ atlas.json · …      │   optional    │ atlas_demo.yaml          │
  │ status/             │   AtlasUI API │ demo.css                 │
  └─────────────────────┘               └──────────────────────────┘
           ▲                                        │
           │                                        │ highlights / health
           └────────────────────────────────────────┘
                         (Demo → Atlas only)
```

---

## 8. Migration phases (plan only — not executed)

| Phase | Name | Work (future) | Exit criteria |
|---|---|---|---|
| **P0** | Freeze law | Document: Atlas↛Demo; Demo→Atlas only | This plan approved |
| **P1** | Inventory lock | Tag every file Product / Demo / Mixed / Shared (this doc §1–3) | No ambiguity in ownership |
| **P2** | Split publish gates | Decouple READY: product cert ≠ demo cert (logic change later) | Product can be READY with demo absent |
| **P3** | Extract demo package | Move demo HTML/JS/YAML/CSS/tests to `demo/` (future WO) | Product `index.html` has zero `#demo-*` |
| **P4** | Product boot independence | Landing/demo no longer conditions `AtlasBoot` | `/atlas/` loads twin without demo scripts |
| **P5** | Dual URL + publish | `/atlas/` and `/atlas/demo/` (or equivalent) | Separate mirrors under website public |
| **P6** | Test split | Institutional tests vs demo tests separate CI jobs | Failures do not cross-block incorrectly |
| **P7** | Docs / ops | README, certificates, status page reflect two surfaces | Operators stop saying “Atlas” for “Demo” |

**Out of scope for INT-ATLAS-019-A:** any file move, rename, code edit, or deploy.

---

## 9. Risk assessment

| Risk | Severity | Notes |
|---|---|---|
| Broken deep links (`?demo=1`) during split | High | Must preserve redirects in a later WO |
| Publish READY false-negative if demo gate removed carelessly | High | Split gates before deleting demo checks |
| CSS drift / visual regression on product shell | Medium | Extract demo CSS carefully; product band ~L1–677 |
| Tour vs Demo confusion | Medium | Tour = product model walk; Demo = business narrative — rename in docs only later |
| Capital-`Atlas/` vs `atlas/` dual SoT | Medium | Authors may edit wrong tree; call out in ops |
| Website SPA links still point to fused `/atlas/` | Low–Medium | `ATLAS_URL` stays valid if product keeps that URL |
| Demo loses graph highlights if AtlasUI API not stable | Low | Define minimal public projection API before hard split |

---

## 10. Estimated effort

| Phase | Effort (order of magnitude) | Notes |
|---|---|---|
| P0–P1 Audit / freeze | **Done by this document** | ~0.5–1 d already spent |
| P2 Publish gate split | 0.5–1 d | `publish_continuous.py` + status schema |
| P3–P4 Extract demo + product boot | 2–4 d | HTML/CSS/JS split, regression on both surfaces |
| P5 Dual URL + Vercel/public mirror | 1–2 d | Routing + publish paths |
| P6 Test harness split | 1–2 d | functional_check / run_demo_tests / CI |
| P7 Docs & operator education | 0.5–1 d | Certificates, README, status copy |
| **Total (implementation WOs after this audit)** | **~5–10 engineering days** | Excludes narrative redesign (forbidden) |

---

## 11. Required analysis checklist (complete)

| # | Deliverable | Section |
|---|---|---|
| 1 | Everything that belongs to Atlas | §1 |
| 2 | Everything that belongs only to Demo | §2 |
| 3 | Files mixing both | §3 |
| 4 | Target directory structure | §4 |
| 5 | Atlas→Demo dependencies to remove | §5 |
| — | Current / target architecture | §6–7 |
| — | Migration phases | §8 |
| — | Risk + effort | §9–10 |

---

## 12. Compliance

| Constraint | Status |
|---|---|
| DO NOT move files | Honored |
| DO NOT rename files | Honored |
| DO NOT modify code | Honored |
| DO NOT deploy | Honored |
| Audit only | Honored |
| No redesign / UX / narrative | Honored |

---

**R = INT-ATLAS-019-A · STOP.**
