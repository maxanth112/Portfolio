// author: max wiesner
// personal website portfolio


/////////////////////////////////////////////////////////////////////////////////
////////           initializing variables in all scopes                  ////////
/////////////////////////////////////////////////////////////////////////////////

var courseObjects = [];
var workObjects = [];
var alignState = {
    table: [],
    spinning: [],
    twirling: []
};

var scene, renderer, controls, camera, mouse, raycaster;
var stopCourseRotation = false;
var elapsed = 0;


/////////////////////////////////////////////////////////////////////////////////
////////                         main program                            ////////
/////////////////////////////////////////////////////////////////////////////////

init();
animate();

function init() {

    // set up renderer
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);

    // mouse controls and raycaster 
    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();

    // set up scene, add fog and ambient light 
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);
    scene.add(new THREE.AmbientLight(0x444444));
    const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(0, -1, 0);
    scene.add(light2);

    // camera 
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 1, 10000);
    camera.position.z = 4000;

    // controls 
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    // call all initialize functions to establish coordinates and add objects 
    initTableObjects();
    initSphereObjects(1);


    // imediate function for work timeline 
    $(function(){
        $().timelinr({
            orientation: 	'vertical',
            issuesSpeed: 	300,
            datesSpeed: 	100,
            arrowKeys: 		'true',
            startAt:		3
        })
    });
    
    // keep for now, center of everything 
    let el = document.createElement('div');
    el.innerHTML = "<h1>Helloi</h1>";
    el.style.color = "0xffffff";
    let obj = new THREE.CSS3DObject(el);
    obj.position.set(0, 0, 0);
    scene.add(obj);

    // add event listeners to the buttons for calling things to the front 
    var tableButton = document.getElementById('table');
    tableButton.addEventListener('click', function (something) {
        transform(alignState.table, 2000);
    }, false);

    var sphereButton = document.getElementById('sphere');
    sphereButton.addEventListener('click', function (something) {
        transform(alignState.spinning, 2000);
    }, false);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}


/////////////////////////////////////////////////////////////////////////////////
////////                        loading functions                        ////////
/////////////////////////////////////////////////////////////////////////////////

function initSphereObjects() {

    var vector = new THREE.Vector3();
    var len = courseArray.length;
    alignState.spinning = [];

    for (var i = 0; i < len; i += 1) {

        var object = new THREE.Object3D();
        var n = 2 * Math.PI *  i  / len;
        
        object.position.x = ( 900 * Math.cos(n) );
        object.position.y = ( 900 * Math.sin(n) );
        object.position.z = 0;

        vector.copy( object.position ).multiplyScalar( 2 );
        object.lookAt(vector);
        alignState.spinning.push(object);
    }
}


function initTableObjects() {

    /////////////////////////////////////////////
    //////    course list / education      //////
    /////////////////////////////////////////////
    for (var i = 0; i < courseArray.length; i += 1) {

        // new course element
        var courseElement = document.createElement('div');
        courseElement.className = 'element';
        // courseElement.style.background = 'rgba(0, 127, 127, ' + (Math.random() * 0.5 + 0.25) + ')';

        var contents = '<div class="header">' +
            courseArray[i].type + ' ' + courseArray[i].number +
            '</div>' +
            '<div>' +
            '<h5 class="name">' + courseArray[i].name + '</h5>' +
            '<p class="details">' + courseArray[i].description + '</p>'
            '</div>';

        courseElement.innerHTML = contents;
        var courseObj = new THREE.CSS3DObject(courseElement);

        // position
        scene.add(courseObj);
        courseObjects.push(courseObj);

        // set course object table display coordinates
        var tableObj = new THREE.Object3D();
        tableObj.position.x = courseArray[i].position[0] * 385;
        tableObj.position.y = ( courseArray[i].position[1] ) * 155;
        tableObj.position.z = 3000;
        alignState.table.push(tableObj);
    }

    /////////////////////////////////////////////
    //////     work history timeline       //////
    /////////////////////////////////////////////



    

    // workTimeline.innerHTML = contents; 
    // var workTimelineObj = new THREE.CSS3DObject(workTimeline);

    // // position
    // scene.add(workTimelineObj);
    // workObjects.push(workTimelineObj);

    // // set course object table display coordinates
    // var workTimelineDisplay = new THREE.Object3D();
    // workTimelineDisplay.position.x = 4000;
    // workTimelineDisplay.position.y = 2000;
    // workTimelineDisplay.position.z = 5000;
    // alignState.table.push(tableObj);




















}


/////////////////////////////////////////////////////////////////////////////////
////////                      transform functions                        ////////
/////////////////////////////////////////////////////////////////////////////////

function transform(sendTo, duration) {
    TWEEN.removeAll();
    for (var i = 0; i < courseObjects.length; i++) {

        var object = courseObjects[i];
        var target = sendTo[i];

        new TWEEN.Tween(object.position)
            .to({
                x: target.position.x,
                y: target.position.y,
                z: target.position.z
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({
                x: target.rotation.x,
                y: target.rotation.y,
                z: target.rotation.z
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();
}


function render() {

    renderer.render(scene, camera);
}


function animate() {

    requestAnimationFrame(animate);
    
    controls.update();
    TWEEN.update();
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