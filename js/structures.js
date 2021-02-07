/////////////////////////////////////////////////////////////////////////////////
////////                         global variables                        ////////
/////////////////////////////////////////////////////////////////////////////////

// tweening globals 
var toInterval = 300;
var backInterval = 300;
var timeoutTime = 0;
var sphereSizeX = 10;

// renderers, cameras, etc.
var controls, camera, scene, cssRenderer;

var allObjects = [];
var rootNames = [
    "stationary", 
    "math", "computer", "econ", "educSelect", "educHeader", "educSummary", 
    "workTimeline", "intern", "matops", "contract", "lab", "workDefault", 
    "bioDefault", "pic1", "pic2"
];

var educationHeaderClasses = ['computer-header', 
    'math-header', 
    'econ-header'];

var educationResetClasses = ['education-header-selected', 
    'education-header-active'];

var educationButtonClasses = ['math-button', 
    'econ-button', 
    'computer-button'];

var educationHeaderColors = [
    'computer-header-color',
    'math-header-color',
    'econ-header-color'
];

var educationCourseColors = [
    'computer-color', 
    'math-color', 
    'econ-color']

var allEducationColors = educationHeaderColors
    .concat(educationCourseColors)
    .concat('education-main-color');

var specificEducationColors = allEducationColors.filter(color => color != 'education-main-color');

var removeWorkColors = [
    'workDefault-color',
    'intern-color',
    'matops-color',
    'contract-color',
    'lab-color'
];

var workTimelineColors = [
    'workDefault-timeline-color',
    'intern-timeline-color',
    'matops-timeline-color',
    'contract-timeline-color',
    'lab-timeline-color'
];


var allWorkColors = removeWorkColors.concat(workTimelineColors);

var allColors = allEducationColors.concat(allWorkColors).concat('bioDefault-color');

var bioResetButtonLinked = ['travel-button', 'wood-button', 'bikes-button'];

var groups = {};

var roots = {
    stationary: {
        root: '',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: [],
            exclude: ["educSelect"]
        },
        group: 'menu',
    },
    math: {
        root: '',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: ['math-color'],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: ["educSelect", "math"],
            exclude: ["educHeader"]
        },
        group: 'course',
    },
    computer: {
        root: '',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: ['computer-color'],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: ["educSelect", "computer"],
            exclude: ["educHeader"]
        },
        group: 'course',
    },
    econ: {
        root: '',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: ['econ-color'],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: ["educSelect", "econ"],
            exclude: ["educHeader"]
        },
        group: 'course',
    },
    educSelect: {
        root: '',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: [],
            exclude: []
        },
        group: 'none'
    },
    educHeader: {
        root: '',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: ['education-main-color'],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: ["educSelect"],
            exclude: ["educSelect"]
        },
        group: 'educDefault'
    },
    educSummary: {
        root: '',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: ['education-main-color'],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: ["educSummary", "educHeader"],
            exclude: ["educSelect"]
        },
        group: 'educDefault'
    },
    workTimeline: {
        root:'',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: [],
            exclude: []
        },
        group: 'default'
    },
    intern: {
        root: '',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: ["workTimeline", "intern"],
            exclude: ["educSelect"]
        },
        group: 'work'
    },
    matops: {
        root: '',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: ["workTimeline", "matops"],
            exclude: ["educSelect"]
        },
        group: 'work'
    },
    contract: {
        root: '',
        toggle: '',
        motion:'',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: ["workTimeline", "contract"],
            exclude: ["educSelect"]
        },
        group: 'work'
    },    
    lab: {
        root: '',
        toggle: '',
        motion:'',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: ["workTimeline", "lab"],
            exclude: ["educSelect"]
        },
        group: 'work'
    },    
    workDefault: {
        root: '',
        toggle:'',
        motion: '',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [],
            viewFinal: [],
            include: ["workDefault", "workTimeline"],
            exclude: ["educSelect"]
        },
        group: 'default',
    },
    bioDefault: {
        root:'',
        toggle:'',
        motion: '',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [], 
            viewFinal: [],
            include: [],
            exclude: []
        },
        group: 'default',
    },
    pic1: {
        root: '',
        toggle: '',
        motion: '',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [], 
            viewFinal: [],
            include: ["bioDefault", "pic1"],
            exclude: ["educSelect"]
        },
        group: 'pic',
    },
    pic2: {
        root: '',
        toggle:'',
        motion: '',
        inViewClass: '',
        classToUpdate: [],
        objects: [],
        coordinates: {
            view: [],
            rotate: [], 
            viewFinal: [],
            include: ["bioDefault", "pic2"],
            exclude: ["educSelect"]
        },
        group: 'pic',
    }
};

