# ATLAS_VISUAL_RENDER_AUDIT

**WO:** INT-ATLAS-018 — Visual Render Audit (Evidence First)  
**Mode:** Investigate only · **no code · no deploy · no fix · no proposals**  
**Issued:** 2026-07-30T20:55:00Z  
**URL:** `https://conrrad.org/atlas/?demo=1`  
**Build in page:** `atlas-1.2.0-20260730202802` · Deploy `2026-07-30T20:27:57Z`  
**Viewport:** 1440×900 (Chrome headless CDP · full-viewport screenshots)  
**Evidence root:** `atlas/audit_visual_018/`

### Method

1. Auto-start demo (`?demo=1` → `AtlasDemo.start`).  
2. `goTo(i)` for scenes 0…7; settle ≥3s; pause.  
3. Full-viewport `Page.captureScreenshot` per scene.  
4. `getBoundingClientRect` + computed style flags on `#demo-stage`, `#demo-canvas`, `#demo-triad`, `#demo-message`, `#demo-scene-title` (title), `#demo-metrics`, `#demo-rail`, `#demo-pain`.  
5. Human judgment from **screenshots** (and viewport-clamped crops). DOM existence alone is not accepted as visibility.

### Rubric

| Gate | Pass condition |
|---|---|
| Executive | CEO **and** CTO **and** Series A investor can state the scene thesis from the screenshot alone, without explanation |
| Visual completeness | Title, business message, and animation are **in the first viewport**; triad readable in-frame when the scene carries one; no blank canvas; no empty first-viewport band where those elements sit below the fold |
| **Scene Pass/Fail** | **FAIL** if either gate fails |

### Systemic geometry (all scenes)

| Flag | Observation |
|---|---|
| `display:none` / `visibility:hidden` / `opacity:0` on stage/title/message/canvas | **Not detected** on measured nodes |
| Negative `z-index` | **Not detected** |
| Zero width/height on stage/title/message/canvas | **Not detected** |
| `#demo-stage` size | 1440×900 (fills viewport) · `overflow-y: auto` |
| Layout failure mode | Content **taller than 900px** → triad / metrics / pain / rail often at `y ≥ 900` → **outside screenshot** without scroll |
| Flex/grid collapse | Main nodes have non-zero boxes; collapse not the failure mode — **viewport overflow** is |

---

## Scene 1 — SCENE-1

**Screenshot:** [`audit_visual_018/scene_01_SCENE-1.png`](audit_visual_018/scene_01_SCENE-1.png)  
**Title (YAML):** The enterprise depends on AI.  
**Animation:** `dependency_baseline`

### Visible Elements (screenshot)

- Scene title  
- Business message: “Today, every request goes straight to the model.” (fully in frame)  
- Animation: Request → LLM (Everything) → Answer  
- Governance / lock indicators **inside canvas:** Inference 100%, Vendor Lock YES, Governance 0, Audit Trail 0, Continuity 0  
- Canvas note about 100% / 0% governance  

### Missing Elements (first viewport)

- **Triad** — `y=1072` · **not in image** (crop: `NOT_IN_IMAGE`)  
- **`#demo-metrics`** — `y=966` · below fold  
- **Pain chip** — `y=1034` · below fold  
- **Rail** — `y=1189` · below fold  
- Large dark empty band at bottom of screenshot (`bot120` brightness ≈ 0.06) where triad/metrics should appear  

### Size (expected min vs actual)

| Node | Expected min | Actual | In view |
|---|---|---|---|
| stage | ≥800×500 | 1440×900 | yes |
| title | ≥200×18 | 389×30 @ (156,89) | yes |
| message | ≥300×18 | 1129×36 @ (156,822) | yes |
| canvas | ≥400×80 | 1129×640 @ (156,132) | yes |
| triad | ≥400×40 | 1129×91 @ (156,1072) | **no — outside viewport** |
| metrics | optional strip | 1129×55 @ (156,966) | **no** |
| rail | ≥100×18 | 1129×30 @ (156,1189) | **no** |

### Human Readability

