/**
 * CONRRAD Atlas UI — institutional digital twin.
 * Consumes ONLY institutional model files. Never owns institutional knowledge.
 * Atlas is a standalone product: it has no knowledge of any consumer.
 */
(function () {
  "use strict";

  var MODEL = {
    atlas: "atlas.json",
    scenes: "institutional_scenes.yaml",
    relationships: "institutional_relationships.yaml",
    knowledge: "knowledge_state.yaml",
    perspectives: "perspectives.json",
    status: "publication_status.json",
  };

  var state = {
    data: null,
    scenes: null,
    relationships: null,
    knowledge: null,
    perspectives: null,
    publication: null,
    nodes: [],
    links: [],
    selectedId: null,
    collapsed: Object.create(null),
    simulation: null,
    zoom: null,
    sceneId: null,
    perspectiveId: null,
    highlighted: Object.create(null),
  };

  var svg = d3.select("#graph");
  var width = 0;
  var height = 0;
  var gRoot = svg.append("g").attr("class", "viewport");
  var gLinks = gRoot.append("g").attr("class", "links");
  var gNodes = gRoot.append("g").attr("class", "nodes");

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setAtlasStatus(code, detail) {
    var el = document.getElementById("atlas-status");
    el.className = "atlas-status STATUS-" + code;
    el.textContent = "ATLAS STATUS · " + code + (detail ? " · " + detail : "");
  }

  function knowledgeMeta(ks) {
    var states = (state.knowledge && state.knowledge.states) || [];
    if (ks === "PENDING") ks = "UNMAPPED";
    if (ks === "UNKNOWN") ks = "DISCOVERY_REQUIRED";
    return (
      states.find(function (s) {
        return s.id === ks;
      }) || { icon: "·", color: "#888", tooltip: ks || "", label: ks || "" }
    );
  }

  function relationMeta(type) {
    var rts = (state.relationships && state.relationships.relation_types) || [];
    return (
      rts.find(function (r) {
        return r.id === type;
      }) || { label: type, color: "#888" }
    );
  }

  function currentPerspective() {
    var list = (state.perspectives && state.perspectives.perspectives) || [];
    return (
      list.find(function (p) {
        return p.id === state.perspectiveId;
      }) ||
      list[0] ||
      null
    );
  }

  function currentScene() {
    var scenes = (state.scenes && state.scenes.scenes) || [];
    return (
      scenes.find(function (s) {
        return s.id === state.sceneId;
      }) || null
    );
  }

  function perspectiveAllowsNode(n) {
    var p = currentPerspective();
    if (!p) return true;
    if (p.hide_node_ids && p.hide_node_ids.indexOf(n.id) !== -1) return false;
    if (n.id === "unmapped" && p.show_unmapped === false) return false;
    if (p.show_domains && p.show_domains.indexOf("*") === -1) {
      if (n.domain && p.show_domains.indexOf(n.domain) === -1 && n.id !== "conrrad" && n.id !== "unmapped") return false;
    }
    return true;
  }

  function perspectiveAllowsRelation(type) {
    var p = currentPerspective();
    if (!p || !p.show_relation_types || p.show_relation_types.indexOf("*") !== -1) return true;
    return p.show_relation_types.indexOf(type) !== -1;
  }

  function renderHeader() {
    var pub = state.publication || {};
    var h = (state.data && state.data.institutional_health) || {};
    var el = document.getElementById("inst-counters");
    var items = [
      ["Build Version", pub.build_version || "—"],
      ["Last Deploy", pub.last_deploy || "—"],
      ["Knowledge Coverage", (pub.knowledge_coverage != null ? pub.knowledge_coverage : h.knowledge_coverage) + "%"],
      ["Nodes", pub.nodes != null ? pub.nodes : h.nodes],
      ["Relations", pub.relations != null ? pub.relations : h.relations],
      ["Scenes", pub.scenes != null ? pub.scenes : ((state.scenes && state.scenes.scenes) || []).length],
      ["Perspectives", pub.perspectives != null ? pub.perspectives : ((state.perspectives && state.perspectives.perspectives) || []).length],
      ["Domains", pub.domains != null ? pub.domains : h.domains],
      ["Última actualización UTC", pub.last_updated_utc || "—"],
    ];
    el.innerHTML = items
      .map(function (it) {
        return (
          '<div class="health-chip"><span class="k">' +
          escapeHtml(it[0]) +
          "</span><b>" +
          escapeHtml(String(it[1] != null ? it[1] : "—")) +
          "</b></div>"
        );
      })
      .join("");

    renderHealthPanel(h);
    renderMetricsPanel(h);
    renderMaturityPanel((state.data && state.data.institutional_maturity) || h.institutional_maturity);

    var ks = document.getElementById("knowledge-legend");
    var counts = (h.knowledge_state_counts) || {};
    ks.innerHTML = ((state.knowledge && state.knowledge.states) || [])
      .map(function (s) {
        return (
          "<li title='" +
          escapeHtml(s.tooltip) +
          "'><span class='ks-icon' style='color:" +
          escapeHtml(s.color) +
          "'>" +
          escapeHtml(s.icon) +
          "</span> " +
          escapeHtml(s.label) +
          " <b>" +
          (counts[s.id] || 0) +
          "</b></li>"
        );
      })
      .join("");

    var rl = document.getElementById("relation-legend");
    rl.innerHTML = ((state.relationships && state.relationships.relation_types) || [])
      .map(function (r) {
        return (
          "<li><span class='swatch' style='background:" +
          escapeHtml(r.color) +
          "'></span> " +
          escapeHtml(r.label) +
          "</li>"
        );
      })
      .join("");

    setAtlasStatus(pub.atlas_status || "READY");
  }

  function renderHealthPanel(h) {
    var el = document.getElementById("health-panel");
    if (!el) return;
    h = h || {};
    var nodesN = h.nodes || ((state.data && state.data.nodes) || []).length || 1;
    var relsN = h.relations || ((state.data && state.data.relations) || []).length || 0;
    var density = Math.round((relsN / Math.max(nodesN, 1)) * 100) / 100;
    var counts = h.knowledge_state_counts || {};
    var rows = [
      ["Coverage", (h.knowledge_coverage != null ? h.knowledge_coverage : "—") + "%"],
      ["Integrity", (h.institutional_integrity != null ? h.institutional_integrity : "—") + "%"],
      ["Mapped (KNOWN)", counts.KNOWN != null ? counts.KNOWN : h.known],
      ["Unmapped", h.unmapped_count != null ? h.unmapped_count : h.unmapped],
      ["Discovery Required", h.discovery_required_count != null ? h.discovery_required_count : h.discovery_required],
      ["Institutional Maturity", (((state.data && state.data.institutional_maturity) || {}).overall || "—") + "%"],
      ["Graph Density", density + " rel/node"],
    ];
    el.innerHTML = rows
      .map(function (r) {
        return (
          '<div class="health-row"><span>' +
          escapeHtml(r[0]) +
          "</span><b>" +
          escapeHtml(String(r[1] != null ? r[1] : "—")) +
          "</b></div>"
        );
      })
      .join("");
  }

  function renderMetricsPanel(h) {
    var el = document.getElementById("metrics-panel");
    if (!el) return;
    h = h || {};
    var nodes = (state.data && state.data.nodes) || [];
    var policies = nodes.filter(function (n) {
      return (n.related_policies && n.related_policies.length) || n.type === "policy" || n.id === "governance" || n.id === "certification";
    }).length;
    var capabilities = nodes.filter(function (n) {
      return n.type === "capability" || n.id === "support" || n.id === "atlas_publication";
    }).length;
    var workers = nodes.filter(function (n) {
      return n.type === "worker" || n.id === "workers";
    }).length;
    var runtimeActors = nodes.filter(function (n) {
      return n.domain === "domain.runtime" || n.id === "runtime" || n.id === "commit_mutation";
    }).length;
    var evidenceN = nodes.filter(function (n) {
      return n.id === "evidence" || (n.related_evidence && n.related_evidence.length);
    }).length;
    var rows = [
      ["Nodes", h.nodes],
      ["Relations", h.relations],
      ["Policies", policies],
      ["Capabilities", capabilities],
      ["Evidence", evidenceN],
      ["Workers", workers],
      ["Runtime Actors", runtimeActors],
      ["Institutional Coverage", (h.knowledge_coverage != null ? h.knowledge_coverage : "—") + "%"],
    ];
    el.innerHTML = rows
      .map(function (r) {
        return (
          '<div class="health-row"><span>' +
          escapeHtml(r[0]) +
          "</span><b>" +
          escapeHtml(String(r[1] != null ? r[1] : "—")) +
          "</b></div>"
        );
      })
      .join("");
  }

  function renderMaturityPanel(mat) {
    var el = document.getElementById("maturity-panel");
    if (!el) return;
    mat = mat || {};
    var cats = mat.categories || {};
    var keys = Object.keys(cats);
    if (!keys.length) {
      el.innerHTML = "<p class='mute'>Maturity pending regeneration</p>";
      return;
    }
    el.innerHTML =
      '<div class="health-row overall"><span>Overall</span><b>' +
      escapeHtml(String(mat.overall != null ? mat.overall : "—")) +
      "%</b></div>" +
      keys
        .map(function (k) {
          var c = cats[k] || {};
          return (
            '<div class="health-row"><span>' +
            escapeHtml(k) +
            "</span><b>" +
            escapeHtml(String(c.score != null ? c.score : "—")) +
            "%</b></div>"
          );
        })
        .join("");
  }

  var PUBLIC_PERSPECTIVES = ["Founder", "Runtime", "Citizen", "Auditor", "Infrastructure", "Developer"];

  function setupSelectors() {
    var sceneSel = document.getElementById("scene-select");
    var perspSel = document.getElementById("perspective-select");
    var scenes = (state.scenes && state.scenes.scenes) || [];
    var perspectives = (state.perspectives && state.perspectives.perspectives) || [];
    var publicPerspectives = perspectives.filter(function (p) {
      return PUBLIC_PERSPECTIVES.indexOf(p.id) !== -1;
    });
    if (!publicPerspectives.length) publicPerspectives = perspectives;

    sceneSel.innerHTML =
      '<option value="">— none —</option>' +
      scenes
        .map(function (s) {
          return '<option value="' + escapeHtml(s.id) + '">' + escapeHtml(s.label || s.id) + "</option>";
        })
        .join("");
    perspSel.innerHTML = publicPerspectives
      .map(function (p) {
        return '<option value="' + escapeHtml(p.id) + '">' + escapeHtml(p.label) + "</option>";
      })
      .join("");

    state.perspectiveId =
      (state.perspectives && state.perspectives.default_perspective) ||
      (publicPerspectives[0] && publicPerspectives[0].id);
    if (PUBLIC_PERSPECTIVES.indexOf(state.perspectiveId) === -1 && publicPerspectives[0]) {
      state.perspectiveId = publicPerspectives[0].id;
    }
    perspSel.value = state.perspectiveId;

    var journey = scenes.find(function (s) {
      return s.id === "Scene-Journey";
    });
    if (journey) {
      state.sceneId = journey.id;
      sceneSel.value = journey.id;
      applySceneHighlight();
    }

    sceneSel.onchange = function () {
      state.sceneId = sceneSel.value || null;
      applySceneHighlight();
      restartSimulation();
      renderDomainTree();
    };
    perspSel.onchange = function () {
      state.perspectiveId = perspSel.value;
      restartSimulation();
      renderDomainTree();
      if (typeof window.AtlasPublicProjectionChanged === "function") {
        window.AtlasPublicProjectionChanged();
      }
    };
  }

  function applySceneHighlight() {
    state.highlighted = Object.create(null);
    var scene = currentScene();
    if (!scene) return;
    (scene.node_ids || []).forEach(function (id) {
      state.highlighted[id] = true;
    });
  }

  function visibleNodeIds() {
    var hiddenCollapse = Object.create(null);
    state.data.nodes.forEach(function (n) {
      var p = n.parent;
      while (p) {
        if (state.collapsed[p]) {
          hiddenCollapse[n.id] = true;
          break;
        }
        var parentNode = state.data.nodes.find(function (x) {
          return x.id === p;
        });
        p = parentNode ? parentNode.parent : null;
      }
    });
    return state.data.nodes
      .filter(function (n) {
        return !hiddenCollapse[n.id] && perspectiveAllowsNode(n);
      })
      .map(function (n) {
        return n.id;
      });
  }

  function buildGraphModel() {
    var visible = Object.create(null);
    visibleNodeIds().forEach(function (id) {
      visible[id] = true;
    });
    state.nodes = state.data.nodes
      .filter(function (n) {
        return visible[n.id];
      })
      .map(function (n) {
        return Object.assign({}, n);
      });
    var edges = (state.relationships && state.relationships.relations) || state.data.relations || [];
    state.links = edges
      .filter(function (r) {
        return visible[r.from] && visible[r.to] && perspectiveAllowsRelation(r.type);
      })
      .map(function (r) {
        return { source: r.from, target: r.to, type: r.type };
      });
  }

  function childrenOf(id) {
    return state.data.nodes.filter(function (n) {
      return n.parent === id;
    });
  }

  function renderDomainTree() {
    var roots = state.data.nodes.filter(function (n) {
      return !n.parent && perspectiveAllowsNode(n);
    });
    var ul = document.getElementById("domain-tree");
    ul.innerHTML = "";
    function addBranch(parentEl, node) {
      if (!perspectiveAllowsNode(node)) return;
      var kids = childrenOf(node.id);
      var meta = knowledgeMeta(node.knowledge_state);
      var li = document.createElement("li");
      if (!kids.length) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className =
          "node-link" +
          (state.selectedId === node.id ? " selected" : "") +
          (state.highlighted[node.id] ? " scene-hit" : "");
        btn.innerHTML =
          "<span style='color:" +
          meta.color +
          "' title='" +
          escapeHtml(meta.tooltip) +
          "'>" +
          escapeHtml(meta.icon) +
          "</span> " +
          escapeHtml(node.label);
        btn.onclick = function () {
          selectNode(node.id, true);
        };
        li.appendChild(btn);
        parentEl.appendChild(li);
        return;
      }
      var details = document.createElement("details");
      details.open = !state.collapsed[node.id];
      var summary = document.createElement("summary");
      summary.innerHTML =
        "<span style='color:" + meta.color + "'>" + escapeHtml(meta.icon) + "</span> " + escapeHtml(node.label);
      details.appendChild(summary);
      var toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "node-link";
      toggle.textContent = "↗ " + node.id;
      toggle.onclick = function (e) {
        e.preventDefault();
        selectNode(node.id, true);
      };
      details.appendChild(toggle);
      var childUl = document.createElement("ul");
      childUl.className = "domain-tree";
      kids.forEach(function (k) {
        addBranch(childUl, k);
      });
      details.appendChild(childUl);
      details.addEventListener("toggle", function () {
        // Connecting a <details> fires a synthetic toggle. Rebuilding the tree
        // from it would recreate the element and fire another one forever, so
        // only a real change of collapse state may trigger a re-render.
        var collapsed = !details.open;
        if (!!state.collapsed[node.id] === collapsed) return;
        state.collapsed[node.id] = collapsed;
        restartSimulation();
        renderDomainTree();
      });
      li.appendChild(details);
      parentEl.appendChild(li);
    }
    roots.forEach(function (r) {
      addBranch(ul, r);
    });
  }

  function listOrDash(arr) {
    if (!arr || !arr.length) return "—";
    return (
      "<ul class='rel-list'>" +
      arr
        .map(function (x) {
          return "<li>" + escapeHtml(String(x)) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function renderInspector(node) {
    var el = document.getElementById("inspector");
    if (!node) {
      el.className = "inspector empty";
      el.textContent = "Selecciona un nodo";
      return;
    }
    var meta = knowledgeMeta(node.knowledge_state);
    var edges = (state.relationships && state.relationships.relations) || state.data.relations || [];
    var incoming = edges.filter(function (r) {
      return r.to === node.id;
    });
    var outgoing = edges.filter(function (r) {
      return r.from === node.id;
    });
    function relList(rels, dir) {
      if (!rels.length) return "<li>none</li>";
      return rels
        .map(function (r) {
          var other = dir === "in" ? r.from : r.to;
          var rm = relationMeta(r.type);
          return (
            "<li><span class='swatch' style='background:" +
            escapeHtml(rm.color) +
            "'></span><code>" +
            escapeHtml(rm.label) +
            "</code> " +
            (dir === "in" ? "←" : "→") +
            " <button type='button' data-jump='" +
            escapeHtml(other) +
            "'>" +
            escapeHtml(other) +
            "</button></li>"
          );
        })
        .join("");
    }
    el.className = "inspector";
    el.innerHTML =
      "<dl>" +
      "<dt>Identity</dt><dd class='path'>" +
      escapeHtml(node.id) +
      " · #" +
      escapeHtml(String(node.atlas_index)) +
      " · " +
      escapeHtml(node.label) +
      "</dd>" +
      "<dt>Description</dt><dd>" +
      escapeHtml(node.description) +
      "</dd>" +
      "<dt>Purpose</dt><dd>" +
      escapeHtml(node.purpose || node.description || "—") +
      "</dd>" +
      "<dt>Owner</dt><dd>" +
      escapeHtml(node.owner || "—") +
      "</dd>" +
      "<dt>Institutional Status</dt><dd>" +
      escapeHtml(node.status || "—") +
      " · " +
      escapeHtml(node.institutional_type || node.type || "—") +
      "</dd>" +
      "<dt>Knowledge State</dt><dd title='" +
      escapeHtml(meta.tooltip) +
      "'><span style='color:" +
      meta.color +
      "'>" +
      escapeHtml(meta.icon) +
      "</span> " +
      escapeHtml(node.knowledge_state) +
      (node.gap_class ? " · " + escapeHtml(node.gap_class) : "") +
      "</dd>" +
      "<dt>Incoming Relations</dt><dd><ul class='rel-list'>" +
      relList(incoming, "in") +
      "</ul></dd>" +
      "<dt>Outgoing Relations</dt><dd><ul class='rel-list'>" +
      relList(outgoing, "out") +
      "</ul></dd>" +
      "<dt>Artifacts</dt><dd class='path'>" +
      escapeHtml(node.source_artifact || node.artifact || node.source || "—") +
      "</dd>" +
      "<dt>Institutional Responsibilities</dt><dd>" +
      listOrDash(
        node.institutional_responsibilities ||
          node.related_policies ||
          (node.owner ? ["Owner: " + node.owner] : [])
      ) +
      "</dd>" +
      "<dt>Related Decisions</dt><dd>" +
      listOrDash(node.related_decisions || (node.decision ? [node.decision] : [])) +
      "</dd>" +
      "<dt>Related Policies</dt><dd>" +
      listOrDash(node.related_policies || (node.rfc ? [node.rfc] : [])) +
      "</dd>" +
      "<dt>Related Evidence</dt><dd>" +
      listOrDash(node.related_evidence || []) +
      "</dd>" +
      "</dl>";
    el.querySelectorAll("[data-jump]").forEach(function (btn) {
      btn.onclick = function () {
        selectNode(btn.getAttribute("data-jump"), true);
      };
    });
  }

  function resize() {
    var panel = document.querySelector(".canvas-panel");
    width = panel.clientWidth;
    height = panel.clientHeight;
    svg.attr("viewBox", [0, 0, width, height]);
  }

  function restartSimulation() {
    buildGraphModel();
    resize();
    var hasHighlights = Object.keys(state.highlighted).length > 0;
    var link = gLinks.selectAll("path.link").data(state.links, function (d) {
      return (d.source.id || d.source) + "->" + (d.target.id || d.target) + ":" + d.type;
    });
    link.exit().remove();
    link = link.enter().append("path").attr("class", "link").merge(link);
    link
      .attr("stroke", function (d) {
        return relationMeta(d.type).color;
      })
      .attr("stroke-width", function (d) {
        var s = d.source.id || d.source;
        var t = d.target.id || d.target;
        return hasHighlights && state.highlighted[s] && state.highlighted[t] ? 4 : hasHighlights ? 1 : 2;
      })
      .attr("stroke-opacity", function (d) {
        var s = d.source.id || d.source;
        var t = d.target.id || d.target;
        return !hasHighlights ? 0.85 : state.highlighted[s] && state.highlighted[t] ? 1 : 0.08;
      })
      .classed("active-relation", function (d) {
        var s = d.source.id || d.source;
        var t = d.target.id || d.target;
        return !!(hasHighlights && state.highlighted[s] && state.highlighted[t]);
      });

    var label = gLinks.selectAll("text.link-label").data(state.links, function (d) {
      return (d.source.id || d.source) + "->" + (d.target.id || d.target) + ":" + d.type;
    });
    label.exit().remove();
    label = label.enter().append("text").attr("class", "link-label").merge(label);
    label.text(function (d) {
      return relationMeta(d.type).label;
    });

    var node = gNodes.selectAll("g.node").data(state.nodes, function (d) {
      return d.id;
    });
    node.exit().remove();
    var nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node")
      .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended))
      .on("click", function (event, d) {
        event.stopPropagation();
        selectNode(d.id, false);
      });
    nodeEnter.append("circle").attr("class", "node-circle").attr("r", 14);
    nodeEnter.append("text").attr("class", "ks-badge").attr("dy", -18).attr("text-anchor", "middle");
    nodeEnter.append("text").attr("class", "node-label").attr("dy", 28);
    node = nodeEnter.merge(node);
    node
      .classed("active-node", function (d) {
        return !!(hasHighlights && state.highlighted[d.id]);
      })
      .classed("inactive-node", function (d) {
        return !!(hasHighlights && !state.highlighted[d.id]);
      })
      .classed("current-node", function (d) {
        return d.id === state.selectedId;
      });
    node
      .select("circle")
      .attr("r", function (d) {
        return d.id === "conrrad" ? 22 : d.id === "unmapped" ? 18 : 14;
      })
      .attr("fill", function (d) {
        return knowledgeMeta(d.knowledge_state).color;
      })
      .classed("selected", function (d) {
        return d.id === state.selectedId;
      })
      .classed("scene-node", function (d) {
        return !!state.highlighted[d.id];
      })
      .attr("opacity", function (d) {
        if (!hasHighlights) return 1;
        return state.highlighted[d.id] ? 1 : 0.12;
      });
    node.select(".ks-badge").text(function (d) {
      return knowledgeMeta(d.knowledge_state).icon;
    });
    node.select(".node-label").text(function (d) {
      return d.label;
    });

    if (state.simulation) state.simulation.stop();
    state.simulation = d3
      .forceSimulation(state.nodes)
      .force(
        "link",
        d3
          .forceLink(state.links)
          .id(function (d) {
            return d.id;
          })
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-420))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(36))
      .on("tick", function () {
        link.attr("d", function (d) {
          return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
        });
        label
          .attr("x", function (d) {
            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", function (d) {
            return (d.source.y + d.target.y) / 2;
          });
        node.attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      });
  }

  function dragstarted(event, d) {
    if (!event.active) state.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) state.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function centerOnNode(id) {
    var n = state.nodes.find(function (x) {
      return x.id === id;
    });
    if (!n || n.x === undefined) return;
    var scale = d3.zoomTransform(svg.node()).k;
    svg
      .transition()
      .duration(450)
      .call(
        state.zoom.transform,
        d3.zoomIdentity.translate(width / 2 - n.x * scale, height / 2 - n.y * scale).scale(scale)
      );
  }

  function selectNode(id, center) {
    var node = state.data.nodes.find(function (n) {
      return n.id === id;
    });
    if (!node) return;
    var p = node.parent;
    while (p) {
      if (state.collapsed[p]) state.collapsed[p] = false;
      var parentNode = state.data.nodes.find(function (x) {
        return x.id === p;
      });
      p = parentNode ? parentNode.parent : null;
    }
    state.selectedId = id;
    restartSimulation();
    renderDomainTree();
    renderInspector(node);
    if (typeof window.AtlasPublicSelectionChanged === "function") {
      window.AtlasPublicSelectionChanged(id);
    }
    if (center)
      setTimeout(function () {
        centerOnNode(id);
      }, 160);
  }

  function setupZoom() {
    state.zoom = d3
      .zoom()
      .scaleExtent([0.35, 3.5])
      .on("zoom", function (event) {
        gRoot.attr("transform", event.transform);
      });
    svg.call(state.zoom);
  }

  function fetchText(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("Missing model file: " + url + " (" + r.status + ")");
      return r.text();
    });
  }

  function fetchJson(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("Missing model file: " + url + " (" + r.status + ")");
      return r.json();
    });
  }

  function loadModels() {
    setAtlasStatus("BUILDING");
    return Promise.all([
      fetchJson(MODEL.atlas),
      fetchText(MODEL.scenes).then(function (t) {
        return jsyaml.load(t);
      }),
      fetchText(MODEL.relationships).then(function (t) {
        return jsyaml.load(t);
      }),
      fetchText(MODEL.knowledge).then(function (t) {
        return jsyaml.load(t);
      }),
      fetchJson(MODEL.perspectives),
      fetchJson(MODEL.status).catch(function () {
        return { atlas_status: "OUT_OF_SYNC", last_updated_utc: new Date().toISOString() };
      }),
    ]).then(function (parts) {
      state.data = parts[0];
      state.scenes = parts[1];
      state.relationships = parts[2];
      state.knowledge = parts[3];
      state.perspectives = parts[4];
      state.publication = parts[5];

      // wire lexicon for validator compatibility
      state.data.relation_types = { relation_types: state.relationships.relation_types || [] };
      state.data.lexicon = state.data.lexicon || {};
      state.data.lexicon.relation_types = {};
      (state.relationships.relation_types || []).forEach(function (r) {
        state.data.lexicon.relation_types[r.id] = r;
      });
      state.data.lexicon.knowledge_states = {};
      (state.knowledge.states || []).forEach(function (s) {
        state.data.lexicon.knowledge_states[s.id] = s;
      });

      var result = window.AtlasValidator.validateAtlas(state.data);
      document.getElementById("validation-status").textContent = result.ok
        ? "VALID"
        : "INVALID · " + result.errors.length;
      if (!result.ok) {
        setAtlasStatus("ERROR", result.errors[0]);
        document.getElementById("load-error").hidden = false;
        document.getElementById("load-error").textContent = result.errors.join("\n");
        throw new Error("validation failed");
      }
      document.getElementById("load-error").hidden = true;
      renderHeader();
      setupSelectors();
      setupZoom();
      resize();
      restartSimulation();
      renderDomainTree();
      if (!state.selectedId) selectNode("conrrad", false);
      if ((state.publication && state.publication.atlas_status) === "ERROR") setAtlasStatus("ERROR");
      else if ((state.publication && state.publication.atlas_status) === "OUT_OF_SYNC") setAtlasStatus("OUT_OF_SYNC");
      else setAtlasStatus("READY");
      if (typeof window.AtlasPublicOnReady === "function") {
        window.AtlasPublicOnReady(window.AtlasUI);
      }
    });
  }

  window.AtlasUI = {
    getState: function () {
      return state;
    },
    selectNode: selectNode,
    centerOnNode: centerOnNode,
    restartSimulation: restartSimulation,
    applySceneHighlight: applySceneHighlight,
    setScene: function (id) {
      state.sceneId = id || null;
      var sceneSel = document.getElementById("scene-select");
      if (sceneSel) sceneSel.value = id || "";
      applySceneHighlight();
      restartSimulation();
      renderDomainTree();
    },
    setPerspective: function (id) {
      state.perspectiveId = id;
      var perspSel = document.getElementById("perspective-select");
      if (perspSel) perspSel.value = id;
      restartSimulation();
      renderDomainTree();
      if (typeof window.AtlasPublicProjectionChanged === "function") {
        window.AtlasPublicProjectionChanged();
      }
    },
    setHighlights: function (ids) {
      state.highlighted = Object.create(null);
      (ids || []).forEach(function (id) {
        state.highlighted[id] = true;
      });
      restartSimulation();
    },
    getVisibleNodes: function () {
      var visible = Object.create(null);
      visibleNodeIds().forEach(function (id) {
        visible[id] = true;
      });
      return state.data.nodes.filter(function (n) {
        return !!visible[n.id];
      });
    },
    perspectiveAllowsNode: perspectiveAllowsNode,
    escapeHtml: escapeHtml,
    knowledgeMeta: knowledgeMeta,
  };

  var btnRefresh = document.getElementById("btn-refresh");
  if (btnRefresh)
    btnRefresh.onclick = function () {
      loadModels().catch(function (err) {
        setAtlasStatus("ERROR", String(err.message || err));
      });
    };

  var btnDownload = document.getElementById("btn-download");
  if (btnDownload)
    btnDownload.onclick = function () {
      var blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "atlas.json";
      a.click();
      URL.revokeObjectURL(a.href);
    };

  window.addEventListener("resize", function () {
    resize();
    if (state.simulation) {
      state.simulation.force("center", d3.forceCenter(width / 2, height / 2));
      state.simulation.alpha(0.2).restart();
    }
  });

  // Defer model load until public shell decides (or load immediately if app already visible)
  var bootPromise = null;

  // Idempotent: consumers may call it without knowing whether Atlas already booted.
  window.AtlasBoot = function () {
    if (bootPromise) return bootPromise;
    bootPromise = loadModels().catch(function (err) {
      bootPromise = null;
      setAtlasStatus("ERROR", String(err.message || err));
      var le = document.getElementById("load-error");
      if (le) {
        le.hidden = false;
        le.textContent = String(err.message || err);
      }
      throw err;
    });
    return bootPromise;
  };

  window.AtlasBoot();
})();
