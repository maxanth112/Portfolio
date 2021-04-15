function init() {

    createRotater();

    cssRenderer = createCssRenderer();
    initMouseSceneMenu();
    initRoots();
    initCamera();
    initControls();

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    startStatic();
}

function startStatic() {

    createAllCards();
    createGroupCouts();
    createGroupRotations();
    createAllTwirlingCoordinates();
    createAllViewCoordinates();
    startTransformAllCourseObjects();
    animate();
}

function checkToggles() {

    console.clear();
    console.log(roots);
}


function initRoots() {

    rootNames.forEach(rootObj => {
        roots[rootObj].root = new THREE.Object3D();
        scene.add(roots[rootObj].root);

        roots[rootObj].toggle = false;
        roots[rootObj].motion = false;
    });

    introRoot = new THREE.Object3D();
    scene.add(introRoot);

    nameRoot = new THREE.Object3D();
    scene.add(nameRoot);
}


function initCamera() {

    camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        100,
        4000);
    camera.position.set(0, 0, 2500);
}


function initControls() {

    controls = new THREE.TrackballControls(camera, cssRenderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 1;
    controls.maxDistance = 4500;
    controls.addEventListener('change', render);
}


function initMouseSceneMenu() {

    mouse = new THREE.Vector2();
    scene = new THREE.Scene();
    menu = document.getElementById('menu');
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
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    document.getElementById('cssContainer').appendChild(cssRenderer.domElement);

    return cssRenderer;
}


function render() {

    cssRenderer.render(scene, camera);
}


function animate() {

    scene.updateMatrixWorld();
    TWEEN.update();
    // controls.update();
    render();

    requestAnimationFrame(animate);
    updateIntroSphere();
    updateRotations();
}

function updateIntroSphere() {

    var rot = introRoot.rotation;
    if (speeds[3] == 1) {
        rot.x = rot.y = rot.z = 0;
    }
    rot.x += speeds[0];
    rot.y += speeds[1];
    rot.z += speeds[2];
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
}


function onDocumentMouseMove(event) {

    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}