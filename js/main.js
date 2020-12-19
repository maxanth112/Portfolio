// author: max wiesner
// personal website portfolio

var courseObjects = [];
var workObjects = [];

var alignState = [
    {
        courseView: [],
        courseMainView: []
    },
    {
        workView: [],
        workMainView: []
    }
];

var controls, camera, scene, cssRenderer, root, root2;
var educationToggle = false;
var workToggle = false;

init();



function init() {

    cssRenderer = createCssRenderer();
    document.body.appendChild(cssRenderer.domElement);
    root = new THREE.Object3D();
    root2 = new THREE.Object3D();
    
    mouse = new THREE.Vector2();
    scene = new THREE.Scene();
    scene.add(root);
    scene.add(root2);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000);
    camera.position.set(0, 100, 3000);

    controls = new THREE.TrackballControls(camera, cssRenderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    populateContentArrays();
    initViewCoordinates();
    initEducMainCoordinates();


    transform(courseObjects, alignState[0].courseMainView, 500);
    
    document.getElementById('education').addEventListener('click', function(x) {
        if (educationToggle) {
            transform(courseObjects, alignState[0].courseMainView, 1000);

            educationToggle = false;
        } else {
            transform(courseObjects, alignState[0].courseView, 1000);
            educationToggle = true;
        }
    }, false);
    
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    
    animate();
}

function initEducMainCoordinates() {

    var vector = new THREE.Vector3();
    var l = courseArray.length;

    for (var i = 0; i < l; i += 1) {

        var obj = new THREE.Object3D();
        var n = 2 * Math.PI *  i  / l;
        
        obj.position.x = ( 900 * Math.cos(n) );
        obj.position.y = ( 900 * Math.sin(n) );
        obj.position.z = 0;

        vector.copy( obj.position ).multiplyScalar( 2 );
        obj.lookAt(vector);
        alignState[0].courseMainView[i] = obj;
    }
}

function initViewCoordinates() {

    // courses and education 
    for (var i = 0; i < courseArray.length; i += 1) {

        var initViewCoordinates = new THREE.Object3D();
        initViewCoordinates.position.x = courseArray[i].position[0] * 385;
        initViewCoordinates.position.y = ( courseArray[i].position[1] ) * 155;
        initViewCoordinates.position.z = 3000;
   
        alignState[0].courseView[i] = initViewCoordinates;
        
    }
}


function populateContentArrays() {

    // courses and education 
    for (var i = 0; i < courseArray.length; i += 1) {

        var courseDiv = document.createElement('div');
        courseDiv.className = 'element';

        courseDiv.innerHTML = '<div class="header">' +
            courseArray[i].type + ' ' + courseArray[i].number +
            '</div>' +
            '<div>' +
            '<h5 class="name">' + courseArray[i].name + '</h5>' +
            '<p class="details">' + courseArray[i].description + '</p>'
            '</div>';

        var courseObj = new THREE.CSS3DObject(courseDiv);
        // scene.add(courseObj);
        root.add(courseObj);
        courseObjects[i] = courseObj;
    }

    // courses and education 
    for (var i = 0; i < workArray.length; i += 5) {

        var workDiv = document.createElement('div');
        workDiv.className = 'element';

        var workTitle = document.createElement('div');
        workTitle.className = 'details';

        var workTools = document.createElement('div');
        workTools.className = 'details';

        var workdates = document.createElement('div');
        workdates.className = 'details';

        workdates.innerHTML = '<div class="header">' +
        workArray[i] + ' ' + workArray[i + 2] +
        '</div>';

        workTools.innerHTML = '<div class="header">' +
        workArray[i] + ' ' + workArray[i + 2] +
        '</div>';

        workTitle.innerHTML = '<div class="header">' +
        workArray[i] + ' ' + workArray[i + 2] +
        '</div>';

        workDiv.innerHTML = '<div class="header">' +
            workArray[i] + ' ' + workArray[i + 2] +
            '</div>' +
            '<div>' +
            '<h5 class="name">' + workArray[i+ 1] + '</h5>' +
            '<p class="details">' + workArray[i+4] + '</p>'
            '</div>';

        var workObj = new THREE.CSS3DObject(workDiv);
        var workObj1 = new THREE.CSS3DObject(workTools);
        var workObj2 = new THREE.CSS3DObject(workdates);
        var workObj3 = new THREE.CSS3DObject(workTitle);

        // scene.add(courseObj);
        root2.add(workObj1);
        root2.add(workObj2);
        root2.add(workObj3);
        root2.add(workObj);

        workObjects[i] = workObj;
        workObjects[i+1] = workObj1;
        workObjects[i+2] = workObj2;
        workObjects[i+3] = workObj3;

    }
}


function transform(start, end, duration) {
    TWEEN.removeAll();
    for (var i = 0; i < start.length; i++) {

        var object = start[i];
        var target = end[i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, 
                Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, 
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
    if (!educationToggle) {
        root.rotation.x = time;
        root.rotation.y = time * 0.6;

        root2.rotation.x = time * 0.7;
        root2.rotation.y = time;
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