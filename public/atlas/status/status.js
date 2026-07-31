(function () {
  "use strict";

  function text(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value == null || value === "" ? "—" : String(value);
  }

  function setBadge(status) {
    var el = document.getElementById("pub-badge");
    if (!el) return;
    var s = status || "UNKNOWN";
    el.className = "atlas-status STATUS-" + String(s).replace(/\s+/g, "_");
    el.textContent = "Publication · " + s;
  }

  function loadJson(url) {
    return fetch(url, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error(url + " HTTP " + r.status);
      return r.json();
    });
  }

  Promise.all([
    loadJson("../publication_status.json").catch(function () {
      return loadJson("../publication.json");
    }),
    loadJson("../atlas.json"),
  ])
    .then(function (pair) {
      var pub = pair[0] || {};
      var atlas = pair[1] || {};
      var health = atlas.institutional_health || atlas.coverage || {};
      var status = pub.atlas_status || pub.publication_status || "UNKNOWN";
      var sync = pub.synchronization_status || pub.integrity_status || status;

      setBadge(status);
      text("f-build", pub.build_version || atlas.version);
      text("f-commit", pub.commit || pub.git_commit || atlas.commit || "local");
      text("f-deploy", pub.last_deploy || pub.deploy_utc || pub.last_updated_utc);
      text(
        "f-coverage",
        pub.knowledge_coverage != null
          ? pub.knowledge_coverage + "%"
          : health.knowledge_coverage != null
            ? health.knowledge_coverage + "%"
            : "—"
      );
      text("f-nodes", pub.nodes != null ? pub.nodes : health.nodes);
      text("f-relations", pub.relations != null ? pub.relations : health.relations);
      text("f-scenes", pub.scenes != null ? pub.scenes : health.scenes);
      text("f-perspectives", pub.perspectives != null ? pub.perspectives : health.perspectives);
      text("f-publication", status);
      text("f-sync", sync);

      var raw = document.getElementById("status-raw");
      if (raw) {
        raw.hidden = false;
        raw.textContent = JSON.stringify(
          {
            publication: pub,
            integrity: atlas.model_integrity || null,
            institutional_health: health,
          },
          null,
          2
        );
      }
    })
    .catch(function (err) {
      setBadge("ERROR");
      text("f-publication", "ERROR");
      text("f-sync", String(err && err.message ? err.message : err));
    });
})();