High for the visible stack (title + tall animation + message). Vertical flow leaves unused horizontal space; bottom of frame is empty.

### Executive Readability

| Audience | Understands thesis without explanation? |
|---|---|
| CEO | **Yes** — everything goes to the model; governance/audit/continuity are zero |
| CTO | **Yes** — LLM-as-system-of-record diagram |
| Series A investor | **Yes** — dependency / lock / zero controls |

### Pass / Fail

**FAIL** — Visual completeness gate: triad, metrics, and pain are not in the screenshot; empty space where that content should be.

---

## Scene 2 — SCENE-2

**Screenshot:** [`audit_visual_018/scene_02_SCENE-2.png`](audit_visual_018/scene_02_SCENE-2.png)  
**Title:** The institution receives the request.  
**Animation:** `converge_with_swap`

### Visible Elements

- Title  
- Business message: “It does not matter where the request comes from.”  
- Animation: six entry points → ANNY institutional entry; provider swap row; UNCHANGED institutional state  
- `#demo-metrics` partially at bottom edge (labels visible; values near clip)  

### Missing Elements

- **Triad** — `y=1001` · not in image  
- Pain — below fold  
- Rail — below fold  

### Size

| Node | Actual | In view |
|---|---|---|
| title | 465×30 @ 89 | yes |
| message | 1129×36 @ 743 | yes |
| canvas | 1129×505 @ 218 | yes |
| metrics | 1129×55 @ 886 | yes (edge) |
| triad | 1129×106 @ 1001 | **no** |
| rail | @ 1134 | **no** |

### Human Readability

Moderate–high for the diagram; denser institutional labels (ANNY, entry authority).

### Executive Readability

| Audience | Without explanation? |
|---|---|
| CEO | **Marginal / No** — “ANNY / Institutional Entry Authority” is not self-explanatory; triad (business impact) absent |
| CTO | **Yes** — converge + provider swap |
| Series A investor | **Marginal / No** — needs the missing business-impact line to monetize the picture |

### Pass / Fail

**FAIL** — CEO/investor gate weak; triad not in screenshot.

---

## Scene 3 — SCENE-3

**Screenshot:** [`audit_visual_018/scene_03_SCENE-3.png`](audit_visual_018/scene_03_SCENE-3.png)  
**Title:** The institution decides when it needs AI.  
**Animation:** `bifurcation_with_cost`

### Visible Elements

- Title  
- Animation: HARLEMM gate; KNOWN 92% vs NEEDS_AI 8%; Traditional $3 vs CONRRAD $0.24; Spend avoided 92%  
- Comparisons: **yes** (in canvas)  
- Governance indicators: **yes** (HARLEMM / known vs needs AI)  
- Business message present but **vertically clipped** at viewport bottom (`message` crop height 20px; descenders cut)  

### Missing Elements

- Triad — `y=1138` · not in image  
- `#demo-metrics` — below fold  
- Pain, rail — below fold  
- Empty dark band under the tall canvas where those blocks should sit  

### Size

| Node | Actual | In view | Notes |
|---|---|---|---|
| canvas | 1129×611 | yes | dominates viewport |
| message | 1129×36 @ 880 · bottom 916 | **clipped** | `messageBelowViewport: true` |
| triad | @ 1138 | **no** | |

### Human Readability

Canvas thesis is strong. Official `#demo-message` line is partially cut off.

### Executive Readability

| Audience | Without explanation? |
|---|---|
| CEO | **Yes** from cost comparison (25→2, $3→$0.24, 92%) |
| CTO | **Yes** |
| Series A investor | **Yes** — cost narrative is the clearest in the demo |

### Pass / Fail

**FAIL** — Business message clipped; triad/metrics/pain not in first viewport despite empty space below the canvas.

---

## Scene 4 — SCENE-4

**Screenshot:** [`audit_visual_018/scene_04_SCENE-4.png`](audit_visual_018/scene_04_SCENE-4.png)  
**Title:** The institution buys capabilities.  
**Animation:** `capability_routing`

### Visible Elements

