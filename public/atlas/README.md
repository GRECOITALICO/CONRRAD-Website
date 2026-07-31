# CONRRAD Atlas — WO-ATLAS-004-A

Model-driven Institutional Digital Twin. Frontend only consumes JSON models.

## Model files

| File | Role |
|------|------|
| `data/atlas.json` | Nodes, relations, health, embedded model refs |
| `scenes.json` | Institutional scenes / path highlight |
| `perspectives.json` | Perspective layer visibility |
| `knowledge_states.json` | KNOWN · PARTIAL · UNMAPPED · DISCOVERY_REQUIRED |
| `relation_types.json` | Relation labels + colors |

## Regenerate

```bash
python3 atlas/tools/regenerate_atlas.py
```

## Local

```bash
cd atlas && python3 -m http.server 8765
```
