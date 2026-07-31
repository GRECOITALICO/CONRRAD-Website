/**
 * CONRRAD Demonstration interpreter (INT-ATLAS-023-A).
 *
 * This file contains NO scene, message, metric, ordering or animation content.
 * Everything is read from atlas_demo.yaml. The interpreter only knows how to
 * render the declared animation types and how to resolve declared bindings.
 *
 * Dependency direction is one-way: Demo -> Atlas. Atlas is consumed through its
 * public contract only (the published institutional model, and window.AtlasUI
 * when the demo is embedded inside an Atlas page). Atlas never learns about the
 * demonstration, and the institutional model is never mutated.
 */
(function () {
  "use strict";

  var SPEC_URL = "atlas_demo.yaml";
  // Atlas public contract: the published institutional model.
  var ATLAS_MODEL_URL = "/atlas/atlas.json";

  var spec = null;
  var health = {};
  var sceneIndex = 0;
  var paused = false;
  var timer = null;
  var sceneStartedAt = 0;
  var sceneRemaining = 0;
  var swapTimer = null;
  var revealTimer = null;
  var revealPending = null;
  var revealStartedAt = 0;
  var rafHandles = [];

  function $(id) {
    return document.getElementById(id);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function dig(root, path) {
    var parts = String(path || "").split(".");
    var cur = root;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  /** Resolve a declared binding: `counters.*`, `health.*`, `external_actors.*`. */
  function resolveBinding(path) {
    if (!path) return undefined;
    if (path.indexOf("health.") === 0) return dig(health, path.slice(7));
    return dig(spec, path);
  }

  function resolveValue(item) {
    if (!item) return "";
    if (item.value_from !== undefined) {
      var v = resolveBinding(item.value_from);
      return v === undefined || v === null ? "—" : v;
    }
    return item.value === undefined || item.value === null ? "—" : item.value;
  }

  function resolveList(container, keyDirect, keyFrom) {
    if (container && Array.isArray(container[keyDirect])) return container[keyDirect];
    if (container && container[keyFrom]) {
      var v = resolveBinding(container[keyFrom]);
      if (Array.isArray(v)) return v;
    }
    return [];
  }

  function scenes() {
    return (spec && spec.scenes) || [];
  }

  function currentScene() {
    return scenes()[sceneIndex] || null;
  }

  function clearTimers() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (swapTimer) {
      clearInterval(swapTimer);
      swapTimer = null;
    }
    if (revealTimer) {
      clearTimeout(revealTimer);
      revealTimer = null;
    }
    rafHandles.forEach(function (h) {
      cancelAnimationFrame(h);
    });
    rafHandles = [];
  }

  function countUp(el, target, unit, prefix) {
    var pre = prefix || "";
    var numeric = Number(target);
    if (!isFinite(numeric)) {
      el.textContent = pre + String(target) + (unit || "");
      return;
    }
    var duration = 900;
    var started = 0;
    function frame(ts) {
      if (!started) started = ts;
      var p = Math.min(1, (ts - started) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      var shown = numeric % 1 === 0 ? Math.round(numeric * eased) : (numeric * eased).toFixed(1);
      el.textContent = pre + String(shown) + (unit || "");
      if (p < 1) rafHandles.push(requestAnimationFrame(frame));
    }
    rafHandles.push(requestAnimationFrame(frame));
  }

  function renderMetrics(list, scene) {
    var box = $("demo-metrics");
    if (!box) return;
    var items = list || [];
    /* INT-CITIZEN-011-A: no duplicated metric widgets when canvas already shows counters */
    if (scene && scene.animation && scene.animation.warning_counters && scene.animation.warning_counters.length) {
      items = [];
    }
    items = items.slice(0, 3);
    if (!items.length) {
      box.innerHTML = "";
      box.hidden = true;
      return;
    }
    box.hidden = false;
    box.innerHTML = items
      .map(function (m, i) {
        return (
          '<div class="demo-metric ' +
          esc(m.tone || "neutral") +
          '" style="--i:' +
          i +
          '"><span class="demo-metric-label">' +
          esc(m.label) +
          '</span><b class="demo-metric-value" data-metric="' +
          i +
          '">0</b></div>'
        );
      })
      .join("");
    box.querySelectorAll("[data-metric]").forEach(function (el) {
      var m = items[Number(el.getAttribute("data-metric"))];
      countUp(el, resolveValue(m), m.unit || "", m.prefix || "");
    });
  }

  // ─── Declarative animation renderers ───────────────────────────────────────

  var RENDERERS = {
    /** Many entry points → one institutional entry authority. */
    converge: function (a) {
      var sources = resolveList(a, "sources", "sources_from");
      return (
        '<div class="anim anim-converge">' +
        '<div class="conv-sources">' +
        sources
          .map(function (s, i) {
            return (
              '<div class="conv-source" style="--i:' +
              i +
              ';--n:' +
              sources.length +
              '"><span>' +
              esc(s) +
              '</span><i class="conv-beam"></i></div>'
            );
          })
          .join("") +
        "</div>" +
        '<div class="conv-target">' +
        '<div class="conv-target-card"><strong>' +
        esc(a.target) +
        "</strong><small>" +
        esc(a.target_role || "") +
        "</small></div>" +
        "</div>" +
        "</div>"
      );
    },

    /** Providers rotate below; institutional identity above stays untouched. */
    provider_swap: function (a) {
      var providers = resolveList(a, "providers", "providers_from");
      var holds = a.stable_actor_holds || [];
      return (
        '<div class="anim anim-swap">' +
        '<div class="swap-stable">' +
        '<div class="swap-stable-head"><strong>' +
        esc(a.stable_actor) +
        '</strong><span class="swap-badge">UNCHANGED</span></div>' +
        '<ul class="swap-holds">' +
        holds
          .map(function (h) {
            return "<li>" + esc(h) + "</li>";
          })
          .join("") +
        "</ul>" +
        "</div>" +
        '<div class="swap-arrow" aria-hidden="true"></div>' +
        '<div class="swap-providers" id="swap-providers">' +
        providers
          .map(function (p, i) {
            return (
              '<div class="swap-provider' +
              (i === 0 ? " active" : "") +
              '" data-provider="' +
              i +
              '">' +
              esc(p) +
              "</div>"
            );
          })
          .join("") +
        "</div>" +
        "</div>"
      );
    },

    /** Governance bifurcation: institutional resolution vs inference required. */
    bifurcation: function (a) {
      var total = Number(a.requests || 20);
      var paths = a.paths || [];
      var shares = paths.map(function (p) {
        var v = p.share_from ? Number(resolveBinding(p.share_from)) : Number(p.share || 0);
        return isFinite(v) ? v : 0;
      });
      var sum = shares.reduce(function (x, y) {
        return x + y;
      }, 0) || 1;
      var dots = [];
      for (var i = 0; i < total; i++) {
        var acc = 0;
        var lane = 0;
        var pos = ((i + 0.5) / total) * sum;
        for (var j = 0; j < shares.length; j++) {
          acc += shares[j];
          if (pos <= acc) {
            lane = j;
            break;
          }
        }
        dots.push(
          '<i class="bif-dot lane-' +
            lane +
            '" style="--i:' +
            i +
            ';--n:' +
            total +
            '"></i>'
        );
      }
      return (
        '<div class="anim anim-bifurcation">' +
        '<div class="bif-stream">' +
        dots.join("") +
        '<span class="bif-stream-label">Requests</span>' +
        "</div>" +
        '<div class="bif-gate"><strong>' +
        esc(a.gate) +
        "</strong><small>" +
        esc(a.gate_role || "") +
        "</small></div>" +
        '<div class="bif-paths">' +
        paths
          .map(function (p, i) {
            var share = shares[i];
            return (
              '<div class="bif-path ' +
              esc(p.tone || "neutral") +
              '"><div class="bif-path-head"><span>' +
              esc(p.id) +
              "</span><b>" +
              esc(share) +
              "%</b></div><strong>" +
              esc(p.label) +
              "</strong><ul>" +
              (p.steps || [])
                .map(function (s, k) {
                  return '<li style="--k:' + k + '">' + esc(s) + "</li>";
                })
                .join("") +
              '</ul><div class="bif-bar"><span style="width:' +
              esc(share) +
              '%"></span></div></div>'
            );
          })
          .join("") +
        "</div>" +
        '<div class="bif-counters">' +
        (a.counters || [])
          .map(function (c) {
            return (
              '<div class="bif-counter ' +
              esc(c.tone || "neutral") +
              '"><span>' +
              esc(c.label) +
              '</span><b data-bif-counter="' +
              esc(c.value_from || "") +
              '">' +
              esc(resolveValue(c)) +
              esc(c.unit || "") +
              "</b></div>"
            );
          })
          .join("") +
        "</div>" +
        "</div>"
      );
    },

    /** Capability first: local specialists before cloud. */
    capability_routing: function (a) {
      var lanes = a.lanes || [];
      // A scene may declare a single need with its steps, or several worked
      // examples. Both shapes describe the same routing decision.
      var examples = a.examples
        ? a.examples
        : [{ need: a.need, steps: a.steps, tone: a.tone }];
      return (
        '<div class="anim anim-capability">' +
        examples
          .map(function (ex, x) {
            var steps = ex.steps
              ? ex.steps
              : [ex.capability, ex.search, ex.result, ex.execution, ex.return_to].filter(Boolean);
            return (
              '<div class="cap-example ' +
              esc(ex.tone || "neutral") +
              '" style="--x:' +
              x +
              '">' +
              '<div class="cap-need"><small>Need</small><strong>' +
              esc(ex.need) +
              "</strong></div>" +
              '<ol class="cap-steps">' +
              steps
                .map(function (s, i) {
                  return '<li style="--i:' + i + '">' + esc(s) + "</li>";
                })
                .join("") +
              "</ol></div>"
            );
          })
          .join("") +
        '<div class="cap-lanes">' +
        lanes
          .map(function (l, i) {
            var share = l.share_from ? resolveBinding(l.share_from) : l.share;
            return (
              '<div class="cap-lane ' +
              esc(l.tone || "neutral") +
              '" style="--i:' +
              i +
              '"><div class="cap-lane-head"><strong>' +
              esc(l.label) +
              "</strong><b>" +
              esc(share === undefined ? "" : share) +
              "</b></div><span>" +
              esc(l.decision) +
              "</span></div>"
            );
          })
          .join("") +
        "</div>" +
        "</div>"
      );
    },

    /** The inference engine as a small bounded service. */
    service_call: function (a) {
      var svc = a.service_from ? resolveBinding(a.service_from) : a.service || {};
      return (
        '<div class="anim anim-service">' +
        '<div class="svc-in"><small>Input</small><strong>' +
        esc(a.input) +
        "</strong></div>" +
        '<div class="svc-box" data-scale="' +
        esc(svc.scale || "small") +
        '"><span class="svc-role">' +
        esc(svc.role || "service") +
        '</span><strong class="svc-label">' +
        esc(svc.label || "Inference Engine") +
        "</strong>" +
        '<ul class="svc-not">' +
        (svc.forbidden_labels || [])
          .map(function (f) {
            return "<li>" + esc(f) + "</li>";
          })
          .join("") +
        "</ul></div>" +
        '<div class="svc-out"><small>Output</small><strong>' +
        esc(a.output) +
        "</strong></div>" +
        '<div class="svc-return"><small>Returns to</small><strong>' +
        esc(a.returns_to) +
        "</strong><span>" +
        esc(a.returns_to_role || "") +
        "</span></div>" +
        "</div>"
      );
    },

    /** Policy + evidence gate before institutional knowledge. */
    validation_chain: function (a) {
      var steps = a.steps || [];
      return (
        '<div class="anim anim-validation">' +
        steps
          .map(function (s, i) {
            var cls = ["val-step"];
            if (s.gate) cls.push("gate");
            if (s.terminal) cls.push("terminal");
            return (
              '<div class="' +
              cls.join(" ") +
              '" style="--i:' +
              i +
              '"><strong>' +
              esc(s.label) +
              "</strong>" +
              (s.model_node ? '<small data-model-node="' + esc(s.model_node) + '">' + esc(s.model_node) + "</small>" : "") +
              (s.gate ? '<span class="val-stamp">PASS</span>' : "") +
              "</div>" +
              (i < steps.length - 1 ? '<i class="val-arrow" style="--i:' + i + '"></i>' : "")
            );
          })
          .join("") +
        "</div>"
      );
    },

    /** AI used once; the same question is never inferred again. */
    knowledge_evolution: function (a) {
      var cycles = a.cycles || [];
      return (
        '<div class="anim anim-evolution">' +
        cycles
          .map(function (c, i) {
            var calls = c.inference_calls_from ? resolveBinding(c.inference_calls_from) : c.inference_calls;
            var n = Number(calls || 0);
            return (
              '<div class="evo-cycle ' +
              esc(c.tone || "neutral") +
              '" style="--i:' +
              i +
              '"><div class="evo-head"><strong>' +
              esc(c.label) +
              '</strong><span class="evo-ai' +
              (n ? " used" : " skipped") +
              '">AI calls: ' +
              esc(n) +
              "</span></div><ol>" +
              (c.steps || [])
                .map(function (s, k) {
                  return '<li style="--k:' + k + '">' + esc(s) + "</li>";
                })
                .join("") +
              "</ol></div>"
            );
          })
          .join("") +
        [a.counter_transition, a.marginal_cost]
          .filter(Boolean)
          .map(function (t) {
            return (
              '<div class="evo-transition ' +
              esc(t.tone || "neutral") +
              '"><span>' +
              esc(t.label) +
              '</span><b class="from">' +
              esc(t.from_value) +
              '</b><i class="evo-arrow">' +
              esc(t.transition_label || "→") +
              '</i><b class="to">' +
              esc(t.to_value) +
              "</b></div>"
            );
          })
          .join("") +
        "</div>"
      );
    },

    /** Final institutional result, projected from the live model. */
    metrics_board: function () {
      return '<div class="anim anim-board"><div class="board-glow" aria-hidden="true"></div></div>';
    },

    /** What the same workload costs with and without institutional knowledge. */
    cost_comparison: function (a) {
      var total = resolveBinding(a.total_from) || 0;
      var resolved = resolveBinding(a.resolved_from) || 0;
      var inference = resolveBinding(a.inference_from) || 0;
      var saving = a.saving_from ? resolveBinding(a.saving_from) : a.saving;
      var currency = a.currency === "USD" ? "$" : "";
      return (
        '<div class="anim anim-cost">' +
        '<div class="cost-split">' +
        '<div class="cost-total"><b>' +
        esc(total) +
        "</b><span>requests</span></div>" +
        '<div class="cost-fork">' +
        '<div class="cost-branch good"><b>' +
        esc(resolved) +
        "</b><span>" +
        esc(a.resolved_label) +
        "</span></div>" +
        '<div class="cost-branch warn"><b>' +
        esc(inference) +
        "</b><span>" +
        esc(a.inference_label) +
        "</span></div>" +
        "</div>" +
        "</div>" +
        '<div class="cost-columns">' +
        (a.columns || [])
          .map(function (c, i) {
            var calls = c.calls_from ? resolveBinding(c.calls_from) : c.calls;
            var cost = c.cost_from ? resolveBinding(c.cost_from) : c.cost;
            return (
              '<div class="cost-col ' +
              esc(c.tone || "neutral") +
              '" style="--i:' +
              i +
              '"><strong>' +
              esc(c.label) +
              '</strong><div class="cost-calls"><b>' +
              esc(calls) +
              "</b><span>AI calls</span></div>" +
              (cost === undefined || cost === null
                ? ""
                : '<div class="cost-money">' + esc(currency) + esc(cost) + "</div>") +
              "</div>"
            );
          })
          .join("") +
        "</div>" +
        (saving === undefined || saving === null
          ? ""
          : '<div class="cost-saving"><span>' +
            esc(a.saving_label || "Saved") +
            "</span><b>" +
            esc(saving) +
            "%</b></div>") +
        (a.basis ? '<p class="cost-basis">' + esc(a.basis) + "</p>" : "") +
        "</div>"
      );
    },

    /** The institution is asked before anything is spent. */
    decision_flow: function (a) {
      return (
        '<div class="anim anim-decision">' +
        '<div class="dec-entry" style="--i:0">' +
        esc(a.entry) +
        "</div>" +
        '<i class="dec-arrow" style="--i:0"></i>' +
        '<div class="dec-check" style="--i:1">' +
        esc(a.check) +
        "</div>" +
        '<i class="dec-arrow" style="--i:1"></i>' +
        '<div class="dec-question" style="--i:2">' +
        esc(a.question) +
        "</div>" +
        '<div class="dec-branches">' +
        (a.branches || [])
          .map(function (b, i) {
            var share = b.share_from ? resolveBinding(b.share_from) : b.share;
            return (
              '<div class="dec-branch ' +
              esc(b.tone || "neutral") +
              '" style="--i:' +
              i +
              '"><span class="dec-answer">' +
              esc(b.answer) +
              '</span><strong>' +
              esc(b.outcome) +
              "</strong>" +
              (share === undefined || share === null ? "" : "<b>" + esc(share) + "%</b>") +
              "</div>"
            );
          })
          .join("") +
        "</div>" +
        "</div>"
      );
    },

    /** The industry baseline: everything depends on the model. */
    dependency_baseline: function (a) {
      var flow = a.flow || [];
      return (
        '<div class="anim anim-decision anim-baseline">' +
        flow
          .map(function (step, i) {
            var cls = step.scale === "large" ? "dec-question dec-oversized" : "dec-entry";
            return (
              '<div class="' +
              cls +
              '" style="--i:' +
              i +
              '"><span>' +
              esc(step.label) +
              "</span>" +
              (step.role ? "<small>" + esc(step.role) + "</small>" : "") +
              "</div>" +
              (i < flow.length - 1 ? '<i class="dec-arrow" style="--i:' + i + '"></i>' : "")
            );
          })
          .join("") +
        '<div class="bif-counters">' +
        (a.warning_counters || [])
          .map(function (c) {
            return (
              '<div class="bif-counter ' +
              esc(c.tone || "neutral") +
              '"><span>' +
              esc(c.label) +
              "</span><b>" +
              esc(resolveValue(c)) +
              esc(c.unit || "") +
              "</b></div>"
            );
          })
          .join("") +
        "</div>" +
        "</div>"
      );
    },

    /** Entry points converge, then providers rotate under a stable institution. */
    converge_with_swap: function (a) {
      var converge = RENDERERS.converge({
        sources: resolveList(a, "sources", "sources_from"),
        target: a.target,
        target_role: a.target_role,
      });
      var swap = RENDERERS.provider_swap({
        providers: resolveList(a, "providers", "providers_from"),
        stable_actor: a.stable_actor,
        stable_actor_holds: a.stable_actor_holds,
        swap_interval_ms: a.swap_interval_ms,
      });
      return (
        '<div class="anim anim-stack">' +
        converge +
        (a.converge_note ? '<p class="stack-note">' + esc(a.converge_note) + "</p>" : "") +
        swap +
        (a.swap_note ? '<p class="stack-note">' + esc(a.swap_note) + "</p>" : "") +
        "</div>"
      );
    },

    /** Governance bifurcation shown together with what it costs. */
    bifurcation_with_cost: function (a) {
      var total = a.total_from ? resolveBinding(a.total_from) : a.total;
      var paths = (a.paths || []).map(function (p) {
        var steps = [];
        if (p.outcome) steps.push(p.outcome);
        var count = p.count_from ? resolveBinding(p.count_from) : p.count;
        if (count !== undefined && count !== null) steps.push(count + " of " + total);
        return { id: p.id, label: p.label, steps: steps, share_from: p.share_from, share: p.share, tone: p.tone };
      });
      var bif = RENDERERS.bifurcation({
        gate: a.gate,
        gate_role: a.gate_role,
        requests: Number(total) || 20,
        paths: paths,
        counters: [],
      });
      var cost = a.cost_comparison
        ? RENDERERS.cost_comparison({
            total_from: a.total_from,
            resolved_from: (a.paths || [])[0] ? (a.paths || [])[0].count_from : null,
            inference_from: (a.paths || [])[1] ? (a.paths || [])[1].count_from : null,
            resolved_label: (a.paths || [])[0] ? (a.paths || [])[0].label : "",
            inference_label: (a.paths || [])[1] ? (a.paths || [])[1].label : "",
            columns: a.cost_comparison.columns,
            currency: a.cost_comparison.currency,
            saving_label: a.cost_comparison.saving_label || "Spend avoided",
            saving_from: a.cost_comparison.saving_from,
            basis: a.cost_comparison.basis,
          })
        : "";
      return '<div class="anim anim-stack">' + bif + cost + "</div>";
    },

    /** Contrast: what the institution does versus what everyone else does. */
    authority_contrast: function (a) {
      var provider = a.inference_provider && a.inference_provider.from
        ? resolveBinding(a.inference_provider.from)
        : a.inference_provider || {};

      function chain(steps, tone) {
        return (steps || [])
          .map(function (s, i) {
            var cls = ["val-step"];
            if (s.gate) cls.push("gate");
            if (s.terminal) cls.push("terminal");
            if (s.style === "provisional") cls.push("provisional");
            if (tone) cls.push(tone);
            return (
              '<div class="' +
              cls.join(" ") +
              '" style="--i:' +
              i +
              '"><strong>' +
              esc(s.label) +
              "</strong>" +
              (s.model_node ? "<small>" + esc(s.model_node) + "</small>" : "") +
              (s.warning ? '<span class="val-warning">' + esc(s.warning) + "</span>" : "") +
              "</div>" +
              (i < steps.length - 1 ? '<i class="val-arrow" style="--i:' + i + '"></i>' : "")
            );
          })
          .join("");
      }

      return (
        '<div class="anim anim-contrast">' +
        '<div class="contrast-row good"><span class="contrast-label">CONRRAD</span>' +
        '<div class="anim-validation">' +
        chain(a.conrrad_flow) +
        "</div></div>" +
        '<div class="contrast-row warn"><span class="contrast-label">Everyone else</span>' +
        '<div class="anim-validation">' +
        chain(a.traditional_flow, "warn") +
        "</div></div>" +
        '<div class="svc-box" data-scale="' +
        esc((a.inference_provider && a.inference_provider.visual_scale) || "small") +
        '"><span class="svc-role">' +
        esc(provider.role || "service") +
        '</span><strong class="svc-label">' +
        esc(provider.label || "Inference Provider") +
        '</strong><ul class="svc-not">' +
        (provider.forbidden_labels || [])
          .map(function (f) {
            return "<li>" + esc(f) + "</li>";
          })
          .join("") +
        "</ul></div>" +
        "</div>"
      );
    },

    /** Each verifiable check appears, passes, and stays on the record. */
    evidence_checklist: function (a) {
      var checks = a.checks || [];
      var interval = Number(a.check_interval_ms || 1200);
      return (
        '<div class="anim anim-validation anim-checklist">' +
        checks
          .map(function (c, i) {
            var cls = ["val-step"];
            if (c.gate) cls.push("gate");
            if (c.terminal) cls.push("terminal");
            return (
              '<div class="' +
              cls.join(" ") +
              '" style="--i:' +
              i +
              ";--interval:" +
              interval +
              'ms"><strong>' +
              esc(c.label) +
              "</strong>" +
              (c.model_node ? "<small>" + esc(c.model_node) + "</small>" : "") +
              '<span class="val-stamp">PASS</span>' +
              "</div>" +
              (i < checks.length - 1 ? '<i class="val-arrow" style="--i:' + i + '"></i>' : "")
            );
          })
          .join("") +
        "</div>"
      );
    },

    /** Business outcomes only. No components, no architecture vocabulary. */
    outcome_board: function (a) {
      return (
        '<div class="anim anim-outcomes">' +
        '<div class="out-grid">' +
        (a.outcomes || [])
          .map(function (o, i) {
            var label = o && typeof o === "object" ? o.label : o;
            var detail = o && typeof o === "object" ? o.detail : "";
            return (
              '<div class="out-item" style="--i:' +
              i +
              '"><strong>' +
              esc(label) +
              "</strong>" +
              (detail ? "<small>" + esc(detail) + "</small>" : "") +
              "</div>"
            );
          })
          .join("") +
        "</div>" +
        (a.proof && a.proof.label ? '<p class="stack-note out-proof">' + esc(a.proof.label) + "</p>" : "") +
        '<div class="out-brand"><strong>' +
        esc(a.brand || "CONRRAD") +
        "</strong>" +
        (a.brand_lines || [])
          .map(function (l, i) {
            return '<span style="--i:' + i + '">' + esc(l) + "</span>";
          })
          .join("") +
        "</div>" +
        "</div>"
      );
    },
  };

  function renderAnimation(scene) {
    var canvas = $("demo-canvas");
    if (!canvas) return;
    var a = scene.animation || {};
    var fn = RENDERERS[a.type];
    canvas.setAttribute("data-anim", a.type || "none");
    canvas.innerHTML = fn
      ? fn(a)
      : '<div class="anim anim-missing">Unsupported declared animation: ' + esc(a.type) + "</div>";
    var note = $("demo-note");
    if (note) {
      note.textContent = a.note || "";
      note.hidden = !a.note;
    }
    if (a.type === "provider_swap" || a.type === "converge_with_swap") startProviderSwap(a);
  }

  function startProviderSwap(a) {
    var box = $("swap-providers");
    if (!box) return;
    var items = box.querySelectorAll(".swap-provider");
    if (items.length < 2) return;
    var idx = 0;
    swapTimer = setInterval(function () {
      items[idx].classList.remove("active");
      idx = (idx + 1) % items.length;
      items[idx].classList.add("active");
    }, Number(a.swap_interval_ms || 2000));
  }

  function renderRail() {
    var rail = $("demo-rail");
    if (!rail) return;
    rail.innerHTML = scenes()
      .map(function (s, i) {
        return (
          '<button type="button" class="rail-step' +
          (i === sceneIndex ? " active" : "") +
          (i < sceneIndex ? " done" : "") +
          '" data-rail="' +
          i +
          '" title="' +
          esc(s.title) +
          '"><span>' +
          esc(s.order || i + 1) +
          "</span></button>"
        );
      })
      .join("");
    rail.querySelectorAll("[data-rail]").forEach(function (btn) {
      btn.onclick = function () {
        goTo(Number(btn.getAttribute("data-rail")));
      };
    });
  }

  function highlightModel(scene) {
    var ui = window.AtlasUI;
    if (!ui || !ui.getState || !ui.getState().data) return;
    var ids = (scene.model_nodes || []).filter(function (id) {
      return ui.getState().data.nodes.some(function (n) {
        return n.id === id;
      });
    });
    if (!ids.length) return;
    ui.setHighlights(ids);
    var focus = (scene.camera && scene.camera.focus) || ids[ids.length - 1];
    if (
      focus &&
      ui.getState().data.nodes.some(function (n) {
        return n.id === focus;
      })
    ) {
      ui.selectNode(focus, true);
    }
  }

  /** WO-ATLAS-012 mandatory triad: business impact, property, evidence. */
  function renderTriad(scene) {
    var box = $("demo-triad");
    if (!box) return;
    var evidence = scene.institutional_evidence || [];
    var blocks = [];
    if (scene.business_impact) {
      blocks.push(
        '<div class="triad-cell impact"><small>Business impact</small><p>' +
          esc(scene.business_impact) +
          "</p></div>"
      );
    }
    if (scene.architecture_property) {
      blocks.push(
        '<div class="triad-cell property"><small>Architecture property</small><p>' +
          esc(scene.architecture_property) +
          "</p></div>"
      );
    }
    if (evidence.length) {
      blocks.push(
        '<div class="triad-cell evidence"><small>Institutional evidence</small><ul>' +
          evidence
            .map(function (e) {
              return "<li>" + esc(e) + "</li>";
            })
            .join("") +
          "</ul></div>"
      );
    }
    box.innerHTML = blocks.join("");
    box.hidden = !blocks.length;
  }

  /** A scene may withhold a name until the outcome has been understood. */
  function renderReveal(scene) {
    var el = $("demo-reveal");
    if (!el) return;
    el.textContent = "";
    el.hidden = true;
    el.classList.remove("shown");
    revealPending = null;
    if (!scene.reveal || !scene.reveal.text) return;
    revealPending = {
      text: scene.reveal.text,
      remaining: Number(scene.reveal.after_ms || 6000),
    };
    if (!paused) armReveal();
  }

  function armReveal() {
    if (!revealPending) return;
    revealStartedAt = Date.now();
    revealTimer = setTimeout(function () {
      var el = $("demo-reveal");
      if (el && revealPending) {
        el.textContent = revealPending.text;
        el.hidden = false;
        el.classList.add("shown");
      }
      revealPending = null;
    }, revealPending.remaining);
  }

  function renderScene() {
    var scene = currentScene();
    if (!scene) return;
    clearTimers();

    var stage = $("demo-stage");
    if (stage) stage.setAttribute("data-scene", scene.id);

    var kicker = $("demo-kicker");
    if (kicker) {
      kicker.textContent =
        (spec.kicker || "CONRRAD") +
        " · Scene " +
        (scene.order || sceneIndex + 1) +
        " / " +
        scenes().length +
        (scene.critical ? " · CRITICAL" : "");
    }
    var title = $("demo-scene-title");
    if (title) title.textContent = scene.title;
    var subtitle = $("demo-scene-subtitle");
    if (subtitle) {
      subtitle.textContent = scene.subtitle || "";
      subtitle.hidden = !scene.subtitle;
    }

    var hero = $("demo-hero");
    if (hero) {
      hero.textContent = scene.hero_text || "";
      hero.hidden = !scene.hero_text;
    }

    var main = $("demo-message");
    if (main) {
      main.textContent = scene.message || "";
      main.className = scene.final ? "demo-msg-main final" : "demo-msg-main";
    }
    var sub = $("demo-submessage");
    if (sub) {
      sub.textContent = scene.submessage || "";
      sub.hidden = !scene.submessage;
    }
    var neg = $("demo-negative");
    if (neg) {
      /* INT-DEMO-DEPLOY-002: affirmative-only public surface — do not render negative_message */
      neg.textContent = "";
      neg.hidden = true;
    }
    var closing = $("demo-closing");
    if (closing) {
      closing.textContent = scene.closing || "";
      closing.hidden = !scene.closing;
    }

    var pain = $("demo-pain");
    if (pain) {
      pain.innerHTML =
        (scene.pain ? '<span class="pain-chip">Market pain eliminated · ' + esc(scene.pain) + "</span>" : "") +
        (scene.institutional_property
          ? '<span class="property-chip">' + esc(scene.institutional_property) + "</span>"
          : "");
    }

    renderTriad(scene);
    renderReveal(scene);

    renderAnimation(scene);
    renderMetrics(scene.metrics, scene);
    renderRail();
    highlightModel(scene);

    sceneRemaining = Number(scene.duration_ms || 12000);
    startProgress(sceneRemaining, sceneRemaining);
    if (!paused) armTimer(sceneRemaining);
  }

  function startProgress(remaining, total) {
    var bar = $("demo-progress-bar");
    if (!bar) return;
    var elapsed = Math.max(0, total - remaining);
    bar.style.transition = "none";
    bar.style.width = ((elapsed / total) * 100).toFixed(2) + "%";
    // Force reflow so the next transition starts from the current width.
    void bar.offsetWidth;
    if (paused) return;
    bar.style.transition = "width " + remaining + "ms linear";
    bar.style.width = "100%";
  }

  function armTimer(ms) {
    sceneStartedAt = Date.now();
    timer = setTimeout(function () {
      if (sceneIndex + 1 < scenes().length) goTo(sceneIndex + 1);
      else finish();
    }, ms);
  }

  function goTo(i) {
    sceneIndex = Math.max(0, Math.min(scenes().length - 1, i));
    renderScene();
  }

  function setPaused(next) {
    paused = next;
    var btn = $("demo-pause");
    if (btn) {
      btn.textContent = paused ? "Resume" : "Pause";
      btn.setAttribute("aria-pressed", paused ? "true" : "false");
    }
    var stage = $("demo-stage");
    if (stage) stage.classList.toggle("paused", paused);
    if (paused) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (revealTimer) {
        clearTimeout(revealTimer);
        revealTimer = null;
        if (revealPending) {
          revealPending.remaining = Math.max(0, revealPending.remaining - (Date.now() - revealStartedAt));
        }
      }
      sceneRemaining = Math.max(0, sceneRemaining - (Date.now() - sceneStartedAt));
      var bar = $("demo-progress-bar");
      if (bar) {
        var computed = window.getComputedStyle(bar).width;
        bar.style.transition = "none";
        bar.style.width = computed;
      }
    } else {
      var scene = currentScene();
      startProgress(sceneRemaining, Number((scene && scene.duration_ms) || 12000));
      armTimer(sceneRemaining);
      armReveal();
    }
  }

  function finish() {
    clearTimers();
    var stage = $("demo-stage");
    if (stage) stage.classList.add("finished");
    var btn = $("demo-pause");
    if (btn) btn.disabled = true;
  }

  function replay() {
    clearTimers();
    var stage = $("demo-stage");
    if (stage) stage.classList.remove("finished");
    var btn = $("demo-pause");
    if (btn) btn.disabled = false;
    paused = false;
    setPaused(false);
    goTo(0);
  }

  function closeDemo() {
    clearTimers();
    var stage = $("demo-stage");
    if (stage) stage.hidden = true;
    var entry = $("demo-entry");
    if (entry) entry.hidden = false;
    document.body.classList.remove("demo-active");
  }

  function demoError(message) {
    var stage = $("demo-stage");
    if (!stage) return;
    stage.hidden = false;
    document.body.classList.add("demo-active");
    var canvas = $("demo-canvas");
    if (canvas) {
      canvas.innerHTML = '<div class="anim anim-missing">' + esc(message) + "</div>";
    }
    var title = $("demo-scene-title");
    if (title) title.textContent = "Demonstration unavailable";
    var main = $("demo-message");
    if (main) main.textContent = "";
  }

  function loadSpec() {
    if (spec) return Promise.resolve(spec);
    return fetch(SPEC_URL)
      .then(function (r) {
        if (!r.ok) throw new Error("Cannot load " + SPEC_URL + " (HTTP " + r.status + ")");
        return r.text();
      })
      .then(function (text) {
        if (typeof jsyaml === "undefined") throw new Error("YAML parser unavailable");
        var parsed = jsyaml.load(text);
        if (!parsed || !Array.isArray(parsed.scenes) || !parsed.scenes.length) {
          throw new Error("atlas_demo.yaml declares no scenes");
        }
        spec = parsed;
        return spec;
      });
  }

  function loadHealth() {
    var ui = window.AtlasUI;
    if (ui && ui.getState && ui.getState().data && ui.getState().data.institutional_health) {
      health = ui.getState().data.institutional_health;
      return Promise.resolve(health);
    }
    return fetch(ATLAS_MODEL_URL)
      .then(function (r) {
        return r.ok ? r.json() : {};
      })
      .then(function (d) {
        health = (d && d.institutional_health) || {};
        return health;
      })
      .catch(function () {
        health = {};
        return health;
      });
  }

  function applySpecChrome() {
    var startLabel = spec.start_label || "▶ Start Institutional Demonstration";
    ["btn-start-demo", "btn-demo-header"].forEach(function (id) {
      var b = $(id);
      if (b && id === "btn-start-demo") b.textContent = startLabel;
    });
    var thesis = $("demo-thesis");
    if (thesis) thesis.textContent = spec.thesis || "";
    var brand = $("demo-brand");
    if (brand) brand.textContent = spec.title || "Institutional Demonstration";
    var entryTitle = $("demo-entry-title");
    if (entryTitle) entryTitle.textContent = spec.title || "Institutional Demonstration";
    var closing = $("demo-principal");
    if (closing) closing.textContent = spec.principal_message || "";
    var controls = spec.controls || [];
    var map = {
      pause: "demo-pause",
      next: "demo-next",
      previous: "demo-prev",
      replay: "demo-replay",
    };
    Object.keys(map).forEach(function (key) {
      var el = $(map[key]);
      if (el) el.hidden = controls.indexOf(key) === -1;
    });
  }

  function startDemo() {
    return loadSpec()
      .then(loadHealth)
      .then(function () {
        applySpecChrome();
        var entry = $("demo-entry");
        if (entry) entry.hidden = true;
        var stage = $("demo-stage");
        if (stage) {
          stage.hidden = false;
          stage.classList.remove("finished");
        }
        document.body.classList.add("demo-active");
        var btn = $("demo-pause");
        if (btn) btn.disabled = false;
        paused = false;
        setPaused(false);
        var params = new URLSearchParams(window.location.search);
        var wanted = parseInt(params.get("scene"), 10);
        var startAt = isFinite(wanted) && wanted >= 1 ? wanted - 1 : 0;
        goTo(startAt);
        if (params.get("freeze") === "1") setPaused(true);
      })
      .catch(function (err) {
        demoError(err && err.message ? err.message : String(err));
      });
  }

  function bind() {
    ["btn-start-demo", "btn-demo-header"].forEach(function (id) {
      var b = $(id);
      if (b) b.onclick = startDemo;
    });
    var pause = $("demo-pause");
    if (pause) pause.onclick = function () {
      setPaused(!paused);
    };
    var next = $("demo-next");
    if (next) next.onclick = function () {
      if (sceneIndex + 1 < scenes().length) {
        setPausedSilently();
        goTo(sceneIndex + 1);
      }
    };
    var prev = $("demo-prev");
    if (prev) prev.onclick = function () {
      setPausedSilently();
      goTo(sceneIndex - 1);
    };
    var rep = $("demo-replay");
    if (rep) rep.onclick = replay;
    var close = $("demo-close");
    if (close) close.onclick = closeDemo;
    document.addEventListener("keydown", function (e) {
      var stage = $("demo-stage");
      if (!stage || stage.hidden) return;
      if (e.key === "Escape") closeDemo();
      else if (e.key === "ArrowRight" && sceneIndex + 1 < scenes().length) goTo(sceneIndex + 1);
      else if (e.key === "ArrowLeft") goTo(sceneIndex - 1);
      else if (e.key === " ") {
        e.preventDefault();
        setPaused(!paused);
      }
    });
  }

  /** Manual navigation keeps auto-advance, but restarts the scene budget. */
  function setPausedSilently() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  window.AtlasDemo = {
    start: startDemo,
    close: closeDemo,
    next: function () {
      goTo(sceneIndex + 1);
    },
    previous: function () {
      goTo(sceneIndex - 1);
    },
    replay: replay,
    goTo: function (i) {
      goTo(i);
    },
    getSpec: function () {
      return spec;
    },
    getSceneIndex: function () {
      return sceneIndex;
    },
    totalPlannedMs: function () {
      return scenes().reduce(function (sum, s) {
        return sum + Number(s.duration_ms || 0);
      }, 0);
    },
  };

  bind();

  // This page is the demonstration, so it plays on load unless held back.
  var params = new URLSearchParams(window.location.search);
  if (params.get("autostart") !== "0") startDemo();
})();