var delayMultiplyer = 700;
var introRoot;
var nameRoot; 
var delay = 500;

var introRootObjects = [];
var cardElements = [];

var introViewCoordinates = [];
var introDropCoordinates = [];

var speeds = [0, 0, 0];
var spheres = {
    small: [],
    smallMed: [],
    med: [], 
    medLarge: [],
    large: [],
    larger: [],
};

var finalSphere = [];

var nameElement;
var nameCoordinate;
var shrinkCoordinate;
var shrinkCoordinates;

var iteratedIntroView = [];
var iteratedIntroDrop = [];

var introCardExclude = ['2-2', '2-1', '2-0', '2-6', '3-6',
    '3-5', '3-1', '3-0', '4-6', '4-2', '4-1', '4-0',
    '10-0', '11-0', '10-1', '11-1', '10-3', '11-3',
    '10-4', '11-4', '11-5', '11-5', '12-4', '12-3',
    '12-0', '12-1', '13-6', '14-5', '14-6', '16-2',
    '16-3', '16-4', '17-3', '18-0', '18-6', '19-0',
    '19-1', '19-5', '19-6', '20-0', '20-6', '21-3',
    '22-3', '22-4', '22-2', '8-6', '9-6', '8-5'
];

/////////////////////////////////////////////////////////////////////////////////
////////                         navigation menu                         ////////
/////////////////////////////////////////////////////////////////////////////////

var stationaryButtonY = -135;

var menuButtonArray = [{
        label: "Education",
        id: "education-button",
        toggle: 'educHeader',
        sendTo: 'educSummary',
        add: ['education-main-color', 'computer-header-color', 
            'math-header-color', 'econ-header-color'],
        setTrue: ['educSummary', 'educHeader'],
        buttonLinked: ['education-button', 'work-button', 'bio-button'],
        toggleFalse: ["workTimeline", "workDefault", "bioDefault", "pic1", "pic2"],
        position: [-0.2, stationaryButtonY]
    },
    {
        label: "Professional",
        id: "work-button",
        toggle: 'workTimeline',
        sendTo: 'workDefault',
        add: ['workDefault-color', 'workDefault-timeline-color', 'intern-timeline-color',
        'matops-timeline-color', 'contract-timeline-color'],
        setTrue: ["workDefault", "workTimeline"],
        buttonLinked: ['work-button', 'education-button', 'bio-button'],
        toggleFalse: ["educSummary", "bioDefault", "educHeader", "pic1", "pic2"],
        position: [0, stationaryButtonY]
    },
    {
        label: "Bio",
        id: "bio-button",
        toggle: 'bioDefault',
        sendTo: 'pic1',
        add: ['bioDefault-color'],
        setTrue: ["pic1", "bioDefault"],
        buttonLinked: ['bio-button', 'education-button', 'work-button'],
        toggleFalse: ["workTimeline", "educSummary", "educHeader", "workDefault"],
        position: [0.2, stationaryButtonY]
    }
];

/////////////////////////////////////////////////////////////////////////////////
////////                      education headers                          ////////
/////////////////////////////////////////////////////////////////////////////////

var educHeaderY = 2.2;
var educationHeaderArray = [{
        id: "computer",
        major: "Computer Science",
        focus: "[Computer]",
        subcollege: "College of Engineering and Applied Science",
        dates: "January 2020 - May 2021",
        setTrue: ["computer", "educHeader"],
        headerLinked: ['computer-header', 'math-header', 'econ-header'],
        buttonLinked: ['computer-button', 'math-button', 'econ-button'],
        add: ['computer-color', 'math-header-color', 'econ-header-color',
            'computer-header-color'],
        position: [-1.3, educHeaderY]
    },
    {
        id: "math",
        major: "Mathematics",
        focus: "[Computational Mathematics Track]",
        subcollege: "College of Arts and Sciences",
        dates: "January 2020 - May 2021",
        setTrue: ["math", "educHeader"],
        headerLinked: ['math-header', 'computer-header', 'econ-header'],
        buttonLinked: ['math-button', 'econ-button', 'computer-button'],
        add: ['math-color', 'math-header-color', 'econ-header-color',
            'computer-header-color'],
        position: [0, educHeaderY],
    },
    {
        id: "econ",
        major: "Economics",
        focus: "[International Economics Track]",
        subcollege: "College of Arts and Sciences",
        dates: "August 2015 - May 2019",
        setTrue: ["econ", "educHeader"],
        headerLinked: ['econ-header', 'math-header', 'computer-header'],
        buttonLinked: ['econ-button', 'math-button', 'computer-button'],
        add: ['econ-color', 'math-header-color', 'econ-header-color',
            'computer-header-color'],
        position: [1.3, educHeaderY],
    }
];

