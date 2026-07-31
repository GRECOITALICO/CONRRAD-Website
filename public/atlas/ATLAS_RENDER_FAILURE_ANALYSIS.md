# ATLAS_RENDER_FAILURE_ANALYSIS

**WO:** INT-ATLAS-017  
**Mode:** Evidence only · **no code changes · no deploy · no fix · no solutions**  
**Issued:** 2026-07-30T20:45:00Z  
**Surfaces probed:** `https://www.conrrad.org/atlas/` · `https://conrrad.org/atlas/`  
**Build observed in page body:** `atlas-1.2.0-20260730202802` · Last Deploy `2026-07-30T20:27:57Z`  
**Artifacts:** `/tmp/atlas_probe_out.json` · `/tmp/atlas_render_probe.js` · `/tmp/atlas_empty_probe.png` · live HTTP fetches (User-Agent browser)

---

## Verdict (evidence)

Under automated production probes with demo started (`AtlasDemo.start()` and/or `?demo=1`), the demonstration stage **is not empty**. YAML downloads and parses; `renderScene` → `renderAnimation` writes non-zero HTML into `#demo-canvas` for all 8 scenes; triad children = 3; console errors/warnings = none captured.

An “empty stage” observation is **not reproduced** as a hard render stop (early `return` leaving blank `#demo-canvas`) when the demo is running. Conditions that can *look* empty without a render failure are documented in §2 and §7.

---

## 1. Dependency graph

### Actual load order (from live `index.html`)

```
index.html
├── style.css
├── CDN d3@7.9.0
├── CDN js-yaml@4.1.0          ← required by demo_mode.loadSpec()
├── validator.js
├── <body markup>
│   ├── #landing
│   ├── #atlas-app (hidden until enter / demo boot)
│   └── #demo-stage[hidden]   ← canvas starts empty in markup
│       └── #demo-canvas
├── app.js                    ← AtlasUI / graph boot
├── public_experience.js      ← landing / tour UX (parallel to demo, not YAML loader)
└── demo_mode.js
    ├── bind() + optional auto: if ?demo=1 → startDemo()
    ├── startDemo()
    │   ├── loadSpec() → fetch("atlas_demo.yaml") → jsyaml.load → spec.scenes
    │   ├── loadHealth() → atlas.json institutional_health (optional)
    │   ├── applySpecChrome()
    │   └── goTo(i) → renderScene()
    │       ├── DOM chrome (#demo-scene-title, #demo-message, …)
    │       ├── renderTriad(scene) → #demo-triad
    │       ├── renderReveal(scene)
    │       ├── renderAnimation(scene) → RENDERERS[type](a) → #demo-canvas.innerHTML
    │       ├── renderMetrics / renderRail / highlightModel
    │       └── armTimer
    └── DOM (#demo-stage visible when demo-active)
```

### Correction vs requested chain

Requested:

```
index.html → demo_mode.js → public_experience.js → atlas_demo.yaml → renderers → DOM
```

Measured:

| Edge | Fact |
|---|---|
| `index.html` → `demo_mode.js` | Yes (script tag order last among app scripts) |
| `demo_mode.js` → `public_experience.js` | **No.** Both are siblings under `index.html`; `public_experience.js` loads **before** `demo_mode.js` and does **not** load YAML |
| `demo_mode.js` → `atlas_demo.yaml` | Yes (`fetch(SPEC_URL)` inside `loadSpec`) |
| YAML → renderers → DOM | Yes (`RENDERERS[a.type]` → `#demo-canvas`) |

Live script list (HTTP 200): `validator.js`, `app.js`, `public_experience.js`, `demo_mode.js`, plus CDN d3 + js-yaml.

---

## 2. Where rendering stops

### When demo is started

| Checkpoint | Result |
|---|---|
| `AtlasDemo` present | true |
| `AtlasDemo.start()` | `start_ok: true` |
| `#demo-stage` hidden | false · `display: flex` · `data-scene: SCENE-1` |
| Spec loaded | `ATLAS_BUSINESS_OUTCOME_DEMO` · `3.0.0` · 8 scenes |
| `#demo-canvas` HTML length (SCENE-1) | **749** (non-empty) |
| All 8 scenes `canvas_html_len` | 749 … 2921 (none zero) |
| `Unsupported declared animation` | false on all scenes |
| `[object Object]` leak | false on all scenes |
| Diagnosis blob | `stageVisible: true`, `canvasEmpty: false`, `anyZeroCanvas: false` |

**Rendering does not stop** on the happy path. The pipeline completes through `renderAnimation` for every declared animation type.

### When demo is not started

| Checkpoint | Result |
|---|---|
| URL `/atlas/` (no `?demo=1`, no Start click) | `#demo-stage` has HTML attribute `hidden` |
| `#demo-canvas` | empty string in static markup until `renderAnimation` runs |

