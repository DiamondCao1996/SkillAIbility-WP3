# SkillAIbility WP3 – Interactive Workshop Tools

Interactive, browser-based workshop tools for SkillAIbility Work Package 3. Participants work on
any laptop or tablet, and every submission lands in a Google Sheet owned by the facilitator.

| Tool | Live page |
|---|---|
| **Human-centric workforce canvas** – Challenge → Persona → Pain points → Goals → Solution → UVP → Risks → KPIs → Skills → Action plan | https://diamondcao1996.github.io/SkillAIbility-WP3/ |
| **Assessment matrix** – *Organisation → Inclusion*: task, technology and organisation requirements per worker group × outcome | https://diamondcao1996.github.io/SkillAIbility-WP3/inclusion.html |

## The human-centric workforce canvas

* The familiar canvas layout (Challenge → Persona → Pain points → Goals → Solution → UVP → Risks → KPIs → Skills → Action plan), with the original prompts and examples.
* Header fields for *Group / team*, *Company / use case*, *Participants* and *Date*.
* **Autosave** in the browser – closing the tab and coming back restores the draft.
* **Submit canvas** – sends the canvas to the facilitator's Google Sheet. Groups can re-submit; every submission is stored as its own row (latest `received_at` wins).
* **Export / Import** – download the canvas as JSON (also `Ctrl/Cmd + S`) and load it again later.
* **Print** – A3 landscape print / save as PDF, keeps the colours.
* Works on desktop, tablet and phone (layout reflows).

## The assessment matrix (`inclusion.html`)

Three dimensions, each a 5 × 4 grid of **worker groups** (novice / learning-vulnerable, deaf and
hard-of-hearing, aging, physical support needs, cognitive support needs) × **outcomes**
(Augmentation, Inclusion, Symbiosis, Empowerment):

* **TA – Task requirements** (TA1–TA8; TA2–TA8 left blank for participants to define)
* **TE – Technology requirements** (TE1–TE10)
* **OR – Organisation conditions** (OR1–OR8)

Cells are pre-filled with the WP3 research baseline. Participants click a cell, tick/untick the
codes that apply, add a note, rename codes, mark frequent ones (★) or add new codes. **Reset**
returns to the baseline. The baseline lives in `DIMENSIONS` at the top of the script in
`inclusion.html` – edit it there to change the pre-fill.

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

Test it: open a live page, fill in a group name and use case, press **Submit**. A new row should
appear in the sheet within a few seconds. Opening the web-app URL directly in a browser shows
`… is running. Canvas rows: N · Inclusion rows: N` as a health check.

> If you later edit `Code.gs`, you must **Deploy → Manage deployments → ✎ → Version: New** for the
> change to go live. The URL stays the same.

## Running a workshop

* Share the live URL (or a QR code of it) with each group. One device per group is enough.
* Ask groups to fill in *Group / team* and *Company / use case* first – submit requires them.
* Groups can submit as often as they like; you'll see the latest version by `received_at`.
* If Wi-Fi is unreliable, groups can **Export** a JSON file and hand it in instead – you can
  **Import** it on your own machine and submit it to the sheet from there.
* Each browser keeps one draft. To start a fresh canvas on the same device, press **Clear**.

## Analysing the data

The script creates four tabs in the sheet:

| Tab | Content |
|---|---|
| `Canvas` | One row per canvas submission: metadata + one column per canvas field (`challenge`, `persona`, `pain_points`, `goals`, `solution`, `uvp`, `risks`, `kpi_social`, `kpi_technical`, `kpi_operational`, `kpi_economic`, `skills`, `action_plan`) |
| `Inclusion` | One row per matrix submission: metadata + one column per cell (`TE:aging:inclusion` = "TE8", …), one note column per cell, and the full code definitions as JSON |
| `Inclusion_cells` | Long format, one row per (submission, dimension, worker group, outcome, code) – pivot this for frequency analysis |
| `Inclusion_codes` | Code definitions as each group left them – shows renamed / newly added codes |

Metadata on every row: `submission_id`, `group`, `use_case`, `participants`, `date`, `received_at`.

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
| `index.html` | Solution canvas – single self-contained page, no build step, no dependencies |
| `inclusion.html` | Inclusion matrix – same, with the research baseline embedded |
| `config.js` | One setting: the Google Apps Script URL both pages submit to |
| `apps-script/Code.gs` | Google Apps Script that writes submissions to the Google Sheet |
| `canvas-original.png` | The original static canvas the interactive version is based on |

---
Part of the [SkillAIbility](https://www.chalmers.se) project, Work Package 3.
