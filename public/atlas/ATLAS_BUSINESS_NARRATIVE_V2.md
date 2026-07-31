# ATLAS_BUSINESS_NARRATIVE_V2

**INT-ATLAS-014 — Atlas Demo as Business Proof**
Spec: `atlas/atlas_demo.yaml` v4.0.0 · `ATLAS_BUSINESS_PROOF`
Live: <https://conrrad.org/atlas/> · Deep link: `?demo=1`
Runtime: 8 scenes · 115s of a 120s budget
Status: **CERTIFIED** · production 54/54 · narrative contract 44/44 · 0 JavaScript errors

---

## 1. What changed

The demonstration used to walk a visitor through the architecture. It explained
components. That is no longer the objective.

The objective is that a YC Partner understands, in under two minutes, **why
CONRRAD exists**. So the demonstration no longer explains technology first. It
explains business pain first, and every scene answers exactly one question:

> *What business problem disappears because this institutional capability exists?*

Nothing institutional was touched. The IKM, `atlas.json`, the ontology, the
graph, the relations, the knowledge states, HARLEMM, SULLY and ANNY are frozen.
The only files rewritten are the presentation layer: the declarative narrative,
the interpreter that renders it, and the stylesheet that paces it.

## 2. The narrative law

Every scene is built from four parts, rendered in this order, and the order is
never inverted:

| # | Part | What it does | Where it renders |
|---|---|---|---|
| 1 | **Pain** | Shows the problem | `#demo-pain` — amber, oversized, first thing read |
| 2 | **Institutional capability** | Shows what CONRRAD does | `#demo-scene-title` + `#demo-capability` + the animation |
| 3 | **Evidence** | Shows real metrics from the live model | `#demo-metrics` + `#demo-evidence` |
| 4 | **Business outcome** | Shows money saved or governance gained | `#demo-outcome` — green, oversized |

Each scene then finishes with **one sentence occupying the entire screen**. Those
eight sentences are the whole pitch, and they are what an investor remembers.

The order is not a convention that a future edit could quietly break. It is
asserted twice: the contract test reads the container positions out of
`index.html`, and the production harness measures the on-screen vertical
position of all four parts on all eight scenes.

## 3. Visual language

Apple Keynote, and nothing else:

- **Very little text.** Four short blocks and one closing sentence per scene.
- **Very large typography.** Pain and outcome headlines at up to 2rem, the
  closing statement at 104px measured on production.
- **Slow transitions.** 1200ms staged reveals, a 1400ms fade on the statement,
  and a 2200ms scale on its type. Counters take 1400ms to arrive so the number
  can actually be read.
- **Nothing animates for decoration.** Every animation declares, in the spec,
  what it proves. The contract test fails if one does not.

Pausing settles every counter to its true value, because a figure frozen
half-way to the truth is worse than no figure.

---

## 4. Scene storyboard

### Scene 1 · The AI Trap — 13s

| Part | Content |
|---|---|
| **Pain** | Every request goes to AI. · Everything costs money. · Every provider owns your future. |
| **Capability** | None. This is not CONRRAD. This is how the market works today. |
| **Animation** | `dependency_baseline` — Request → **AI** (oversized, red) → Answer, with 100% reaching AI, 0 governed, 0 audit trail, vendor lock TOTAL |
| **Evidence** | Nothing checked before money is spent · nothing recorded after the answer arrives |
| **Outcome** | Costs grow with usage. Forever. |
| **Message** | *The more AI you use, the more dependent you become.* |
| **Statement** | **Inference is expensive.** |

The visitor is shown the industry baseline as their own bill, not as a diagram.

### Scene 2 · Institution before AI — 15s

