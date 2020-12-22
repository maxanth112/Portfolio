
/////////////////////////////////////////////////////////////////////////////////
////////                      course list/ education                     ////////
/////////////////////////////////////////////////////////////////////////////////

var educationHeaders = [
{
    major: "Bachelor of Arts, Computer Science",
    college: "University of Colorado Boulder",
    subcollege: "College of Engineering and Applied Science",
    GPA: "4.0"
}, 
{
    major: "Bachelor of Arts, Mathematics",
    focus: "Computational Mathematics",
    college: "University of Colorado Boulder",
    subcollege: "College of Arts and Sciences",
    GPA: "3.2"
},
{
    major: "Bachelor of Arts, Economics",
    focus: "International Economics",
    college: "University of Colorado Boulder",
    subcollege: "College of Arts and Sciences",
    GPA: "3.2"
}
];


const m1 = -2.55;
const m2 = -1.55;

const c1 = 0.5;
const c2 = -0.5;

const e1 = 1.55;
const e2 = 2.55;

var firstRow = 1.4;
var secondRow = 0.4;
var thirdRow = -0.6;
var fourthRow = -1.6;
var fifthRow = -2.6;

var courseArray = [
{
    type: "APPM",
    number: "4650",
    name: "Intermediate Numerical Analysis",
    description: "",
    language: "",   
    position: [m1, firstRow]
},
{
    type: "APPM",
    number: "4120",
    name: "Introduction to Operations Research",
    language: "",   
    description: "",
    position: [m2, secondRow]
},
{
    type: "APPM",
    number: "2350",
    name: "Calculus 3 for Engineers",
    description: "Multivariable calculus, vector fields, Guass, Green, and Stokes",
    language: "",   
    position: [m1, fourthRow]
},
{
    type: "MATH",
    number: "2001",
    name: "Discrete Mathematics",
    description: "",
    language: "LaTeX",   
    position: [m1, thirdRow]
},
{
    type: "MATH",
    number: "2135",
    name: "Linear Algebra for Math Majors",
    description: "",
    language: "LaTeX",   
    position: [m2, fourthRow]
},
{
    type: "MATH",
    number: "3001",
    name: "Analysis 1",
    description: "",
    language: "LaTeX",   
    position: [m2, thirdRow]
},
{
    type: "MATH",
    number: "3430",
    name: "Ordinary Differential Equations",
    description: "",
    language: "LaTeX",   
    position: [m1, secondRow]
},
{
    type: "APPM",
    number: "4440",
    name: "Mathematics of Coding and Cryptography",
    description: "",
    language: "Python, Sage",   
    position: [m2, firstRow]
},
{
    type: "CSCI",
    number: "2270",
    name: "Data Structures",
    description: "",
    language: "C++",   
    position: [c1, fifthRow]
},
{
    type: "CSCI",
    number: "2400",
    name: "Computer Systems",
    description: "Covered in depth virtual memory, exeptional control flow, linking, momory heiarchy, optimization and performance, processor architecture, machine level representation of programs, and representing and manipulating information.",
    language: "C, C++",    
    position: [c1, fourthRow]
},
{
    type: "CSCI",
    number: "3308",
    name: "Software Development Methods and Tools",
    description: "",
    language: "JavaScript, HTML, CSS, Linux, SQL",   
    position: [c2, fourthRow]
},
{
    type: "CSCI",
    number: "2824",
    name: "Descrete Structures",
    description: "",
    language: "Python",   
    position: [c2, fifthRow]
},
{
    type: "CSCI",
    number: "3155",
    name: "Principals of Programming Languages",
    description: "",
    language: "Stata",   
    position: [c1, thirdRow]
},
{
    type: "CSCI",
    number: "3104",
    name: "Algorithms",
    description: "",
    language: "C++, Python",   
    position: [c2, thirdRow]
},
{
    type: "CSCI",
    number: "3202",
    name: "Artificial Intelligence",
    description: "",
    language: "Python",   
    position: [c1, secondRow]
},
{
    type: "CSCI",
    number: "4593",
    name: "Computer Organization",
    description: "",
    language: "C, Linux",   
    position: [c2, firstRow]
},
{
    type: "CSCI",
    number: "3753",
    name: "Design and Analysis of Operating Systems",
    description: "",
    language: "C, Linux",   
    position: [c2, secondRow]
},
{
    type: "CSCI",
    number: "4448",
    name: "Object Oriented Analysis and Design",
    description: "",
    language: "",   
    position: [c1, firstRow]
},
{
    type: "ECON",
    number: "3818",
    name: "Statistics with Computer Applications",
    description: "",
    language: "R",   
    position: [e2, secondRow]
},
{
    type: "ECON",
    number: "4848",
    name: "Applied Econometrics",
    description: "",
    language: "Stata",   
    position: [e2, firstRow]
},
{
    type: "ECON",
    number: "3080",
    name: "Intermediate Macroeconomic Theory",
    description: "",
    language: "",   
    position: [e1, thirdRow]
},
{
    type: "ECON",
    number: "3070",
    name: "Intermediate Microeconomic Theory",
    description: "",
    language: "",   
    position: [e2, thirdRow]
},
{
    type: "ECON",
    number: "2020",
    name: "Principles of Macroeconomics",
    description: "",
    language: "",   
    position: [e1, fourthRow]
},
{
    type: "ECON",
    number: "2010",
    name: "Principles of Microeconomics",
    description: "",
    language: "",   
    position: [e2, fourthRow]
},
{
    type: "ECON",
    number: "4697",
    name: "Industrial Organization/Regulation Economics",
    description: "",
    language: "",   
    position: [e1, firstRow]
},
{
    type: "ECON",
    number: "4423",
    name: "International Finance",
    description: "",
    language: "",   
    position: [e1, secondRow]
}
];