var educSelectedX = -1.45;
var educSelectedY = 2.1;
var educSelectedStepY = 2;
var EducationHeaderSelectedArray = [{
        position: [educSelectedX, educSelectedY]
    },
    {
        position: [educSelectedX, educSelectedY - (1 * educSelectedStepY)]
    },
    {
        position: [educSelectedX, educSelectedY - (2 * educSelectedStepY)]
    }
];

var educSummaryLeftX = -.652;
var educSummaryRightX = educSummaryLeftX + 1.95;

var educSummaryY = -.2;

var educSummaryYStart = 0.12;
var educSummaryLeftY = 1.95;
var educSummaryRightY = 1.3;
var educationSummaryArray = [{
        id: "lax",
        claddNum: 1,
        clubName: "Mens Lacrosse",
        url: "https://mcla.us/player/41671/max_wiesner.html",
        dates: "August 2015 - May 2016",
        role: "Student Athelete",
        position: [educSummaryLeftX, educSummaryY],
        descriptionFront: "All - Conference player as a freshmen in the Rocky Mountain Lacorsse Conference. Earned the Player of the Week award \
            in the opening week of games acrosse the entire MCLA - D1 league. Opening week we took on two top teams defeating the University of \
            Arizona, and loosing by one against the former national champions, Grand Canyon University; I had hat-tricks in both games (3 goals a piece). \
            CU Mens Lacrosse was a full time team, practices were six days a week during season and on occasion seven days when traveling on the weekends. \
            During off season we had four days a week practices which included two-a-days which required   =>",
        descriptionBack: '6AM morning weight training three times weekly. '
    },
    {
        id: "capa",
        classNum: 2,
        clubName: "CAPA Florence",
        dates: "January 2018 - May 2018",
        role: "Study Abroad",
        position: [educSummaryLeftX, educSummaryY - educSummaryLeftY],
        descriptionFront: "Photo Contest Winner, student farting around in europe. Here is the photo you filthy animals  ",
        descriptionBack: "", 
    },
    {
        id: "sigep",
        clubName: "Sigma Phi Epsilon, Colorado Alpha Chapter",
        dates: "August 2016 - July 2018",
        role: "Brother",
        position: [educSummaryRightX, educSummaryYStart],
        description: "Participated in philanthropies and helped fundraise for multiple causes like Jimmy V."
    },
    {
        id: "econclub",
        clubName: "Economics Club",
        dates: "August 2016 - May 2019",
        role: "Member",
        position: [educSummaryRightX, educSummaryYStart - (1 * educSummaryRightY)],
        description: "Would attend weekly seminars and lectures given by faculty and various guest speakers."
    },
    {
        id: "mathclub",
        clubName: "Math Club",
        dates: "August 2020 - May 2021",
        role: "Member",
        position: [educSummaryRightX, educSummaryYStart - (2 * educSummaryRightY)],
        description: "Would attend weekly seminars and lectures given by faculty and various guest speakers."
    },
    {
        id: "degree",
        role: "Degrees",
        position: [0, educSummaryY + 3.35]
    },
    {
        id: "extra",
        role: "Activities, clubs",
        position: [0, educSummaryY + 1.2]
    }
];

/////////////////////////////////////////////////////////////////////////////////
////////                          course list                            ////////
/////////////////////////////////////////////////////////////////////////////////

var left = -0.32;
var courseStep = 0.9;
var mid = left + (courseStep * 1);
var right = left + (courseStep * 2);
var midLeft = left + (courseStep * 0.5);
var midRight = left + (courseStep * 1.5);

var courseTall = 2;
var firstRow = 2.1;
var secondRow = firstRow - (courseTall * 1);
var thirdRow = firstRow - (courseTall * 2);