- Title, message (“You buy a capability once…”), local vs cloud comparison (7 vs 2), metrics strip, pain chip  
- Triad: **headers only** in frame (“BUSINESS IMPACT / ARCHITECTURE PROPERTY / INSTITUTIONAL EVIDENCE”) — body text below fold (`triad` crop ≈ 28px tall)  

### Missing Elements

- Triad **body copy** (clipped)  
- Rail — `y=987` · outside viewport  

### Size

| Node | Actual | In view |
|---|---|---|
| canvas | 1129×345 | yes |
| message | @ 614 | yes |
| metrics | @ 757 | yes |
| triad | 1129×89 @ 872 · bottom 961 | **clipped** |
| rail | @ 987 | **no** |

### Human Readability

High for capability vs model / local-first story.

### Executive Readability

| Audience | Without explanation? |
|---|---|
| CEO | **Yes** |
| CTO | **Yes** |
| Series A investor | **Yes** |

### Pass / Fail

**FAIL** — Triad content not readable in the screenshot (labels only); rail missing. Thesis is clear, but mandatory triad body fails the completeness gate.

---

## Scene 5 — SCENE-5

**Screenshot:** [`audit_visual_018/scene_05_SCENE-5.png`](audit_visual_018/scene_05_SCENE-5.png)  
**Title:** The model has no authority.  
**Animation:** `authority_contrast`

### Visible Elements

- Title, message, CONRRAD vs Everyone Else contrast, metrics, pain, triad (mostly in frame; bottom slightly at edge)  

### Missing Elements

- Rail — `y=933` · outside / edge  

### Size

| Node | Actual | In view |
|---|---|---|
| canvas | 1129×318 @ 189 | yes |
| message | @ 557 | yes |
| metrics | @ 700 | yes |
| triad | @ 816 · bottom 907 | yes (tight) |
| rail | @ 933 | **no** |

### Human Readability

High. Authority contrast is explicit.

### Executive Readability

| Audience | Without explanation? |
|---|---|
| CEO | **Yes** — model proposes; institution decides; AI decisions = 0 |
| CTO | **Yes** |
| Series A investor | **Yes** — governance risk contrast |

### Pass / Fail

**PASS**

---

## Scene 6 — SCENE-6

**Screenshot:** [`audit_visual_018/scene_06_SCENE-6.png`](audit_visual_018/scene_06_SCENE-6.png)  
**Title:** Every decision leaves evidence.  
**Animation:** `evidence_checklist`

### Visible Elements

- Title, message, PASS checklist animation, metrics, pain, **full triad**, **rail**  
- No below-fold clipping flags on triad/message  

### Missing Elements

- None material in first viewport  
- Canvas has intentional vertical padding around the checklist (not a blank required container)

### Size

| Node | Actual | In view |
|---|---|---|
| canvas | 1129×240 | yes |
| message | @ 509 | yes |
| metrics | @ 652 | yes |
| triad | @ 767 · bottom 874 | yes |
| rail | @ 900 | yes |

### Human Readability

High.

### Executive Readability

| Audience | Without explanation? |
|---|---|
| CEO | **Yes** — nothing enters the record without evidence; 100% with evidence |
| CTO | **Yes** |
| Series A investor | **Yes** — auditability |

### Pass / Fail

**PASS**

---

## Scene 7 — SCENE-7

**Screenshot:** [`audit_visual_018/scene_07_SCENE-7.png`](audit_visual_018/scene_07_SCENE-7.png)  
**Title:** The institution gets smarter.  
**Animation:** `knowledge_evolution`

### Visible Elements

- Title, message, first vs second request (AI calls 1 → 0), metrics, pain, triad (lower edge slightly clipped)  

### Missing Elements

- Rail — `y=939` · outside viewport  

### Size

| Node | Actual | In view |
|---|---|---|
| canvas | 1129×279 | yes |
| message | @ 548 | yes |
| metrics | @ 691 | yes |
| triad | @ 806 · bottom 913 | yes (slight clip) |
| rail | @ 939 | **no** |

### Human Readability

High for 1→0 / marginal cost story. (Automated vision claimed possible glyph noise in small canvas labels; not confirmed as `[object Object]` leak in prior DOM probe.)

