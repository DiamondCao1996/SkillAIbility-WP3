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
          "Fill in <b>Company</b> first (required to submit).",
          "Pick the <b>worker groups (personas)</b> involved, and describe your specific persona.",
          "Work through the boxes: Challenge → Pain points → Goals → Solution (task / technology / organisation) → Unique value → Risks → KPIs → Skills → Action plan.",
          "In the <b>KPIs</b> box, use <b>📊 Score success metrics</b> to rate and prioritise how you will measure success.",
          "Everything autosaves in this browser; you can Export a JSON backup any time."
        ]
      },
      {
        key: "solution", page: "inclusion.html", istep: 2, name: "Solution canvas", time: "20–30 min",
        purpose: "Turn the discussion into a concrete, agreed solution design and action plan.",
        instr: [
          "This canvas opens <b>pre-filled from your workforce canvas</b> – personas and texts are mirrored automatically.",
          "Refine the three <b>solution layers</b>: task, technology and organisational conditions.",
          "Sharpen the <b>action plan</b>: concrete actions, owners and timing.",
          "Click <b>Submit</b> when the group agrees – it is sent to the facilitators and emailed as Excel."
        ]
      }
    ]
  },
  professional: {
    id: "professional",
    name: "Professional version",
    who: "for scholars",
    total: "70–95 min",
    tagline: "From evidence to solution: map requirements and evaluate use cases systematically.",
    blurb: "The full analytical path: start from the project's real use cases, brainstorm the case, formalise requirements in the assessment matrix, and design a solution grounded in that mapping.",
    steps: [
      {
        key: "usecases", page: "usecases.html", name: "Use case matching", time: "10–15 min",
        purpose: "Ground the workshop in the project's real SkillAIbility use cases.",
        instr: [
          "Choose your <b>institute</b> (CHALMERS, NTNU, LMS, MADE, TKNIKA) – you see only its use cases.",
          "For each use case, tick which <b>TA / TE / OR</b> requirements it addresses (lists are expandable to full text).",
          "Judge whether the requirement lists are <b>sufficient</b> for the use case (yes / partly / no).",
          "Note <b>what is missing</b> – these gaps feed the discussion that follows."
        ]
      },
      {
        key: "canvas", page: "canvas.html", name: "Workforce canvas", time: "15–20 min",
        purpose: "Brainstorm the human-centred case that frames the requirements.",
        instr: [
          "Fill in <b>Company</b> first, and pick the <b>worker groups (personas)</b>.",
          "Sketch Challenge → Pain points → Goals → an initial Solution → KPIs.",
          "Keep it open and exploratory – you will formalise the requirements in the next step."
        ]
      },
      {
        key: "matrix", page: "inclusion.html", istep: 1, name: "Assessment matrix", time: "25–35 min",
        purpose: "Formalise requirements per worker group × learning pathway – the analytical core.",
        instr: [
          "Three dimensions – <b>Task (TA)</b>, <b>Technology (TE)</b>, <b>Work organisation (OR)</b> – each a grid of worker groups × learning pathways.",
          "Click a cell to tick / untick requirement codes, add a note, rename codes, add new ones or mark the <b>frequent (★)</b> ones.",
          "Use <b>Expand codes</b> / <b>Expand list</b> to see full descriptions.",
          "The lists you build here flow into the solution canvas and back to the use case toolkit."
        ]
      },
      {
        key: "solution", page: "inclusion.html", istep: 2, name: "Solution canvas", time: "20–25 min",
        purpose: "Design the solution, linked to the requirements you mapped.",
        instr: [
          "The three <b>solution layers</b> draw on the codes from step 1 – the codes assigned to your selected personas are <b>ringed in yellow</b> as suggestions.",
          "Click codes to include them and add free text for anything beyond the codes.",
          "Complete the free-text boxes (challenge, pain points, goals, UVP, risks, KPIs, skills, action plan).",
          "One <b>Submit</b> sends both the matrix and this canvas together."
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
      + "@media print{.wpf-bar,.wpf-ov{display:none !important}}";
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

    // if this tool page serves a sub-step (inclusion matrix vs solution), select it
    if (s.istep && typeof window.setStep === "function") { try { window.setStep(s.istep); } catch (e) {} }

    injectCss();
    var bar = document.createElement("div"); bar.className = "wpf-bar";
    var dots = f.steps.map(function (_, i) {
      return '<span class="d ' + (i === idx ? "on" : (i < idx ? "done" : "")) + '"></span>';
    }).join("");
    bar.innerHTML =
      '<a class="wpf-home" href="index.html" title="Back to the start page">⌂ Start</a>'
      + '<div class="wpf-mid"><b>' + esc(f.name) + '</b> <span class="wpf-sub">· ' + esc(f.who) + ' · Step ' + stepNo + ' of ' + f.steps.length + ' — ' + esc(s.name) + '</span></div>'
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

  document.addEventListener("DOMContentLoaded", function () {
    var q = qs();
    if (q.flow && FLOWS[q.flow] && q.step >= 1) renderBar(q.flow, q.step);
  });
})();
