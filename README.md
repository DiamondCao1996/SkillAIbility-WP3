# SkillAIbility WP3 – Interactive Workshop Toolkit

Three interconnected, browser-based workshop tools for SkillAIbility Work Package 3. Participants
work on any laptop or tablet; every submission lands in a Google Sheet owned by the facilitators and
is emailed to the research team as an Excel file automatically.

The toolkit opens on a **start page** where the group picks one of two guided pathways. Each pathway
is an ordered sequence of the tools below, and **every step opens with short instructions and an
estimated time** before the participant enters it (a "gate"), plus a flow bar inside each tool that
carries the group to the next step.

| Live page | |
|---|---|
| **Start page** (pathway chooser) | https://diamondcao1996.github.io/SkillAIbility-WP3/ |

| # | Tool | Live page |
|---|---|---|
| 1 | **Human-centric workforce canvas** – open-ended discussion and brainstorming around a case | https://diamondcao1996.github.io/SkillAIbility-WP3/canvas.html |
| 2 | **Assessment matrix** – organise the ideas into actionable requirement checklists (step 1), then design a linked solution (step 2) | https://diamondcao1996.github.io/SkillAIbility-WP3/inclusion.html |
| 3 | **Use case matching toolkit** – match your institute's SkillAIbility use cases against the requirement lists and mark the gaps | https://diamondcao1996.github.io/SkillAIbility-WP3/usecases.html |

Repository: https://github.com/DiamondCao1996/SkillAIbility-WP3

## Two guided pathways

The start page (`index.html`) offers two versions, defined in `flow.js`:

* **Industrial version** *(for companies)* — **Workforce canvas → Solution canvas**. A light,
  conversation-first path; the goal is to generate discussion and an action plan. ~40–60 min.
* **Professional version** *(for scholars)* — **Use case matching → Workforce canvas → Assessment
  matrix → Solution canvas**. The full analytical path from the project's real use cases through
  formal requirement mapping to a grounded solution design. ~70–95 min.

Choosing a version reveals its numbered steps (each with its instructions and estimated time and an
**Open** button) and asks for the group's **Company, Participants and Date once** — these are stored
in the browser (`wp3_session`) and carried into every tool, so they are never re-entered; the tools
hide their own company/participants/date fields and fill them from the session (a tool opened
directly without a session still shows them). All three are optional — if the company is left blank
the tool simply keeps its own company/participants/date fields visible so they can be filled there.

Opening a step launches the tool with `?flow=<version>&step=<n>`; the tool then shows a guided flow
bar (`Step X of Y`, progress dots, the company, **⌂ Start**, **Next →**). Pressing **Next** first
shows the next step's instructions + time, then continues. `inclusion.html` serves two steps — the
matrix (step 1) and the solution canvas (step 2) — and the flow opens it on the right one straight
away (no flash of the other step). There is **no cross-tool "1·2·3" navigation** any more: the flow
bar (Start + Next) is the only way through a run, so nobody jumps to another canvas by accident.
Opening any tool without flow parameters still works as a standalone page with all navigation shown.

## How the tools fit together

The intended flow is **canvas → matrix → matching**, and a guide strip on every page says so:

1. The **workforce canvas** is for open-ended discussion and brainstorming around the group's own
   case.
2. The **assessment matrix** organises those ideas into actionable requirement checklists per worker
   group × outcome, and its second step turns them into a solution design linked to the checklists.
3. The **use case matching toolkit** tests the requirement lists against the project's real use cases
   and surfaces what is missing.

All three stay interconnected in the browser (same device, no login):

* The five **worker groups** are the same everywhere: the persona picker on the canvas, the rows of
  the matrix, the persona picker in step 2, and the target groups of the use case mapping.
* The **requirement code lists** (TA / TE / OR) live in the matrix. Codes a group renames or adds
  there appear immediately in the step-2 solution layers and in the use case toolkit.
* The **workforce canvas and the assessment step 2 are mirrored live, both ways**: personas, all
  texts and the three solution layers are one shared dataset. Type on the canvas and it appears in
  step 2 (instantly, even with both tabs open); edit in step 2 and it flows back to the canvas.
  Step 2 keeps its own extras (the selected codes) on top. A *Sync with workforce canvas* button
  re-syncs on demand.
* Selecting personas on the canvas or in step 2 shows the **related SkillAIbility use cases**,
  colour-coded by partner.
