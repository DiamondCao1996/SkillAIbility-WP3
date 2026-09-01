# SkillAIbility WP3 – Interactive Solution Canvas

An interactive, browser-based version of the SkillAIbility WP3 solution canvas, built as a
data-collection tool for workshops. Participants fill in the canvas on any laptop or tablet,
and each submission lands as a row in a Google Sheet owned by the facilitator.

**Live canvas:** https://diamondcao1996.github.io/SkillAIbility-WP3/

## What participants get

* The familiar canvas layout (Challenge → Persona → Pain points → Goals → Solution → UVP → Risks → KPIs → Skills → Action plan), with the original prompts and examples.
* Header fields for *Group / team*, *Company / use case*, *Participants* and *Date*.
* **Autosave** in the browser – closing the tab and coming back restores the draft.
* **Submit canvas** – sends the canvas to the facilitator's Google Sheet. Groups can re-submit; every submission is stored as its own row (latest `received_at` wins).
* **Export / Import** – download the canvas as JSON (also `Ctrl/Cmd + S`) and load it again later.
* **Print** – A3 landscape print / save as PDF, keeps the colours.
* Works on desktop, tablet and phone (layout reflows).

## Facilitator setup (≈3 minutes, one time)

The page is static (GitHub Pages), so submissions are collected through a tiny Google Apps Script
attached to a Google Sheet you own.

1. Create a new Google Sheet (e.g. *SkillAIbility WP3 – Canvas submissions*).
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste the contents of
   [`apps-script/Code.gs`](apps-script/Code.gs). Save (💾).
3. Run the `setup` function once (select `setup` in the toolbar dropdown → ▶ Run) and accept the
   permission prompt. This creates the *Submissions* tab with headers.
4. **Deploy → New deployment → ⚙ Select type: Web app**
   * Description: `WP3 canvas`
   * Execute as: **Me**
   * Who has access: **Anyone**
   * Click **Deploy**, then copy the **Web app URL** (ends in `/exec`).
5. Open `index.html` in this repo, find the line near the bottom

   ```js
   const SUBMIT_URL = "";
   ```

   and paste the URL between the quotes. Commit – GitHub Pages redeploys in about a minute.

Test it: open the live page, fill in a group name and use case, press **Submit canvas**. A new row
should appear in the sheet within a few seconds. Opening the web-app URL directly in a browser shows
`… is running. Rows: N` as a health check.

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

Every row in the sheet has one column per canvas field (`challenge`, `persona`, `pain_points`,
`goals`, `solution`, `uvp`, `risks`, `kpi_social`, `kpi_technical`, `kpi_operational`,
`kpi_economic`, `skills`, `action_plan`) plus metadata (`submission_id`, `group`, `use_case`,
`participants`, `date`, `received_at`). Download as CSV/XLSX or connect it to your analysis tool.

## Customising

* **Prompts / examples** – edit the text inside each `<section class="box">` in `index.html`.
* **Add a field** – add a `<textarea data-key="my_field">` in `index.html` and append
  `"my_field"` to `COLUMNS` in `Code.gs` (then redeploy the script).
* **Workshop tag** – change `WORKSHOP_ID` in `index.html` if you reuse the canvas for another
  workshop; it is stored with every row.
* **Colours** – the CSS variables at the top of `index.html`.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole canvas – single self-contained file, no build step, no dependencies |
| `apps-script/Code.gs` | Google Apps Script that writes submissions to the Google Sheet |
| `canvas-original.png` | The original static canvas the interactive version is based on |

---
Part of the [SkillAIbility](https://www.chalmers.se) project, Work Package 3.
