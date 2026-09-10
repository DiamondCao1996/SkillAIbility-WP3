/* SkillAIbility WP3 – Success metrics to evaluate use cases
 * ---------------------------------------------------------
 * Success-metric blocks for vulnerable-worker technology adoption use cases.
 * Each block carries a key evaluation question; each metric carries example
 * MICRO indicators (worker / cell / line) and MACRO indicators
 * (organisation / sector / policy). Participants rate each metric 1–5 for
 * relevance and star the 3–5 they will translate onto the workforce canvas.
 *
 * Shared by index.html (the scoring overlay opened from the KPIs box).
 * Ids are stable – keep them if you re-order, they key the saved scores.
 */
const METRICS_INTRO =
  "Columns give the key evaluation question, plus example micro indicators (worker / cell / line) and " +
  "macro indicators (organisation / sector / policy). For a specific use case, pick 3–5 metrics from this " +
  "sheet and translate them directly into fields on your workforce canvas – e.g. “Operational – task time & " +
  "rework”, “Social – trust & perceived fairness”, “Impact – upskilling path for persona”.";

const METRICS_TASK_TYPES = ["Maintenance", "Assembly", "Other"];

const SUCCESS_METRICS = [
  {
    id: "taskuser", name: "Task & user (Maintenance / Assembly)",
    question: "When does the technology matter most, and for whom? Describe the task and the critical vulnerable user.",
    metrics: [
      { id: "taskuser.1", label: "Task type & scenario",
        micro: "Number of high-risk steps supported by the tool; share of total task time the tool is used.",
        macro: "" },
      { id: "taskuser.2", label: "Vulnerable persona fit",
        micro: "% of vulnerable workers who complete the task with the tool and no extra human help; perceived accessibility (1–5: see / hear / understand / operate) before vs after.",
        macro: "" },
      { id: "taskuser.3", label: "Safety & strain at task level",
        micro: "Change in ergonomic risk score (RULA / REBA or equivalent); near-misses or incidents per 100 tasks.",
        macro: "" }
    ]
  },
  {
    id: "technical", name: "Technical",
    question: "Does the technology work reliably and accurately enough for this persona in this context?",
    metrics: [
      { id: "technical.1", label: "Technical accuracy / performance",
        micro: "Error rate of system outputs (wrong diagnosis, mis-detected component, false positives / negatives); task-critical “first-time-right” success rate vs baseline.",
        macro: "" },
      { id: "technical.2", label: "Reliability & latency",
        micro: "Uptime during shifts; number of failures that interrupt work; response time / latency vs the acceptable threshold for the task.",
        macro: "" },
      { id: "technical.3", label: "Fit with existing systems",
        micro: "Number of manual workarounds needed; integration with tools vulnerable workers already use (e.g. speech input where reading is hard); integration issues reported in the pilot.",
        macro: "" }
    ]
  },
  {
    id: "operational", name: "Operational",
    question: "Does the technology make the work easier, faster and higher quality — especially for vulnerable workers?",
    metrics: [
      { id: "operational.1", label: "Time & throughput",
        micro: "Task completion time (median & variability) before vs after, split by vulnerable / non-vulnerable subgroups; interruptions or help-requests per task.",
        macro: "" },
      { id: "operational.2", label: "Quality & reliability of output",
        micro: "Defect / rework rate; number of missed steps in checklists; mean time between failures after maintenance.",
        macro: "" },
      { id: "operational.3", label: "Learning outcome & process stability",
        micro: "Learning-curve slope over repetitions (vulnerable vs others); retention of procedure knowledge after a delay (e.g. one week).",
        macro: "" }
    ]
  },
  {
    id: "social", name: "Social & experience",
    question: "Do vulnerable workers feel supported, with dignity and autonomy, and does the tool fit their social context?",
    metrics: [
      { id: "social.1", label: "Usability & accessibility",
        micro: "Usability score (SUS or a tailored short scale); accessibility score across visual / auditory / motor / language.",
        macro: "" },
      { id: "social.2", label: "Trust, acceptance & perceived fairness",
        micro: "Agreement with “this tool helps me do my job” / “it does not put my job at risk” (Likert); perceived fairness of data use & monitoring (fear of surveillance, performance pressure).",
        macro: "" },
      { id: "social.3", label: "Social usability",
        micro: "Effect on collaboration & communication (easier to ask for help / coordinate?); incidents of exclusion or stigma linked to tool use.",
        macro: "" }
    ]
  },
  {
    id: "workload", name: "Cognitive workload",
    question: "Does the technology reduce unnecessary mental load while keeping situation awareness and decision quality?",
    metrics: [
      { id: "workload.1", label: "Subjective workload",
        micro: "NASA-TLX or similar (overall + sub-dimensions such as mental demand and frustration) before vs after, vulnerable vs non-vulnerable.",
        macro: "" },
      { id: "workload.2", label: "Objective indicators (where feasible)",
        micro: "Heart rate / HRV trends during critical steps; changes in error patterns under time pressure; optional EEG / fNIRS in advanced pilots.",
        macro: "" }
    ]
  },
  {
    id: "economic", name: "Economic",
    question: "Is the technology worth it, considering costs, effort and risks for vulnerable workers and the organisation?",
    metrics: [
      { id: "economic.1", label: "Cost–effort (micro)",
        micro: "Extra time & effort for vulnerable workers to learn & use the tool (training hours, coaching sessions); change in overtime, absenteeism or injury-related costs.",
        macro: "" },
      { id: "economic.2", label: "Cost & performance (macro)",
        micro: "",
        macro: "Maintenance cost, downtime and scrap / rework at line or plant level before vs after; investment vs payback period, including retaining / rehiring vulnerable workers rather than replacing them." }
    ]
  },
  {
    id: "impact", name: "Impact / upskilling",
    question: "Does the technology expand capabilities and career options for vulnerable workers rather than marginalising them?",
    metrics: [
      { id: "impact.1", label: "Upskilling & job security",
        micro: "Number / % of vulnerable workers taking on more complex or higher-value tasks after training with the tool; self-efficacy for learning new tech and perceived job security.",
        macro: "" },
      { id: "impact.2", label: "Inclusion & retention (micro → macro)",
        micro: "Retention of vulnerable workers in roles where the tool is deployed vs similar roles without it.",
        macro: "Change over time in the share of vulnerable workers in skilled positions or training programmes, linking pilots to broader skills & employment indicators." }
    ]
  }
];