This is **intentional initial state**, not a mid-pipeline abort.

### Early-return sites in `demo_mode.js` (static inventory)

These `return` sites exist; **none** were observed to fire as a blank-canvas abort on the successful probe path:

| Function | Early exit condition | Effect if taken |
|---|---|---|
| `renderAnimation` | `!$("demo-canvas")` | No canvas write |
| `renderScene` | `!currentScene()` | No scene chrome / no animation |
| `renderTriad` | `!$("demo-triad")` | Triad skipped (canvas unaffected) |
| `renderMetrics` | missing box / empty list | Metrics skipped |
| `renderReveal` | no el / no `scene.reveal.text` | Reveal skipped |
| `highlightModel` | no AtlasUI data / no ids | Graph highlight skipped |
| `loadSpec` | HTTP fail / no jsyaml / no scenes | Rejects → `demoError` writes message into canvas (not blank) |
| `startDemo` catch | any load/parse error | `demoError(...)` |

---

## 3. Browser console

Probe: CDP + injected `/tmp/atlas_render_probe.js` hooks on `console.error` / `console.warn` / `window.error` / `unhandledrejection` during `AtlasDemo.start()` and 8× `goTo`.

### Warnings

**(none)** — `warnings: []`

### Errors

**(none)** — `errors: []` · `console: []`

### Network (relevant)

| URL | Status |
|---|---|
| `…/atlas/atlas_demo.yaml` | **200** · `text/yaml` |
| `…/atlas/demo_mode.js` | **200** |
| `…/atlas/public_experience.js` | **200** |
| `…/atlas/app.js` | **200** |
| `…/atlas/style.css` | **200** |
| `cdn.jsdelivr.net/…/js-yaml.min.js` | **200** |

---

## 4. `atlas_demo.yaml` — download · parse · scenes · triad · business outcome

| Check | Evidence |
|---|---|
| Downloaded | Network 200 · live bytes **29417** · sha256 prefix `bf625330deb17bfe` |
| Parsed | Probe `spec_null: false` · `jsyaml` object available · local `yaml.safe_load` OK |
| Contains scenes | **8** |
| Scene ids | `SCENE-1` … `SCENE-7`, `SCENE-FINAL` |
| Version / id | `3.0.0` / `ATLAS_BUSINESS_OUTCOME_DEMO` |
| Schema | `conrrad.atlas.demo/v1` |
| Triad on every scene | `business_impact` ∧ `architecture_property` ∧ `institutional_evidence` → **true** for all 8 |
| Business-outcome framing | Spec title/kicker/thesis + per-scene `message` / triad; id name `ATLAS_BUSINESS_OUTCOME_DEMO` |
| v4 scene blocks | `capability` / `outcome` / `statement` on SCENE-1 → **false** |
| Top-level `presentation` | **absent** |
| Live ≡ workspace | byte match **true** (yaml + `demo_mode.js`) |

SCENE-1 triad sample (from live parse / probe):

- business_impact: present  
- architecture_property: present  
- institutional_evidence: list present  
- animation.type: `dependency_baseline`

---

## 5. Does `demo_mode.js` call render?

There is **no** function named `render()`. The scene paint entry point is **`renderScene()`**, invoked from **`goTo()`**, which is invoked from **`startDemo()`** after `loadSpec` + `loadHealth`.

Call chain observed:

```
startDemo() → … → goTo(startAt) → renderScene()
  → renderTriad / renderReveal / renderAnimation / renderMetrics / renderRail
```

Auto-start evidence: file ends with `if (params.get("demo") === "1") startDemo();`  
Manual API: `window.AtlasDemo.start === startDemo` · probe `start_ok: true`.

---

## 6. Does render receive data?

| Input | Observed |
|---|---|
| `AtlasDemo.getSpec()` | non-null · id `ATLAS_BUSINESS_OUTCOME_DEMO` · version `3.0.0` |
| `scenes().length` | 8 |
| `currentScene()` at index 0 | keys include triad + `animation` + `message` + `pain` |
| `scene.animation` passed to renderer | type `dependency_baseline` with `flow` + `warning_counters` |
| Missing capability/outcome/statement blocks | intentional for v3 (not required by current runtime) |

`renderScene` only early-returns if `currentScene()` is falsy; probe shows valid scenes for indices 0–7.

---

## 7. Do DOM updates happen?

| Target | After start (SCENE-1) |
|---|---|
| `#demo-stage` | unhidden · `data-scene="SCENE-1"` |
| `#demo-canvas` | HTML length 749 · preview starts with `<div class="anim anim-decision anim-baseline">…Request…LLM…Answer…` |
| `#demo-triad` | **3** children · impact / property / evidence markup |
| `#demo-message` | `Today, every request goes straight to the model.` |
| `#demo-scene-title` | `The enterprise depends on AI.` |
| `#demo-pain` | pain-chip HTML present |
| `#demo-hero` | `hidden: true` · text `""` (no `hero_text` on that scene — not a canvas failure) |

