
/////////////////////////////////////////////////////////////////////////////////
////////                         global variables                        ////////
/////////////////////////////////////////////////////////////////////////////////

// tweening globals 
var toInterval = 1000;
var backInterval = 1800;
var sphereSize = 1000; 

// renderers, cameras, etc.
var controls, camera, scene, cssRenderer;

// roots and root toggles/trackers 
var educationRoot, workRoot, stationaryRoot;

var mathCourseRoot, computerCourseRoot, econCourseRoot;
var educHeaderRoot, educSummaryRoot;

var workInternRoot, workMatOpsRoot, workContractRoot;
var workTimelineRoot, workDefaultRoot, workDefaultToolsRoot;

var workInternToggle = false;
var workMatOpsToggle = false;
var workContractToggle = false;

var mathRootMotion = false;
var computerRootMotion = false;
var econRootMotion = false;
var educHeaderRootMotion = false;
var educSummaryRootMotion = false;

var workTimelineRootMotion = false;
var workDefaultRootMotion = false;
var workInternRootMotion = false;
var workMatOpsRootMotion = false;
var workContractRootMotion = false;
var workDefaultToolsRootMotion = false;

// toggles / tracking for education
var educationToggle = false;

var computerToggle = false;
var mathToggle = false;
var econToggle = false;

var internToggle = false; 
var matopsToggle = false;
var contractToggle = false;

// toggles / tracking for work
var workTimelineToggle = false;
var workDefaultToggle = false;
var workDefaultToolsToggle =false;

var workInternToggle = false;
var workMatOpsToggle = false;
var workContractToggle = false;

// toggles / tracking for bio
var defaultBioToggle = false;

// all objects 
var allObjects = [];

// stationary objects
var allStationaryObjects = [];

var menuButtonObjects = [];

// education objects 
var allEducationObjects = [];

var educationHeaderObjects = [];
var educationSummaryObjects = [];
var educationButtonObjects = [];

var mathObjects = [];
var computerObjects = [];
var econObjects = [];

// work objects 
var allWorkObjects = [];

var workTimelineObjects = [];
var workDefaultObjects =[];
var workDefaultToolObjects = [];

var workInternObjects = [];
var workMatOpsObjects = [];
var workContractObjects = [];

// positioning object
var alignState = {
    // starting view
    startingView: [],

    // stationary positions - twirling 
    menuButtonTwirling: [],

    // stationary positions - view 
    menuButtonView: [],

    // education positions - twirling 
    allEducationTwirling: [],

    educationHeaderTwirling: [],
    educationButtonTwirling: [],
    educationSummaryTwirling: [],
    mathTwirling: [],
    econTwirling: [],
    computerTwirling: [],
     
    // education position - view
    standardEducationView: [],
    educationHeaderView: [],
    educationSummaryView: [],
    educationHeaderSelectedView: [],
    educationButtonView: [],
    mathView: [],
    econView: [],
    computerView: [],

    // work positions - twirling 
    allWorkTwirling: [],

    workTimelineTwirling: [],
    workDefaultTwirling: [],
    workDefaultToolsTwirling: [],

    workInternTwirling: [],
    workMatOpsTwirling: [],
    workContractTwirling: [],
    
    // work positions - view 
    workTimelineView: [],
    workDefaultView: [],
    workDefaultToolsMoving: [],

    workInternView: [],
    workMatOpsView: [],
    workContractView: [],

    // bio positions - view
    defaultBioView: [],
    interestPic1View: [],
    interestPic2View: [],

    // bio position - trirling 
    allBioTwirling: [],

    defaultBioTwirling: [],
    interestPic1Twirling: [],
    interestPic2Twirling: [],
};

/////////////////////////////////////////////////////////////////////////////////
////////                         navigation menu                         ////////
/////////////////////////////////////////////////////////////////////////////////

var menuHeight = -135;

var menuButtonArray = [{
        label: "Education",
        id: "education-button",
        position: [-0.2, menuHeight]
    },
    {
        label: "Professional",
        id: "work-button",
        position: [0, menuHeight]
    },
    {
        label: "Bio",
        id: "bio-button",
        position: [0.2, menuHeight]
    }
]

/////////////////////////////////////////////////////////////////////////////////
////////                      education headers                          ////////
/////////////////////////////////////////////////////////////////////////////////

