# ATLAS_RECOVERY_AUDIT

**WO:** WO-ATLAS-013 — Mission: Institutional Recovery
**Date:** 2026-07-30
**Scope:** `atlas/` public demonstration surface only. The institutional model (IKM) is the
source of truth and was **not** modified.

---

## 1. Expected state

The Atlas is the institutional digital twin published at `https://conrrad.org/atlas/`. A visitor
must be able to:

| Capability | Expected behaviour |
|---|---|
| Landing | Explains what CONRRAD is and offers three entries: Enter Atlas, Institutional Tour, Institutional Demonstration |
| Navigation | "Enter Atlas" opens the application shell without reload |
| Graph | Renders every institutional node and relation from `atlas.json` |
| Inspector | Selecting a node shows its identity, description, relations and knowledge state |
| Search | Free-text search over institutional assets returns navigable hits |
| Timeline | Eras switch and narrate institutional evolution |
| Views | Graph view and Tree view both render the same hierarchy |
| Play | The institutional journey advances step by step with who/what/why |
| Panels | Health, metrics, maturity, institutional tests, domains and both legends are populated |
| Demonstration | 8 declared scenes play in under two minutes with play/pause/next/previous/replay |
| Scenes | Every scene renders its declared animation, message and mandatory triad |
| Knowledge states | Every node carries a knowledge state and the legend explains it |
| Integrity | `atlas.json` fingerprint present; `atlas_demo.yaml` valid against `conrrad.atlas.demo/v1` |

## 2. Current state (before recovery)

Measured with a headless Chrome certification driven over the DevTools Protocol
(`atlas/tools/run_functional_check.py`).

| Symptom | Evidence |
|---|---|
| **The page freezes** ~2 s after "Enter Atlas" | Renderer process pegged at 103 % CPU; V8 refuses any evaluation; interrupting the loop with the debugger reports `app.js:456` |
| Everything downstream is unreachable | Inspector, search, timeline, views, play, panels and the demonstration cannot be exercised at all — not because they are broken, but because the thread never yields |
| 5 of 8 demonstration scenes render nothing | Scenes 1, 2, 3, 5 and 6 emit `Unsupported declared animation` |
| Final scene leaks internals | Outcomes render as `[object Object]` |
| Declared content never displayed | `hero_text` and `institutional_property` are declared on 7 scenes and rendered nowhere |
| Publication reports desynchronisation | `publication_status.json` → `atlas_status: OUT_OF_SYNC`, with healthy live assets reported as missing |
| The contract test suite cannot certify | `run_demo_tests.py` aborts with `TypeError: sequence item 0: expected str instance, dict found` |

**Root cause of the freeze.** `renderDomainTree()` builds the domain hierarchy from `<details>`
elements and attaches a `toggle` listener that re-renders the whole tree. Connecting a
`<details>` element to the document fires a *synthetic* `toggle` event, so every render
scheduled another render. The recursion never terminates and the main thread never returns to
the event loop.

**Root cause of the empty scenes.** `atlas_demo.yaml` was replaced (12:52) with
`ATLAS_BUSINESS_OUTCOME_DEMO v3.0.0`, which declares eight animation types. The interpreter
`demo_mode.js` (12:17) implements only three of them. The declarative contract between
specification and interpreter was broken by a one-sided change.

## 3. Files modified — what changed, why, and what broke

### `app.js`

* **What changed.** The domain panel became a collapsible `<details>` tree with a `toggle`
  listener that calls `restartSimulation()` and `renderDomainTree()`.
* **Why.** To let a visitor collapse institutional domains.
* **What broke.** Infinite re-render recursion: the whole Atlas freezes. This is the single
  defect that made every other feature look broken.
* **Classification: FIX** — the listener now ignores the synthetic toggle and reacts only to a
  real change of collapse state.

### `atlas_demo.yaml`

* **What changed.** Rewritten to `v3.0.0 · ATLAS_BUSINESS_OUTCOME_DEMO`: 8 scenes, business
  outcome narrative, mandatory triad, `hero_text`, `institutional_property`, richer animation
  declarations and an `acceptance` block.
* **Why.** To demonstrate business transformation instead of components.
* **What broke.** Nothing in the file itself. It declares five animation types and two scene
  fields the interpreter did not implement, and its outcome entries became objects where the
  interpreter still expected strings.
