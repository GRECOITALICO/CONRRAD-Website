/**
 * CONRRAD Atlas validator — WO-ATLAS-004-A
 * Relation types and knowledge states come from model files embedded in atlas.json.
 */
(function (global) {
  "use strict";

  var FALLBACK_RELATIONS = [
    "owns", "uses", "creates", "depends_on", "coordinates", "validates",
    "updates", "requires", "produces", "consumes", "observes", "supports"
  ];
  var KNOWLEDGE = ["KNOWN", "PARTIAL", "UNMAPPED", "DISCOVERY_REQUIRED"];
  var REQUIRED_NODE = ["id", "atlas_index", "label", "type", "description", "status", "artifact", "source"];

  function allowedRelations(data) {
    var rt = data.relation_types && data.relation_types.relation_types;
    if (rt && rt.length) return rt.map(function (r) { return r.id; });
    if (data.lexicon && data.lexicon.relation_types) return Object.keys(data.lexicon.relation_types);
    return FALLBACK_RELATIONS;
  }

  function validateAtlas(data) {
    var errors = [];
    var warnings = [];
    if (!data || typeof data !== "object") {
      return { ok: false, errors: ["atlas.json is not an object"], warnings: [], stats: {} };
    }
    if (!Array.isArray(data.nodes) || !data.nodes.length) errors.push("nodes[] required");
    if (!Array.isArray(data.relations)) errors.push("relations[] required");
    if (errors.length) return { ok: false, errors: errors, warnings: warnings, stats: {} };

    var allowed = allowedRelations(data);
    var ids = Object.create(null);
    data.nodes.forEach(function (n, i) {
      REQUIRED_NODE.forEach(function (k) {
        if (n[k] === undefined || n[k] === null || n[k] === "") warnings.push("node[" + i + "] incomplete " + k);
      });
      if (!n || !n.id) { errors.push("node[" + i + "] missing id"); return; }
      if (ids[n.id]) errors.push("duplicate id: " + n.id);
      ids[n.id] = n;
      var ks = n.knowledge_state;
      if (ks === "PENDING") ks = "UNMAPPED";
      if (ks === "UNKNOWN") ks = "DISCOVERY_REQUIRED";
      if (ks && KNOWLEDGE.indexOf(ks) === -1) errors.push("node " + n.id + " invalid knowledge_state");
    });

    data.relations.forEach(function (r, i) {
      if (!r || !r.from || !r.to || !r.type) { errors.push("relation[" + i + "] incomplete"); return; }
      if (allowed.indexOf(r.type) === -1) errors.push("relation[" + i + "] bad type " + r.type);
      if (!ids[r.from]) errors.push("relation[" + i + "] from missing");
      if (!ids[r.to]) errors.push("relation[" + i + "] to missing");
    });

    return {
      ok: errors.length === 0,
      errors: errors,
      warnings: warnings,
      stats: data.institutional_health || data.coverage || {},
      health: data.institutional_health || {},
    };
  }

  global.AtlasValidator = {
    validateAtlas: validateAtlas,
    KNOWLEDGE_STATES: KNOWLEDGE,
  };
})(typeof window !== "undefined" ? window : this);
