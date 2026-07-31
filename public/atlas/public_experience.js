/**
 * WO-ATLAS-008 — Public institutional demonstration experience.
 * Projection only. Never mutates the institutional model.
 */
(function () {
  "use strict";

  var TOUR = [
    {
      id: "founder_login",
      who: "Founder",
      purpose: "Enter the institution and authorize governed work.",
      responsibility: "Sets direction and holds final institutional authority.",
      artifacts: ["BOOTSTRAP/", "SWOP"],
    },
    {
      id: "anny",
      who: "ANNY",
      purpose: "Operate the institutional day — turn intent into missions.",
      responsibility: "Coordinates people, workers, and evidence under policy.",
      artifacts: ["MASTER_PLAN/ANNY/", "ANNY Runtime"],
    },
    {
      id: "mission",
      who: "Mission",
      purpose: "Make the work concrete: what must be done, under which rules.",
      responsibility: "Carries the institutional objective until evidence closes it.",
      artifacts: ["SWOP Work Orders"],
    },
    {
      id: "planner",
      who: "Planner",
      purpose: "Sequence the mission before action begins.",
      responsibility: "Assigns order, readiness, and worker path.",
      artifacts: ["Needs Founder Mapping"],
    },
    {
      id: "workers",
      who: "Workers",
      purpose: "Execute the mission with tools and governed agents.",
      responsibility: "Produce durable results without inventing authority.",
      artifacts: ["coordination/workers.yaml", "Cursor", "Antigravity"],
    },
    {
      id: "evidence",
      who: "Evidence",
      purpose: "Keep a trustworthy trail of what happened.",
      responsibility: "Makes institutional action auditable.",
      artifacts: ["Evidence corpus", "Certificates"],
    },
    {
      id: "harlemm",
      who: "HARLEMM",
      purpose: "Hold cognitive and memory governance for the institution.",
      responsibility: "Validates coherence before state advances.",
      artifacts: ["HARLEMM plane"],
    },
    {
      id: "certification",
      who: "Validation",
      purpose: "Confirm the work meets institutional standards.",
      responsibility: "PASS / FAIL gates before citizens are affected.",
      artifacts: ["AOCS", "Deployment harness", "Atlas certify"],
    },
    {
      id: "citizen",
      who: "Citizen",
      purpose: "Receive the institution’s value in the real world.",
      responsibility: "The person the system ultimately serves.",
      artifacts: ["Citizen journey"],
    },
    {
      id: "support",
      who: "Support",
      purpose: "Help the citizen when the journey needs care.",
      responsibility: "Operational assistance without breaking governance.",
      artifacts: ["Support capability"],
    },
    {
      id: "child_citizen",
      who: "Child Citizen",
      purpose: "Protect and support the most sensitive citizen path.",
      responsibility: "Visible even when mapping is incomplete.",
      artifacts: ["Needs Founder Mapping"],
    },
  ];

  var PLAYBACK = [
    {
      label: "Mission authorization",
      who: "Founder → ANNY",
      what: "The Founder authorizes a Mission. ANNY receives it as the operational objective.",
      why: "Work begins with explicit human authority, not autonomous improvisation.",
      responsibility: "Founder authorizes. ANNY accepts and governs the objective.",
      artifacts: ["BOOTSTRAP/", "SWOP Work Order"],
      nodes: ["founder_login", "anny", "mission"],
    },
    {
      label: "Planning",
      who: "ANNY → Mission → Planner",
      what: "ANNY creates the Mission and the Planner decomposes its path.",
      why: "The institution decides sequence and readiness before execution.",
      responsibility: "ANNY directs. Planner structures the work without changing its purpose.",
      artifacts: ["MASTER_PLAN/ANNY/SWOP.md", "Planner projection"],
      nodes: ["anny", "mission", "planner"],
    },
    {
      label: "Worker coordination",
      who: "Planner → Workers",
      what: "The Planner coordinates registered Workers for the Mission.",
      why: "Execution is assigned to known institutional actors.",
      responsibility: "Planner routes. Workers act only within assigned authority.",
      artifacts: ["coordination/workers.yaml", "TOOL_PROTOCOL"],
      nodes: ["planner", "workers", "worker.ide-cursor", "worker.antigravity"],
    },
    {
      label: "Evidence generation",
      who: "Workers → Evidence",
      what: "Workers execute meaningful transitions and produce durable Evidence.",
      why: "An answer is not enough; institutional work must leave an auditable trail.",
      responsibility: "Workers prove what changed. Evidence preserves causality.",
      artifacts: ["WORKSTATION/product/", "activity_log.yaml"],
      nodes: ["workers", "worker.ide-cursor", "worker.antigravity", "evidence"],
    },
    {
      label: "Validation",
      who: "Evidence → HARLEMM → Certification",
      what: "HARLEMM checks coherence and Certification applies PASS / FAIL gates.",
      why: "Unverified execution cannot become institutional state.",
      responsibility: "HARLEMM governs continuity. Certification blocks invalid outcomes.",
      artifacts: ["HARLEMM plane", "AOCS", "Deployment certificates"],
      nodes: ["evidence", "harlemm", "certification"],
    },
    {
      label: "Runtime mutation",
      who: "HARLEMM → Runtime",
      what: "Validated work reaches Runtime and becomes a controlled mutation.",
      why: "The institution changes only after evidence and validation.",
      responsibility: "Runtime applies state changes under governance.",
      artifacts: ["ANNY/runtime/", "Runtime Manifest"],
      nodes: ["harlemm", "runtime", "commit_mutation"],
    },
    {
      label: "Institutional state",
      who: "Runtime → Institutional State",
      what: "The Commit Mutation updates durable Institutional State.",
      why: "The institution must remember what became true.",
      responsibility: "Runtime commits. The institutional twin reflects the result.",
      artifacts: ["coordination/", "Atlas projection"],
      nodes: ["runtime", "commit_mutation", "institutional_state", "digital_twins"],
    },
    {
      label: "Citizen value",
      who: "Institutional State → Citizen → Support → Child Citizen",
      what: "Validated institutional value reaches the Citizen through Support.",
      why: "Governance exists to deliver safe, accountable value to people.",
      responsibility: "Support serves citizens while incomplete knowledge remains visible.",
      artifacts: ["Citizen Journey", "Support capability", "Needs Founder Mapping"],
      nodes: ["institutional_state", "citizen", "support", "child_citizen"],
    },
  ];

  var TIMELINE = {
    past: {
      title: "Past",
      copy: "Foundation certified. Workers and governance established. Atlas published as the institutional twin.",
      nodes: ["conrrad", "governance", "anny", "workers", "evidence", "atlas_publication"],
    },
    present: {
      title: "Present",
      copy: "You are watching the living twin: missions, evidence, validation, and citizen support in one graph.",
      nodes: ["founder_login", "mission", "planner", "harlemm", "runtime", "citizen"],
    },
    future: {
      title: "Future Planned",
      copy: "Deeper planner mapping, fuller citizen support, and continuous discovery of still-unmapped institutional edges.",
      nodes: ["planner", "support", "child_citizen", "observatory", "unmapped"],
    },
  };

  var tourTimer = null;
  var playTimer = null;
  var tourIndex = 0;
  var playIndex = 0;
  var ui = null;
  var bootPromise = null;
  var currentView = "graph";
  var PLAYBACK_DELAY_MS = 1850;

  function $(id) {
    return document.getElementById(id);
  }

  function playbackReason(message) {
    var card = $("playback-card");
    if (!card) return;
    card.hidden = false;
    card.classList.add("playback-error");
    card.innerHTML =
      "<div class='tour-progress'>PLAYBACK UNAVAILABLE</div>" +
      "<h3>Play could not start</h3>" +
      "<p><strong>Reason.</strong> " +
      String(message || "Atlas is not ready.").replace(/&/g, "&amp;").replace(/</g, "&lt;") +
      "</p>";
  }

  function enterAtlas(startTour) {
    if (!bootPromise) {
      if (typeof window.AtlasBoot !== "function") {
        playbackReason("Atlas loader is unavailable.");
        return Promise.reject(new Error("Atlas loader is unavailable"));
      }
      bootPromise = window.AtlasBoot();
    }
    return bootPromise
      .then(function () {
        if (startTour) startTourRun();
      })
      .catch(function (err) {
        playbackReason(err && err.message ? err.message : String(err));
        throw err;
      });
  }

  function nodeById(id) {
    var st = ui.getState();
    return ((st.data && st.data.nodes) || []).find(function (n) {
      return n.id === id;
    });
  }

  function setView(view) {
    currentView = view === "tree" ? "tree" : "graph";
    var graphView = $("graph-view");
    var treeView = $("tree-view");
    var graphBtn = $("btn-graph-view");
    var treeBtn = $("btn-tree-view");
    if (graphView) graphView.hidden = currentView !== "graph";
    if (treeView) treeView.hidden = currentView !== "tree";
    if (graphBtn) {
      graphBtn.classList.toggle("active", currentView === "graph");
      graphBtn.setAttribute("aria-pressed", currentView === "graph" ? "true" : "false");
    }
    if (treeBtn) {
      treeBtn.classList.toggle("active", currentView === "tree");
      treeBtn.setAttribute("aria-pressed", currentView === "tree" ? "true" : "false");
    }
    if (currentView === "tree") renderTree();
    else {
      ui.restartSimulation();
      var selected = ui.getState().selectedId;
      if (selected) {
        setTimeout(function () {
          ui.centerOnNode(selected);
        }, 100);
      }
    }
  }

  function renderTree() {
    var root = $("institution-tree");
    if (!root || !ui) return;
    var st = ui.getState();
    var nodes = ((st.data && st.data.nodes) || []).filter(function (n) {
      return ui.perspectiveAllowsNode(n);
    });
    var visible = Object.create(null);
    var children = Object.create(null);
    nodes.forEach(function (n) {
      visible[n.id] = n;
      children[n.id] = [];
    });
    nodes.forEach(function (n) {
      if (n.parent && visible[n.parent]) children[n.parent].push(n);
    });
    Object.keys(children).forEach(function (id) {
      children[id].sort(function (a, b) {
        return Number(a.atlas_index || 0) - Number(b.atlas_index || 0);
      });
    });
    var roots = nodes
      .filter(function (n) {
        return !n.parent || !visible[n.parent];
      })
      .sort(function (a, b) {
        if (a.id === "conrrad") return -1;
        if (b.id === "conrrad") return 1;
        return Number(a.atlas_index || 0) - Number(b.atlas_index || 0);
      });
    var active = st.highlighted || {};
    var hasActive = Object.keys(active).length > 0;

    function branch(node, depth) {
      var kids = children[node.id] || [];
      var meta = ui.knowledgeMeta(node.knowledge_state);
      var classes = ["tree-node"];
      if (st.selectedId === node.id) classes.push("selected");
      if (hasActive && active[node.id]) classes.push("active");
      if (hasActive && !active[node.id]) classes.push("inactive");
      var html =
        '<li class="' +
        classes.join(" ") +
        '" data-tree-id="' +
        ui.escapeHtml(node.id) +
        '">' +
        '<button type="button" class="tree-node-button" data-select-tree="' +
        ui.escapeHtml(node.id) +
        '" style="--depth:' +
        depth +
        '">' +
        '<span class="tree-connector">' +
        (depth ? "├─" : "●") +
        "</span>" +
        '<span class="tree-knowledge" style="color:' +
        ui.escapeHtml(meta.color) +
        '">' +
        ui.escapeHtml(meta.icon) +
        "</span>" +
        "<span>" +
        ui.escapeHtml(node.label) +
        "</span>" +
        '<small>' +
        ui.escapeHtml(node.type || "") +
        "</small>" +
        "</button>";
      if (kids.length) {
        html +=
          '<ul class="tree-children">' +
          kids
            .map(function (kid) {
              return branch(kid, depth + 1);
            })
            .join("") +
          "</ul>";
      }
      return html + "</li>";
    }

    root.innerHTML =
      '<ul class="institution-tree-root">' +
      roots
        .map(function (n) {
          return branch(n, 0);
        })
        .join("") +
      "</ul>";
    root.querySelectorAll("[data-select-tree]").forEach(function (btn) {
      btn.onclick = function () {
        var id = btn.getAttribute("data-select-tree");
        ui.selectNode(id, true);
        renderTree();
      };
    });
  }

  function syncTimelineToNodes(nodes) {
    var bestEra = "present";
    var bestScore = -1;
    Object.keys(TIMELINE).forEach(function (era) {
      var score = TIMELINE[era].nodes.filter(function (id) {
        return nodes.indexOf(id) !== -1;
      }).length;
      if (score > bestScore) {
        bestScore = score;
        bestEra = era;
      }
    });
    document.querySelectorAll(".tl-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-era") === bestEra);
    });
    var copy = $("timeline-copy");
    if (copy) copy.textContent = TIMELINE[bestEra].copy;
  }

  function showTourStop(i) {
    tourIndex = i;
    var stop = TOUR[i];
    if (!stop) return;
    var node = nodeById(stop.id);
    ui.setScene("Scene-Journey");
    ui.setHighlights(TOUR.map(function (t) {
      return t.id;
    }));
    ui.selectNode(stop.id, true);
    var card = $("tour-card");
    card.hidden = false;
    $("playback-card").hidden = true;
    card.innerHTML =
      "<div class='tour-progress'>Tour " +
      (i + 1) +
      " / " +
      TOUR.length +
      "</div>" +
      "<h3>" +
      ui.escapeHtml(stop.who) +
      "</h3>" +
      "<p><strong>Purpose.</strong> " +
      ui.escapeHtml(stop.purpose) +
      "</p>" +
      "<p><strong>Institutional responsibility.</strong> " +
      ui.escapeHtml(stop.responsibility) +
      "</p>" +
      "<p><strong>Related artifacts.</strong> " +
      ui.escapeHtml((stop.artifacts || []).join(" · ") || (node && (node.artifact || node.source)) || "—") +
      "</p>" +
      "<div class='tour-nav'>" +
      "<button type='button' id='tour-prev'>Back</button>" +
      "<button type='button' id='tour-next'>" +
      (i + 1 < TOUR.length ? "Next" : "Finish") +
      "</button>" +
      "<button type='button' id='tour-stop'>Stop</button>" +
      "</div>";
    $("tour-prev").onclick = function () {
      clearInterval(tourTimer);
      showTourStop(Math.max(0, i - 1));
    };
    $("tour-next").onclick = function () {
      clearInterval(tourTimer);
      if (i + 1 < TOUR.length) showTourStop(i + 1);
      else stopTour();
    };
    $("tour-stop").onclick = stopTour;
  }

  function startTourRun() {
    clearInterval(tourTimer);
    clearInterval(playTimer);
    showTourStop(0);
    tourTimer = setInterval(function () {
      if (tourIndex + 1 < TOUR.length) showTourStop(tourIndex + 1);
      else stopTour();
    }, 5200);
  }

  function stopTour() {
    clearInterval(tourTimer);
    tourTimer = null;
    var card = $("tour-card");
    if (card) card.hidden = true;
  }

  function showPlaybackStep(i) {
    playIndex = i;
    var step = PLAYBACK[i];
    if (!step) {
      playbackReason("Playback step " + (i + 1) + " is undefined.");
      stopPlayback(false);
      return;
    }
    var missing = step.nodes.filter(function (id) {
      return !nodeById(id);
    });
    if (missing.length) {
      playbackReason("Required institutional nodes are missing: " + missing.join(", "));
      stopPlayback(false);
      return;
    }
    ui.setHighlights(step.nodes);
    renderTree();
    syncTimelineToNodes(step.nodes);
    var focus = step.nodes[step.nodes.length - 1];
    if (focus) ui.selectNode(focus, true);
    var card = $("playback-card");
    card.hidden = false;
    card.classList.remove("playback-error");
    $("tour-card").hidden = true;
    card.innerHTML =
      "<div class='tour-progress'>STEP " +
      String(i + 1).padStart(2, "0") +
      " · " +
      (i + 1) +
      " / " +
      PLAYBACK.length +
      "</div>" +
      "<h3>" +
      ui.escapeHtml(step.label) +
      "</h3>" +
      "<p><strong>WHO.</strong> " +
      ui.escapeHtml(step.who) +
      "</p>" +
      "<p><strong>WHAT.</strong> " +
      ui.escapeHtml(step.what) +
      "</p>" +
      "<p><strong>WHY.</strong> " +
      ui.escapeHtml(step.why) +
      "</p>" +
      "<p><strong>Institutional Responsibility.</strong> " +
      ui.escapeHtml(step.responsibility) +
      "</p>" +
      "<p><strong>Artifacts affected.</strong> " +
      ui.escapeHtml(step.artifacts.join(" · ")) +
      "</p>" +
      '<div class="playback-progress"><span style="width:' +
      Math.round(((i + 1) / PLAYBACK.length) * 100) +
      '%"></span></div>' +
      "<button type='button' id='play-stop'>Stop</button>";
    $("play-stop").onclick = function () {
      stopPlayback(true);
    };
  }

  function startPlayback() {
    try {
      clearInterval(playTimer);
      clearInterval(tourTimer);
      stopTour();
      if (!ui || !ui.getState || !ui.getState().data) {
        playbackReason("The institutional model has not finished loading.");
        return;
      }
      var required = PLAYBACK.reduce(function (all, step) {
        return all.concat(step.nodes);
      }, []);
      var missing = required.filter(function (id, index) {
        return required.indexOf(id) === index && !nodeById(id);
      });
      if (missing.length) {
        playbackReason("The journey cannot start because these nodes are unavailable: " + missing.join(", "));
        return;
      }
      var playBtn = $("btn-play-mission");
      if (playBtn) {
        playBtn.textContent = "Playing…";
        playBtn.setAttribute("aria-pressed", "true");
      }
      showPlaybackStep(0);
      playTimer = setInterval(function () {
        if (playIndex + 1 < PLAYBACK.length) showPlaybackStep(playIndex + 1);
        else stopPlayback(true);
      }, PLAYBACK_DELAY_MS);
    } catch (err) {
      playbackReason(err && err.message ? err.message : String(err));
    }
  }

  function stopPlayback(clearCard) {
    clearInterval(playTimer);
    playTimer = null;
    var playBtn = $("btn-play-mission");
    if (playBtn) {
      playBtn.textContent = "Play";
      playBtn.setAttribute("aria-pressed", "false");
    }
    var card = $("playback-card");
    if (card && clearCard !== false) card.hidden = true;
  }

  function runInstitutionalTests() {
    var st = ui.getState();
    var ids = Object.create(null);
    ((st.data && st.data.nodes) || []).forEach(function (n) {
      ids[n.id] = n;
    });
    var rels = ((st.relationships && st.relationships.relations) || (st.data && st.data.relations) || []);
    function pathExists(chain) {
      for (var i = 0; i < chain.length - 1; i++) {
        var a = chain[i];
        var b = chain[i + 1];
        if (!ids[a] || !ids[b]) return false;
        var ok = rels.some(function (r) {
          return (r.from === a && r.to === b) || (r.from === b && r.to === a);
        });
        if (!ok) return false;
      }
      return true;
    }
    var tests = [
      { name: "Founder Journey", pass: pathExists(["founder_login", "anny", "mission"]) },
      { name: "Citizen Journey", pass: pathExists(["citizen", "support", "child_citizen"]) },
      { name: "Evidence Flow", pass: pathExists(["workers", "evidence"]) || pathExists(["mission", "evidence"]) },
      { name: "Validation Flow", pass: pathExists(["evidence", "harlemm"]) || pathExists(["certification", "evidence"]) },
      { name: "Runtime Flow", pass: pathExists(["runtime", "commit_mutation", "institutional_state"]) },
      { name: "Support Flow", pass: pathExists(["citizen", "support"]) },
    ];
    var el = $("tests-panel");
    if (!el) return tests;
    el.innerHTML = tests
      .map(function (t) {
        return (
          '<div class="health-row test-row ' +
          (t.pass ? "pass" : "fail") +
          '"><span>' +
          ui.escapeHtml(t.name) +
          "</span><b>" +
          (t.pass ? "PASS" : "FAIL") +
          "</b></div>"
        );
      })
      .join("");
    window.__ATLAS_TEST_REPORT__ = {
      generated_at: new Date().toISOString(),
      results: tests,
      all_pass: tests.every(function (t) {
        return t.pass;
      }),
    };
    return tests;
  }

  function bindSearch() {
    var input = $("inst-search");
    var box = $("search-results");
    if (!input || !box) return;
    input.addEventListener("input", function () {
      var q = (input.value || "").trim().toLowerCase();
      if (!q) {
        box.hidden = true;
        box.innerHTML = "";
        return;
      }
      var st = ui.getState();
      var nodes = (st.data && st.data.nodes) || [];
      var rels = (st.relationships && st.relationships.relations) || (st.data && st.data.relations) || [];
      var hits = [];
      nodes.forEach(function (n) {
        var blob = [
          n.id,
          n.label,
          n.type,
          n.description,
          n.owner,
          n.artifact,
          n.source,
          (n.related_policies || []).join(" "),
          (n.related_decisions || []).join(" "),
          (n.related_evidence || []).join(" "),
          n.knowledge_state,
        ]
          .join(" ")
          .toLowerCase();
        var kind = "Node";
        if (n.id === "mission" || n.type === "work_unit") kind = "Mission";
        else if (n.type === "worker" || n.id === "workers") kind = "Worker";
        else if (n.id === "evidence" || (n.related_evidence && n.related_evidence.length)) kind = "Evidence";
        else if (n.type === "capability") kind = "Capability";
        else if (n.id === "governance" || n.id === "certification") kind = "Policy";
        else if (n.related_decisions && n.related_decisions.length) kind = "Decision";
        else if (n.artifact || n.source) kind = "Artifact";
        if (blob.indexOf(q) !== -1) hits.push({ kind: kind, id: n.id, label: n.label });
      });
      rels.forEach(function (r) {
        var blob = (r.from + " " + r.to + " " + r.type).toLowerCase();
        if (blob.indexOf(q) !== -1) {
          hits.push({ kind: "Relationship", id: r.from, label: r.from + " " + r.type + " " + r.to });
        }
      });
      hits = hits.slice(0, 24);
      box.hidden = hits.length === 0;
      box.innerHTML = hits
        .map(function (h) {
          return (
            '<button type="button" class="search-hit" data-id="' +
            ui.escapeHtml(h.id) +
            '"><span class="kind">' +
            ui.escapeHtml(h.kind) +
            "</span> " +
            ui.escapeHtml(h.label) +
            "</button>"
          );
        })
        .join("");
      box.querySelectorAll(".search-hit").forEach(function (btn) {
        btn.onclick = function () {
          ui.selectNode(btn.getAttribute("data-id"), true);
          box.hidden = true;
        };
      });
    });
  }

  function bindTimeline() {
    var copy = $("timeline-copy");
    document.querySelectorAll(".tl-btn").forEach(function (btn) {
      btn.onclick = function () {
        document.querySelectorAll(".tl-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        var era = btn.getAttribute("data-era");
        var t = TIMELINE[era];
        if (!t) return;
        copy.textContent = t.copy;
        ui.setHighlights(t.nodes);
        var focus = t.nodes.find(function (id) {
          return !!nodeById(id);
        });
        if (focus) ui.selectNode(focus, true);
      };
    });
    if (copy) copy.textContent = TIMELINE.present.copy;
  }

  function requestPlayback() {
    if (!ui) {
      playbackReason("The Atlas model is still loading. Try again when status is READY.");
      return;
    }
    startPlayback();
  }

  window.AtlasPublicOnReady = function (atlasUi) {
    ui = atlasUi;
    bindSearch();
    bindTimeline();
    runInstitutionalTests();
    renderTree();
    var tourBtn = $("btn-start-tour");
    var playBtn = $("btn-play-mission");
    if (tourBtn) tourBtn.onclick = startTourRun;
    if (playBtn) playBtn.onclick = requestPlayback;
    var graphBtn = $("btn-graph-view");
    var treeBtn = $("btn-tree-view");
    if (graphBtn) graphBtn.onclick = function () {
      setView("graph");
    };
    if (treeBtn) treeBtn.onclick = function () {
      setView("tree");
    };
  };

  window.AtlasPublicSelectionChanged = function () {
    renderTree();
  };

  window.AtlasPublicProjectionChanged = function () {
    renderTree();
  };

  var earlyPlay = $("btn-play-mission");
  if (earlyPlay) earlyPlay.onclick = requestPlayback;

  // Deep-link: ?tour=1 opens the institutional tour once the model is loaded.
  var params = new URLSearchParams(window.location.search);
  if (params.get("tour") === "1") enterAtlas(true);
})();
