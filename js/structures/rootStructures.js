// tweening globals 
var toInterval = 500;
var backInterval = 500;
var timeoutTime = 0;
var sphereSizeX = 10;

// renderers, cameras, etc.
var controls, camera, scene, cssRenderer;


var toolCategories = ["intern", "matops", "contract", "lab"];

var allObjects = [];
var rootNames = [
    "stationary",
    "math", "computer", "econ", "educSelect", "educHeader", "educSummary",
    "workTimeline", "intern", "matops", "contract", "lab", "workDefault",
    "bioDefault", "pic1", "pic2"
];

var educationHeaderClasses = ['computer-header',
    'math-header',
    'econ-header'
];

var educationResetClasses = ['education-header-selected',
    'education-header-active'
];

var educationButtonClasses = ['math-button',
    'econ-button',
    'computer-button'
];

var educationHeaderColors = [
    'computer-header-color',
    'math-header-color',
    'econ-header-color'
];

var educationCourseColors = [
    'computer-color',
    'math-color',
    'econ-color'
]

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
        motion: '',
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
        motion: '',
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
        toggle: '',
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
        toggle: '',
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