**All 8 scenes:** non-zero `canvas_html_len`; triad = 3; no unsupported animation.

### Exact function returning early (blank canvas)?

**None identified on the successful production path.**  
No probed scene left `#demo-canvas` at length 0 after `goTo`.

If the stage appears empty to a human without `?demo=1` / without clicking Start, the governing fact is `#demo-stage[hidden]` — `startDemo` / `renderScene` have not run.

---

## 8. Schema mismatch (v3 vs v4)?

| Layer | Production now | INT-ATLAS-014 (historical C) |
|---|---|---|
| YAML version | **3.0.0** | 4.0.0 |
| YAML id | `ATLAS_BUSINESS_OUTCOME_DEMO` | `ATLAS_BUSINESS_PROOF` |
| Runtime (`demo_mode.js`) | `renderTriad` present · `renderStatement` **absent** | Keynote / statement / four-part path |
| `index.html` | `#demo-hero` present · `#demo-statement` **absent** | statement overlay present (per INT-UI-015) |

**Mismatch between live YAML and live JS: not observed.** Both are the v3 triad / business-outcome contract.

There is **no** evidence that production runtime currently expects v4 while YAML is v3, or the reverse.

---

## 9. Approved WO-ATLAS-013 runtime vs production runtime

### Byte / identity comparison (post INT-UI-017 restore)

| Artifact | Live | Workspace `atlas/` | Match |
|---|---|---|---|
| `atlas_demo.yaml` | 29417 B · sha `bf625330deb17bfe…` | same | **yes** |
| `demo_mode.js` | 41609 B · sha `94e239df15d40830…` | same | **yes** |
| Spec contract | v3.0.0 triad · 8 animation types all have `RENDERERS` entries | same | **yes** |

Declared animation types vs `RENDERERS` (workspace parse):  
`dependency_baseline`, `converge_with_swap`, `bifurcation_with_cost`, `capability_routing`, `authority_contrast`, `evidence_checklist`, `knowledge_evolution`, `outcome_board` → **missing set = ∅**.

### Incompatible fields vs INT-ATLAS-014 (v4 Keynote) — historical contrast only

These fields/structures existed on the **unauthorized / recovered-away** v4 surface and are **incompatible** with the approved WO-ATLAS-013 / current production v3 runtime. They are **absent** from live YAML and not consumed by live JS:

| Field / structure | v4 (INT-ATLAS-014) | Approved A / live production |
|---|---|---|
| `version` | `4.0.0` | `3.0.0` |
| `id` | `ATLAS_BUSINESS_PROOF` | `ATLAS_BUSINESS_OUTCOME_DEMO` |
| `presentation` (keynote timing/typography) | present | **absent** |
| `statement` (per-scene full-screen sentence) | present | **absent** |
| `capability` block | present | **absent** |
| `evidence` block (four-part) | present | **absent** (evidence is `institutional_evidence` list in triad) |
| `outcome` block (four-part) | present | **absent** |
| `#demo-statement` DOM | present | **absent** |
| `renderStatement` / Keynote timers | present in v4 JS | **absent** in live JS |
| Keynote CSS block (`INT-ATLAS-014` marker) | present in v4 CSS | **absent** from live style path under restore (live `style.css` sha `e9499f9305b177ae…`; no Keynote hit strings in fetch scan) |
| Mandatory triad fields | demoted vs four-part | **required and rendered** |

**Incompatible-field list between approved WO-ATLAS-013 runtime and current production runtime:** **empty** (they match).

**Incompatible-field list between approved WO-ATLAS-013 and former INT-ATLAS-014 production:** the table above.

---

## 10. Scope compliance

| Constraint | Status |
|---|---|
| DO NOT MODIFY ANY FILE (application/runtime) | Honored — only this analysis document written |
| DO NOT DEPLOY | Honored |
| DO NOT FIX | Honored |
| DO NOT propose solutions | Honored |

---

## Evidence index

| Item | Location |
|---|---|
| Full scene-by-scene DOM probe | `/tmp/atlas_probe_out.json` |
| Injected probe script | `/tmp/atlas_render_probe.js` |
| Chrome headless still (`?enter=1&demo=1&scene=1&freeze=1`) | `/tmp/atlas_empty_probe.png` |
| Live YAML snapshot | `/tmp/live_atlas_demo.yaml` (29417 B) |
| Live HTTP inventory | 2026-07-30 fetch: index/demo_mode/yaml/style/public_experience SHAs in §1/§4/§9 |
| Source early-return map | `atlas/demo_mode.js` (`renderScene`, `renderAnimation`, `loadSpec`, `startDemo`) |
| Approved vs Keynote field inventory | `atlas/VISUAL_DIFF.md` (A vs historical C) |

---

**STOP.**