* **Classification: KEEP** — the specification is the demonstration's source of truth. The
  interpreter was brought up to the contract, not the other way round.

### `demo_mode.js`

* **What changed.** New declarative interpreter (WO-ATLAS-011/012) with eleven renderers.
* **Why.** To keep all narrative out of JavaScript.
* **What broke.** Five declared animation types had no renderer; `outcome_board` serialised
  outcome objects into `[object Object]`; `hero_text` and `institutional_property` were ignored.
* **Classification: FIX** — the five missing renderers were restored by composing the visual
  vocabulary that already existed, and the outcome renderer now accepts both shapes.

### `style.css`

* **What changed.** Demonstration stage, controls and animation styling (WO-ATLAS-011/012).
* **Why.** To present the declarative demonstration.
* **What broke.** Nothing regressed. It simply had no rules for the restored scene elements.
* **Classification: FIX (additive)** — rules added for the restored elements, reusing the
  existing tones, spacing and entrance animation. No redesign.

### `index.html`

* **What changed.** Landing section, demonstration entry points and the demonstration stage.
* **Why.** To offer the public demonstration.
* **What broke.** Nothing regressed. There was no container for the declared `hero_text`.
* **Classification: FIX (one element)** — `#demo-hero` added.

### `public_experience.js`

* **What changed.** Institutional journey playback, tree view, search and timeline
  (WO-ATLAS-008/009).
* **Why.** To make the Atlas explain itself to a visitor.
* **What broke.** Nothing. Every feature certified working once the freeze was removed.
* **Classification: KEEP** — untouched.

### `atlas.json`

* **What changed.** Nothing in this recovery. It is the projection of the institutional model.
* **Why.** N/A.
* **What broke.** Nothing: 27 nodes, 65 relations, fingerprint `dc619bbd9a0cc878…`, a knowledge
  state on every node, and no cycle in the parent hierarchy (verified explicitly, because a
  cycle would have produced an identical freeze).
* **Classification: KEEP** — the IKM is the source of truth; the frontend only consumes it.

### `tools/run_demo_tests.py`

* **What changed.** Contract tests written against the superseded v2.0.0 wording, pinned to
  verbatim titles, messages and a fixed list of string outcomes.
* **Why.** To enforce the WO-ATLAS-012 narrative.
* **What broke.** The suite crashed on the v3.0.0 specification, so no test run could reveal the
  broken animation contract.
* **Classification: FIX** — expectations are now derived from the specification's own
  `acceptance` block, so the narrative can evolve without the tests going stale. The check that
  would have caught this regression, *"Interpreter implements every declared animation"*, already
  existed and now runs.

### `tools/publish_continuous.py`

* **What changed.** Live verification searched for page markers inside the first 800 bytes of
  each response.
* **Why.** Cheap prefix inspection.
* **What broke.** The Atlas shell grew past that window, so present markers were reported as
  missing and a synchronised publication was flagged `OUT_OF_SYNC`.
* **Classification: FIX** — markers are searched over the whole document, and the graph, landing
  and tour markers now gate the verdict.

## 4. Impact summary

| File | Impact of the modification | Classification |
|---|---|---|
| `app.js` | Total loss of the Atlas: the page freezes | **FIX** |
| `demo_mode.js` | 5 of 8 scenes blank, internals leaked in the final scene | **FIX** |
| `atlas_demo.yaml` | None; it is the contract the interpreter must honour | **KEEP** |
| `index.html` | Declared hero line had nowhere to render | **FIX** |
| `style.css` | Restored elements had no styling | **FIX** |
| `public_experience.js` | None | **KEEP** |
| `atlas.json` | None | **KEEP** |
| `tools/run_demo_tests.py` | Certification impossible | **FIX** |
| `tools/publish_continuous.py` | False desynchronisation verdict | **FIX** |

Nothing was classified **REMOVE**: no change had to be reverted. The business narrative and the
public experience are both kept; only the contract between them was repaired.

## 5. Recovery principle applied

> The IKM is the source of truth. The frontend only consumes.

The institutional model, its projection and the declarative demonstration specification were
left untouched. Every repair was made on the consuming side — the interpreter, the shell, the
stylesheet and the certification tooling.
