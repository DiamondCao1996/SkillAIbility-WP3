# SkillAIbility WP3 – Interactive Workshop Tools

Interactive, browser-based workshop tools for SkillAIbility Work Package 3. Participants work on
any laptop or tablet, and every submission lands in a Google Sheet owned by the facilitator.

| Tool | Live page |
|---|---|
| **Human-centric workforce canvas** – Challenge → Persona → Pain points → Goals → Solution → UVP → Risks → KPIs → Skills → Action plan | https://diamondcao1996.github.io/SkillAIbility-WP3/ |
| **Assessment matrix** – two steps: (1) requirement matrix per worker group × outcome, (2) a solution canvas linked to the matrix | https://diamondcao1996.github.io/SkillAIbility-WP3/inclusion.html |
| **Use case matching toolkit** – match your institute's SkillAIbility use cases against the requirement lists and mark gaps | https://diamondcao1996.github.io/SkillAIbility-WP3/usecases.html |

**How the tools fit together** (also shown as a guide strip on every page): the **canvas** is for
open-ended discussion and brainstorming around a case; the **assessment matrix** organises those
ideas into actionable requirement checklists and turns them into a linked solution design; the
**use case matching toolkit** tests the requirement lists against the project's real use cases and
surfaces what is missing. The tools stay interconnected in the browser: the matrix code lists
(including renamed/added codes) feed both the step-2 solution canvas and the use case toolkit, and
the step-2 persona picker shows the SkillAIbility use cases mapped to the selected worker groups.

## The human-centric workforce canvas

* The familiar canvas layout (Challenge → Persona → Pain points → Goals → Solution → UVP → Risks → KPIs → Skills → Action plan), with the original prompts and examples.
* Header fields for *Group / team*, *Company / use case*, *Participants* and *Date*.
* **Autosave** in the browser – closing the tab and coming back restores the draft.
* **Submit canvas** – sends the canvas to the facilitator's Google Sheet. Groups can re-submit; every submission is stored as its own row (latest `received_at` wins).
* **Export / Import** – download the canvas as JSON (also `Ctrl/Cmd + S`) and load it again later.
* **Print** – A3 landscape print / save as PDF, keeps the colours.
* Works on desktop, tablet and phone (layout reflows).

## The assessment matrix (`inclusion.html`) – two steps

**Step 1 – matrix.** Three dimensions, each a 5 × 4 grid of **worker groups** (novice /
learning-vulnerable, deaf and hard-of-hearing, aging, physical support needs, cognitive support
needs) × **outcomes** (Augmentation, Inclusion, Symbiosis, Empowerment):

* **TA – Task requirements** (TA1–TA8; TA2–TA8 left blank for participants to define)
* **TE – Technology requirements** (TE1–TE10)
* **OR – Organisation conditions** (OR1–OR8)

Cells are pre-filled with the WP3 research baseline. Participants click a cell, tick/untick the
codes that apply, add a note, rename codes, mark frequent ones (★) or add new codes.

**Step 2 – linked solution canvas.** The canvas layout, interconnected with step 1: the
**Persona** box is a picker over the five worker groups (the matrix rows), and the **Solution**
box has three layers – task, technology, organisational conditions – whose selectable codes come
from the step-1 lists, with the codes step 1 assigned to the selected personas ringed in yellow
as suggestions. Free-text boxes for challenge, pain points, goals, UVP, risks, KPIs, skills and
action plan complete the canvas. One **Submit** sends both steps together. **Reset** returns to
the baseline; the baseline lives in `DIMENSIONS` at the top of the script in `inclusion.html`.

## The use case matching toolkit (`usecases.html`)

Built from the *SkillAIbility high-level mapping of use cases across target groups and pathways*
(all 19 use cases with technology, NACE sector and target-group × pathway placements are embedded
in `usecases-data.js`). Participants choose their **institute** (CHALMERS, NTNU, LMS, MADE,
TKNIKA) and see only that institute's use cases. For each one they tick which **TA / TE / OR
requirements** from the assessment matrix the use case addresses – the lists load live from the
matrix draft in the same browser – then judge whether the lists are **sufficient** for the use
case (yes / partly / no) and note what is missing.

## Facilitator setup (≈3 minutes, one time)

The page is static (GitHub Pages), so submissions are collected through a tiny Google Apps Script
attached to a Google Sheet you own.

1. Create a new Google Sheet (e.g. *SkillAIbility WP3 – Canvas submissions*).
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste the contents of
   [`apps-script/Code.gs`](apps-script/Code.gs). Save (💾).
3. Run the `setup` function once (select `setup` in the toolbar dropdown → ▶ Run) and accept the
   permission prompt. This creates the data tabs with headers.