const METRICS_HOWTO = [
  "Specify persona + vulnerability + task (maintenance / assembly).",
  "Select 3–5 priority metrics across the blocks (1–2 technical / operational, 1 social / experience, 1 workload, 1 economic / impact).",
  "For each metric define baseline, target and method (instrument, sample, when measured).",
  "Mark micro vs macro relevance (e.g. “worker / line only” vs “feeds a national skills indicator”)."
];

const METRICS_APPENDIX = [
  { h: "Maintenance", t: "Maintenance and assembly are the two primary industrial activities most likely to be impacted by these issues. Maintenance activities are inherently complex, influenced by factors like working with active processes, time constraints and diverse machinery, each requiring specialised methods and processes (Alhaag et al., 2022)." },
  { h: "Assembly", t: "Assembly activities are inherently complex due to the intricate coordination required between system components — automated machinery, cyber-physical systems and human operators (Wang et al., 2022a). Assembly operations often require handling multiple components with varying geometries, tolerances and material properties, making precision and adaptability critical (Fujimoto et al., 2003)." },
  { h: "Cognitive workload", t: "“CWL can be assessed subjectively through self-report questionnaires like the NASA-TLX, widely used to measure mental workload and cognitive stress. Self-reporting has limits, as participants may struggle to give real-time feedback. Objective assessments measure CWL with reproducible, quantitative data — physiological or neurophysiological responses such as EEG, functional near-infrared spectroscopy, skin temperature and heart rate.” (link.springer.com/article/10.1007/s10845-025-02716-z)" },
  { h: "Economic", t: "Reduce maintenance costs while minimising the risk of plant downtime, ultimately enhancing production performance (Zonta et al., 2020)." }
];

const METRICS_REFS = [
  "https://www.mdpi.com/1424-8220/22/7/2714",
  "http://mhealth.jmir.org/2015/2/e61/",
  "https://pmc.ncbi.nlm.nih.gov/articles/PMC4464193/",
  "https://pmc.ncbi.nlm.nih.gov/articles/PMC9013661/",
  "https://pmc.ncbi.nlm.nih.gov/articles/PMC10280872/",
  "https://res.mdpi.com/d_attachment/ijerph/ijerph-17-02438/article_deploy/ijerph-17-02438.pdf",
  "https://ieeexplore.ieee.org/document/10374291/",
  "https://www.nature.com/articles/s41746-024-01064-1",
  "http://www.emerald.com/ajb/article/40/1/43-63/1242384",
  "http://www.emerald.com/jm2/article/20/3/701-731/1241028",
  "https://ojs.uni-miskolc.hu/index.php/multi/article/view/2282",
  "https://www.scirp.org/journal/doi.aspx?doi=10.4236/jis.2024.154032",
  "https://journals.sagepub.com/doi/10.1177/21582440241271176",
  "http://medrxiv.org/lookup/doi/10.1101/2025.08.14.25333740",
  "https://www.tandfonline.com/doi/full/10.1080/10926755.2023.2292552",
  "https://aging.jmir.org/2025/1/e60297",
  "https://hrmars.com/papers_submitted/14822/the-determinants-of-digital-workplace-adoption-a-conceptual-framework.pdf",
  "https://journals.sagepub.com/doi/pdf/10.1177/00104140211024290"
];
