// author: max wiesner
// personal website portfolio

var courseObjects = [];
var workObjects = [];
var alignState = {
    table: [],
    spinning: [],
    twirling: []
};

var controls, camera, scene, glRenderer, cssRenderer, root;

init();

function createCssRenderer() {

    var cssRenderer = new THREE.CSS3DRenderer({alpha: true});
    cssRenderer.setSize(window.innerWidth, window.innerHeight);

    // cssRenderer.domElement.style.position = 'absolute';
    // glRenderer.domElement.style.zIndex = 0;
    cssRenderer.domElement.style.top = 0;
    

    return cssRenderer;
}

function createGlRenderer() {

    var glRenderer = new THREE.WebGLRenderer();
    // glRenderer.setClearColor(0xECF8FF);
    glRenderer.setPixelRatio(window.devicePixelRatio);
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    

    // glRenderer.domElement.style.position = 'absolute';
    glRenderer.domElement.style.zIndex = 1;
    glRenderer.domElement.style.top = 0;

    return glRenderer;
}

function init() {

    glRenderer = createGlRenderer();
    cssRenderer = createCssRenderer();
    
    document.body.appendChild(cssRenderer.domElement);
    cssRenderer.domElement.appendChild(glRenderer.domElement);
    
    mouse = new THREE.Vector2();
    root = new THREE.Object3D();
    scene = new THREE.Scene();
    scene.add(root);

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

    initTableObjects();
    initSphereObjects(1);
    
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
    
    create3dGeometry();
    animate();
}

function create3dGeometry() {

    var mesh1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 200, 300, 20, 4),
        createColoredMaterial());

    mesh1.position.x = 0;
    mesh1.position.y = -30;
    mesh1.position.z = 400;

    var mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(200, 200, 200),
        createColoredMaterial());

    mesh2.position.x = -300;
    mesh2.position.y = -300;
    mesh2.position.z = 400;

    var mesh3 = new THREE.Mesh(
        new THREE.SphereGeometry(100, 128, 128),
        createColoredMaterial());

    mesh3.position.x = 500;
    mesh3.position.y = -300;
    mesh3.position.z = 400;

    root.add(mesh1);
    root.add(mesh2);
    root.add(mesh3);
}


function createColoredMaterial() {

    var material = new THREE.MeshBasicMaterial({
        color: Math.floor(Math.random() * 16777215),
       
        side: THREE.DoubleSide
    });

    return material;
}

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

    for (var i = 0; i < courseArray.length; i += 1) {

        var courseElement = document.createElement('div');
        courseElement.className = 'element';

        var contents = '<div class="header">' +
            courseArray[i].type + ' ' + courseArray[i].number +
            '</div>' +
            '<div>' +
            '<h5 class="name">' + courseArray[i].name + '</h5>' +
            '<p class="details">' + courseArray[i].description + '</p>'
            '</div>';

        courseElement.innerHTML = contents;
        var courseObj = new THREE.CSS3DObject(courseElement);

        root.add(courseObj);
        courseObjects.push(courseObj);

        var tableObj = new THREE.Object3D();
        tableObj.position.x = courseArray[i].position[0] * 385;
        tableObj.position.y = ( courseArray[i].position[1] ) * 155;
        tableObj.position.z = 3000;
        alignState.table.push(tableObj);
    }
}


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

    glRenderer.render(scene, camera);
    cssRenderer.render(scene, camera);
}


function animate() {

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