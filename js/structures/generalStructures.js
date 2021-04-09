
var stationaryButtonY = -135;
var stationaryButonXDiff = 0.25;

var menuButtonArray = [{
        label: "Education",
        id: "education-button",
        toggle: 'educHeader',
        sendTo: 'educSummary',
        add: ['education-main-color', 'computer-header-color',
            'math-header-color', 'econ-header-color'
        ],
        setTrue: ['educSummary', 'educHeader'],
        buttonLinked: ['education-button', 'work-button', 'bio-button'],
        toggleFalse: ["workTimeline", "workDefault", "bioDefault", "pic1", "pic2"],
        position: [-stationaryButonXDiff, stationaryButtonY]
    },
    {
        label: "Professional",
        id: "work-button",
        toggle: 'workTimeline',
        sendTo: 'workDefault',
        add: ['workDefault-color', 'workDefault-timeline-color', 'intern-timeline-color',
            'matops-timeline-color', 'contract-timeline-color'
        ],
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
        position: [stationaryButonXDiff, stationaryButtonY]
    }
];

var nameSocialArray = [
    {
        title: 'name',
        position: [-0.5, stationaryButtonY]
    }
]