var yHeight = 2.2;
var educationHeaderArray = [{
        major: "Computer Science",
        college: "University of Colorado Boulder,",
        focus: "[ Computer Science ]",
        subcollege: "College of Engineering and Applied Science",
        dates: "January 2020 - May 2021",
        GPA: "4.0",
        label: "See Courses",
        cardId: "computer-header",
        img: "",
        id: "computer-button",
        position: [-1.3, yHeight]
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
        position: [1.3, yHeight],
    }
];

var selectedX = -1.45;
var selectedY = 2.1;
var selectedStep = 2;

var EducationHeaderSelectedArray = [{
        position: [selectedX, selectedY]
    },
    {
        position: [selectedX, selectedY - ( 1 * selectedStep )]
    },
    {
        position: [selectedX, selectedY - ( 2 * selectedStep )]
    }
];

var leftSummary = -.652;
var rightSummary = leftSummary + 1.95;

var summaryYStart = -.2;
var summaryRightYStart = 0.12;
var summaryStepLeft = 1.95;
var summaryStepRight = 1.3;
var educationSummaryArray = [
    {
        id: "lax",
        claddNum: 1,
        clubName: "Mens Lacrosse",
        url: "https://mcla.us/player/41671/max_wiesner.html",
        dates: "August 2015 - May 2016",
        role: "Student Athelete",
        position: [leftSummary, summaryYStart],
        description: "All - Conference Award, MCLA D1 Player of the Week Award. "
    },
    {
        id: "capa",
        classNum: 2,
        clubName: "CAPA Florence",
        dates: "January 2018 - May 2018",
        role: "Study Abroad",
        position: [leftSummary, summaryYStart - summaryStepLeft],
        description: "Photo Contest Winner, student farting around in europe. "
    },
    {
        id: "sigep",
        clubName: "Sigma Phi Epsilon, Colorado Alpha Chapter",
        dates: "August 2016 - July 2018",
        role: "Brother",
        position: [rightSummary, summaryRightYStart],
        description: "Participated in fundraising events like the Jimmy V."
    },
    {
        id: "econclub",
        clubName: "Economics Club",
        dates: "August 2016 - May 2019",
        role: "Member",
        position: [rightSummary, summaryRightYStart - ( 1 * summaryStepRight )],
        description: "Would attend weekly seminars and lectures given by faculty and various guest speakers."
    },
    {
        id: "mathclub",
        clubName: "Math Club",
        dates: "August 2020 - May 2021",
        role: "Member",
        position: [rightSummary, summaryRightYStart - ( 2 * summaryStepRight )],
        description: "Would attend weekly seminars and lectures given by faculty and various guest speakers."
    },
    {
        role: "Degrees",
        position: [0, summaryYStart + 3.35]
    }, 
    {
        role: "Activities, clubs",
        position: [0, summaryYStart + 1.2]
    }
];

/////////////////////////////////////////////////////////////////////////////////
////////                          course list                            ////////
/////////////////////////////////////////////////////////////////////////////////

var left = -0.32;
var courseStep = 0.9;
var mid = left + ( courseStep * 1);
var right = left + ( courseStep * 2);
var midLeft = left + ( courseStep * 0.5);
var midRight = left + ( courseStep * 1.5);

var courseTall = 2;
var firstRow = 2.1;
var secondRow = firstRow - ( courseTall * 1);
var thirdRow = firstRow - ( courseTall * 2);

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
        title: "Technical Operations Analyst",
        timeline: "Jan 1019 - May 2019",
        company: "Frontier Airlines",
        id: "intern",
        months: 5,
        comit: "[ Full - Time ]",
        description: "Analyze existdfgdsfdsgfaircrafts reaching retirement. Participated in the implementation of \
            uploading new requisitions derived from the new process created. "
    },
    {
        title: "Material Operations Analyst",
        timeline: "June 2019 - jan 2020",
        company: "Frontier Airlines",
        months: 7,
        comit: "[ Full - Time ]",
        id: "matops",
        description: "Analyze existing inventory to determine optimal usage and demand \
            levels across all locations. Helped build a new process using existing data to determine \
            new requisitions and part levels. Helped identify out of date materials and their locations, \
            purged these in the system and from the database to improve overall accuracy. Implemented \
            automatically triggered requisitions to sell back unwanted inventory. Organize parts by plane to \
            phase out inventory levels for aircrafts reaching retirement. Participated in the implementation of \
            uploading new requisitions derived from the new process created. "
    },
    {
        title: "Data Analyst (Contractor)",
        timeline: "jan 2020 - Presant",
        months: 13,
        comit: "[ 30 Hour Weeks ]",
        company: "Contractor",
        id: "contract",
        description: "Analyze existing inventory to determine optimal usage and demand \
            levels across all locations. Helped build a new process using existing data to determine \
            new requisitions and part levels. Helped identify out of date materials and their locations, \
            purged these in the system and from the database to improve overall accuracy. Implemented \
            automatically triggered requisitions to sell back unwanted inventory. Organize parts by plane to \
            phase out inventory levels for aircrafts reaching retirement. Participated in the implementation of \
            uploading new requisitions derived from the new process created. "
    }
]