* **Company** and **Participants** carry across all three tools.

Common to every tool: autosave in the browser (closing the tab and coming back restores the draft),
Export / Import as JSON (`Ctrl/Cmd + S` exports), A3 landscape print / save as PDF, and layouts that
reflow for tablets and phones.

**Submitting in a guided flow:** groups submit once, at the end. Intermediate steps show no submit
button at all (everything autosaves meanwhile); the last step has a single *Submit all steps* button
that sends the drafts of every step of the flow together, so the research team receives one email
with the complete workbook. Opened outside a flow, each tool still has its own Submit.

## The four learning pathways

Every solution aims at one or more pathways; they are the columns of the assessment matrix and the
pathways of the use case mapping:

* **Augmentation** – technology extends what a worker can do: it strengthens human capabilities
  (physical, cognitive or sensory) so the worker performs the task better, faster or more safely,
  while the human stays in charge of the task.
* **Inclusion** – technology removes barriers so that workers who would otherwise be excluded
  (novice or learning-vulnerable, ageing, deaf and hard-of-hearing, physical or cognitive support
  needs) can perform the task and take part in work on equal terms.
* **Symbiosis** – human and technology work as one system: tasks are shared and adapted
  dynamically, each side compensating for the other's limits, with continuous two-way
  communication, transparency and trust.
* **Empowerment** – technology helps the worker to grow and to decide: it builds skills, autonomy
  and confidence, and gives workers a say in how the technology and the work around it are shaped.

The definitions live once in `usecases-data.js` (`PATHWAYS`). They are shown for reference in a
dedicated **Learning pathways** box at the top of the assessment step-2 canvas (tool 2) – the four
definitions as read-only cards, since the matrix columns already *are* the four pathways. The
workforce canvas (tool 1) does not repeat them.

## Tool 1 – Human-centric workforce canvas (`canvas.html`)

The familiar canvas: Challenge → Persona → Pain points → Goals → Solution → Unique value
proposition → Risks → KPIs (social / technical / operational / economic) → Skills → Action plan,
with the original prompts and examples.

The boxes are laid out **one colour per row**, so a group works straight down the page: blue
(challenge · persona · pain points · goals) → green (solution · UVP) → yellow (risks · KPIs · skills)
→ grey (action plan) → a **Feedback** row.

* **Persona** is a picker over the five worker groups plus a free-text field for the specific
  persona's characteristics; the related use cases are listed underneath.
* **Feedback on this canvas** — a row at the very end where the group rates how well the canvas
  supported them (1–5) and writes free-text feedback on its design. Stored with the submission
  (`canvas_rating` / `canvas_feedback`).
* **Solution** has three free-text layers – task, technology, organisational conditions – the same
  template as the matrix's step 2, but deliberately without code lists: this tool is for open
  brainstorming.
* **KPIs → Success metrics.** The KPIs box has a **📊 Score success metrics** button that flips open
  a full-screen scoring sheet – the *Success metrics to evaluate use cases* framework for
  vulnerable-worker technology adoption. Seven blocks (Task &amp; user, Technical, Operational,
  Social &amp; experience, Cognitive workload, Economic, Impact / upskilling), each with a key
  evaluation question and example **micro** (worker / cell / line) and **macro** (organisation /
  sector / policy) indicators. Participants set the task type and critical persona, rate each metric
  **1–5** for relevance and **★ star** the 3–5 they will translate onto the canvas; per-block totals
  and a badge on the KPIs box track progress. A collapsible *Background &amp; sources* holds the
  how-to steps, appendix and references. The scores autosave with the canvas draft, and travel with
  the submission into the **`Metrics`** sheet. The framework lives in `metrics-data.js`.

## Tool 2 – Assessment matrix (`inclusion.html`), two steps

**Step 1 – matrix.** Three dimensions, each defined in one line above its matrix:

* **Task characteristics (TA)** – the nature of the task and its characteristics that influence how
  a worker can perform it. Codes TA1–TA9.
* **Technology characteristics (TE)** – the features and functionality of the technology, equipment,
  and tools that influence how a worker can perform the task. Codes TE1–TE16.
* **Work organisation conditions (OR)** – the way work is structured, coordinated, and supported that
  influences how a worker can perform the task. Codes OR1–OR10.

