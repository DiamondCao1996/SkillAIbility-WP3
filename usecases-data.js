/* SkillAIbility WP3 – use case mapping data
 * From "SkillAIbility High-level mapping of use cases across target groups and pathways".
 * Shared by usecases.html and inclusion.html (step 2 interconnection).
 */

/* The four SkillAIbility learning pathways – shared by all tools (same ids as the matrix columns) */
const PATHWAYS = [
  { id:"augmentation", name:"Augmentation", short:"enhance what workers can do",
    def:"Technology extends what a worker can do. It strengthens human capabilities – physical, cognitive or sensory – so the worker performs the task better, faster or more safely, while the human stays in charge of the task." },
  { id:"inclusion", name:"Inclusion", short:"make the job accessible",
    def:"Technology removes barriers so that workers who would otherwise be excluded – novice or learning-vulnerable, ageing, deaf and hard-of-hearing, or with physical or cognitive support needs – can perform the task and take part in work on equal terms." },
  { id:"symbiosis", name:"Symbiosis", short:"human and AI work as one system",
    def:"Human and technology work as one system. Tasks are shared and adapted dynamically, each side compensating for the other's limits, with continuous two-way communication, transparency and trust." },
  { id:"empowerment", name:"Empowerment", short:"workers grow and decide",
    def:"Technology helps the worker to grow and to decide. It builds skills, autonomy and confidence, and gives workers a say in how the technology and the work around it are shaped." },
];

const PARTNERS = [
  { id:"chalmers", name:"CHALMERS", color:"#f9f871" },
  { id:"ntnu",     name:"NTNU",     color:"#7fd4f5" },
  { id:"lms",      name:"LMS",      color:"#5fe3c0" },
  { id:"made",     name:"MADE",     color:"#c5cae9" },
  { id:"tknika",   name:"TKNIKA",   color:"#f8d0d8" },
];

const NACE = {
  "C19.2":"Manufacture of refined petroleum products",
  "C25.6.1":"Treatment and coating of metals",
  "C27.1.2":"Manufacture of electricity distribution and control apparatus",
  "C28.1.4":"Manufacture of other taps and valves",
  "C28.2.2":"Manufacture of lifting and handling equipment",
  "C28.9.9":"Manufacture of other special-purpose machinery n.e.c.",
  "C29.3.2":"Manufacture of other parts and accessories for motor vehicles",
  "C30.9.1":"Manufacture of motorcycles",
  "C33.1.2":"Repair of machinery",
  "C33.1.9":"Repair of other equipment"
};

/* map: "group:Pathway" entries from the mapping table.
 * groups: novice | deaf | aging | special (physical / cognitive / special support needs) */
const USE_CASES = [
  { id:"U1",  partner:"chalmers", name:"Cobot assisted clip insertion", tech:["Cobots"], nace:"C29.3.2",
    map:["special:Symbiosis"] },
  { id:"U2",  partner:"chalmers", name:"Human-in-the-loop digital twin", tech:["AI"], nace:"C27.1.2",
    map:["novice:Inclusivity"] },
  { id:"U3",  partner:"chalmers", name:"Gesture based human robot interaction through physical AI", tech:["AI"], nace:"C28.9.9",
    map:["novice:Symbiosis"] },
  { id:"U4",  partner:"chalmers", name:"MR training for adhesive application", tech:["MR"], nace:"C29.3.2",
    map:["novice:Augmentation"] },
  { id:"U5",  partner:"chalmers", name:"Humanoid social robot instructions", tech:["Humanoid social robots"], nace:"C28.9.9",
    map:["novice:Inclusivity"] },
  { id:"U6",  partner:"ntnu", name:"Digitally Assistive Assembly", tech:["AI","AR"], nace:"C29.3.2",
    map:["novice:Inclusivity","deaf:Inclusivity","aging:Inclusivity"] },
  { id:"U7",  partner:"ntnu", name:"Haptic feedback for hard of hearing operators", tech:["Computer vision & sensors"], nace:"C28.9.9",
    map:["deaf:Inclusivity","deaf:Symbiosis"] },
  { id:"U8",  partner:"ntnu", name:"Supportive order picking activities", tech:["AGVs"], nace:"C28.2.2",
    map:["aging:Augmentation","aging:Symbiosis","special:Symbiosis"] },
  { id:"U9",  partner:"ntnu", name:"Knowledge of AI use in manufacturing", tech:["AI"], nace:"C33.1.9",
    map:["novice:Empowerment"] },
  { id:"U10", partner:"made", name:"Visual guidance", tech:["AI","AR"], nace:"C28.1.4",
    map:["novice:Inclusivity","novice:Augmentation","novice:Symbiosis","deaf:Inclusivity","deaf:Empowerment","deaf:Symbiosis","special:Inclusivity","special:Empowerment","special:Symbiosis"] },
  { id:"U11", partner:"made", name:"AR-guided CNC Milling Machine Maintenance", tech:["AI","AR"], nace:"C33.1.2",
    map:["novice:Inclusivity","novice:Augmentation","novice:Symbiosis"] },
  { id:"U12", partner:"made", name:"Cobot-supported assembly for chassis fixing components", tech:["Cobots","AI"], nace:"C30.9.1",
    map:["novice:Inclusivity","novice:Symbiosis"] },
  { id:"U13", partner:"lms", name:"Confidence Building via Step-by-Step Support", tech:["AI"], nace:"C33.1.9",
    map:["novice:Inclusivity","novice:Symbiosis","deaf:Inclusivity","aging:Inclusivity","aging:Symbiosis"] },
  { id:"U14", partner:"lms", name:"Visual safety training", tech:["Chatbot"], nace:"C33.1.9",
    map:["novice:Augmentation","deaf:Augmentation","aging:Augmentation"] },
  { id:"U15", partner:"lms", name:"Visual Process Feedback", tech:["Chatbot"], nace:"C33.1.9",
    map:["novice:Empowerment","deaf:Empowerment","aging:Empowerment"] },
  { id:"U16", partner:"lms", name:"Visual Feedback for Weld Quality", tech:["Chatbot"], nace:"C25.6.1",
    map:["novice:Symbiosis","deaf:Symbiosis","aging:Symbiosis"] },
  { id:"U17", partner:"tknika", name:"AR Assembly for People with Cognitive Special Needs", tech:["AR"], nace:"C28.9.9",
    map:["special:Inclusivity","special:Augmentation","special:Symbiosis"] },
  { id:"U18", partner:"tknika", name:"VR Safety Training for Low-Skilled Workers in Hazardous Gas Installations", tech:["VR"], nace:"C19.2",
    map:["novice:Inclusivity","novice:Augmentation","novice:Empowerment","novice:Symbiosis"] },
  { id:"U19", partner:"tknika", name:"AI Multilingual Assistant for Migrant Learners in Manufacturing Training", tech:["AI"], nace:"C33.1.9",
    map:["novice:Inclusivity","novice:Augmentation","novice:Empowerment","novice:Symbiosis"] },
];

