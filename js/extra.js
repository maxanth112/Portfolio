var courseArray = [{
    type: "APPM",
    number: "4650",
    name: "Intermediate Numerical Analysis",
    description: "",
    position: [2, 1]
},
{
    type: "APPM",
    number: "4120",
    name: "Introduction to Operations Research",
    description: "",
    position: [2, 3]
},
{
    type: "APPM",
    number: "2350",
    name: "Calculus 3 for Engineers",
    description: "",
    position: [2, 6]
},
{
    type: "MATH",
    number: "2001",
    name: "Discrete Mathematics",
    description: "",
    position: [2, 8]
},
{
    type: "MATH",
    number: "2135",
    name: "Linear Algebra for Math Majors",
    description: "",
    position: [2, 7]
},
{
    type: "MATH",
    number: "3001",
    name: "Analysis 1",
    description: "",
    position: [2, 5]
},
{
    type: "MATH",
    number: "3430",
    name: "Ordinary Differential Equations",
    description: "",
    position: [2, 4]
},
{
    type: "APPM",
    number: "4440",
    name: "Mathematics of Coding and Cryptography",
    description: "",
    position: [2, 2]
},
{
    type: "CSCI",
    number: "2270",
    name: "Data Structures",
    description: "",
    position: [1, 9]
},
{
    type: "CSCI",
    number: "2400",
    name: "Computer Systems",
    description: "",
    position: [1, 7]
},
{
    type: "CSCI",
    number: "3308",
    name: "Software Development Methods and Tools",
    description: "",
    position: [1, 6]
},
{
    type: "CSCI",
    number: "2824",
    name: "Descrete Structures",
    description: "",
    position: [1, 10]
},
{
    type: "CSCI",
    number: "3155",
    name: "Principals of Programming Languages",
    description: "",
    position: [1, 8]
},
{
    type: "CSCI",
    number: "3104",
    name: "Algorithms",
    description: "",
    position: [1, 5]
},
{
    type: "CSCI",
    number: "3202",
    name: "Artificial Intelligence",
    description: "",
    position: [1, 4]
},
{
    type: "CSCI",
    number: "4593",
    name: "Computer Organization",
    description: "",
    position: [1, 2]
},
{
    type: "CSCI",
    number: "3753",
    name: "Design and Analysis of Operating Systems",
    description: "",
    position: [1, 3]
},
{
    type: "CSCI",
    number: "4448",
    name: "Object Oriented Analysis and Design",
    description: "",
    position: [1, 1]
},
{
    type: "ECON",
    number: "3818",
    name: "Statistics with Computer Applications",
    description: "",
    position: [3, 4]
},
{
    type: "ECON",
    number: "4848",
    name: "Applied Econometrics",
    description: "",
    position: [3, 1]
},
{
    type: "ECON",
    number: "3080",
    name: "Intermediate Macroeconomic Theory",
    description: "",
    position: [3, 5]
},
{
    type: "ECON",
    number: "3070",
    name: "Intermediate Microeconomic Theory",
    description: "",
    position: [3, 6]
},
{
    type: "ECON",
    number: "2020",
    name: "Principles of Macroeconomics",
    description: "",
    position: [3, 7]
},
{
    type: "ECON",
    number: "2010",
    name: "Principles of Microeconomics",
    description: "",
    position: [3, 8]
},
{
    type: "ECON",
    number: "4697",
    name: "Industrial Organization/Regulation Economics",
    description: "",
    position: [3, 2]
},
{
    type: "ECON",
    number: "4423",
    name: "International Finance",
    description: "",
    position: [3, 3]
}
];



var courseObjects = [];

var alignState = {
grid: [],
spinning: [],
twirling: []
};

var scene, renderer, controls, camera, mouse, raycaster;


init();
animate();


function init() {

renderer = new THREE.CSS3DRenderer();
renderer.setSize(window.innerWidth, innerHeight);

mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();

document.body.appendChild(renderer.domElement);

scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x050505, 2000, 3500);
scene.add(new THREE.AmbientLight(0x444444));
const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
light1.position.set(1, 1, 1);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 1.5);
light2.position.set(0, -1, 0);
scene.add(light2);