### Executive Readability

| Audience | Without explanation? |
|---|---|
| CEO | **Yes** — pay once; second request free |
| CTO | **Yes** |
| Series A investor | **Yes** — compounding owned knowledge |

### Pass / Fail

**PASS**

---

## Scene Final — SCENE-FINAL

**Screenshot:** [`audit_visual_018/scene_08_SCENE-FINAL.png`](audit_visual_018/scene_08_SCENE-FINAL.png)  
**Title:** What you actually get.  
**Animation:** `outcome_board`

### Visible Elements

- Title, message (“Institution First. AI Second.”), outcome board (8 outcomes), metrics row, pain, **full triad**, rail  

### Missing Elements

- None material  

### Size

| Node | Actual | In view |
|---|---|---|
| canvas | 1129×324 | yes |
| message | @ 475 | yes |
| metrics | @ 650 | yes |
| triad | @ 778 · bottom 866 | yes |
| rail | @ 893 | yes |

### Human Readability

High. Scorecard layout.

### Executive Readability

| Audience | Without explanation? |
|---|---|
| CEO | **Yes** — governed, auditable, sovereign outcomes + live numbers |
| CTO | **Yes** |
| Series A investor | **Yes** |

### Pass / Fail

**PASS**

---

## Summary table

| Scene | Screenshot | Triad in first viewport | Message in first viewport | Exec (CEO/CTO/Investor) | **Result** |
|---|---|---|---|---|---|
| 1 | `scene_01_SCENE-1.png` | No | Yes | Yes / Yes / Yes | **FAIL** |
| 2 | `scene_02_SCENE-2.png` | No | Yes | No* / Yes / No* | **FAIL** |
| 3 | `scene_03_SCENE-3.png` | No | Clipped | Yes / Yes / Yes | **FAIL** |
| 4 | `scene_04_SCENE-4.png` | Headers only | Yes | Yes / Yes / Yes | **FAIL** |
| 5 | `scene_05_SCENE-5.png` | Yes | Yes | Yes / Yes / Yes | **PASS** |
| 6 | `scene_06_SCENE-6.png` | Yes | Yes | Yes / Yes / Yes | **PASS** |
| 7 | `scene_07_SCENE-7.png` | Yes (tight) | Yes | Yes / Yes / Yes | **PASS** |
| Final | `scene_08_SCENE-FINAL.png` | Yes | Yes | Yes / Yes / Yes | **PASS** |

\*Scene 2: CEO/investor cannot recover business impact without the off-screen triad; diagram alone is institutional jargon-heavy.

**Score: 4 PASS · 4 FAIL**

---

## Final conclusion

### Would a CEO understand this scene without explanation?

| Scene | Answer |
|---|---|
| 1 | Yes (pain) — but institutional triad not on screen |
| 2 | **No** (without triad / business-impact copy) |
| 3 | Yes (cost) — message line clipped |
| 4–Final | Yes (4 with triad body missing) |

### Would a CTO?

| Scene | Answer |
|---|---|
| 1–Final | Yes for technical/diagram reading on all eight screenshots |

### Would a Series A investor?

| Scene | Answer |
|---|---|
| 1 | Yes |
| 2 | **No** (same as CEO) |
| 3 | Yes |
| 4–Final | Yes |

### Cross-cutting visual fact (screenshot-proven)

On **Scenes 1–4**, content required for the full business proof (especially **`#demo-triad`**, and often metrics/pain/rail) sits **below the 900px viewport**. The screenshot shows **empty dark space** where that content should be. Runtime populates those nodes; **the first-viewport human frame does not show them**.

Scenes **5–Final** fit the business stack in-frame and pass executive + completeness gates.

---

**Artifacts**

- Screenshots: `atlas/audit_visual_018/scene_0{1..8}_*.png`  
- Geometry dump: `atlas/audit_visual_018/metrics.json`  
- Viewport crops: `atlas/audit_visual_018/crop_SCENE-*_{title,message,canvas,triad}.png`

**STOP.**