/////////////////////////////////////////////////////////////////////////////////
////////                           work history                          ////////
/////////////////////////////////////////////////////////////////////////////////

var workArray = [ 
    { 
        title: "Technical Operations Analyst Intern",
        tools: ["SQL", "Power BI", "Excel"], 
        timeline: "January 1019 - May 2019",
        img: "",
        description: "Analyze existing inventory to determine optimal usage and demand \
            levels across all locations. Helped build a new process using existing data to determine \
            new requisitions and part levels. Helped identify out of date materials and their locations, \
            purged these in the system and from the database to improve overall accuracy. Implemented \
            automatically triggered requisitions to sell back unwanted inventory. Organize parts by plane to \
            phase out inventory levels for aircrafts reaching retirement. Participated in the implementation of \
            uploading new requisitions derived from the new process created. ",
        headerPos: [-1, 1],
        contentPos: [-1, 3]
    },
    { 
        title: "Material Operations Analyst",
        tools: ["Python - Pandas & NumPy", "SQL", "Power BI"], 
        timeline: "June 2019 - January 2020",
        img: "",
        description: "Analyze existing inventory to determine optimal usage and demand \
            levels across all locations. Helped build a new process using existing data to determine \
            new requisitions and part levels. Helped identify out of date materials and their locations, \
            purged these in the system and from the database to improve overall accuracy. Implemented \
            automatically triggered requisitions to sell back unwanted inventory. Organize parts by plane to \
            phase out inventory levels for aircrafts reaching retirement. Participated in the implementation of \
            uploading new requisitions derived from the new process created. ",
        headerPos: [0, 1],
        contentPos: [0, 3]
    },
    { 
        title: "Data Analyst - Contractor",
        tools: ["Python - Pandas & NumPy)", "SQL", "Power BI", "PowerApps"], 
        timeline: "January 2020 - Presant",
        img: "",
        description: "Analyze existing inventory to determine optimal usage and demand \
            levels across all locations. Helped build a new process using existing data to determine \
            new requisitions and part levels. Helped identify out of date materials and their locations, \
            purged these in the system and from the database to improve overall accuracy. Implemented \
            automatically triggered requisitions to sell back unwanted inventory. Organize parts by plane to \
            phase out inventory levels for aircrafts reaching retirement. Participated in the implementation of \
            uploading new requisitions derived from the new process created. ",
        headerPos: [1, 1],
        contentPos: [1, 3]
    }
]


/////////////////////////////////////////////////////////////////////////////////
////////                      personal (about me)                        ////////
/////////////////////////////////////////////////////////////////////////////////
