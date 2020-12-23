
/////////////////////////////////////////////////////////////////////////////////
////////                      course list/ education                     ////////
/////////////////////////////////////////////////////////////////////////////////

var educationHeaders = [
{
    major: "Bachelor of Arts, Computer Science",
    college: "University of Colorado Boulder",
    subcollege: "College of Engineering and Applied Science",
    GPA: "4.0", 
    img: ""
}, 
{
    major: "Bachelor of Arts, Mathematics",
    focus: "Computational Mathematics",
    college: "University of Colorado Boulder",
    subcollege: "College of Arts and Sciences",
    GPA: "3.2",
    img: ""
},
{
    major: "Bachelor of Arts, Economics",
    focus: "International Economics",
    college: "University of Colorado Boulder",
    subcollege: "College of Arts and Sciences",
    GPA: "3.2", 
    img: ""
}
];


const leftMath = -2.55;
const rightMath = -1.55;

const rightComputer = 0.5;
const leftComputer = -0.5;

const leftEconomics = 1.55;
const rightEconomics = 2.55;

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
    position: [leftMath, firstRow]
},
{
    type: "APPM",
    number: "4120",
    name: "Introduction to Operations Research",
    language: "",   
    description: "",
    position: [rightMath, secondRow]
},
{
    type: "APPM",
    number: "2350",
    name: "Calculus 3 for Engineers",
    description: "Multivariable calculus, vector fields, Guass, Green, and Stokes",
    language: "",   
    position: [leftMath, fourthRow]
},
{
    type: "MATH",
    number: "2001",
    name: "Discrete Mathematics",
    description: "",
    language: "LaTeX",   
    position: [leftMath, thirdRow]
},
{
    type: "MATH",
    number: "2135",
    name: "Linear Algebra for Math Majors",
    description: "",
    language: "LaTeX",   
    position: [rightMath, fourthRow]
},
{
    type: "MATH",
    number: "3001",
    name: "Analysis 1",
    description: "",
    language: "LaTeX",   
    position: [rightMath, thirdRow]
},
{
    type: "MATH",
    number: "3430",
    name: "Ordinary Differential Equations",
    description: "",
    language: "LaTeX",   
    position: [leftMath, secondRow]
},
{
    type: "APPM",
    number: "4440",
    name: "Mathematics of Coding and Cryptography",
    description: "",
    language: "Python, Sage",   
    position: [rightMath, firstRow]
},
{
    type: "CSCI",
    number: "2270",
    name: "Data Structures",
    description: "",
    language: "C++",   
    position: [rightComputer, fifthRow]
},
{
    type: "CSCI",
    number: "2400",
    name: "Computer Systems",
    description: "Covered in depth virtual memory, exeptional control flow, linking, momory heiarchy, optimization and performance, processor architecture, and machine level representation of programs.",
    language: "C, C++",    
    position: [rightComputer, fourthRow]
},
{
    type: "CSCI",
    number: "3308",
    name: "Software Development Methods and Tools",
    description: "",
    language: "JavaScript, HTML, CSS, Linux, SQL",   
    position: [leftComputer, fourthRow]
},
{
    type: "CSCI",
    number: "2824",
    name: "Descrete Structures",
    description: "",
    language: "Python",   
    position: [leftComputer, fifthRow]
},
{
    type: "CSCI",
    number: "3155",
    name: "Principals of Programming Languages",
    description: "",
    language: "Stata",   
    position: [rightComputer, thirdRow]
},
{
    type: "CSCI",
    number: "3104",
    name: "Algorithms",
    description: "",
    language: "C++, Python",   
    position: [leftComputer, thirdRow]
},
{
    type: "CSCI",
    number: "3202",
    name: "Artificial Intelligence",
    description: "",
    language: "Python",   
    position: [rightComputer, secondRow]
},
{
    type: "CSCI",
    number: "4593",
    name: "Computer Organization",
    description: "",
    language: "C, Linux",   
    position: [leftComputer, firstRow]
},
{
    type: "CSCI",
    number: "3753",
    name: "Design and Analysis of Operating Systems",
    description: "",
    language: "C, Linux",   
    position: [leftComputer, secondRow]
},
{
    type: "CSCI",
    number: "4448",
    name: "Object Oriented Analysis and Design",
    description: "",
    language: "",   
    position: [rightComputer, firstRow]
},
{
    type: "ECON",
    number: "3818",
    name: "Statistics with Computer Applications",
    description: "",
    language: "R",   
    position: [rightEconomics, secondRow]
},
{
    type: "ECON",
    number: "4848",
    name: "Applied Econometrics",
    description: "",
    language: "Stata",   
    position: [rightEconomics, firstRow]
},
{
    type: "ECON",
    number: "3080",
    name: "Intermediate Macroeconomic Theory",
    description: "",
    language: "",   
    position: [leftEconomics, thirdRow]
},
{
    type: "ECON",
    number: "3070",
    name: "Intermediate Microeconomic Theory",
    description: "",
    language: "",   
    position: [rightEconomics, thirdRow]
},
{
    type: "ECON",
    number: "2020",
    name: "Principles of Macroeconomics",
    description: "",
    language: "",   
    position: [leftEconomics, fourthRow]
},
{
    type: "ECON",
    number: "2010",
    name: "Principles of Microeconomics",
    description: "",
    language: "",   
    position: [rightEconomics, fourthRow]
},
{
    type: "ECON",
    number: "4697",
    name: "Industrial Organization Economics",
    description: "",
    language: "",   
    position: [leftEconomics, firstRow]
},
{
    type: "ECON",
    number: "4423",
    name: "International Finance",
    description: "",
    language: "",   
    position: [leftEconomics, secondRow]
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