| Part | Content |
|---|---|
| **Pain** | Change provider, lose everything. · Your context lives inside someone else's product. · Every migration restarts your operation. |
| **Capability** | ANNY — identity, mission and memory belong to the institution. Providers are interchangeable. |
| **Animation** | `provider_swap` — four providers rotate every 2.4s underneath a block holding Identity, Mission, Memory, what was decided and what remains pending. The provider below changes; nothing above it changes. |
| **Evidence** | 4 providers rotated · 0 identity changes · 0 memory losses · 27 institutional assets |
| **Outcome** | Migration cost falls to zero. |
| **Message** | *You own your institution. Not your provider.* |
| **Statement** | **You own your institution.** |

ANNY is never described technically. Continuity is demonstrated, not asserted.

### Scene 3 · Govern before Infer — 20s · **PRINCIPAL SCENE**

| Part | Content |
|---|---|
| **Pain** | You pay again for answers you already own. · Every repeated question is billed as if it were new. · Every call adds latency you cannot remove. |
| **Capability** | HARLEMM — every request is checked against institutional knowledge before any inference is considered. |
| **Animation** | `bifurcation_with_cost` — 25 requests enter, HARLEMM checks before spending, 92% resolved by the institution, 8% requires inference. Then the money: **without CONRRAD 25 calls / $3** against **with CONRRAD 2 calls / $0.24**, 92% spend avoided. |
| **Evidence** | Inference avoided 23 · Money saved $2.76 · Latency avoided 18,400ms · Paid calls 2 |
| **Outcome** | 92% of your AI bill disappears. |
| **Message** | *We pay AI only when absolutely necessary.* |
| **Statement** | **Governance scales.** |

This is the strongest scene and it is also the longest, which the contract test
enforces: whichever scene carries the cost comparison must be the principal one.

### Scene 4 · Capability Routing — 14s

| Part | Content |
|---|---|
| **Pain** | You buy models, then the market replaces them. · Every model generation forces a rewrite. · Sensitive work leaves your perimeter by default. |
| **Capability** | SULLY — work is routed by the capability required, and executed locally whenever the capability exists locally. |
| **Animation** | `capability_routing` — Need detected → local capability → executed here. Second example: local not enough → cloud capability → specialist → back to the institution. Lanes: **Local 7 · Cloud 2 · Unavailable 0**, where unavailable is declared missing, never guessed. |
| **Evidence** | 78% of all work executed inside the perimeter |
| **Outcome** | Cloud spend becomes the exception. |
| **Message** | *We buy capabilities. Never models.* |
| **Statement** | **Capabilities survive.** |

### Scene 5 · The LLM is not the brain — 13s

| Part | Content |
|---|---|
| **Pain** | AI output goes straight into production. · Nobody validated it. · Nobody can defend it later. |
| **Capability** | Institutional authority — a provider returns a proposal, the institution approves or rejects it, the provider never writes. |
| **Animation** | `bifurcation` — proposals arrive, the gate is **Institution / Decides. Never the model.**, and they fork into Approved (becomes institutional truth) or Rejected (never reaches production). Counters: decisions made by AI 0, unapproved changes 0. |
| **Evidence** | 0 decisions made by AI · rejected proposals recorded with their rationale |
| **Outcome** | No unapproved change ever reaches production. |
| **Message** | *The AI proposes. The institution decides.* |
| **Statement** | **The institution decides.** |

### Scene 6 · Evidence — 13s

| Part | Content |
|---|---|
| **Pain** | Nobody can explain why the AI did that. · No trail. No policy. No signature. · An audit becomes an archaeology project. |
| **Capability** | Evidence chain — nothing enters the institutional record without evidence, policy and certification. |
| **Animation** | `evidence_checklist` — Proposal → Evidence → Policy → Certification → **Audit Trail**, one step every 1.6s, each stamped as it passes. Five steps. Every decision. Every time. |
| **Evidence** | 41 evidence artifacts · 12 policies applied per transition · 0 decisions without evidence |
| **Outcome** | Compliance stops being a project. |
| **Message** | *Every decision is explainable.* |
| **Statement** | **Every decision is explainable.** |

### Scene 7 · Institutional Learning — 15s

