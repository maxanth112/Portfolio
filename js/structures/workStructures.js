
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

var toolsX = -1.46;
var toolPos = _.range(4).map(x => 1.65 - x * 0.66);

var workToolsArray = [{
    tool: "SQL",
    id: "sql",
    score: {
        intern: 5,
        matops: 8,
        contract: 10,
        lab: 0
    },
    image: './../img/sql.png',
    position: [toolPos[2], toolPos[2], toolPos[0], toolPos[0]]
},
{
    tool: "Power BI",
    id: "powerbi",
    score: {
        intern: 6,
        matops: 10,
        contract: 10,
        lab: 0
    },
    image: './../img/powerbi.png',
    position: [toolPos[1], toolPos[0], toolPos[1], toolPos[1]]
},
{
    tool: "Python",
    id: "python",
    score: {
        intern: 0,
        matops: 8,
        contract: 0,
        lab: 10
    },
    image: './../img/python.png',
    position: [0, toolPos[1], 0, toolPos[0]]
},
{
    tool: "PowerApps",
    id: "powerapps",
    score: {
        intern: 0,
        matops: 0,
        contract: 3,
        lab: 0
    },
    image: './../img/powerapps.png',
    position: [0, 0, toolPos[3], 0]
},
{
    tool: "Excel",
    id: "excel",
    score: {
        intern: 10,
        matops: 7,
        contract: 4,
        lab: 6
    },
    image: './../img/excel.png',
    position: [toolPos[0], toolPos[3], toolPos[2], toolPos[2]]
},
{
    tool: "Javascript",
    id: "javascript",
    score: {
        intern: 0,
        matops: 0,
        contract: 0,
        lab: 8
    },
    image: './../img/jslogo.png',
    position: [toolPos[0], toolPos[3], toolPos[2], toolPos[1]]
}
];


var homeButtons = 1.95;
var timelineY = -1.15;
var timelineElement = timelineY - 1.55;
var workTimelineDisplayArray = [
{
    title: 'intern',
    position: [-1.19, timelineElement]
},
{
    title: 'matops',
    position: [-0.63, timelineElement]
},
{
    title: 'contract',
    position: [0.54, timelineElement]
},
{
    title: 'lab',
    position: [1.09, timelineElement]
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
},
];

var workButtonArray = [{
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

var workViewDisplayArray = [{
    title: 'header',
    position: [0, 3]
},
{
    title: 'content',
    position: [0.39, 0.583]
},
{
    tool: "Container",
    position: [-1.53, 0.585]
},
];

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
}
];
