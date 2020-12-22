// author: max wiesner
// personal website portfolio

var courseObjects = [];
var workObjects = [];
var allObjects = [];

var alignState = {
    courseDisplayView: [], // course display + work twirling
    courseTwirlingView: [], // course twirling
    mainTwirlingView: [], // course twirling + work twirling 
    workDisplayView: [], // course twirling + work display
    workTwirlingView: [] // work twirling 
};

var controls, camera, scene, cssRenderer, educationRoot, workRoot, staleRoot;
var educationToggle = false;
var workToggle = false;

init();

function init() {

    cssRenderer = createCssRenderer();
    document.body.appendChild(cssRenderer.domElement);
    educationRoot = new THREE.Object3D();
    workRoot = new THREE.Object3D();
    staleRoot = new THREE.Object3D();

    mouse = new THREE.Vector2();
    scene = new THREE.Scene();
    scene.add(educationRoot);
    scene.add(workRoot);
    scene.add(staleRoot);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000);
    camera.position.set(0, 100, 4000);

    controls = new THREE.TrackballControls(camera, cssRenderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 2000;
    controls.maxDistance = 4500;
    controls.addEventListener('change', render);

    populateCourseObjectArray();
    populateWorkObjectArray();

    initTwirlingCourseCoordinates();
    initTwirlingWorkCoordinates();

    initCourseViewCoordinates();
    initWorkDisplayViewCoordinates();


    transform(allObjects, alignState.mainTwirlingView, 500);

    document.getElementById('education').addEventListener('click', function (x) {
        if (educationToggle) {
            transform(allObjects, alignState.mainTwirlingView, 1000);
            educationToggle = false;
        } else {
            transform(allObjects, alignState.courseDisplayView, 1000);
            educationToggle = true;
        }
        workToggle = false;
    }, false);

    document.getElementById('work').addEventListener('click', function (x) {
        if (workToggle) {
            transform(allObjects, alignState.mainTwirlingView, 1000);
            workToggle = false;
        } else {
            transform(allObjects, alignState.workDisplayView, 1000);
            workToggle = true;
        }
        educationToggle = false;
    }, false);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    animate();
}


function initTwirlingCourseCoordinates() {

    var vector = new THREE.Vector3();
    var courseLength = courseArray.length;

    for (var i = 0; i < courseLength; i += 1) {

        var obj = new THREE.Object3D();
        var courseFormula = 2 * Math.PI * i / courseLength;

        obj.position.x = (900 * Math.cos(courseFormula));
        obj.position.y = (900 * Math.sin(courseFormula));
        obj.position.z = 0;

        vector.copy(obj.position).multiplyScalar(2);
        obj.lookAt(vector);
        // course twirling 
        alignState.courseTwirlingView[i] = obj;

        // main twirling = course twirling 
        alignState.mainTwirlingView[i] = obj;
    }
}

function initTwirlingWorkCoordinates() {

    var vector = new THREE.Vector3();
    var workLength = workObjects.length;

    for (var i = 0; i < workLength; i += 1) {

        var obj = new THREE.Object3D();
        var workFormula = 2 * Math.PI * i / workLength;

        obj.position.x = (900 * Math.cos(workFormula));
        obj.position.y = 0;
        obj.position.z = (900 * Math.sin(workFormula));

        vector.copy(obj.position).multiplyScalar(2);
        obj.lookAt(vector);

        // work twirling 
        alignState.workTwirlingView[i] = obj;
    }
    // main twirling = course twirling + work twirling 
    alignState.mainTwirlingView = alignState.mainTwirlingView.concat(alignState.workTwirlingView);
}

function initCourseViewCoordinates() {

    for (var i = 0; i < courseArray.length; i += 1) {

        var educCoord = new THREE.Object3D();
        educCoord.position.x = courseArray[i].position[0] * 420;
        educCoord.position.y = (courseArray[i].position[1]) * 170;
        educCoord.position.z = 3000;

        alignState.courseDisplayView[i] = educCoord;
    }
}


