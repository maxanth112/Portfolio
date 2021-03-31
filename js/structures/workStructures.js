
var workContentArray = [{
    title: "Technical Operations Analyst",
    timeline: "Jan '19 - May '19",
    company: "Frontier Airlines",
    id: "intern",
    months: 5,
    comit: "[ Full - Time ]",
    description: "Built up common place industry skills and fluency in programs like Excel,\
     PowerBI, and PowerApps. Mid way through the internship I was the leading PowerBI developer \
     on my small team, where I was offered a full-time position soon after. The big project I worked \
     on during this internship was a service level model for maintenance to track baseline progress.\
      For this I used PowerBI dataflows. The report tracked and displayed overall service level statistics,\
       and individual location service level statistics. It identified areas of improvement that would\
        increase productivity and streamlining, and of course the overall KPI numbers. "
},
{
    title: "Material Operations Analyst",
    timeline: "June '19 - Jan '20",
    company: "Frontier Airlines",
    months: 7,
    comit: "[ Full - Time ]",
    id: "matops",
    description: "Focused on long term forecasts for the maintenance department. My big project in \
    this role was building an inventory allocation model for all our consumable and expendable parts. \
    This model advised a reallocation of the current inventory in done in phases to avoid overhead \
    costs with packing and shipping, ground transportation, and manual labor hours. The model was\
     calculated using linear programming methods, and regression analysis implemented in Python. "
},
{
    title: "Contractor - Data Analytics",
    timeline: "Jan '20 - Presant",
    months: 13,
    comit: "[ Full - Time ]",
    company: "Contractor",
    id: "contract",
    description: "For the last year plus, I have been doing data and analytics contract work for the \
    maintenance and engineering department within Frontier Airlines. I quit my previous full time employee \
    role in January 2020 to re-enroll in school because I wanted a more involved role in software \
    engineering. Upon this, I was offered a contracted role focusing on software and reporting \
    development, ironic right? I develop automated PowerBI reports, start to finish for different \
    teams within the department. Half of my job is developing KPI’s, data visualizations, high to \
    low level dashboards, and user facing functionality for these. The other half is working inside\
     our Microsoft SQL Server database, writing and optimizing queries for the before mentioned reports,\
      and the team. This also includes data wrangling and cleaning; I also use Python with the Pandas, \
      NumPy, SymPy, and Matplotlib among others. Besides myself, the BI department, and a select few \
      others, the rest of the company uses Trax; a onetime query and export data application, thus the\
       need for me to develop automated reports and live dataflows."
},
{
    title: "Student Researcher",
    timeline: "Jan '21 - Presant",
    months: 7,
    comit: "[ Part - Time ]",
    company: "Experimental Math Lab",
    id: "lab",
    description: "Currently on a team of five including myself delving deep into what is hailed as the \
        most dangerous problem in mathematics, the Collatz Conjecture. For those that are not familiar; \
        Pick any positive integer, if it is odd, multiply it by three and add one. If it is even, divide \
        it by two. Now repeat this process again and again. The conjecture, will this always lead to the\
         result of the number one? So far, we have explored this question in p-adic space, varying\
          dimensions, mapped it to partial differential equations, proven numerous sub sequences \
          convergent, and much more. My team will deliver an academic paper by the end of the semester \
          regarding our findings, if we can make it that far. “It’s an occupational hazard to mathematicians. \
          This is a really dangerous problem, people become obsessed with it, it really is impossible.”\
           – Jeffrey Lagarias, a leading expert on the conjecture."
}
]

var toolsX = -1.46;
var toolPos = _.range(4).map(x => 1.65 - x * 0.86);

var workToolsArray = [{
    tool: "SQL",
    id: "sql",
    score: {
        intern: 3,
        matops: 5,
        contract: 5,
        lab: 0
    },
    image: './img/sql.png',
    position: [toolPos[2], toolPos[2], toolPos[0], toolPos[0]]
},
{
    tool: "Power BI",
    id: "powerbi",
    score: {
        intern: 3,
        matops: 4,
        contract: 5,
        lab: 0
    },
    image: './img/powerbi.png',
    position: [toolPos[1], toolPos[0], toolPos[1], toolPos[1]]
},
{
    tool: "Python",
    id: "python",
    score: {
        intern: 0,
        matops: 4,
        contract: 4,
        lab: 5
    },
    image: './img/python.png',
    position: [0, toolPos[1], toolPos[0], toolPos[0]]
},
{
    tool: "PowerApps",
    id: "powerapps",
    score: {
        intern: 0,
        matops: 0,
        contract: 0,
        lab: 0
    },
    image: './img/powerapps.png',
    position: [0, 0, toolPos[3], 0]
},
{
    tool: "Excel",
    id: "excel",
    score: {
        intern: 3,
        matops: 0,
        contract: 0,
        lab: 0
    },
    image: './img/excel.png',
    position: [toolPos[0], toolPos[3], toolPos[2], toolPos[2]]
},
{
    tool: "Javascript",
    id: "javascript",
    score: {
        intern: 0,
        matops: 0,
        contract: 0,
        lab: 4
    },
    image: './img/jslogo.png',
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
    position: [-1.717, timelineY - 0.1]
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
var defHeight = 0.66
var defMid = 0.955

var workDefaultArray = [{
    header: "Work History",
    description: "",
    id: "thusfar",
    position: [0, 3.2]
},
{
    header: "Current Experience: ",
    description: "Thus far in my career I have primarily been a statistician, mathematical programmer, and \
        a consultant for ad hoc business decisions. I currently work with Frontier Airlines as an independant \
        contractor within the engineering and maintenance division. I have been able to work on problems ranging from regressional demand planning,\
         to building key point indicators for the maintenance department using longitudal big data programming.\
         Outside of my work in industry, I have been pursuing my computer science and mathematics degrees from \
        the University of Colorado Boulder, where I have been on a research team within the Experimental \
        Mathematics Lab; focusing on the Collatz \
        Conjecture.   ",
    id: "been",
    position: [-defMid, defHeight]
},
{
    header: "My Next Role: ",
    description: "I am interested in computer networks, cloud computing, back end development, \
    machine learning and artificial intelligence. Since those interests apply to 80% of roles within the \
    software engineering and computer science community, I am most focused on finding a position where I am able to keep \
    learning and wearing multiple hats as I have been. I am interested in seeing projects through from start\
    to finish, and not just focusing on perfecting 10%. I am moving to San Diego at the end of the year, and \
    am currently looking for a company/team doing impactful and meaningful work. ",
    id: "going",
    position: [defMid, defHeight]
}
// {
//     id: "data-code",
//     text: "d fjs aldkjfa lsfakjkjldf aslkdfjla lkdfgjldskfgjdf",
//     position: [0, -2.4]
// }
// {
//     id: "comp-code",
//     text: "asdf fasdgasdg adgadsga",
//     position: [-imageX, -0.4]
// }
];