var mathArray = [{
        type: "APPM",
        number: "4650",
        name: "Intermediate Numerical Analysis",
        description: "Focuses on numberical solution of nonlinear equations, interpolation, methods in numerical integration, \
            numerical solution of linear systems, and matrix eigenvalue problems; using computer application in Matlab. ",
        language: "Matlab",
        position: [left, firstRow]
    },
    {
        type: "APPM",
        number: "4120",
        name: "Introduction to Operations Research",
        language: "",
        description: "Studied linear and nonlinear programming. Focuses on the simplex method, duality, sensitivity, \
            transportation, network flow, and constrained and unconstrained optimization theory. ",
        position: [mid, firstRow]
    },
    {
        type: "MATH",
        number: "3430",
        name: "Ordinary Differential Equations",
        description: "Covered first/second order ODE's, systems, Dirac delta function, \
            Heavyside, discontinuities, solutions of real/complex/repeating roots. \
            Wrote my final project in solving systems of engineering circuits using Laplace Transforms.",
        language: "LaTeX",
        position: [right, firstRow]
    },
    {
        type: "APPM",
        number: "4440",
        name: "Mathematics of Coding and Cryptography",
        description: "Studied the algebra/number theory behind modern coding and cryptography; topics included \
            encryption, RSA algorithms, discrete log problems, digital signatures, elliptic \
            curves, latticies, error correctiong, and quantum computing.",
        language: "Python, Sage",
        position: [left, secondRow]
    },
    {
        type: "MATH",
        number: "3001",
        name: "Analysis 1",
        description: "A truely RIGOROUS treatment of results in topology, sequences of numbers, continuous functions, \
            differentiable functions, and Riemann integrals.",
        language: "LaTeX",
        position: [mid, secondRow]
    },
    {
        type: "APPM",
        number: "2350",
        name: "Calculus 3 for Engineers",
        description: "Multivariable calculus, including vectors, three-dimensional analytic geometry, partial differentiation \
            and multiple integrals, vector analysis, Stokes/Greens equations, and Lagrange multipliers. ",
        language: "",
        position: [right, secondRow]
    },
    {
        type: "MATH",
        number: "2135",
        name: "Linear Algebra for Math Majors",
        description: "Examined the properties of systems of linear equations, vector spaces, inner products, linear independance,\
            dimension, matricies, diagonalization, eigenvalues/vectors, matricies, and determinants.",
        language: "LaTeX",
        position: [left, thirdRow]
    },
    {
        type: "MATH",
        number: "2001",
        name: "Discrete Mathematics",
        description: "This class was an introduction to rigorous proofs. Focused on basics of set theory, existential and universal quantifiers,\
            discrete probability, and elementary counting.",
        language: "LaTeX",
        position: [mid, thirdRow]
    },
    {
        type: "CSCI",
        number: "2848",
        name: "Discrete Structures",
        description: "Computational discrete mathematics that covered the applications of regular discrete math in the python language. Went \
            deeper into relations, recurrence, combinatorics, booleam algebra, and graph algorithms. ",
        language: "Python",
        position: [right, thirdRow]
    }
];

var computerArray = [{
        type: "CSCI",
        number: "4593",
        name: "Computer Organization (Architecture)",
        description: "Implemented an entire RISC-V multicore processor in a simulated cloud enviornment. ",
        language: "RISC-V",
        position: [mid, firstRow]
    },
    {
        type: "CSCI",
        number: "4448",
        name: "Object Oriented Analysis and Design",
        description: "Applied object-oriented techniques including domain modeling, use cases, architectural design, \
            and modeling notations.",
        language: "Java",
        position: [left, firstRow]
    },
    {
        type: "CSCI",
        number: "3202",
        name: "Artificial Intelligence",
        description: "Surveyed modern AI techniques of search, knowlage representation and reasoning, probabilistic \
            inference, maching learning, and natural language. ",
        language: "Python",
        position: [right, firstRow]
    },
    {
        type: "CSCI",
        number: "3308",
        name: "Software Development Methods and Tools",
        description: "Covers an introduction to full-stack integration, web services, version control, cloud-based deployment \
            agile methodologies, and other industry standard practices.",
        language: "Js, HTML, CSS, SQL",
        position: [left, secondRow]
    },
    {
        type: "CSCI",
        number: "3753",
        name: "Design and Analysis of Operating Systems",
        description: "Analyzed the software that extends computer hardware, including the role of linkers, file systems, \
            resource sharing, security and networking. ",
        language: "C, Linux",
        position: [mid, secondRow]
    },
    {
        type: "CSCI",
        number: "3104",
        name: "Algorithms",
        description: "Time/ space complexity of algorithms; algorithms pertaining to sorting, recirrence,\
             divide and conquer, greedy, dynamic, graph, linear/ and non-linear programming. ",
        language: "C++, Python",
        position: [right, secondRow]
    },
    {
        type: "CSCI",
        number: "3155",
        name: "Principals of Programming Languages",
        description: "Studied the fundamentals governing the design and analysis of languages \
            and the excedution models underlying them. Specifically higher order functions, type systems, scoping, \
            and control structures.",
        language: "Scala",
        position: [left, thirdRow]
    },
    {
        type: "CSCI",
        number: "2400",
        name: "Computer Systems",
        description: "Covered in depth virtual memory, exeptional control flow, linking, momory \
            heiarchy, optimization and performance, processor architecture.",
        language: "C, C++",
        position: [mid, thirdRow]
    },
    {
        type: "CSCI",
        number: "2270",
        name: "Data Structures",
        description: "Implemented from scratch linked lists, binary trees, red-black trees, graphs and graph \
            algorithms, stacks, queues, hash tables, and dynamically allocating memory at run time.",
        language: "C, C++",
        position: [right, thirdRow]
    },
];

