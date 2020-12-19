// author: max wiesner
// personal website portfolio



var courseObjects = [];

var alignState = {
    table: [],
    spinning: [],
    twirling: []
};

var controls, camera, scene, renderer;

init();


function createGlRenderer() {

    var glRenderer = new THREE.WebGLRenderer({alpha: true});
    glRenderer.setClearColor(0xECF8FF);
    glRenderer.setPixelRatio(window.devicePixelRatio);
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    
    // glRenderer.domElement.style.position = 'absolute';
    glRenderer.domElement.style.zIndex = 1;
    glRenderer.domElement.style.top = 0;

    return glRenderer;
}

function init() {

    renderer = createGlRenderer();
    
    document.body.appendChild(renderer.domElement);
    
    mouse = new THREE.Vector2();
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000);
    camera.position.set(0, 100, 3000);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);
    
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    
    create3dGeometry();
    createTextMesh();
    animate();
}



function create3dGeometry() {

    mesh1 = new THREE.Mesh(
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
    // mesh2.position.zIndex  = 0;

    scene.add(mesh1);
    scene.add(mesh2);
    scene.add(mesh3);
}

function createTextMesh() {
    const loader = new THREE.FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

	const geometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
} );

    scene.add(mesh);
}


function createColoredMaterial() {

    var material = new THREE.MeshBasicMaterial();
    material.color.set('red');
    material.opacity = 0.5;
    material.transparent = true;
    material.blending = THREE.NoBlending;

    return material;
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
    
    renderer.render(scene, camera);
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