Each dimension is a 5 × 4 grid of **worker groups** (novice / learning-vulnerable, deaf and
hard-of-hearing, aging, physical support needs, cognitive support needs) × **outcomes**
(Augmentation, Inclusion, Symbiosis, Empowerment), pre-filled with the WP3 research baseline.
Participants click a cell, tick / untick codes, add a note, rename codes, mark frequent ones (★) or
add new codes. *Expand codes* shows the full text of every code inside the cells; *Expand list*
shows the legend with full, editable descriptions.

**Step 2 – linked solution canvas.** The canvas template, interconnected with step 1: it opens with
a read-only **Learning pathways** box recalling the four pathways (the matrix columns); the Persona
picker is the matrix rows; the Solution box has three layers whose selectable codes come from the
step-1 lists, with the codes step 1 assigned to the selected personas ringed in yellow as
suggestions (each list has an *Expand* toggle for full text). Free-text boxes for challenge, pain
points, goals, UVP, risks, KPIs, skills and action plan complete the canvas, laid out **one colour
per row** like tool 1, ending in a **Feedback** row (rating + free text on the canvas design, stored
as `canvas:rating` / `canvas:feedback`). One **Submit** sends both steps together. **Reset** returns
to the baseline.

## Tool 3 – Use case matching toolkit (`usecases.html`)

Built from the *SkillAIbility high-level mapping of use cases across target groups and pathways*:
all 19 use cases with technology, NACE sector and target-group × pathway placements are embedded in
`usecases-data.js`. Participants choose their **institute** (CHALMERS, NTNU, LMS, MADE, TKNIKA) and
see only that institute's use cases. For each one they tick the task characteristics (TA) it impacts or requires, and the technology requirements
(TE) and organisational conditions (OR) needed to implement it (lists loaded live from the matrix, each expandable to full
text), judge whether the lists are **sufficient to implement** the use case (yes / partly / no) and
note what is missing.

## Facilitator setup (≈3 minutes, one time)

The pages are static (GitHub Pages), so submissions are collected through a small Google Apps Script
attached to a Google Sheet you own.

1. Create a new Google Sheet (e.g. *SkillAIbility WP3 – submissions*).
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste the contents of
   [`apps-script/Code.gs`](apps-script/Code.gs). Save.
3. Run the `setup` function once (select `setup` in the toolbar dropdown → ▶ Run) and accept the
   permission prompts (Sheets, send email, fetch for the Excel export). This creates the data tabs
   and sends a **test email** with the workbook attached.
4. **Deploy → New deployment → ⚙ Select type: Web app** – Execute as **Me**, Who has access
   **Anyone** → **Deploy**, then copy the **Web app URL** (ends in `/exec`).
5. Open `config.js` in this repo and paste the URL between the quotes:

   ```js
   const SUBMIT_URL = "https://script.google.com/macros/s/…/exec";
   ```

   Commit – GitHub Pages redeploys in about a minute. All three tools read this one file.

Until the URL is set, **Submit** downloads a JSON file instead, so the tools are usable offline or
before setup. Opening the web-app URL in a browser shows a health check with the row counts.

> After editing `Code.gs`, run **Deploy → Manage deployments → ✎ → Version: New** for the change to
> go live. The URL stays the same.

### Automatic results email

Submitting is fast (a second or two): the request only writes the rows. The email – which exports
the whole workbook to Excel – is queued in a hidden `_Outbox` tab and sent by a background run about
a minute later, so it typically lands in the inbox 1–2 minutes after Submit. A guided-flow
submission sends its parts in parallel and produces **one** email listing all steps.

On every submission the script emails **huizhong@chalmers.se** and **sandra.jaksic@chalmers.se**
(the `EMAIL_TO` constant at the top of `Code.gs`) a formatted summary of what the group submitted
plus the **complete workbook as an .xlsx attachment** – all tabs, all submissions so far – so the
inbox always holds an analysis-ready Excel file. Set `SEND_EMAIL = false` to switch the emails off;
email problems never block a submission. (Google's quota is ~100 emails/day for personal accounts,
~1500/day for workspace accounts.)

## Running a workshop

* Share the **start-page URL** (or a QR code) with each group; one device per group is enough. The
  group picks the **Industrial** or **Professional** pathway and is then guided step by step.
* After picking a pathway the group enters **Company**, **Participants** and **Date** once on the
  start page; these carry into every tool automatically. Participants from one company count as one
  group, and re-submissions are told apart by `received_at`.
