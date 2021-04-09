var workContentArray = [{
    title: "Technical Operations Analyst",
    timeline: "Jan '19 - May '19",
    company: "Frontier Airlines",
    id: "intern",
    months: 5,
    comit: "[ Full - Time ]",
    description: "Built up common place industry skills and fluency in programs like Excel, \
     PowerBI, and PowerApps; also developed basic programming in SQL and Python. \
     Midway through the internship I was the leading PowerBI developer \
     on my small team, where I was offered a full-time position soon after. The big project I worked \
     on during this internship was a service level model for the maintenance department to track baseline progress.\
     <br><br>I developed the service level model in PowerBI, utilizing SQL for pipelining the required data from \
     our database. The report tracked and displayed overall performance statistics, \
     and individual location service level statistics. The project involved parsing and managing data from 10+ tables, \
     into a clean central dashboard that gives breakouts per aircraft type, location, etc., all the way down to individual part numbers. \
     It identified areas of improvement that would increase productivity and streamlining, and of course the overall KPI numbers. "
},
{
    title: "Material Operations Analyst",
    timeline: "June '19 - Jan '20",
    company: "Frontier Airlines",
    months: 7,
    comit: "[ Full - Time ]",
    id: "matops",
    description: "Focused on long term demand planning and inventory forecasts for the maintenance department. My big project in \
    this role was building an inventory (re)allocation model for all our consumable and expendable parts, which encompassed \
    nearly a hundred-thousand-part bundles to be advised. This was undertaken primarily in Python, weighing heavily on \
    the Numpy and Pandas libraries. With this project I got to apply linear regression and implement directed graphs to help \
    optimize the program, which was cool to see applied to large historical data tables. \
    <br><br>The model advised a reallocation of the current inventory, done in phases to avoid overhead \
    costs with packing and shipping, ground transportation, and manual labor hours; all while prioritizing the essential and immediate parts first. \
    It accounted for overstock in certain locations that could be thinned, which would be reallocated to the closest lacking station as priority. \
    It also advised any remaining understocked parts per location to be purchased, minimizing total part travel time if said part was needed in more than one location: similar to the \
    traveling salesmen problem, but for aircraft parts."
},
{
    title: "Contractor - Data Analytics",
    timeline: "Jan '20 - Presant",
    months: 13,
    comit: "[ Full - Time ]",
    company: "Contractor",
    id: "contract",
    description: "Since the beginning of 2020, I have been doing contracted data analytics work for the \
    maintenance and engineering department within Frontier Airlines. Upon understanding the potential advancement of the technical knowledge \
    I would gain at Frontier; I terminated my previous full-time employment \
    in December 2019 to re-enroll and seek a degree that would promote my software interests. \
    Frontier countered with a contractor position that would suit my educational ambition and focused on \
    Frontiers needs in software and reporting.\
    <br><br>I develop automated PowerBI reports, start to finish for different \
    teams within the department. Half of my responsibilities are developing KPI’s, data visualizations, high to \
    low level dashboards, and the corresponding user facing functionality. The rest of my responsibilities are \
    working inside our Microsoft SQL Server database, writing and optimizing queries for the before mentioned reports, \
    which includes data wrangling and cleaning. This is accompanied with programming in Python for as needed ad hoc business advising."
},
{
    title: "Student Researcher",
    timeline: "Jan '21 - Presant",
    months: 7,
    comit: "[ Part - Time ]",
    company: "Experimental Math Lab",
    id: "lab",
    description: 'I am currently on a team of five students, plus one CU mathematics professor, exploring what the math world has deemed one \
        of the most dangerous problem in mathematics, the Collatz Conjecture. The problem is:\
        <br><br> >> Pick a positive integer, if it is odd, multiply it by three and add one, if even, divide \
        the number by two. Prove this sequence converges to the number 1, for all positive integers.<br><br>\
        So far, we have explored this question in p-adic space, an array of \
        dimensions, and even explored a subset in partial differential equations. I am focusing on the stopping time function of the conjecture, \
        trying to explain the supposed limiting asymptotic density. My team will deliver an academic paper by the end of the semester \
        regarding our findings. Some entertaining quotes on the subject: <br/>  <br/>  <br/>\
        <i><br>“This is a really dangerous problem, people become obsessed with it, it really is impossible.”</i>\
         – Jeffrey Lagarias, the leading expert on the conjecture.<br><br><i>"It\'s actually an occupational hazard when you’re a mathematician"</i> - Terence Tao, Fields Medal Holder.'
}
];


var toolsX = -1.46;
var toolPos = _.range(4).map(x => 1.65 - x * 0.86);

var workToolsArray = [{
    tool: "SQL",
    id: "sql",
    score: {
        intern: 4,
        matops: 6,
        contract: 6,
        lab: 0
    },
    image: './img/sql.png',
    position: [toolPos[2], toolPos[2], toolPos[0], toolPos[0]]
},
{
    tool: "Python",
    id: "python",
    score: {
        intern: 0,
        matops: 6,
        contract: 5,
        lab: 6
    },
    image: './img/python.png',
    position: [0, toolPos[1], toolPos[0], toolPos[0]]
},
{
    tool: "Power BI",
    id: "powerbi",
    score: {
        intern: 4,
        matops: 5,
        contract: 5,
        lab: 0
    },
    image: './img/powerbi.png',
    position: [toolPos[1], toolPos[0], toolPos[1], toolPos[1]]
},
{
    tool: "PowerApps",
    id: "powerapps",
    score: {
        intern: 3,
        matops: 3,
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
        lab: 5
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
    description: "Thus far in my career I have primarily been a mathematical programmer, and \
        a consultant for data backed business decisions. My professional familiarities have been:<br> \
                - Statistics  &nbsp &nbsp &nbsp &nbsp - Big Data <br> \
                - Optimization  &nbsp &nbsp &nbsp - Data Engineering <br> \
                - Data Visualization - Project Management <br> \
        I currently work with Frontier Airlines as an independent \
        contractor within the engineering and maintenance division. I have been able to work on problems ranging from regressional demand planning, \
        to building key point indicators for the department using longitudinal surveys of company data.\
        In Education, I have been pursuing my computer science and mathematics degrees from \
        the University of Colorado Boulder, where I have been on a research team within the Experimental \
        Mathematics Lab; focusing on the Collatz \
        Conjecture. ",
    id: "been",
    position: [-defMid, defHeight]
},
{
    header: "My Next Role: ",
    description: "I am interested in a more computer science focused path, where I can build and create. \
    Though my interests are in a wide array of fields, some of them are:<br> \
    - Computer Networks  &nbsp - Operating Systems <br> \
    - Cloud Computing    &nbsp &nbsp - Machine Learning & AI <br> \
    - Web Programming <br> \
    More than anything, I am interested in \
    a position where I can continue to learn and wear multiple hats. I am interested in seeing projects through from start\
    to finish as much as I can, and not just being responsible for a small percentage. I have experience in high level languages, \
    down to machine and assembly. I have done work professional/academic work in C/C++, JavaScript, Java, and Python, amongst others. Not to mention \
    numerous variations and libraries of the previous. \
    I am not set in Colorado and relocating based on opportunity is welcome, and am \
    currently looking for a company/team doing impactful and leading-edge development.",
    id: "going",
    position: [defMid, defHeight]
}
];

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
