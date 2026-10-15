/* Shared theme dictionary for the workforce-canvas synthesis (used by the analysis scripts and results.html).
   Each theme lists the canvas fields it is looked for in and keyword stems (case-insensitive; stems of up to 3 characters are matched as whole words). */
function themeHits(text, kw) {
  const t = String(text || "").toLowerCase();
  return kw.filter(k => k.length <= 3 ? new RegExp("\\b" + k + "\\b").test(t) : t.includes(k));
}
const CANVAS_THEMES = [
  { cat: "Challenge & pain points", themes: [
    { name: "Remembering / following instruction sequences", fields: ["challenge","pain_points"], kw: ["instruction","sequence","steps","remember","memor","follow"] },
    { name: "Knowledge, training & trainer availability", fields: ["challenge","pain_points"], kw: ["knowledge","training","teacher","trainer","learning profile","content"] },
    { name: "Language & cultural barriers", fields: ["challenge","pain_points"], kw: ["language","linguistic","translat","cultural"] },
    { name: "Cognitive load / mental strain", fields: ["challenge","pain_points","goals"], kw: ["cognitive","mental load","burden","alienation","overload"] },
    { name: "Safety & hazardous work", fields: ["challenge","pain_points","goals"], kw: ["safety","safe","hazard","danger"] },
    { name: "Time pressure / limits", fields: ["challenge","pain_points"], kw: ["time","30 min","long as you want"] },
    { name: "Exclusion from tasks", fields: ["challenge","pain_points"], kw: ["exclu","dependence","not capable"] },
  ]},
  { cat: "Goals", themes: [
    { name: "Quality & fewer errors", fields: ["goals","uvp"], kw: ["quality","precision","error","mistake","defect","properly"] },
    { name: "Productivity & throughput", fields: ["goals","uvp"], kw: ["productiv","throughput","faster","efficien"] },
    { name: "Safety", fields: ["goals","uvp"], kw: ["safe"] },
    { name: "Inclusion & autonomy of workers", fields: ["goals","uvp"], kw: ["inclusion","inclusive","autonom","empower","on their own","without human"] },
    { name: "Reduced mental load / stress", fields: ["goals","uvp"], kw: ["mental load","stress","cognitive","ease"] },
  ]},
  { cat: "Solution – technology", themes: [
    { name: "AR / MR glasses, projected guidance", fields: ["solution_technology","solution_task","uvp"], kw: ["augmented","ar","mr","mixed reality","glasses","arkite","projected"] },
    { name: "Visual guidance station / lights / feedback", fields: ["solution_technology","solution_task","uvp"], kw: ["visual","light","feedback system","video"] },
    { name: "VR training", fields: ["solution_technology","solution_task"], kw: ["vr","virtual"] },
    { name: "AI assistant / RAG / LLM", fields: ["solution_technology","solution_task","uvp"], kw: ["ai assistant","assistant","rag","vllm","ollama","llm","vector database","ai guidance","guided by ai"] },
    { name: "Cobot / robot", fields: ["solution_technology","solution_task"], kw: ["cobot","robot"] },
  ]},
  { cat: "Solution – organisation", themes: [
    { name: "Less supervisor / expert dependence", fields: ["solution_organisation"], kw: ["supervis","expert","without human","external"] },
    { name: "Training & train-the-trainer", fields: ["solution_organisation","action_plan","skills"], kw: ["train","trainer","learning time","familiari"] },
    { name: "Job rotation / flexible assignment", fields: ["solution_organisation","uvp"], kw: ["rotation","assign","agile"] },
    { name: "Worker co-design & feedback", fields: ["solution_organisation","action_plan"], kw: ["co-design","design of the ar","workshop","involve","operators"] },
    { name: "Monitoring wellbeing & performance", fields: ["solution_organisation"], kw: ["monitor","wellbeing","satisfaction","performance"] },
  ]},
  { cat: "Risks", themes: [
    { name: "Headset discomfort / wearing time", fields: ["risks","pain_points"], kw: ["glasses","weight","comfort","wearing","visor","30 min"] },
    { name: "Over-reliance on AI / wrong advice", fields: ["risks"], kw: ["rely","reliance","overely","not always","correct advice","complacen"] },
    { name: "Loss of agency / feeling controlled", fields: ["risks"], kw: ["agency","controlled","control"] },
    { name: "Boredom, de-skilling, turnover", fields: ["risks"], kw: ["annoyed","turnover","mental stimulation","bored","deskill"] },
    { name: "Technology acceptance / dislike", fields: ["risks"], kw: ["dislike","acceptance","accept"] },
    { name: "Design / integration complexity", fields: ["risks","action_plan"], kw: ["complex","integrat","technical development"] },
    { name: "Safety", fields: ["risks"], kw: ["safe"] },
  ]},
  { cat: "KPIs", themes: [
    { name: "Technology acceptance & satisfaction", fields: ["kpi_social"], kw: ["acceptance","satisfaction","alienation"] },
    { name: "Stress / wellbeing", fields: ["kpi_social"], kw: ["stress","wellbeing","well-being"] },
    { name: "Accuracy & reliability", fields: ["kpi_technical"], kw: ["accura","reliab"] },
    { name: "Productivity & throughput", fields: ["kpi_technical","kpi_operational","kpi_economic"], kw: ["productiv","throughput"] },
    { name: "Quality", fields: ["kpi_technical","kpi_operational"], kw: ["quality"] },
    { name: "Learning / onboarding time", fields: ["kpi_operational","kpi_economic"], kw: ["learning","time of learning","onboard"] },
    { name: "Cost / ROI", fields: ["kpi_economic"], kw: ["roi","cost","return"] },
    { name: "Safety", fields: ["kpi_economic","kpi_operational","kpi_social"], kw: ["safe"] },
  ]},
];
if (typeof module !== "undefined") module.exports = { CANVAS_THEMES, themeHits };
