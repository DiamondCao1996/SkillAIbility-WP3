# analysis-data

Drop the collected workshop workbooks here for analysis.

Put the `.xlsx` files the WP3 collector emails you (subject *"[SkillAIbility WP3] …
submission"*) directly into this folder. Then ask Claude to analyse them — e.g.
*"analyse the files in analysis-data"*.

## Privacy

Files placed here are **git-ignored** and stay on your machine only — they are
**not** committed or pushed to the public repository. The workbooks contain
company and participant data, so this keeps them off GitHub Pages. Only this
`README.md` and the `.gitignore` are tracked.

## Expected tabs in each workbook

| Tab | Content |
|---|---|
| `Canvas` | One row per workforce-canvas submission |
| `Assessment` | One row per assessment submission (matrix cells + step-2 fields, wide) |
| `Assessment_cells` | Long / pivot-ready — one row per code entry (`source` = matrix or solution) |
| `Assessment_codes` | Code definitions as each group left them |
| `UseCases` | One row per (submission × use case) with the sufficiency verdict |

Every row carries `company`, `participants`, `date`, `received_at`, `submission_id`.