var workToolsArray = [
    {
        tool: "SQL",
        id: "sql",
        score: {
            intern: 5,
            matops: 8,
            contract: 10
        },
        image: './../img/sql.png'
    },
    {
        tool: "Power BI",
        id: "powerbi",
        score: {
            intern: 6,
            matops: 10,
            contract: 10
        },
        image: './../img/powerbi.png'
    },
    {
        tool: "Python",
        id: "python",
        score: {
            intern: 0,
            matops: 8,
            contract: 0
        },
        image: './../img/python.png'
    },
    {
        tool: "PowerApps",
        id: "powerapps",
        score: {
            intern: 0,
            matops: 0,
            contract: 3
        },
        image: './../img/powerapps.png'
    },
    {
        tool: "Excel",
        id: "excel",
        score: {
            intern: 10,
            matops: 7,
            contract: 4
        },
        image: './../img/excel.png'
    },
    {
        tool: "Pandas (Python Library)",
        id: "pandas",
        score: {
            intern: 0,
            matops: 8,
            contract: 0
        },
        image: './../img/pandas.jpg'
    },
    {
        tool: "NumPy (Python Library)",
        id: "numpy",
        score: {
            intern: 0,
            matops: 0,
            contract: 0
        },
        image: './../img/numpy.png'
    }
];

var workViewDisplayArray = [
    {
        title: 'header',
        position: [0, 3]
    },
    {
        title: 'content',
        position: [0.39, 0.583]
    }
];

var homeButtons = 1.7;
var timelineY = -1.25;
var timelineElement = timelineY - 1.35;
var workTimelineDisplayArray = [
    {
        title: 'intern',
        position: [-0.82, timelineElement]
    },
    {
        title: 'matops',
        position: [-0.28, timelineElement]
    },
    {
        title: 'contract',
        position: [0.63, timelineElement]
    },
    {
        title: 'timeline',
        position: [-1.598, timelineY]
    },
    {
        title: 'home-button',
        position: [-1.28, timelineElement]
    },
    {
        title: 'left-arrow',
        position: [-homeButtons, timelineElement]
    },
    {
        title: 'right-arrow',
        position: [homeButtons, timelineElement]
    }
];

var toolsX = -1.43;
var toolsGap = 0.66;
var toolsRowOne = 1.65;
var toolContainerX = -1.53;
var toolContainerY = 0.585;
var toolsRowTwo = toolsRowOne - toolsGap;
var toolsRowThree = toolsRowOne - 2 * toolsGap;
var toolsRowFour = toolsRowOne - 3 * toolsGap;
var toolsRowFive = toolsRowOne - 4 * toolsGap;
var toolsRowSix = toolsRowOne - 5 * toolsGap;
var toolsRowSeven = toolsRowOne - 6 * toolsGap;

var exclude = 0;


var workViewDisplayArrayIntern = workViewDisplayArray.concat([
    {
        tool: "SQL",
        position: [toolsX, toolsRowThree]
    },
    {
        tool: "Power BI",
        position: [toolsX, toolsRowTwo]
    },
    {
        tool: "Python",
        position: [toolsX, exclude]
    },
    {
        tool: "PowerApps",
        position: [toolsX, exclude]
    },
    {
        tool: "Excel",
        position: [toolsX, toolsRowOne]
    },
    {
        tool: "Pandas",
        position: [toolsX, exclude]
    },
    {
        tool: "NumPy",
        position: [toolsX, exclude]
    },
    {
        tool: "Container",
        position: [toolContainerX, toolContainerY]
    }
]);

