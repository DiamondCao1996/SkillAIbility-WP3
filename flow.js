/* SkillAIbility WP3 – guided workshop flows
 * ------------------------------------------
 * Two entry pathways chosen on the front page (index.html):
 *   • industrial   (for companies) – workforce canvas → solution canvas
 *   • professional (for scholars)  – use case matching → workforce canvas
 *                                    → assessment matrix → solution canvas
 *
 * The front page renders the chooser + per-step instructions and estimated
 * time from FLOWS below. Each tool page includes this file: when it is opened
 * with ?flow=<id>&step=<n> it shows a guided flow bar, and every jump to the
 * next tool first shows that step's instructions + time (the gate).
 *
 * inclusion.html serves two steps (matrix = sub-step 1, solution canvas =
 * sub-step 2); a step's `istep` selects which one to open.
 */
const FLOWS = {
  industrial: {
    id: "industrial",
    name: "Industrial version",
    who: "for companies",
    total: "40–60 min",
    tagline: "Generate discussion and an action plan.",
    blurb: "A light, conversation-first path: brainstorm the case openly, then turn the discussion into a concrete solution and action plan. No prior preparation needed.",
    steps: [
      {
        key: "canvas", page: "canvas.html", name: "Workforce canvas", time: "20–30 min",
        purpose: "Open discussion and brainstorming around your own case.",
        instr: [
          "<b>Form your group:</b> people working on the same case fill in the tools together on <b>one computer</b>; otherwise each person uses their own computer.",
          "Make sure <b>Company / organisation</b> is filled in (start page) – it identifies your group's submission.",
          "Pick the <b>worker groups (personas)</b> involved, and describe your specific persona.",
          "Work through the boxes: Challenge → Pain points → Goals → Solution (task / technology / organisation) → Unique value → Risks → KPIs → Skills → Action plan.",
          "In the <b>KPIs</b> box, use <b>📊 Score success metrics</b> to rate and prioritise how you will measure success.",
          "Everything autosaves in this browser; you submit once, at the last step."
        ]
      },
      {
        key: "solution", page: "inclusion.html", istep: 2, name: "Solution canvas", time: "20–30 min",
        purpose: "Turn the discussion into a concrete, agreed solution design and action plan.",
        instr: [
          "This canvas opens <b>pre-filled from your workforce canvas</b> – personas and texts are mirrored automatically.",
          "<b>Click the three solution layers</b> – Task characteristics (TA), Technology requirements (TE), Organisational conditions (OR) – select the codes your solution builds on and add free text where needed.",
          "Then <b>reflect on the free-text boxes</b> (challenge, pain points, goals, UVP, risks, KPIs, skills, action plan) that came over from the workforce canvas: refine where needed.",
          "Sharpen the <b>action plan</b>: concrete actions, owners and timing.",
          "Click <b>Submit all steps</b> when the group agrees – both steps are sent to the facilitators together and emailed as Excel."
        ]
      }
    ]
  },
  professional: {
    id: "professional",
    name: "Professional version",
    who: "for scholars",
    total: "65–90 min",
    tagline: "From evidence to solution: map requirements and evaluate use cases systematically.",
    blurb: "The full analytical path: start from the project's real use cases, brainstorm the case, formalise requirements in the assessment matrix, and design a solution grounded in that mapping.",
    steps: [
      {
        key: "usecases", page: "usecases.html", name: "Use case matching", time: "10–15 min",
        purpose: "Ground the workshop in the project's real SkillAIbility use cases.",
        instr: [
          "<b>Form your group:</b> everyone working on the same use case sits together and fills in the tools on <b>one computer</b>. If you work on different use cases – even from the same institute – each of you uses your own computer.",
          "Make sure <b>Company / organisation</b> is filled in (start page) – it identifies your group's submission.",
          "Choose your <b>institute</b> (CHALMERS, NTNU, LMS, MADE, TKNIKA) – you see only its use cases.",
          "For each use case, tick the <b>Task characteristics (TA)</b> it impacts, and the <b>Technology requirements (TE)</b> and <b>Organisational conditions (OR)</b> needed to implement it. Use <b>Expand</b> to read the full text of every item.",
          "Judge whether the lists are <b>sufficient to implement</b> the use case (yes / partly / no) and note <b>what is missing</b> – these gaps feed the discussion that follows."
        ]
      },
      {
        key: "canvas", page: "canvas.html", name: "Workforce canvas", time: "25–30 min",
        purpose: "Brainstorm the human-centred case that frames the requirements.",
        instr: [
          "Pick the <b>worker groups (personas)</b> your use case is for, and describe your specific persona.",
          "Work through the boxes: Challenge → Pain points → Goals → an initial Solution (task / technology / organisation) → Unique value → Risks → KPIs → Skills → Action plan.",
          "Keep it open and exploratory – you will formalise the requirements in the next step. Everything autosaves and is mirrored into the solution canvas of step 4."
        ]
      },
      {
        key: "matrix", page: "inclusion.html", istep: 1, name: "Assessment matrix", time: "25–35 min",
        purpose: "Formalise requirements per worker group × learning pathway – the analytical core.",
        instr: [
          "Three dimensions – <b>Task characteristics (TA)</b>, <b>Technology requirements (TE)</b>, <b>Organisational conditions (OR)</b> – each a grid of worker groups × learning pathways.",
          "Click a cell to tick / untick requirement codes, add a note, rename codes, add new ones or mark the <b>frequent (★)</b> ones.",
          "Use <b>Expand codes</b> / <b>Expand list</b> to see full descriptions.",
          "The lists you build here flow into the solution canvas and back to the use case toolkit."
        ]
      },
      {
        key: "solution", page: "inclusion.html", istep: 2, name: "Solution canvas", time: "5–10 min",
        purpose: "Design the solution, linked to the requirements you mapped.",
        instr: [
          "Your texts from step 2 are <b>already here</b> – this canvas mirrors the workforce canvas.",
          "<b>Click the three solution layers</b> – Task characteristics (TA), Technology requirements (TE), Organisational conditions (OR) – and select the codes your solution builds on. Codes assigned to your personas in step 3 are <b>ringed in yellow</b> as suggestions; add free text for anything beyond the codes.",
          "Then <b>reflect on the free-text boxes</b> (challenge, pain points, goals, UVP, risks, KPIs, skills, action plan): does the solution still answer them? Refine where needed.",
          "<b>Submit all steps</b> sends everything – use case matching, workforce canvas, matrix and this canvas – together."
        ]
      }
    ]
  }
};

