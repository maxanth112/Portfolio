
/////////////////////////////////////////////////////////////////////////////////
////////                      course list/ education                     ////////
/////////////////////////////////////////////////////////////////////////////////

const m = -1.2;
const c = 0;
const e = 1.2;

var courseArray = [{
    type: "APPM",
    number: "4650",
    name: "Intermediate Numerical Analysis",
    description: "",
    language: "",   
    position: [m, 5]
},
{
    type: "APPM",
    number: "4120",
    name: "Introduction to Operations Research",
    language: "",   
    description: "",
    position: [m, 3]
},
{
    type: "APPM",
    number: "2350",
    name: "Calculus 3 for Engineers",
    description: "Multivariable calculus, vector fields, Guass, Green, and Stokes",
    language: "",   
    position: [m, 0]
},
{
    type: "MATH",
    number: "2001",
    name: "Discrete Mathematics",
    description: "",
    language: "LaTeX",   
    position: [m, -2]
},
{
    type: "MATH",
    number: "2135",
    name: "Linear Algebra for Math Majors",
    description: "",
    language: "LaTeX",   
    position: [m, -1]
},
{
    type: "MATH",
    number: "3001",
    name: "Analysis 1",
    description: "",
    language: "LaTeX",   
    position: [m, 1]
},
{
    type: "MATH",
    number: "3430",
    name: "Ordinary Differential Equations",
    description: "",
    language: "LaTeX",   
    position: [m, 2]
},
{
    type: "APPM",
    number: "4440",
    name: "Mathematics of Coding and Cryptography",
    description: "",
    language: "Python, Sage",   
    position: [m, 4]
},
{
    type: "CSCI",
    number: "2270",
    name: "Data Structures",
    description: "",
    language: "C++",   
    position: [c, -3]
},
{
    type: "CSCI",
    number: "2400",
    name: "Computer Systems",
    description: "Covered in depth virtual memory, exeptional control flow, linking, momory heiarchy, optimization and performance, processor architecture, machine level representation of programs, and representing and manipulating information.",
    language: "C, C++",    
    position: [c, -2]
},
{
    type: "CSCI",
    number: "3308",
    name: "Software Development Methods and Tools",
    description: "",
    language: "JavaScript, HTML, CSS, Linux, SQL",   
    position: [c, 0]
},
{
    type: "CSCI",
    number: "2824",
    name: "Descrete Structures",
    description: "",
    language: "Python",   
    position: [c, -4]
},
{
    type: "CSCI",
    number: "3155",
    name: "Principals of Programming Languages",
    description: "",
    language: "Stata",   
    position: [c, -1]
},
{
    type: "CSCI",
    number: "3104",
    name: "Algorithms",
    description: "",
    language: "C++, Python",   
    position: [c, 1]
},
{
    type: "CSCI",
    number: "3202",
    name: "Artificial Intelligence",
    description: "",
    language: "Python",   
    position: [c, 3]
},
{
    type: "CSCI",
    number: "4593",
    name: "Computer Organization",
    description: "",
    language: "C, Linux",   
    position: [c, 4]
},
{
    type: "CSCI",
    number: "3753",
    name: "Design and Analysis of Operating Systems",
    description: "",
    language: "C, Linux",   
    position: [c, 2]
},
{
    type: "CSCI",
    number: "4448",
    name: "Object Oriented Analysis and Design",
    description: "",
    language: "",   
    position: [c, 5]
},
{
    type: "ECON",
    number: "3818",
    name: "Statistics with Computer Applications",
    description: "",
    language: "R",   
    position: [e, 2]
},
{
    type: "ECON",
    number: "4848",
    name: "Applied Econometrics",
    description: "",
    language: "Stata",   
    position: [e, 5]
},
{
    type: "ECON",
    number: "3080",
    name: "Intermediate Macroeconomic Theory",
    description: "",
    language: "",   
    position: [e, 1]
},
{
    type: "ECON",
    number: "3070",
    name: "Intermediate Microeconomic Theory",
    description: "",
    language: "",   
    position: [e, 0]
},
{
    type: "ECON",
    number: "2020",
    name: "Principles of Macroeconomics",
    description: "",
    language: "",   
    position: [e, -1]
},
{
    type: "ECON",
    number: "2010",
    name: "Principles of Microeconomics",
    description: "",
    language: "",   
    position: [e, -2]
},
{
    type: "ECON",
    number: "4697",
    name: "Industrial Organization/Regulation Economics",
    description: "",
    language: "",   
    position: [e, 4]
},
{
    type: "ECON",
    number: "4423",
    name: "International Finance",
    description: "",
    language: "",   
    position: [e, 3]
}
];

/////////////////////////////////////////////////////////////////////////////////
////////                           work history                          ////////
/////////////////////////////////////////////////////////////////////////////////

var workArray = [ "Technical Operations Analyst Intern",
    ["Python (Pandas & NumPy)", "SQL", "Power BI", "PowerApps"], 
    "Full - Time",
    "Analyze existing inventory to determine optimal usage and demand \
    levels across all locations. Helped build a new process using existing data to determine \
    new requisitions and part levels. Helped identify out of date materials and their locations, \
    purged these in the system and from the database to improve overall accuracy. Implemented \
    automatically triggered requisitions to sell back unwanted inventory. Organize parts by plane to \
    phase out inventory levels for aircrafts reaching retirement. Participated in the implementation of \
    uploading new requisitions derived from the new process created. ",
    "January 1019 - May 2019",
    "Technical Operations Analyst Intern",
    ["Python (Pandas & NumPy)", "SQL", "Power BI", "PowerApps"], 
    "Full - Time",
    "Analyze existing inventory to determine optimal usage and demand \
    levels across all locations. Helped build a new process using existing data to determine \
    new requisitions and part levels. Helped identify out of date materials and their locations, \
    purged these in the system and from the database to improve overall accuracy. Implemented \
    automatically triggered requisitions to sell back unwanted inventory. Organize parts by plane to \
    phase out inventory levels for aircrafts reaching retirement. Participated in the implementation of \
    uploading new requisitions derived from the new process created. ",
    "January 1019 - May 2019",
    "Technical Operations Analyst Intern",
    ["Python (Pandas & NumPy)", "SQL", "Power BI", "PowerApps"], 
    "Full - Time",
    "Analyze existing inventory to determine optimal usage and demand \
    levels across all locations. Helped build a new process using existing data to determine \
    new requisitions and part levels. Helped identify out of date materials and their locations, \
    purged these in the system and from the database to improve overall accuracy. Implemented \
    automatically triggered requisitions to sell back unwanted inventory. Organize parts by plane to \
    phase out inventory levels for aircrafts reaching retirement. Participated in the implementation of \
    uploading new requisitions derived from the new process created. ",
    "January 1019 - May 2019"
]


/////////////////////////////////////////////////////////////////////////////////
////////                      personal (about me)                        ////////
/////////////////////////////////////////////////////////////////////////////////