var workViewDisplayArrayMatOps = workViewDisplayArray.concat([
    {
        tool: "SQL",
        position: [toolsX, toolsRowFour]
    },
    {
        tool: "Power BI",
        position: [toolsX, toolsRowOne]
    },
    {
        tool: "Python",
        position: [toolsX, toolsRowTwo]
    },
    {
        tool: "PowerApps",
        position: [toolsX, exclude]
    },
    {
        tool: "Excel",
        position: [toolsX, toolsRowFive]
    },
    {
        tool: "Pandas",
        position: [toolsX, toolsRowThree]
    },
    {
        tool: "NumPy",
        position: [toolsX, exclude]
    },
    {
        tool: "Container",
        position: [toolContainerX, toolContainerY]
    }
]);

var workViewDisplayArrayContract = workViewDisplayArray.concat([
    {
        tool: "SQL",
        position: [toolsX, toolsRowOne]
    },
    {
        tool: "Power BI",
        position: [toolsX, toolsRowTwo]
    },
    {
        tool: "Python",
        position: [toolsX, exclude]
    },
    {
        tool: "PowerApps",
        position: [toolsX, toolsRowFour]
    },
    {
        tool: "Excel",
        position: [toolsX, toolsRowThree]
    },
    {
        tool: "Pandas",
        position: [toolsX, exclude]
    },
    {
        tool: "NumPy",
        position: [toolsX, exclude]
    },
    {
        tool: "Container",
        position: [toolContainerX, toolContainerY]
    }
]);

var imageX = 1.3;
var imageY = 1.8;
var workDefaultArray = [
    {
        header: "My career thus far",
        description: "hdlkfasjdf klasd;jaskd askd;fjasdkfj kdhf;wlsie;askd ",
        id: "thusfar",
        position: [0, 3.2]
    },
    {
        header: "where i have been", 
        description: "where i have been",
        id: "been",
        position: [-0.65, 1.83]
    },
    {
        header: "where I am going", 
        description: "where i am going",
        id: "going",
        position: [0.65, -0.4]
    }, 
    {
        id: "dataAnalysis", 
        img: "./../img/dataAnalysis.png",
        position: [imageX, imageY]
    }, 
    {
        id: "computer", 
        img: "./../img/computer.png",
        position: [-imageX, -0.4]
    }, 
];

var toptopY = 2.5;
var topmidY = 1.9;
var topBottomY = 1.1;

var closeX = .8;
var midX = 1.2;
var farX = 1.7;
var counter; 

/////////////////////////////////////////////////////////////////////////////////
////////                      personal (about me)                        ////////
/////////////////////////////////////////////////////////////////////////////////

var interestsX = -1.66;
var interestsYStart = -.85;
var interestsStep = .933;

var interestsButtonX = 1.8;
var interestButtonMid = -1.78
var interestButtonDist = 1.1;
var bioDefaultArray = [
    {
        id: "bio-header", 
        position: [0, 3.2],
        description: "About Me",
    },
    {
        id: "bio-main", 
        position: [0.47, 1.5],
        description: "call me big pappa.",
    },
    {
        id: "bio-pic", 
        position: [-1.45, 1.5],
        img: "./../img/me.png",
        description: "",
    },
    {
        id: "interests", 
        position: [0, -.16],
        description: "Interests",
    },
    {
        id: "wood", 
        position: [interestsX, interestsYStart - interestsStep],
        img: "",
        description: "Woodworking",
    },
    {
        id: "travel", 
        position: [interestsX, interestsYStart],
        img: "",
        description: "Travel",
    },
    {
        id: "bikes", 
        position: [interestsX, interestsYStart - ( 2 * interestsStep )],
        img: "",
        description: "Bikes",
    },
    {
        id: "bio-button-down", 
        position: [interestsButtonX, interestButtonMid - interestButtonDist],
        img: "",
        description: "",
    },
    {
        id: "bio-button-up", 
        position: [interestsButtonX, interestButtonMid + interestButtonDist],
        img: "",
        description: "",
    }
];

var defaultBioRoot; 
var interestPic1Root, interestPic2Root;

var defaultBioRootMotion = false;
var interestPic1Motion = false; 
var interestPic2Motion = false;