var econArray = [{
        type: "ECON",
        number: "4848",
        name: "Applied Econometrics",
        description: "Focuses on applied regression analysis, and advanced statistical programming. We developed models \
            using U.S. census data sources, and presented multiple projects analyzing social and economic issues. ",
        language: "Stata, R",
        position: [left, firstRow]
    },
    {
        type: "ECON",
        number: "3818",
        name: "Statistics with Computer Applications",
        description: "Introduces the statistical methods for quantitative economic analysis; such as ANOVA, \
            probability theory, distributions, sampling theory, estimation, confidence intervals, hypothesis testing, and regression.",
        language: "R",
        position: [right, firstRow]
    },
    {
        type: "ECON",
        number: "4697",
        name: "Industrial Organization Economics",
        description: "Explored newclassical theory of the firm, the determinants of industrial structure, and the purposes \
            and institutions of public policy to control or maintain a competitive enviornment. ",
        language: "",
        position: [mid, firstRow]
    },
    {
        type: "ECON",
        number: "4423",
        name: "International Finance",
        description: "This class was taught by the former Lead Economist in Development Research Group at the World Bank, it was \
            a really humbling semester. We looked at balance of payments, foreign exchange markets, income, and capital flows.",
        language: "",
        position: [left, secondRow]
    },
    {
        type: "ECON",
        number: "3080",
        name: "Intermediate Macroeconomic Theory",
        description: "Focused on theories of aggregate economic activity including the determination of income, employment, and \
            prices; economic growth; and fluctuations. Explored these policies in both open and closed economy models. ",
        language: "",
        position: [right, secondRow]
    },
    {
        type: "ECON",
        number: "3070",
        name: "Intermediate Microeconomic Theory",
        description: "Explored theory and application of models of consumer choice, firm and market organization, and \
            general equilibrium. Included imtertemporal decisions, uncertainty, externalities, and strategic integration. ",
        language: "",
        position: [left, thirdRow]
    },
    {
        type: "BUSN",
        number: "3374",
        name: "International Economics",
        description: "Studied how global businesses are impacted by real world developments in economics, politics, and \
            finance; emphasis on globalization, trade and investment, the global marketplace and monetary system. ",
        language: "",
        position: [mid, secondRow]
    },
    {
        type: "ECON",
        number: "2020",
        name: "Principles of Macroeconomics",
        description: "Looked at an overview of the economy, examining the flows of resources and outputs, and the factors \
            determining the levels of income and prices. Focused on economic growth, unemployment, and infaltion. ",
        language: "",
        position: [right, thirdRow]
    },
    {
        type: "ECON",
        number: "2010",
        name: "Principles of Microeconomics",
        description: "Studied basic concepts of microeconomics and the behavior and interactions of individuals, \
            firms, and government. Looked at how consumers and businesses make descisions, how markets work, and how they fail. ",
        language: "",
        position: [mid, thirdRow]
    },
];

/////////////////////////////////////////////////////////////////////////////////
////////                           work history                          ////////
/////////////////////////////////////////////////////////////////////////////////

var workContentArray = [{
        title: "Technical Operations Analyst",
        timeline: "Jan '19 - May '19",
        company: "Frontier Airlines",
        id: "intern",
        months: 5,
        comit: "[ Full - Time ]",
        description: "Analyze existdfgdsfdsgfaircrafts reaching retirement. Participated in the implementation of \
            uploading new requisitions derived from the new process created. "
    },
    {
        title: "Material Operations Analyst",
        timeline: "June '19 - Jan '20",
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
        timeline: "Jan '20 - Presant",
        months: 13,
        comit: "[30 Hour Weeks]",
        company: "Contractor",
        id: "contract",
        description: "Analyze existing inventory to determine optimal usage and demand \
            levels across all locations. Helped build a new process using existing data to determine \
            new requisitions and part levels. Helped identify out of date materials and their locations, \
            purged these in the system and from the database to improve overall accuracy. Implemented \
            automatically triggered requisitions to sell back unwanted inventory. Organize parts by plane to \
            phase out inventory levels for aircrafts reaching retirement. Participated in the implementation of \
            uploading new requisitions derived from the new process created. "
    },
    {
        title: "Student Researcher",
        timeline: "Jan '21 - Presant",
        months: 7,
        comit: "[Part - Time]",
        company: "Experimental Math Lab",
        id: "lab",
        description: "I DID MATHS!!!"
    }
]