| Part | Content |
|---|---|
| **Pain** | You pay for the same answer twice. · Improvements accumulate inside the vendor's product. · Your spend never goes down. |
| **Capability** | Institutionalization — an approved inference becomes institutional knowledge, and the same question is never bought again. |
| **Animation** | `knowledge_evolution` — First request: not known → inference → knowledge becomes institutional (AI calls: 1). Second request: already known → no inference (AI calls: 0). Then the two transitions: inference calls 1 → 0, cost $0.12 → $0.00. |
| **Evidence** | First request required inference, the second required none · knowledge coverage 73.1% from the live model |
| **Outcome** | Marginal cost reaches zero. |
| **Message** | *The institution gets smarter. The AI works less.* |
| **Statement** | **Knowledge is permanent.** |

### Scene 8 · Results — 12s · FINAL

No animation overload. Only metrics, plus the two curves that are the whole
closing argument: **Cost of AI ▼ falls every day** against **Governance ▲ grows
every day**.

| Part | Content |
|---|---|
| **Pain** | Adopting AI without owning the outcome. · Every number below is measured, not claimed. |
| **Capability** | CONRRAD — the institution governs AI end to end, and the Atlas is the live proof. |
| **Evidence** | `atlas.json · institutional_health` (live projection) · `ATLAS_TEST_REPORT.md` · `ATLAS_DEPLOY_CERTIFICATE.md` |
| **Metrics** | Governance **92%** · Inference avoided **23** · Savings **$2.76** · Institutional maturity **84.4%** · Coverage **73.1%** · Evidence **41** |
| **Outcome** | AI gets cheaper. Governance gets stronger. |
| **Message** | *AI becomes cheaper every day. Governance becomes stronger every day.* |
| **Statement** | **The institution remains.** |

Four of those six numbers are projected live out of the institutional graph
rendered behind the screen. They are not slide copy.

---

## 5. The eight sentences

Read on their own, they are the pitch:

1. Inference is expensive.
2. You own your institution.
3. Governance scales.
4. Capabilities survive.
5. The institution decides.
6. Every decision is explainable.
7. Knowledge is permanent.
8. The institution remains.

Each is a single sentence of at most 46 characters, held on screen for at least
2.5 seconds, rendered at 104px across the full viewport. All four properties are
asserted by the contract tests and re-measured on production.

## 6. What the demonstration must never do

| Forbidden | How it is prevented |
|---|---|
| Explain technology before pain | Pain is the first container in the stage and the first assertion in the contract |
| Invert the four-part order | Order derived from `index.html` positions and re-measured in the browser |
| Put a component name where a business result belongs | Titles and statements are scanned for `HARLEMM`, `SULLY`, `ANNY`, `IKM` |
| Leak implementation vocabulary | The narrative surface is scanned for YAML, JSON, runtime, schema, systemd, Redis, Qdrant, endpoint, payload |
| Make the LLM the protagonist | The inference provider is declared a small bounded service and forbids the labels Brain, AI Core, Central Intelligence, Engine |
| Animate for decoration | Every animation must declare what it proves, and `decorative_animations` must be 0 |
| Hardcode narrative in the interpreter | Every phrase of 14 characters or more from the spec is searched for in `demo_mode.js` |
| Modify the institutional model | `institutional_model_modified: false`, verified byte-for-byte against production |

## 7. Verification

```
atlas/tools/run_demo_tests.py           44/44 narrative contract + 6/6 institutional flows
atlas/tools/run_functional_check.py     54/54 on https://conrrad.org/atlas/  ·  0 JS errors
atlas/tools/publish_continuous.py       atlas_status READY
```

Model sources were diffed against the deployed copies before certifying:
`institutional_scenes.yaml`, `knowledge_state.yaml` and `perspectives.json` are
byte-identical, and `institutional_relationships.yaml` differs only in its
`updated_at` stamp. The graph, the relations, the ontology and the knowledge
states are untouched.

STOP