// bio objects 
var allBioObjects = [];
var defaultBioObjects = [];

var interestPic1Objects = [];
var interestPic2Objects = [];

var travel1Objects = [];
var travel2Objects = [];
var travel3Objects = [];
var travel4Objects = [];

var wood1Objects = [];
var wood2Objects = [];
var wood3Objects = [];

var bike1Objects = [];
var bike2Objects = [];
var bike3Objects = [];

var bioDefaultToggle = false;

var interestPic1Toggle = false;
var interestPic2Toggle = false;

var currentPage = "";

var slideXStep = 1;
var slide1X = -.8;
var slide2X = slide1X + slideXStep;
var slide3X = slide2X + slideXStep;

var slideY = -1.4;
var uSlideDiff = 1.4;

var travel1 = [
    {
        card: "s",
        id: "slide-1", 
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2", 
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3", 
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1", 
        position: [slide1X, slideY - uSlideDiff],
        header: "Postino, Italy",
        description: "Once I went to postino italy, i liked it very much, they had really good pizza. thanks.",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2", 
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3", 
        position: [slide3X, slideY - uSlideDiff],
        header: "travle 1",
        description: "kjjkjkjk",
        img: "./../img/travel.jpg"
    }
];

var travel2 = [
    {
        card: "s",
        id: "slide-1", 
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2", 
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3", 
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1", 
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2", 
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3", 
        position: [slide3X, slideY - uSlideDiff],
        header: "travle 2",
        description: "",
        img: "./../img/travel.jpg"
    },
];

var travel3 = [
    {
        card: "s",
        id: "slide-1", 
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2", 
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3", 
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1", 
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2", 
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3", 
        position: [slide3X, slideY - uSlideDiff],
        header: "travle 3",
        description: "",
        img: "./../img/travel.jpg"
    },
];

var travel4 = [
    {
        card: "s",
        id: "slide-1", 
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2", 
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3", 
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1", 
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2", 
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3", 
        position: [slide3X, slideY - uSlideDiff],
        header: "travel 4",
        description: "",
        img: "./../img/travel.jpg"
    },
];


var wood1 = [
    {
        card: "s",
        id: "slide-1", 
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2", 
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3", 
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1", 
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2", 
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3", 
        position: [slide3X, slideY - uSlideDiff],
        header: "travle 1",
        description: "wood1",
        img: "./../img/travel.jpg"
    },
];
var wood2 = [
    {
        card: "s",
        id: "slide-1", 
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2", 
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3", 
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1", 
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2", 
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3", 
        position: [slide3X, slideY - uSlideDiff],
        header: "travle 1",
        description: "wood2",
        img: "./../img/travel.jpg"
    },
];
var wood3 = [
    {
        card: "s",
        id: "slide-1", 
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2", 
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3", 
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1", 
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2", 
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3", 
        position: [slide3X, slideY - uSlideDiff],
        header: "wood3",
        description: "",
        img: "./../img/travel.jpg"
    },
];

var bike1 = [
    {
        card: "s",
        id: "slide-1", 
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2", 
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3", 
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1", 
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2", 
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3", 
        position: [slide3X, slideY - uSlideDiff],
        header: "bike1",
        description: "",
        img: "./../img/travel.jpg"
    },
];

var bike2 = [
    {
        card: "s",
        id: "slide-1", 
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2", 
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3", 
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1", 
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2", 
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3", 
        position: [slide3X, slideY - uSlideDiff],
        header: "bike2",
        description: "",
        img: "./../img/travel.jpg"
    },
];

var bike3 = [
    {
        card: "s",
        id: "slide-1", 
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2", 
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3", 
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1", 
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2", 
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3", 
        position: [slide3X, slideY - uSlideDiff],
        header: "bike3",
        description: "",
        img: "./../img/travel.jpg"
    },
];


var travelPage = 0;
var woodPage = 1;
var bikePage = 2;

var currentInterestPage = 0;
var actualCurrentPage = 0;

var currentInterestObjArray = [
    [
        travel1Objects, travel2Objects, travel3Objects, travel4Objects
    ], 
    [
        wood1Objects, wood2Objects, wood3Objects
    ], 
    [
        bike1Objects, bike2Objects, bike3Objects
    ]
];

var currentInterestObj;