function initWorkDisplayViewCoordinates() {

    for (var i = 0; i < workArray.length; i += 1) {

        var workContentCoord = new THREE.Object3D();
        var workHeaderCoord = new THREE.Object3D();

        workContentCoord.position.x = workArray[i].contentPos[0] * 700;
        workContentCoord.position.y = workArray[i].contentPos[1] * 155;
        workContentCoord.position.z = 3000;

        workHeaderCoord.position.x = workArray[i].headerPos[0] * 700;
        workHeaderCoord.position.y = workArray[i].headerPos[1] * 155;
        workHeaderCoord.position.z = 3000;

        alignState.workDisplayView[i * 2] = workHeaderCoord;
        alignState.workDisplayView[i * 2 + 1] = workContentCoord;
    }
    // work display = course twirling + work display 
    alignState.workDisplayView = alignState.courseTwirlingView.concat(alignState.workDisplayView);
    // course display = course display + work twirling
    alignState.courseDisplayView = alignState.courseDisplayView.concat(alignState.workTwirlingView);
}

function populateCourseObjectArray() {

    for (var i = 0; i < courseArray.length; i += 1) {

        var courseDiv = document.createElement('div');
        courseDiv.className = 'course-element';

        courseDiv.innerHTML = '<div class="course-header">' +
            courseArray[i].type + ' ' + courseArray[i].number +
            '</div>' +
            '<div>' +
            '<h5 class="course-name">' + courseArray[i].name + '</h5>' +
            '<p class="course-details">' + courseArray[i].description + 
            '</p>' + '</div>';

        var courseObj = new THREE.CSS3DObject(courseDiv);
        educationRoot.add(courseObj);
        courseObjects[i] = courseObj;
    }
}

function populateWorkObjectArray() {

    for (var i = 0; i < workArray.length; i += 1) {

        var workDiv = document.createElement('div');
        workDiv.className = 'work-element';

        var workHeaderDiv = document.createElement('div');
        workHeaderDiv.className = 'work-header-element';

        var tools = '';
        for (var j = 0; j < workArray[i].tools.length; j += 1) {
            tools += '<li>' + workArray[i].tools[j] + '</li>';
        }

        workHeaderDiv.innerHTML = '<div class="header">' +
            '<h5 class="name">' + workArray[i].title + '</h5>' +
            workArray[i].timeline + '<div>';

        workDiv.innerHTML = '<div class="header">' + '<h5 class="name">' +
            workArray[i].timeline + '</h5>' + '<p class="details">' +
            workArray[i].description + '</p>' + '<ol class="work-tools">' +
            tools + '</ol>' + '</div>';

        var workObj = new THREE.CSS3DObject(workDiv);
        var workObj2 = new THREE.CSS3DObject(workHeaderDiv);

        workRoot.add(workObj);
        workRoot.add(workObj2);

        workObjects[i * 2] = workObj;
        workObjects[i * 2 + 1] = workObj2;
    }
    // all objects = course objects + work objects 
    allObjects = courseObjects.concat(workObjects);
}

function transform(start, end, duration) {
    TWEEN.removeAll();
    for (var i = 0; i < start.length; i++) {

        var object = start[i];
        var target = end[i];

        new TWEEN.Tween(object.position)
            .to({
                    x: target.position.x,
                    y: target.position.y,
                    z: target.position.z
                },
                Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({
                    x: target.rotation.x,
                    y: target.rotation.y,
                    z: target.rotation.z
                },
                Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();
}

function createCssRenderer() {

    var cssRenderer = new THREE.CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.top = 0;

    return cssRenderer;
}


function render() {

    cssRenderer.render(scene, camera);
}


function animate() {

    const time = Date.now() * 0.0004;

    // if (!educationToggle) {

    //     educationRoot.rotation.x = time;
    //     educationRoot.rotation.y = time * 0.6;
    // }

    if (!workToggle) {

        workRoot.rotation.x = time * 0.6;
        workRoot.rotation.y = time;
    }

    scene.updateMatrixWorld();
    controls.update();
    TWEEN.update();
    render();
    requestAnimationFrame(animate);
}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function onDocumentMouseMove(event) {

    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}