/////////////////////////////////////////////////////////////////////////////////
////////                         global variables                        ////////
/////////////////////////////////////////////////////////////////////////////////

var controls, camera, scene, cssRenderer, targetQuaternion;

var educationRoot, workRoot, stationaryRoot;

var mathCourseRoot, computerCourseRoot, econCourseRoot;
var educHeaderRoot, educSummaryRoot;

var mathRootMotion = false;
var computerRootMotion = false;
var econRootMotion = false;
var educHeaderRootMotion = false;
var educSummaryRootMotion = false;

var menu;

var allStationaryObjects = [];

var mathObjects = [];
var computerObjects = [];
var econObjects = [];

var educationHeaderObjects = [];
var educationSummaryObjects = [];
var educationButtonObjects = [];

var allEducationObjects = [];

var menuButtonObjects = [];

var allWorkObjects = [];

var workHeaderObjects = [];
var workContentObjects = [];

var alignState = {
    menuButtonTwirling: [],
    menuButtonView: [],

    allEducationTwirling: [],

    educationHeaderTwirling: [],
    educationButtonTwirling: [],
    educationSummaryTwirling: [],
    mathTwirling: [],
    econTwirling: [],
    computerTwirling: [],
    
    standardEducationView: [],
    educationHeaderView: [],
    educationSummaryView: [],
    educationHeaderSelectedView: [],
    educationButtonView: [],
    mathView: [],
    econView: [],
    computerView: [],

    allWorkTwirling: [],

    workContentTwirling: [],
    workHeaderTwirling: [],
    
    workContentView: [],
    workHeaderView: []
};

var educationToggle = false;
var workToggle = false;
var bioToggle = false;

var computerToggle = false;
var mathToggle = false;
var econToggle = false;

var workToggle = false;

/////////////////////////////////////////////////////////////////////////////////
////////                         navigation menu                         ////////
/////////////////////////////////////////////////////////////////////////////////

var menuHeight = -110;

var menuButtonArray = [{
        label: "Education",
        id: "education-button",
        position: [-0.3, menuHeight]
    },
    {
        label: "Professional",
        id: "work-button",
        position: [0, menuHeight]
    },
    {
        label: "Bio",
        id: "bio-button",
        position: [0.3, menuHeight]
    }
]

/////////////////////////////////////////////////////////////////////////////////
////////                      education headers                          ////////
/////////////////////////////////////////////////////////////////////////////////

var yHeight = 2;
var selectedX = -1.4;

var EducationHeaderSelectedArray = [{
        position: [selectedX, 1.5]
    },
    {
        position: [selectedX, -0.2]
    },
    {
        position: [selectedX, -1.9]
    }
]

var educationHeaderArray = [{
        major: "Computer Science",
        college: "University of Colorado Boulder,",
        focus: "",
        subcollege: "College of Engineering and Applied Science",
        dates: "January 2020 - May 2021",
        GPA: "4.0",
        label: "See Courses",
        cardId: "computer-header",
        img: "",
        id: "computer-button",
        position: [-1.2, yHeight]
    },
    {
        major: "Mathematics",
        focus: "[ Computational Mathematics Track ]",
        college: "University of Colorado Boulder,",
        subcollege: "College of Arts and Sciences",
        dates: "January 2020 - May 2021",
        cardId: "math-header",
        GPA: "3.2",
        id: "math-button",
        img: "",
        label: "See Courses",
        position: [0, yHeight],
    },
    {
        major: "Economics",
        focus: "[ International Economics Track ]",
        college: "University of Colorado Boulder,",
        subcollege: "College of Arts and Sciences",
        dates: "August 2015 - May 2019",
        GPA: "3.2",
        label: "See Courses",
        cardId: "econ-header",
        id: "econ-button",
        img: "",
        position: [1.2, yHeight],
    }
];

var summaryX = 0;
var summaryYStart = 0.8;

var educationSummaryArray = [
    {
        clubName: "Mens Lacrosse",
        url: "https://mcla.us/player/41671/max_wiesner.html",
        dates: "August 2015 - May 2016",
        role: "Student Athelete",
        position: [summaryX, summaryYStart],
        description: "All - Conference Award, MCLA D1 Player of the Week Award. "
    },
    {
        clubName: "Sigma Phi Epsilon, Colorado Alpha Chapter",
        dates: "August 2016 - July 2018",
        role: "Brother",
        position: [summaryX, summaryYStart - 2],
        description: "Participated in fundraising events like the Jimmy V."
    },
    {
        clubName: "CAPA Florence",
        dates: "January 2018 - May 2018",
        role: "Study Abroad",
        position: [summaryX, summaryYStart - 1],
        description: "Photo Contest Winner, student farting around in europe. "
    },
    {
        clubName: "Economics Club",
        dates: "August 2016 - May 2019",
        role: "Member",
        position: [summaryX, summaryYStart - 3],
        description: "Would attend weekly seminars and lectures given by faculty and various guest speakers."
    },
    {
        clubName: "Math Club",
        dates: "August 2020 - May 2021",
        role: "Member",
        position: [summaryX, summaryYStart - 4],
        description: "Would attend weekly seminars and lectures given by faculty and various guest speakers."
    }
];

/////////////////////////////////////////////////////////////////////////////////
////////                          course list                            ////////
/////////////////////////////////////////////////////////////////////////////////