* The pathway sets the order automatically: Industrial = canvas → solution canvas; Professional =
  use case matching → canvas → matrix → solution canvas. Each step opens with its instructions and an
  estimated time.
* Groups can submit as often as they like. If Wi-Fi is unreliable, they can **Export** a JSON file
  and hand it in; you can **Import** it on your machine and submit from there.
* Each browser keeps one draft per tool. **Clear** (canvas, toolkit) or **Reset** (matrix) starts
  fresh on the same device.

## Analysing the data

| Tab | Content |
|---|---|
| `Canvas` | One row per workforce-canvas submission: metadata, personas, every canvas field, the three solution layers, and the canvas-design feedback (`canvas_rating` 1–5, `canvas_feedback`) |
| `Assessment` | One row per assessment submission: metadata, personas, all step-2 fields, the three solution layers (codes + text), the canvas feedback (`canvas:rating` / `canvas:feedback`), one column per matrix cell (`TE:aging:inclusion` = "TE8", …), one note column per cell, and the code definitions as JSON |
| `Assessment_cells` | Long format, one row per code entry – `source` says whether it came from the step-1 matrix (with worker group × outcome) or the step-2 solution layers. Pivot this for frequency analysis |
| `Assessment_codes` | Code definitions as each group left them – shows renamed / newly added codes |
| `UseCases` | One row per (submission, use case): institute, linked TA/TE/OR codes, sufficiency verdict (`yes` / `partly` / `no`) and the missing-items note |
| `Metrics` | One row per scored success metric on a workforce-canvas submission: `task_type`, `context` (persona &amp; task), `block`, `metric_id`, `metric`, `rating` (1–5) and `priority` (`yes` / `no`). Pivot on `metric`/`block` for which metrics groups prioritise |

Metadata on every row: `submission_id`, `company`, `participants`, `date`, `received_at`.

## Customising

* **Pathways, step order, instructions & time estimates** – `FLOWS` in `flow.js` (each step has
  `page`, optional `istep` for `inclusion.html`, `name`, `time`, `purpose` and `instr` bullets).
* **Start-page text** – `index.html` (the welcome intro and the two version cards render from `flow.js`).
* **Canvas prompts / examples** – the text inside each `<section class="box">` in `canvas.html`.
* **Worker groups, outcomes, codes and the matrix baseline** – `GROUPS`, `OUTCOMES` and
  `DIMENSIONS` at the top of the script in `inclusion.html` (keep the group ids in sync with
  `PERSONA_GROUPS` in `canvas.html`, `MATRIX_TO_UC_GROUP` in `usecases-data.js` and `GROUPS` in
  `Code.gs`).
* **Use cases, partners, NACE codes, mapping** – `usecases-data.js`.
* **Success-metrics framework** – the blocks, metrics and indicators in `metrics-data.js`
  (`SUCCESS_METRICS`); keep the metric ids in sync with `METRIC_LABELS` in `Code.gs` so the
  `Metrics` sheet stays readable.
* **Dimension definitions** – `charsDef` in `DIMENSIONS` (`inclusion.html`).
* **Email recipients** – `EMAIL_TO` in `Code.gs`.
* **Workshop tag** – `WORKSHOP_ID` in each page; stored with every row.
* **Colours** – the CSS variables at the top of each page.

## Files

| File | Purpose |
|---|---|
| `index.html` | **Start page** – the pathway chooser (Industrial / Professional) with per-step instructions and times |
| `flow.js` | The two guided pathways (`FLOWS`), the in-tool flow bar and the instruction/time gate; shared by the start page and every tool |
| `canvas.html` | Tool 1 – human-centric workforce canvas (single self-contained page, no build step) |
| `inclusion.html` | Tool 2 – assessment matrix, steps 1 and 2, with the research baseline embedded |
| `usecases.html` | Tool 3 – use case matching toolkit |
| `usecases-data.js` | The 19 use cases, partners, NACE codes, mapping placements and baseline code lists |
| `metrics-data.js` | The *Success metrics to evaluate use cases* framework: blocks, metrics, indicators, how-to, appendix, references (used by the scoring sheet in `canvas.html`) |
| `config.js` | One setting: the Google Apps Script URL all tools submit to |
| `apps-script/Code.gs` | Google Apps Script: writes submissions to the Sheet and emails the Excel workbook |
| `canvas-original.png` | The original static canvas the workforce canvas is based on |

---
Part of the SkillAIbility project, Work Package 3.
