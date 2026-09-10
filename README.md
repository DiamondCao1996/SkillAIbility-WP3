# SkillAIbility WP3 – Interactive Workshop Toolkit

Three interconnected, browser-based workshop tools for SkillAIbility Work Package 3. Participants
work on any laptop or tablet; every submission lands in a Google Sheet owned by the facilitators and
is emailed to the research team as an Excel file automatically.

| # | Tool | Live page |
|---|---|---|
| 1 | **Human-centric workforce canvas** – open-ended discussion and brainstorming around a case | https://diamondcao1996.github.io/SkillAIbility-WP3/ |
| 2 | **Assessment matrix** – organise the ideas into actionable requirement checklists (step 1), then design a linked solution (step 2) | https://diamondcao1996.github.io/SkillAIbility-WP3/inclusion.html |
| 3 | **Use case matching toolkit** – match your institute's SkillAIbility use cases against the requirement lists and mark the gaps | https://diamondcao1996.github.io/SkillAIbility-WP3/usecases.html |

Repository: https://github.com/DiamondCao1996/SkillAIbility-WP3

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
Export / Import as JSON (`Ctrl/Cmd + S` exports), A3 landscape print / save as PDF, one **Submit**
button, and layouts that reflow for tablets and phones.

## Tool 1 – Human-centric workforce canvas (`index.html`)

The familiar canvas: Challenge → Persona → Pain points → Goals → Solution → Unique value
proposition → Risks → KPIs (social / technical / operational / economic) → Skills → Action plan,
with the original prompts and examples.

* **Persona** is a picker over the five worker groups plus a free-text field for the specific
  persona's characteristics; the related use cases are listed underneath.
* **Solution** has three free-text layers – task, technology, organisational conditions – the same
  template as the matrix's step 2, but deliberately without code lists: this tool is for open
  brainstorming.

## Tool 2 – Assessment matrix (`inclusion.html`), two steps

**Step 1 – matrix.** Three dimensions, each defined in one line above its matrix:

* **Task characteristics (TA)** – the nature of the task and its characteristics that influence how
  a worker can perform it. Codes TA1–TA8 (TA2–TA8 left blank for participants to define).
* **Technology characteristics (TE)** – the features and functionality of the technology, equipment,
  and tools that influence how a worker can perform the task. Codes TE1–TE10.
* **Work organisation conditions (OR)** – the way work is structured, coordinated, and supported that
  influences how a worker can perform the task. Codes OR1–OR8.

Each dimension is a 5 × 4 grid of **worker groups** (novice / learning-vulnerable, deaf and
hard-of-hearing, aging, physical support needs, cognitive support needs) × **outcomes**
(Augmentation, Inclusion, Symbiosis, Empowerment), pre-filled with the WP3 research baseline.
Participants click a cell, tick / untick codes, add a note, rename codes, mark frequent ones (★) or
add new codes. *Expand codes* shows the full text of every code inside the cells; *Expand list*
shows the legend with full, editable descriptions.

**Step 2 – linked solution canvas.** The canvas template, interconnected with step 1: the Persona
picker is the matrix rows; the Solution box has three layers whose selectable codes come from the
step-1 lists, with the codes step 1 assigned to the selected personas ringed in yellow as
suggestions (each list has an *Expand* toggle for full text). Free-text boxes for challenge, pain
points, goals, UVP, risks, KPIs, skills and action plan complete the canvas. One **Submit** sends
both steps together. **Reset** returns to the baseline.

## Tool 3 – Use case matching toolkit (`usecases.html`)

Built from the *SkillAIbility high-level mapping of use cases across target groups and pathways*:
all 19 use cases with technology, NACE sector and target-group × pathway placements are embedded in
`usecases-data.js`. Participants choose their **institute** (CHALMERS, NTNU, LMS, MADE, TKNIKA) and
see only that institute's use cases. For each one they tick which TA / TE / OR requirements the use
case addresses (lists loaded live from the matrix, each expandable to full text), judge whether the
lists are **sufficient** for the use case (yes / partly / no) and note what is missing.

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

