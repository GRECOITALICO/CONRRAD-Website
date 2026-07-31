# ATLAS_CHANGELOG

## 2026-07-30T19:28:00Z — INT-ATLAS-014 Atlas Demo as Business Proof

- Mission: a YC Partner must understand why CONRRAD exists in under two minutes. Presentation layer only; IKM, `atlas.json`, ontology, graph, relations, knowledge, HARLEMM, SULLY and ANNY frozen.
- New narrative law: never explain technology first. Every scene answers "what business problem disappears because this institutional capability exists?"
- `atlas_demo.yaml` v4.0.0 (`ATLAS_BUSINESS_PROOF`): every scene rebuilt as **pain → capability → evidence → outcome**, and the order is never inverted.
- New sequence: The AI Trap · Institution before AI · Govern before Infer (principal, 20s) · Capability Routing · The LLM is not the brain · Evidence · Institutional Learning · Results.
- Every scene now finishes with one sentence occupying the entire screen, at 104px measured on production: "Inference is expensive." · "You own your institution." · "Governance scales." · "Capabilities survive." · "The institution decides." · "Every decision is explainable." · "Knowledge is permanent." · "The institution remains."
- Keynote pacing: staged 1200ms reveals, 1400ms statement fade, 2200ms type scale, 1400ms counters, one screen per scene with no scrolling to reach the outcome.
- Final scene is metrics only: Governance · Inference avoided · Savings · Institutional maturity · Coverage · Evidence, plus the two opposing curves (cost of AI down, governance up).
- Interpreter: four-part renderers, full-screen statement timer with pause/resume, `metrics_board` axes, `AtlasDemo.goTo()`, and counters that settle to their true value on pause instead of freezing half-way.
- Contract tests rewritten to the four-part schema, including the on-screen reading order and statement length, timing and placement.
- Fixed `publish_continuous.py`: the `READY` verdict is written only after the deploy is verified, so it was never published. A converging second deploy now ships it.
- Production certification: 54/54 · `VERDICT RECOVERED` · 0 JavaScript errors. Contract: 44/44 + 6/6 institutional flows. Runtime 115s of a 120s budget.
- Public URL verified: https://conrrad.org/atlas/

## 2026-07-30T18:52:00Z — WO-ATLAS-013 Institutional Recovery

- Mission: recover the Atlas demonstration. No new features. No redesign. IKM untouched.
- Root cause of the freeze: `renderDomainTree()` re-entered itself on every synthetic `<details>` toggle (`app.js`).
- Root cause of blank scenes: `atlas_demo.yaml` v3.0.0 declared five animation types the interpreter did not implement.
- Restored: navigation, layout, inspector, timeline, play, 8/8 scenes, animations, panels.
- Missing renderers restored by composing the existing visual vocabulary (no new effects).
- Live verifier now searches the whole document; publication status returns to `READY`.
- Production certification: 50/50 · `VERDICT RECOVERED` · 0 JavaScript errors.
- Contract certification: 33/33 · `all_pass: True`.
- Public URL verified: https://conrrad.org/atlas/

## 2026-07-30T17:25:00Z — WO-ATLAS-012 Business Proof · "Institution First. AI Second."

- Narrative rewrite only. No change to IKM, HARLEMM, SULLY, ANNY or the institutional model.
- Every scene now answers one question: "What market pain does CONRRAD eliminate?"
- Every scene carries the mandatory triad: Business Impact · Architecture Property · Institutional Evidence.
- Titles and messages rewritten for business consequences (vendor lock-in, cost, continuity, governance, sovereignty, compounding knowledge).
- Cost scene is principal (22s): 25 requests → 23 institution / 2 inference; Traditional AI 25 calls · $3.00 vs CONRRAD 2 calls · $0.24; "Every institutionalized answer becomes free forever."
- Governance scene explains the result, never the component. Capability scene withholds SULLY for 8s then reveals it.
- Final scene shows only the seven business outcomes + "CONRRAD · Institution First. AI Second."
- Tests: 31/31 business demonstration checks + 6/6 institutional flows = PASS. Runtime 114s.
- New declarative animations interpreted from atlas_demo.yaml: cost_comparison, decision_flow, outcome_board.

## 2026-07-30T16:45:00Z — WO-ATLAS-011 Institutional Demonstration · "AI Only Where It Adds Value"

- New DEMO mode: declarative `atlas_demo.yaml` (8 scenes + final) interpreted by `demo_mode.js`; the frontend contains no hardcoded scene content.
- Entry point: "▶ Start Institutional Demonstration" (landing + header). Controls: play/pause/next/previous/replay + scene rail + keyboard (Esc/←/→/Space). Deep-links `?demo=1`, `?scene=N`, `?freeze=1`.
- Scenes demonstrate architectural properties (no decorative animation):
  1. The Problem — entry points converge to ANNY ("The entry point is irrelevant.") · pain: Vendor Lock-in
  2. ANNY — provider rotation while institutional identity persists · Vendor independence / Identity persistence / Session continuity
  3. HARLEMM — governance bifurcation 92% institutional / 8% inference ("Only what cannot be solved institutionally reaches AI.")
  4. SULLY — capability routing, local before cloud ("Capabilities before models.")
  5. LLM — small bounded "Inference Engine" service, returns Candidate Mutation to HARLEMM ("The LLM performs only one responsibility.")
  6. VALIDATION — Candidate Mutation → Policies → Evidence → State → Approved ("The institution validates AI.")
  7. KNOWLEDGE EVOLUTION — AI used once, then resolved without AI ("Every validated inference becomes institutional knowledge.")
  Final — institutional metrics + "CONRRAD minimizes AI by maximizing institutional knowledge." / "The institution governs AI. AI never governs the institution."
- Metrics bound to the live model (`atlas.json → institutional_health`) and declared counters; 29 bindings resolved.
- Total runtime 107s (< 120s budget). Tests: 20/20 demonstration checks + 6/6 institutional flows = PASS.
- Local certification via headless render of scenes 1, 3, 5, 6, final. Live deploy PENDING Vercel authorization (VERCEL_TOKEN absent / session expired).

## 2026-07-30T15:48:37Z — WO-ATLAS-008 Public Demonstration

- Atlas is the canonical public CONRRAD demonstration at https://conrrad.org/atlas/
- Landing triad, Institutional Tour, Mission Playback, Search, Timeline, Health/Metrics/Tests
- Deploy `dpl_69RExzFFDqv5cQ6hJf77jNMfrhps` · Verification PASS · Tests PASS
- Commit `7350b19f`


## 2026-07-30T15:27:12Z — WO-ATLAS-007 Sprint 1 Digital Twin Expansion

- Version `1.2.0` published to https://conrrad.org/atlas/
- Nodes 27 · Relations 65 · Domains 13
- Knowledge Coverage 73.1% · Integrity 73.1% · Maturity 84.4%
- Added Institutional Journey + lifecycle scenes; Planner/Developer perspectives; Health + Maturity panels; expanded Inspector
- Deploy `dpl_2xHKw1vduktRxGXWzfVBYTvt2ABE` · Verification PASS
- Commit `7350b19f`