const GROUPS_UC = [
  { id:"novice",  name:"Novice and learning-vulnerable workers" },
  { id:"deaf",    name:"Deaf and hard-of-hearing workers" },
  { id:"aging",   name:"Ageing workers" },
  { id:"special", name:"Workers with physical / cognitive or special support needs" },
];

/* maps the assessment-matrix worker groups onto the mapping's rows */
const MATRIX_TO_UC_GROUP = { novice:"novice", deaf:"deaf", aging:"aging", physical:"special", cognitive:"special" };

/* baseline requirement code lists (fallback when no assessment-matrix draft exists in this browser) */
const BASELINE_CODES = {
  TA:[
    {id:"TA1", label:"Fewer complex motions – perform one motion at a time"},
    {id:"TA2", label:"In-situ capability / skill matching"},
    {id:"TA3", label:"Remembering a long list of tasks to be performed sequentially – AI helps manage workflow organisation [Use case MADE LF02]"},
    {id:"TA4", label:"Complementary task allocation – AI automates or supports task components while preserving meaningful human judgment and contribution, so humans and AI use their respective strengths (Liu, 2026)"},
    {id:"TA5", label:"Physically demanding activities – tool reducing ergonomic strains [Use case MADE LF03]"},
    {id:"TA6", label:"Progressive task complexity – start with simpler AI-supported tasks and increase complexity with learning"},
    {id:"TA7", label:"Adequate decision time – allow sufficient time to interpret AI information and respond"},
    {id:"TA8", label:"Structured task steps – divide complex work into clear, manageable steps"},
    {id:"TA9", label:"Perceived meaningfulness of the task – AI helps manage workflow organisation and makes the meaning of tasks recognisable (Cassar & Meier 2018; Ariely et al. 2008)"},
  ],
  TE:[
    {id:"TE1", label:"Physical functions – adjust spacing in projected assembly instructions"},
    {id:"TE2", label:"Cognitive support – in-situ instructions, continuous assistance"},
    {id:"TE3", label:"Cognitive support – two-way communication"},
    {id:"TE4", label:"Cognitive support – feedback systems"},
    {id:"TE5", label:"Cognitive support – automatic detection when the operator does not know how to initiate interaction"},
    {id:"TE6", label:"Sensing functions – appropriate mode of instruction (visual, audio, lights, verbal, colour schemes)"},
    {id:"TE7", label:"Simulation for work planning"},
    {id:"TE8", label:"Dynamic adjustment to skill level"},
    {id:"TE9", label:"Suitable information density"},
    {id:"TE10", label:"System integration with industrial workflow"},
    {id:"TE11", label:"Understandable AI – AI outputs and explanations are accessible and easy to understand (Liu, 2026)"},
    {id:"TE12", label:"Visual guidance – to be informed when pieces are assembled correctly [Use case MADE LF01]"},
    {id:"TE13", label:"Haptic feedback – to be informed when a person / robot is moving in the vicinity [Use case NTNU LF02]"},
    {id:"TE14", label:"Accessible alerts – visual or other non-audio alternatives for important alerts (Liu, 2026)"},
    {id:"TE15", label:"Exoskeletons or tools that reduce or substitute for an operator's physical workload [Use case NTNU LF02]"},
    {id:"TE16", label:"Machine–human interaction based on gesture [Use case Chalmers LF01 UC1]"},
  ],
  OR:[
    {id:"OR1", label:"Flexible study methods – online learning"},
    {id:"OR2", label:"Continuous training"},
    {id:"OR3", label:"Job rotation in different stations"},
    {id:"OR4", label:"Job enlargement"},
    {id:"OR5", label:"Value workers' long experience"},
    {id:"OR6", label:"Knowledge-oriented leadership"},
    {id:"OR7", label:"Training through direct interaction with technology"},
    {id:"OR8", label:"Training through direct contact with experts, e.g. visits and practical lectures"},
    {id:"OR9", label:"Worker co-design – workers are involved in AI design, testing and improvement (Liu, 2026)"},
    {id:"OR10", label:"Individual accessibility review – assess workplace and AI accessibility before implementation (Liu, 2026)"},
  ]
};