On every submission the script emails **huizhong@chalmers.se** and **sandra.jaksic@chalmers.se**
(the `EMAIL_TO` constant at the top of `Code.gs`) a formatted summary of what the group submitted
plus the **complete workbook as an .xlsx attachment** – all tabs, all submissions so far – so the
inbox always holds an analysis-ready Excel file. Set `SEND_EMAIL = false` to switch the emails off;
email problems never block a submission. (Google's quota is ~100 emails/day for personal accounts,
~1500/day for workspace accounts.)

## Running a workshop

* Share the live URLs (or QR codes) with each group; one device per group is enough.
* Ask each company's participants to fill in **Company** first – submit requires it; participants
  from one company count as one group, and re-submissions are told apart by `received_at`.
* Suggested order: canvas (brainstorm) → matrix step 1 (checklists) → matrix step 2 (solution, opens
  pre-filled from the canvas) → use case matching (institutes test the lists).
* Groups can submit as often as they like. If Wi-Fi is unreliable, they can **Export** a JSON file
  and hand it in; you can **Import** it on your machine and submit from there.
* Each browser keeps one draft per tool. **Clear** (canvas, toolkit) or **Reset** (matrix) starts
  fresh on the same device.

## Analysing the data

| Tab | Content |
|---|---|
| `Canvas` | One row per workforce-canvas submission: metadata, personas, every canvas field, the three solution layers |
| `Assessment` | One row per assessment submission: metadata, personas, all step-2 fields, the three solution layers (codes + text), one column per matrix cell (`TE:aging:inclusion` = "TE8", …), one note column per cell, and the code definitions as JSON |
| `Assessment_cells` | Long format, one row per code entry – `source` says whether it came from the step-1 matrix (with worker group × outcome) or the step-2 solution layers. Pivot this for frequency analysis |
| `Assessment_codes` | Code definitions as each group left them – shows renamed / newly added codes |
| `UseCases` | One row per (submission, use case): institute, linked TA/TE/OR codes, sufficiency verdict (`yes` / `partly` / `no`) and the missing-items note |

Metadata on every row: `submission_id`, `company`, `participants`, `date`, `received_at`.

## Customising

* **Canvas prompts / examples** – the text inside each `<section class="box">` in `index.html`.
* **Worker groups, outcomes, codes and the matrix baseline** – `GROUPS`, `OUTCOMES` and
  `DIMENSIONS` at the top of the script in `inclusion.html` (keep the group ids in sync with
  `PERSONA_GROUPS` in `index.html`, `MATRIX_TO_UC_GROUP` in `usecases-data.js` and `GROUPS` in
  `Code.gs`).
* **Use cases, partners, NACE codes, mapping** – `usecases-data.js`.
* **Dimension definitions** – `charsDef` in `DIMENSIONS` (`inclusion.html`).
* **Email recipients** – `EMAIL_TO` in `Code.gs`.
* **Workshop tag** – `WORKSHOP_ID` in each page; stored with every row.
* **Colours** – the CSS variables at the top of each page.

## Files

| File | Purpose |
|---|---|
| `index.html` | Tool 1 – human-centric workforce canvas (single self-contained page, no build step) |
| `inclusion.html` | Tool 2 – assessment matrix, steps 1 and 2, with the research baseline embedded |
| `usecases.html` | Tool 3 – use case matching toolkit |
| `usecases-data.js` | The 19 use cases, partners, NACE codes, mapping placements and baseline code lists |
| `config.js` | One setting: the Google Apps Script URL all tools submit to |
| `apps-script/Code.gs` | Google Apps Script: writes submissions to the Sheet and emails the Excel workbook |
| `canvas-original.png` | The original static canvas the workforce canvas is based on |

---
Part of the SkillAIbility project, Work Package 3.