var aspect = window.innerWidth / window.innerHeight;
camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
camera.position.z = 2000;

controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 0.5;
controls.minDistance = 500;
controls.maxDistance = 6000;
controls.addEventListener('change', render);



setUpDivs();


let el = document.createElement('div');
el.innerHTML = "<h1>Helloi</h1>";
el.style.color = "0xffffff";
let obj = new THREE.CSS3DObject(el);
obj.position.set(0, 0, 0);
scene.add(obj);

window.addEventListener('resize', onWindowResize, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
}



function render() {
const time = Date.now() * 0.001;

for (let i = 0; i < courseObjects.length; i += 1) {
    courseObjects[i].rotation.x = time * 0.15;
    courseObjects[i].rotation.y = time * 0.25;
    courseObjects[i].rotation.z = time * 0.2;
}

// raycaster.setFromCamera(mouse, camera);
// var instersects;
// for (let j = 0; j < courseObjects.length; j += 1) {
//     intersects = raycaster.intersectObject(courseObjects[j]);

//     if (intersects.length > 0) {
//         const intersect = intersects[0];
//         const face = intersect.face;
//         const objPosition = courseObjects[i].geometry.attributes.position;
//         const linePosition = line.geometry.attributes.position;


//         linePosition.copyAt(0, objPosition, face.a);
//         linePosition.copyAt(1, objPosition, face.b);
//         linePosition.copyAt(2, objPosition, face.c);
//         linePosition.copyAt(3, objPosition, face.a);

//         courseObjects[j].updateMatrix();

//         line.geometry.applyMatrix4(mesh.matrix);

//         line.visible = true;
//     } else {
//         line.visible = false;
//     }
// }
renderer.render(scene, camera);
}


function animate() {

requestAnimationFrame(animate);
controls.update();
render();
}


function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
render();
}

function onDocumentMouseMove(event) {

event.preventDefault();
mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function setUpDivs() {

for (var i = 0; i < courseArray.length; i += 1) {

    // new course element
    var courseElement = document.createElement('div');
    courseElement.className = 'courseElement';
    courseElement.style.background = 'rgba(0, 127, 127, ' + (Math.random() * 0.5 + 0.25) + ')';

    // course number 
    var courseNumber = document.createElement('div');
    courseNumber.className = 'courseNumber';
    courseNumber.textContent = courseArray[i].number;
    courseElement.appendChild(courseNumber);

    // course type
    var courseType = document.createElement('div');
    courseType.className = 'courseType';
    courseType.textContent = courseArray[i].type;
    courseElement.appendChild(courseType);

    // course name
    var courseName = document.createElement('div');
    courseName.className = 'courseName';
    courseName.textContent = courseArray[i].name;
    courseElement.appendChild(courseName);

    // course description
    var courseDescription = document.createElement('div');
    courseDescription.className = 'courseDescription';
    courseDescription.textContent = courseArray[i].description;
    courseElement.appendChild(courseDescription);

    // position
    var courseObj = new THREE.CSS3DObject(courseElement);
    courseObj.position.x = (Math.random() - 0.5) * 1000;
    courseObj.position.y = (Math.random() - 0.5) * 1000;
    courseObj.position.z = (Math.random() - 0.5) * 1000;
    
    // rotation
    courseObj.rotation.x = (Math.random() - 0.5) * 1000;
    courseObj.rotation.y = (Math.random() - 0.5) * 1000;
    courseObj.rotation.z = (Math.random() - 0.5) * 1000;

    let material = new THREE.MeshPhongMaterial( {
        color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
        side: THREE.DoubleSide, vertexColors: true
    } );
    var mesh = new THREE.Mesh(courseObj, material);
    scene.add(mesh);

    // layout
    courseObjects.push(courseObj);
    var gridObj = new THREE.Object3D();
    // gridObj.position.x = courseArray[i].position[0] * 140 - 1260;
    // gridObj.position.y = courseArray[i].position[1] * 180 + 990;
    alignState.grid.push(gridObj);
}
}