4. **Deploy → New deployment → ⚙ Select type: Web app**
   * Description: `WP3 canvas`
   * Execute as: **Me**
   * Who has access: **Anyone**
   * Click **Deploy**, then copy the **Web app URL** (ends in `/exec`).
5. Open `config.js` in this repo and paste the URL between the quotes:

   ```js
   const SUBMIT_URL = "https://script.google.com/macros/s/…/exec";
   ```

   Commit – GitHub Pages redeploys in about a minute. Both tools read this one file.

Running `setup` also sends a **test email** with the workbook attached, so you can confirm the
whole chain at once. Test the live flow: open a page, fill in the Company field, press **Submit**.
A new row appears in the sheet and an email lands at the addresses in `EMAIL_TO` within ~1 minute.
Opening the web-app URL directly in a browser shows `… is running. Canvas rows: N · Assessment
rows: N` as a health check.

### Automatic results email

On every submission the script emails **huizhong@chalmers.se** and **sandra.jaksic@chalmers.se**
(the `EMAIL_TO` constant at the top of `Code.gs`):

* a formatted summary of what the group just submitted, and
* the **complete workbook as an .xlsx attachment** – all tabs, all submissions so far – so the
  inbox always holds an analysis-ready Excel file without touching the sheet.

Set `SEND_EMAIL = false` in `Code.gs` to switch the emails off (data still lands in the sheet).
Email problems never block a submission. Quota note: Google caps Apps Script at ~100 emails/day
for personal accounts and ~1500/day for workspace accounts – far above workshop volumes.

> If you later edit `Code.gs`, you must **Deploy → Manage deployments → ✎ → Version: New** for the
> change to go live. The URL stays the same.

## Running a workshop

* Share the live URL (or a QR code of it) with each group. One device per group is enough.
* Ask each company's participants to fill in *Company* first – submit requires it; participants
  from one company count as one group, and re-submissions are told apart by `received_at`.
* Groups can submit as often as they like; you'll see the latest version by `received_at`.
* If Wi-Fi is unreliable, groups can **Export** a JSON file and hand it in instead – you can
  **Import** it on your own machine and submit it to the sheet from there.
* Each browser keeps one draft. To start a fresh canvas on the same device, press **Clear**.

## Analysing the data

The script creates four tabs in the sheet:

| Tab | Content |
|---|---|
| `Canvas` | One row per workforce-canvas submission: metadata + one column per canvas field |
| `Assessment` | One row per assessment submission: metadata, selected personas, all step-2 canvas fields, the three solution layers (codes + free text), one column per matrix cell (`TE:aging:inclusion` = "TE8", …), one note column per cell, and the code definitions as JSON |
| `Assessment_cells` | Long format, one row per code entry – `source` says whether it came from the step-1 matrix (with worker group × outcome) or the step-2 solution layers. Pivot this for frequency analysis |
| `Assessment_codes` | Code definitions as each group left them – shows renamed / newly added codes |
| `UseCases` | One row per (submission, use case): institute, linked TA/TE/OR codes, sufficiency verdict (`yes`/`partly`/`no`) and the missing-items note |

Metadata on every row: `submission_id`, `company`, `participants`, `date`, `received_at`.

## Customising

* **Prompts / examples** – edit the text inside each `<section class="box">` in `index.html`.
* **Add a field** – add a `<textarea data-key="my_field">` in `index.html` and append
  `"my_field"` to `CANVAS_FIELDS` in `Code.gs` (then redeploy the script).
* **Matrix baseline, groups, outcomes, codes** – `GROUPS`, `OUTCOMES` and `DIMENSIONS` at the top
  of the script in `inclusion.html`; keep `GROUPS`/`OUTCOMES` ids in sync with `Code.gs`.
* **Workshop tag** – change `WORKSHOP_ID` in each page if you reuse the tools for another
  workshop; it is stored with every row.
* **Colours** – the CSS variables at the top of each page.

## Files

| File | Purpose |
|---|---|
| `index.html` | Human-centric workforce canvas – single self-contained page, no build step, no dependencies |
| `inclusion.html` | Assessment matrix (two steps) – same, with the research baseline embedded |
| `usecases.html` | Use case matching toolkit |
| `usecases-data.js` | The 19 use cases, partners, NACE codes and mapping placements |
| `config.js` | One setting: the Google Apps Script URL all pages submit to |
| `apps-script/Code.gs` | Google Apps Script that writes submissions to the Google Sheet |
| `canvas-original.png` | The original static canvas the interactive version is based on |

---
Part of the [SkillAIbility](https://www.chalmers.se) project, Work Package 3.