var workToolsArray = [{
        tool: "SQL",
        id: "sql",
        score: {
            intern: 5,
            matops: 8,
            contract: 10,
            lab: 5
        },
        image: './../img/sql.png'
    },
    {
        tool: "Power BI",
        id: "powerbi",
        score: {
            intern: 6,
            matops: 10,
            contract: 10,
            lab: 5
        },
        image: './../img/powerbi.png'
    },
    {
        tool: "Python",
        id: "python",
        score: {
            intern: 0,
            matops: 8,
            contract: 0,
            lab: 5
        },
        image: './../img/python.png'
    },
    {
        tool: "PowerApps",
        id: "powerapps",
        score: {
            intern: 0,
            matops: 0,
            contract: 3,
            lab: 5
        },
        image: './../img/powerapps.png'
    },
    {
        tool: "Excel",
        id: "excel",
        score: {
            intern: 10,
            matops: 7,
            contract: 4,
            lab: 5
        },
        image: './../img/excel.png'
    }
];

var workViewDisplayArray = [{
        title: 'header',
        position: [0, 3]
    },
    {
        title: 'content',
        position: [0.39, 0.583]
    }
];

var homeButtons = 1.95;
var timelineY = -1.15;
var timelineElement = timelineY - 1.55;
var workTimelineDisplayArray = [{
        title: 'intern',
        position: [-1.19, timelineElement]
    },
    {
        title: 'matops',
        position: [-0.63, timelineElement]
    },
    {
        title: 'contract',
        position: [0.48, timelineElement]
    },
    {
        title: 'lab',
        position: [1, timelineElement]
    },
    {
        title: 'timeline',
        position: [-1.93, timelineY]
    },
    {
        title: 'home-button',
        position: [-1.64, timelineElement]
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

var workButtonArray = [
    {
        id: 'left', 
        workDefault: 'lab',
        lab: 'contract',
        matops: 'intern',
        contract: 'matops', 
        intern: 'workDefault',
    }, 
    {
        id: 'right', 
        workDefault: 'intern',
        matops: 'contract',
        lab: 'workDefault', 
        intern: 'matops',
        contract: 'lab'

    }, 
];

var toolsX = -1.46;
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
var workViewDisplayArrayIntern = workViewDisplayArray.concat([{
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
        tool: "Container",
        position: [toolContainerX, toolContainerY]
    }
]);

var workViewDisplayArrayMatOps = workViewDisplayArray.concat([{
        tool: "SQL",
        position: [toolsX, toolsRowThree]
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
        position: [toolsX, toolsRowFour]
    },
    {
        tool: "Container",
        position: [toolContainerX, toolContainerY]
    }
]);

var workViewDisplayArrayContract = workViewDisplayArray.concat([{
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
        tool: "Container",
        position: [toolContainerX, toolContainerY]
    }
]);

var workViewDisplayArrayLab = workViewDisplayArray.concat([{
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
    tool: "Container",
    position: [toolContainerX, toolContainerY]
}
]);


var imageX = 1.3;
var imageY = 1.8;
var workDefaultArray = [{
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
        id: "data-code",
        text: "d fjs aldkjfa lsfakjkjldf aslkdfjla lkdfgjldskfgjdf",
        position: [imageX, 1.8]
    },
    {
        id: "comp-code",
        text: "asdf fasdgasdg adgadsga",
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
var bioDefaultArray = [{
        id: "bio-header",
        position: [0, 3.2],
        inner: "<h3>About Me</h3>",
    },
    {
        id: "bio-main",
        position: [0.47, 1.5],
        inner: "<p>I am a builder, an athelete, a thinker, and an explorer. I was born and raised in Orange County, California; \
        right where they kept the real housewives. I moved with my family to the Denver area in 2011 where I attended highschool and later college. \
        While in school I was a (2x) varsity lacrosse captain, a mathelete/computer nerd, that kid that went abroad for a semester, a frat star, \
        and the slowest kid on the cross country team clocking a 19 minute 5k (which ain't bad). \
        I worked in restraunts from the time I turned 16 until I received my bachelors degree, which gave me leathery skin that has followed me since. \
        <br><br>\
        I enjoy a multitude of things in my free time but narrowing them down I will start with the travel bug that I caught at a young age that I seldom supress; \
        you can see some of my favorite trips below. \
        Next, helping my father with countless home improvement projects taught me that you \
        can build anything you can picture, which got me interested in craftsmanship and creating things in general. Finally I should mention my notable \
        attraction toward anything that is fast and has two wheels. I am a \
        mountain biker in the summers, a former motorcyclist, and a current e-biker. \
        <br><br>\
        I currently live in downtown Denver right next to my favorite places to eat; \
        King Soopers and Whole Foods. I strive for originality in everything I do, and find passion contageous and motivating. I am always looking for \
        new and exciting opportunities to learn, or just generally broaden my domain. </p>",
    },
    {
        id: "bio-pic",
        position: [-1.45, 1.5],
        inner: '<img class="bio-img" src="./../img/me.png">'
    },
    {
        id: "interests",
        position: [0, -.16],
        inner: "<h3>Interests</h3>",
    },
    {
        id: "wood",
        position: [interestsX, interestsYStart - interestsStep],
        inner: '<h3 class="bio-button-header">Woodworking</h3>',
        interestPage: 1,
        buttonLinked: ['wood-button', 'bikes-button', 'travel-button']
    },
    {
        id: "travel",
        position: [interestsX, interestsYStart],
        inner: '<h3 class="bio-button-header">Travel</h3>',
        interestPage: 0,
        buttonLinked: ['travel-button', 'wood-button', 'bikes-button']
    },
    {
        id: "bikes",
        position: [interestsX, interestsYStart - (2 * interestsStep)],
        inner: '<h3 class="bio-button-header">Bikes</h3>',
        interestPage: 2,
        buttonLinked: ['bikes-button', 'wood-button', 'travel-button']
    },
    {
        id: "bio-button-down",
        direction: 'down',
        position: [interestsButtonX, interestButtonMid - interestButtonDist],
        changeRate: -1
    },
    {
        id: "bio-button-up",
        direction: 'up',
        position: [interestsButtonX, interestButtonMid + interestButtonDist],
        changeRate: 1
    }
];

var slideXStep = 1;
var slide1X = -.8;
var slide2X = slide1X + slideXStep;
var slide3X = slide2X + slideXStep;

var slideY = -1.4;
var uSlideDiff = 1.4;

var travel1 = [{
        card: "s",
        id: "slide-1",
        newid: "t1-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./../img/coast2.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "t1-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./../img/elfie.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "t1-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./../img/plane1.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "t1-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Sao Miguel Island, Azores",
        description: "The coastline containing the Ferraria Hot Springs on one of a \
            small chain of islands in the mid-Atlantic.",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "t1-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Chiang Mai, Thailand",
        description: "This is an elfie (elephant selfie), we didn't ride them, only fed them. ",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "t1-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "Sólheimasandur, Iceland",
        description: "At the site of the 1973 U.S. Navy DC plane crash on the Icelands southern \
            coast, dubbed 'Black Sand Beach'.",
        img: "./../img/travel.jpg"
    }
];

var travel2 = [{
        card: "s",
        id: "slide-1",
        newid: "t2-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./../img/deer.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "t2-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./../img/cabo.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "t2-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./../img/gladiator.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "t2-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Nara Park - Kyoto, Japan",
        description: "A national park and sacred temple, where the deer are integrated into \
            normal life. There was probably a 1:1 ratio of deer to people.",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "t2-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Cabo San Lucas, Mexico",
        description: "Snorkling at Lovers Beach. I accidenally dropped the goPro \
            which ended up taking the best photos of the entire trip. ",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "t2-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "San Quirico d'Orcia, Italy",
        description: "The fields where Maximus Desimous Meridious finally got to meet his \
            family in the afterlife. Gladiator. Russell Crowe. ",
        img: "./../img/travel.jpg"
    },
];

var travel3 = [{
        card: "s",
        id: "slide-1",
        newid: "t3-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./../img/laos.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "t3-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./../img/coast4.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "t3-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./../img/australia.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "t3-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Mekong River, Golden Triangle",
        description: "A nautious day trip up river to the border town connecting Laos, Myanmar, and Thailand. ",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "t3-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Cinque Terre, Italy",
        description: "A very small and quiet fishing town in southern Italy. This was the view from \
            our one room apartment airBnB.",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "t3-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "Port Stephens, Australia",
        description: "Caravanning from the Stockton Sand Dunes to the beach to surf \
            (on some giant foam boards). ",
        img: "./../img/travel.jpg"
    },
];

var travel4 = [{
        card: "s",
        id: "slide-1",
        newid: "t4-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./../img/iceland-mnt.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "t4-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./../img/stairs3.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "t4-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./../img/bomb.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "t4-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Vík í Mýrdal, Iceland",
        description: "This whole drive was riddled with commanding ridges and small churches \
            tucked into the land. ",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "t4-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Haiku Stairs - Oahu, Hawaii",
        description: "Know as the 'Stairway to Heaven', a now illegal hike to the top of Oahu. Unfortunately \
            it was cloudy at the top so I couldn't get the shot facing down the stairs. ",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "t4-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "Hiroshima, Japan",
        description: "Genbaku Dome in Hiroshima Peace Memorial Park, one of the few structures left standing \
            near the bomb's hypocenter.",
        img: "./../img/travel.jpg"
    },
];

var travel5 = [{
    card: "s",
    id: "slide-1",
    newid: "t4-s1",
    position: [slide1X, slideY],
    description: "",
    img: "./../img/frst.jpg"
},
{
    card: "s",
    id: "slide-2",
    newid: "t5-s2",
    position: [slide2X, slideY],
    description: "",
    img: "./../img/buda.jpg"
},
{
    card: "s",
    id: "slide-3",
    newid: "t4-s3",
    position: [slide3X, slideY],
    description: "",
    img: "./../img/aby.jpg"
},
{
    card: "u",
    id: "uslide-1",
    newid: "t5-u1",
    position: [slide1X, slideY - uSlideDiff],
    header: "Poca Da Dona Beija, Azores",
    description: "Hot springs spread accross five or so different pools. The pools deeper into the forest \
        had warmer temperatures. ",
    img: "./../img/travel.jpg"
},
{
    card: "u",
    id: "uslide-2",
    newid: "t5-u2",
    position: [slide2X, slideY - uSlideDiff],
    header: "Budapest, Hungary",
    description: "The Hungarian parliment building, taken from the Széchenyi Chain Bridge.",
    img: "./../img/travel.jpg"
},
{
    card: "u",
    id: "uslide-3",
    newid: "t5-u3",
    position: [slide3X, slideY - uSlideDiff],
    header: "Abbey Road, London",
    description: "Was next to impossible to get a photo without strangers. \
        After a hour of trying this is my friend Brandon ruining this group of girls near perfect photo.",
    img: "./../img/travel.jpg"
},
];

var wood1 = [{
        card: "s",
        id: "slide-1",
        newid: "w1-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./../img/prewood1.jpg"
    },
    {
        card: "s",
        newid: "w1-s2",
        id: "slide-2",
        position: [slide2X, slideY],
        description: "",
        img: "./../img/table2.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "w1-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./../img/finaltable.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "w1-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "w1-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "w1-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "travle 1",
        description: "wood1",
        img: "./../img/travel.jpg"
    },
];
var wood2 = [{
        card: "s",
        id: "slide-1",
        newid: "w2-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./../img/bed1.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "w2-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./../img/bed2.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "w2-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./../img/finalbed.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "w2-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "w2-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "w2-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "travle 1",
        description: "wood2",
        img: "./../img/travel.jpg"
    },
];
var wood3 = [{
        card: "s",
        id: "slide-1",
        newid: "w3-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "w3-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "w3-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "w3-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "w3-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "w3-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "wood3",
        description: "",
        img: "./../img/travel.jpg"
    },
];

var bike1 = [{
        card: "s",
        id: "slide-1",
        newid: "b1-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "b1-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "b1-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "b1-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "b1-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "b1-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "bike1",
        description: "",
        img: "./../img/travel.jpg"
    },
];

var bike2 = [{
        card: "s",
        id: "slide-1",
        newid: "b2-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "b2-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        newid: "b2-s3",
        id: "slide-3",
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "b2-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "b2-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "b2-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "bike2",
        description: "",
        img: "./../img/travel.jpg"
    },
];

var bike3 = [{
        card: "s",
        id: "slide-1",
        newid: "b3-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "b3-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "b3-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "b3-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "dfg",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "b3-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "dfgda",
        description: "",
        img: "./../img/travel.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "b3-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "bike3",
        description: "",
        img: "./../img/travel.jpg"
    },
];

var interestPage = 0;
var currentPage = 0;

var allInterestObjs = [
    [
        travel1, travel2, travel3, travel4, travel5
    ],
    [
        wood1, wood2, wood3
    ],
    [
        bike1, bike2, bike3
    ]
];

var alternatingScenes = {
    pic1: travel1,
    pic2: travel2
}
    