var left = -0.3;
var mid = 0.8;
var right = 1.9;

var midLeft = 0.25;
var midRight = 1.35;

var firstRow = 1.7;
var secondRow = 0;
var thirdRow = -1.7;

var mathArray = [{
        type: "APPM",
        number: "4650",
        name: "Intermediate Numerical Analysis",
        description: "",
        language: "",
        position: [left, firstRow]
    },
    {
        type: "APPM",
        number: "4120",
        name: "Introduction to Operations Research",
        language: "",
        description: "",
        position: [mid, firstRow]
    },
    {
        type: "MATH",
        number: "3430",
        name: "Ordinary Differential Equations",
        description: "",
        language: "LaTeX",
        position: [right, firstRow]
    },
    {
        type: "APPM",
        number: "4440",
        name: "Mathematics of Coding and Cryptography",
        description: "",
        language: "Python, Sage",
        position: [left, secondRow]
    },
    {
        type: "MATH",
        number: "3001",
        name: "Analysis 1",
        description: "",
        language: "LaTeX",
        position: [mid, secondRow]
    },
    {
        type: "APPM",
        number: "2350",
        name: "Calculus 3 for Engineers",
        description: "Multivariable calculus, vector fields, Guass, Green, and Stokes",
        language: "",
        position: [right, secondRow]
    },
    {
        type: "MATH",
        number: "2135",
        name: "Linear Algebra for Math Majors",
        description: "",
        language: "LaTeX",
        position: [midLeft, thirdRow]
    },
    {
        type: "MATH",
        number: "2001",
        name: "Discrete Mathematics",
        description: "",
        language: "LaTeX",
        position: [midRight, thirdRow]
    }
]

var computerArray = [
    {
        type: "CSCI",
        number: "4593",
        name: "Computer Organization",
        description: "",
        language: "C, Linux",
        position: [mid, firstRow]
    },
    {
        type: "CSCI",
        number: "4448",
        name: "Object Oriented Analysis and Design",
        description: "",
        language: "",
        position: [left, firstRow]
    },
    {
        type: "CSCI",
        number: "3202",
        name: "Artificial Intelligence",
        description: "",
        language: "Python",
        position: [right, firstRow]
    },
    {
        type: "CSCI",
        number: "3308",
        name: "Software Development Methods and Tools",
        description: "",
        language: "JavaScript, HTML, CSS, Linux, SQL",
        position: [left, secondRow]
    },
    {
        type: "CSCI",
        number: "3753",
        name: "Design and Analysis of Operating Systems",
        description: "",
        language: "C, Linux",
        position: [mid, secondRow]
    },
    {
        type: "CSCI",
        number: "3104",
        name: "Algorithms",
        description: "",
        language: "C++, Python",
        position: [right, secondRow]
    },
    {
        type: "CSCI",
        number: "3155",
        name: "Principals of Programming Languages",
        description: "",
        language: "Stata",
        position: [left, thirdRow]
    },
    {
        type: "CSCI",
        number: "2400",
        name: "Computer Systems",
        description: "Covered in depth virtual memory, exeptional control flow, linking, momory heiarchy, optimization and performance, processor architecture.",
        language: "C, C++",
        position: [mid, thirdRow]
    },
    {
        type: "CSCI",
        number: "2270",
        name: "Data Structures",
        description: "",
        language: "C, C++",
        position: [right, thirdRow]
    },
]

var econArray = [
    {
        type: "ECON",
        number: "4848",
        name: "Applied Econometrics",
        description: "",
        language: "Stata",
        position: [left, firstRow]
    },
    {
        type: "ECON",
        number: "3818",
        name: "Statistics with Computer Applications",
        description: "",
        language: "R",
        position: [right, firstRow]
    },
    {
        type: "ECON",
        number: "4697",
        name: "Industrial Organization Economics",
        description: "",
        language: "",
        position: [mid, firstRow]
    },
    {
        type: "ECON",
        number: "4423",
        name: "International Finance",
        description: "",
        language: "",
        position: [left, secondRow]
    },
    {
        type: "ECON",
        number: "3080",
        name: "Intermediate Macroeconomic Theory",
        description: "",
        language: "",
        position: [right, secondRow]
    },
    {
        type: "ECON",
        number: "3070",
        name: "Intermediate Microeconomic Theory",
        description: "",
        language: "",
        position: [mid, secondRow]
    },
    {
        type: "ECON",
        number: "2020",
        name: "Principles of Macroeconomics",
        description: "",
        language: "",
        position: [midLeft, thirdRow]
    },
    {
        type: "ECON",
        number: "2010",
        name: "Principles of Microeconomics",
        description: "",
        language: "",
        position: [midRight, thirdRow]
    },
];




/////////////////////////////////////////////////////////////////////////////////
////////                           work history                          ////////
/////////////////////////////////////////////////////////////////////////////////

var workContentArray = [
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
        position: [-1, 1]
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
        position: [0, 1]
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
        position: [1, 1]
    }
]

var workHeaderArrayPosition = [
    {
        position: [2, 2]
    },
    {
        position: [1, 2]
    },
    {
        position: [0, 2]
    }
];























/////////////////////////////////////////////////////////////////////////////////
////////                      personal (about me)                        ////////
/////////////////////////////////////////////////////////////////////////////////