/* ---- helpers shared with the front page ---- */
const WPFLOW = {
  flows: FLOWS,
  get(id) { return FLOWS[id] || null; },
  totalTime(id) { return (FLOWS[id] ? FLOWS[id].steps.length : 0); },
  stepUrl(id, idx) {
    var f = FLOWS[id]; if (!f || !f.steps[idx]) return "#";
    return f.steps[idx].page + "?flow=" + id + "&step=" + (idx + 1);
  }
};

/* ===================================================================
   In-tool guided flow bar + instruction gate (tool pages only)
   =================================================================== */
(function () {
  function qs() {
    var p = new URLSearchParams(location.search);
    return { flow: p.get("flow"), step: parseInt(p.get("step"), 10) };
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  function readSession() { try { return JSON.parse(localStorage.getItem("wp3_session") || "{}") || {}; } catch (e) { return {}; } }

  // The company / participants / date are asked once on the start page. Fill the
  // tool's (hidden) meta inputs from that shared session so nobody re-enters them.
  function applySession() {
    var s = readSession();
    var c = document.getElementById("m_case"), p = document.getElementById("m_people"), d = document.getElementById("m_date");
    if (c && s.company) c.value = s.company;
    if (p && typeof s.participants === "string" && s.participants) p.value = s.participants;
    if (d && s.date) d.value = s.date;
    if (s.company) { var meta = document.querySelector(".meta"); if (meta) meta.style.display = "none"; }
  }

  function injectCss() {
    var css = ""
      + ".wpf-bar{position:sticky;top:0;z-index:25;display:flex;align-items:center;gap:14px;flex-wrap:wrap;"
      + "background:#41c3ec;color:#0b1b3f;padding:8px 18px;font:600 13.5px/1.3 'Segoe UI',system-ui,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.15)}"
      + ".wpf-bar a.wpf-home{color:#0b1b3f;text-decoration:none;background:rgba(255,255,255,.55);padding:5px 11px;border-radius:8px}"
      + ".wpf-bar a.wpf-home:hover{background:#fff}"
      + ".wpf-bar .wpf-mid{flex:1;min-width:180px}"
      + ".wpf-bar .wpf-mid b{font-size:14px}.wpf-bar .wpf-mid .wpf-sub{font-weight:400;opacity:.85;font-size:12.5px}"
      + ".wpf-dots{display:flex;gap:5px;align-items:center}"
      + ".wpf-dots .d{width:9px;height:9px;border-radius:50%;background:rgba(11,27,63,.3)}"
      + ".wpf-dots .d.on{background:#0b1b3f}.wpf-dots .d.done{background:#0b1b3f;opacity:.55}"
      + ".wpf-bar button{border:0;border-radius:8px;padding:7px 13px;font:inherit;font-weight:600;cursor:pointer}"
      + ".wpf-prev{background:rgba(255,255,255,.55);color:#0b1b3f}.wpf-prev:hover{background:#fff}"
      + ".wpf-next{background:#0b1b3f;color:#fff}.wpf-next:hover{background:#16295a}"
      + ".wpf-last{background:rgba(255,255,255,.35);color:#0b1b3f;padding:6px 12px;border-radius:8px;font-size:12.5px}"
      + ".wpf-ov{position:fixed;inset:0;background:rgba(11,27,63,.55);display:none;align-items:center;justify-content:center;z-index:60;padding:20px}"
      + ".wpf-ov.open{display:flex}"
      + ".wpf-card{background:#fff;color:#0b1b3f;border-radius:16px;max-width:560px;width:100%;padding:22px 26px;box-shadow:0 20px 60px rgba(0,0,0,.35);max-height:88vh;overflow:auto}"
      + ".wpf-card .wpf-eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.6px;color:#3b4560;font-weight:700}"
      + ".wpf-card h3{margin:4px 0 2px;font-size:21px}"
      + ".wpf-card .wpf-time{display:inline-block;background:#eef1f7;border-radius:999px;padding:3px 11px;font-size:12.5px;font-weight:600;margin:6px 0 4px}"
      + ".wpf-card .wpf-purpose{font-style:italic;color:#3b4560;font-size:13.5px;margin:6px 0 10px;line-height:1.4}"
      + ".wpf-card ul{margin:6px 0 14px;padding-left:20px;font-size:13.5px;line-height:1.5}.wpf-card li{margin:5px 0}"
      + ".wpf-card .row{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}"
      + ".wpf-card .row button{border:0;border-radius:9px;padding:9px 15px;font:600 14px/1 'Segoe UI',system-ui,sans-serif;cursor:pointer}"
      + ".wpf-card .wpf-cancel{background:#e7e9ee;color:#0b1b3f}.wpf-card .wpf-go{background:#41c3ec;color:#0b1b3f}.wpf-card .wpf-go:hover{background:#6ad3f2}"
      + "@media print{.wpf-bar,.wpf-ov{display:none !important}}"
      // during a guided flow the flow bar is the only navigation – hide the
      // cross-tool jump links (toolstrip + header nav) and the in-tool step
      // switcher so people follow the sequence instead of jumping away
      + "body.wpf-flow .toolstrip,body.wpf-flow nav.pages,body.wpf-flow .steps{display:none !important}";
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  }

  function stepCardHtml(f, idx) {
    var s = f.steps[idx];
    return '<div class="wpf-eyebrow">' + esc(f.name) + ' · Step ' + (idx + 1) + ' of ' + f.steps.length + '</div>'
      + '<h3>' + esc(s.name) + '</h3>'
      + '<span class="wpf-time">⏱ ' + esc(s.time) + '</span>'
      + '<p class="wpf-purpose">' + esc(s.purpose) + '</p>'
      + '<ul>' + s.instr.map(function (x) { return '<li>' + x + '</li>'; }).join("") + '</ul>';
  }

  // instruction gate before jumping to a step
  function gate(flowId, idx) {
    var f = FLOWS[flowId]; if (!f || !f.steps[idx]) return;
    var ov = document.getElementById("wpfGate") || (function () {
      var d = document.createElement("div"); d.className = "wpf-ov"; d.id = "wpfGate";
      d.innerHTML = '<div class="wpf-card"><div id="wpfGateBody"></div>'
        + '<div class="row"><button class="wpf-cancel" type="button">Cancel</button>'
        + '<button class="wpf-go" type="button"></button></div></div>';
      document.body.appendChild(d);
      d.addEventListener("click", function (e) { if (e.target === d) d.classList.remove("open"); });
      d.querySelector(".wpf-cancel").addEventListener("click", function () { d.classList.remove("open"); });
      return d;
    })();
    ov.querySelector("#wpfGateBody").innerHTML = stepCardHtml(f, idx);
    var go = ov.querySelector(".wpf-go");
    go.textContent = "Continue to " + f.steps[idx].name + " →";
    go.onclick = function () { location.href = WPFLOW.stepUrl(flowId, idx); };
    ov.classList.add("open");
  }

  function renderBar(flowId, stepNo) {
    var f = FLOWS[flowId]; if (!f) return;
    var idx = stepNo - 1; if (idx < 0 || idx >= f.steps.length) return;
    var s = f.steps[idx];
    if (document.querySelector(".wpf-bar")) return;   // already rendered

    var bar = document.createElement("div"); bar.className = "wpf-bar";
    var dots = f.steps.map(function (_, i) {
      return '<span class="d ' + (i === idx ? "on" : (i < idx ? "done" : "")) + '"></span>';
    }).join("");
    var comp = readSession().company;
    var compHtml = comp ? ' · 🏢 ' + esc(comp) : '';
    bar.innerHTML =
      '<a class="wpf-home" href="index.html" title="Back to the start page">⌂ Start</a>'
      + '<div class="wpf-mid"><b>' + esc(f.name) + '</b> <span class="wpf-sub">· ' + esc(f.who) + ' · Step ' + stepNo + ' of ' + f.steps.length + ' — ' + esc(s.name) + compHtml + '</span></div>'
      + '<div class="wpf-dots">' + dots + '</div>'
      + (idx > 0 ? '<button class="wpf-prev" type="button">‹ Prev</button>' : '')
      + (idx < f.steps.length - 1 ? '<button class="wpf-next" type="button">Next: ' + esc(f.steps[idx + 1].name) + ' →</button>'
                                  : '<span class="wpf-last">Last step — Submit when the group is done ✓</span>');
    document.body.insertBefore(bar, document.body.firstChild);

    var prev = bar.querySelector(".wpf-prev");
    if (prev) prev.onclick = function () { location.href = WPFLOW.stepUrl(flowId, idx - 1); };
    var next = bar.querySelector(".wpf-next");
    if (next) next.onclick = function () { gate(flowId, idx + 1); };
  }

  /* ---- one submission for the whole flow ----
     Intermediate steps: the tool's Submit button waits. Last step: it sends the
     drafts of every step of the flow (from this browser) together; the backend
     emails once, with the complete workbook attached. */
  var DRAFT_PREFIX = { "canvas.html": "skillaibility_wp3_canvas_", "inclusion.html": "skillaibility_wp3_assessment_", "usecases.html": "skillaibility_wp3_usecases_" };
  function draftFor(page) {
    var pre = DRAFT_PREFIX[page]; if (!pre) return null;
    var best = null;
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k.indexOf(pre) === 0 && !/_id$/.test(k)) { try { var v = JSON.parse(localStorage.getItem(k)); if (v && typeof v === "object" && (!best || k > best.key)) best = { key: k, data: v }; } catch (e) {} }
    }
    return best ? best.data : null;
  }
  function stepLabel(page) { return page === "canvas.html" ? "Workforce canvas" : page === "inclusion.html" ? "Assessment matrix + solution canvas" : "Use case matching"; }
  function currentPage() { return (location.pathname.split("/").pop() || "index.html"); }
  function say(msg, cls) { if (typeof window.toast === "function") window.toast(msg, cls || "", 6000); else alert(msg); }

  function submitFlow(flowId) {
    var f = FLOWS[flowId]; if (!f) return;
    var sess = readSession();
    var pages = []; f.steps.forEach(function (st) { if (pages.indexOf(st.page) < 0) pages.push(st.page); });
    var here = currentPage();
    var payloads = [], missing = [];
    pages.forEach(function (pg) {
      var d = (pg === here && typeof window.collect === "function") ? window.collect() : draftFor(pg);
      if (!d) { missing.push(stepLabel(pg)); return; }
      if (!d.company && sess.company) d.company = sess.company;
      if (!d.participants && sess.participants) d.participants = sess.participants;
      if (!d.date && sess.date) d.date = sess.date;
      d.flow = flowId; d.flow_name = f.name;
      payloads.push({ page: pg, data: d });
    });
    var company = (payloads[0] && payloads[0].data.company) || sess.company || "";
    if (!company) { if (typeof window.modal === "function") window.modal("Almost there", "<p><b>Please fill in the Company field</b> – it identifies your group's submission.</p>", [{ label: "OK" }]); else say("Please fill in the Company field first."); return; }
    var body = "<p>This sends <b>all steps of the " + esc(f.name) + "</b> to the facilitators in one go:</p><ul>"
      + payloads.map(function (p) { return "<li>" + esc(stepLabel(p.page)) + "</li>"; }).join("") + "</ul>"
      + (missing.length ? "<p>No draft found on this device for: <b>" + esc(missing.join(", ")) + "</b> – those steps are skipped.</p>" : "")
      + (typeof SUBMIT_URL !== "undefined" && SUBMIT_URL ? "<p>The research team receives one email with the complete Excel workbook.</p>" : "<p><i>No collection backend is configured, so a JSON file with all steps will be downloaded instead – please send it to the facilitator.</i></p>");
    var go = function () { doSubmitFlow(payloads, company, flowId); };
    if (typeof window.modal === "function") window.modal("Submit all steps?", body, [{ label: "Cancel" }, { label: "Submit all steps", cls: "btn-primary", onClick: go }]);
    else go();
  }
  async function doSubmitFlow(payloads, company, flowId) {
    var btn = document.getElementById("submitBtn");
    if (typeof SUBMIT_URL === "undefined" || !SUBMIT_URL) {
      var blob = new Blob([JSON.stringify({ flow: flowId, company: company, steps: payloads.map(function (p) { return p.data; }) }, null, 2)], { type: "application/json" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob);
      a.download = ("WP3_" + flowId + "_" + company + "_all-steps").replace(/[^\w\-]+/g, "-") + ".json"; a.click();
      say("All steps exported as one JSON file", "ok"); return;
    }
    if (btn) { btn.disabled = true; btn.textContent = "Submitting all steps…"; }
    var post = function (d) { return fetch(SUBMIT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(d) }); };
    try {
      // all parts in parallel (each only writes its rows – fast), then one "notify" that queues the single email
      await Promise.all(payloads.map(function (p) { p.data.no_email = true; return post(p.data); }));
      var first = payloads[0] ? payloads[0].data : {};
      await post({ form: "notify", flow: flowId, flow_name: (FLOWS[flowId] || {}).name, company: company,
                   participants: first.participants || "", date: first.date || "",
                   parts: payloads.map(function (p) { return stepLabel(p.page); }) });
      say("✓ All " + payloads.length + " steps submitted – thank you! The facilitators receive the email within a minute or two.", "ok");
      var st = document.getElementById("status"); if (st) st.textContent = "All steps submitted " + new Date().toLocaleTimeString() + " · you can keep editing and re-submit";
    } catch (err) {
      say("Submission failed (offline?) – please try again or Export a JSON backup.", "err");
    } finally { if (btn) { btn.disabled = false; btn.textContent = "Submit all steps"; } }
  }

  function configureSubmit(flowId, idx) {
    var f = FLOWS[flowId]; var btn = document.getElementById("submitBtn"); if (!f || !btn) return;
    var last = idx === f.steps.length - 1;
    var fresh = btn.cloneNode(true); fresh.removeAttribute("onclick"); btn.parentNode.replaceChild(fresh, btn); btn = fresh;
    if (last) {
      btn.textContent = "Submit all steps";
      btn.title = "Sends every step of this flow together";
      btn.onclick = function () { submitFlow(flowId); };
    } else {
      // intermediate steps: no submit button at all – submission happens once, at the last step
      btn.style.display = "none";
    }
  }

  // Run as early as possible (this script is at the end of <body>, so the tool's
  // own DOM and setStep() already exist). Setting the sub-step and hiding the
  // free-jump navigation before first paint avoids a confusing flash / stray jump.
  function boot() {
    applySession();   // fill + hide the per-tool meta from the start-page session
    var q = qs();
    if (!(q.flow && FLOWS[q.flow] && q.step >= 1)) return;
    var f = FLOWS[q.flow], s = f.steps[q.step - 1];
    if (!s) return;
    injectCss();
    document.body.classList.add("wpf-flow");   // hides .toolstrip / nav.pages / .steps (see injectCss)
    // inclusion.html serves two sub-steps (matrix / solution) – open the right one straight away
    if (s.istep && typeof window.setStep === "function") { try { window.setStep(s.istep); } catch (e) {} }
    renderBar(q.flow, q.step);
    configureSubmit(q.flow, q.step - 1);
  }
  if (document.body) boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
