/* SkillAIbility WP3 – use case mapping data
 * From "SkillAIbility High-level mapping of use cases across target groups and pathways".
 * Shared by usecases.html and inclusion.html (step 2 interconnection).
 */

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
    {id:"TA1", label:"Fewer complex motions – perform one motion at a time"}
  ],
  TE:[
    {id:"TE1",  label:"Physical functions – adjust spacing in projected assembly instructions"},
    {id:"TE2",  label:"Cognitive support – in-situ instructions, continuous assistance"},
    {id:"TE3",  label:"Cognitive support – two-way communication"},
    {id:"TE4",  label:"Cognitive support – feedback systems"},
    {id:"TE5",  label:"Cognitive support – automatic detection when the operator does not know how to initiate interaction"},
    {id:"TE6",  label:"Sensing functions – appropriate mode of instruction (visual, audio, lights, verbal, colour schemes)"},
    {id:"TE7",  label:"Simulation for work planning"},
    {id:"TE8",  label:"In-situ capability / skill matching"},
    {id:"TE9",  label:"Upskilling – sufficient content depth"},
    {id:"TE10", label:"Upskilling – contextualisation for industry-specific training"}
  ],
  OR:[
    {id:"OR1", label:"Flexible study methods – online learning"},
    {id:"OR2", label:"Continuous training"},
    {id:"OR3", label:"Job rotation in different stations"},
    {id:"OR4", label:"Job enlargement"},
    {id:"OR5", label:"Simultaneously value workers' long experience"},
    {id:"OR6", label:"Knowledge-oriented leadership"},
    {id:"OR7", label:"Training through direct interaction with technology"},
    {id:"OR8", label:"Combined with direct contact with experts, e.g. visits and practical lectures"}
  ]
};
