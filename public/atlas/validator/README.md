# Atlas Validator (WO-ATLAS-001)

Runtime validator: `../validator.js` (`AtlasValidator.validateAtlas`).

## Checks

1. Required node fields: `id`, `atlas_index`, `label`, `type`, `description`, `status`, `artifact`, `source`
2. Unique `id` values
3. Relation types ∈ {`owns`, `uses`, `creates`, `depends_on`}
4. Relation `from` / `to` reference existing node ids
5. Parent references exist
6. Orphan nodes (no relations) → warnings
7. Duplicate `atlas_index` → warning (index is not identity)

## Usage

Loaded by `index.html` before `app.js` boots the graph. Invalid data blocks render and shows errors in the canvas panel.
