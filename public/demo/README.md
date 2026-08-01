# CONRRAD Demonstration

Independent product. Consumer of Atlas. Served at `https://conrrad.org/demo/` (canonical; `/demo` → 301 → `/demo/`).

Assets MUST use absolute paths: `/demo/demo.css`, `/demo/demo.js`, `/demo/atlas_demo.yaml`.

## Dependency direction

```
Demo  ──►  Atlas
```

Never the opposite. Atlas contains no reference to this product.

Everything the demonstration reads from Atlas goes through the Atlas public
contract:

| What | How | When |
|---|---|---|
| `institutional_health` | `GET /atlas/atlas.json` | once, at start |
| node highlight / selection | `window.AtlasUI` | only when embedded in an Atlas page; absent here, and the demo degrades silently |

## Files

| File | Role |
|---|---|
| `index.html` | Demonstration shell. Entry surface + stage. |
| `demo.js` | Interpreter. Contains no narrative content. |
| `demo.css` | Presentation layer. |
| `atlas_demo.yaml` | The narrative. Scenes, messages, animations, bindings. |
| `tools/publish_demo.py` | Mirrors this directory to `conrrad-website/public/demo/`. |

`demo.js` never hardcodes a scene, a message, a metric or an ordering. Editing
the narrative means editing `atlas_demo.yaml` only.

## URL parameters

| Parameter | Effect |
|---|---|
| `?autostart=0` | Hold on the entry surface instead of playing on load |
| `?scene=N` | Start at scene N (1-indexed) |
| `?freeze=1` | Start paused |

## Publish

```bash
python3 conrrad-demo/tools/publish_demo.py
```

Deployment to Vercel is performed by the operator; this host holds no token.
