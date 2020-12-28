// author: max wiesner
// personal website portfolio

init();

function init() {

    cssRenderer = createCssRenderer();
    document.getElementById('container').appendChild(cssRenderer.domElement);

    initMouseSceneMenu();
    initRoots();
    initCamera();
    initControls();

    createAllEducationCards();
    createAllTwirlingCoordinates();
    createAllViewCoordinates();

    startTransformAllCourseObjects();

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    animate();
}

function welcomeIntro() {

    var welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcomeDiv';

    welcomeDiv.innerHTML =
        '<div class="welcome">' +
        '<p class="pintro">Welcome to my website.</p>' +
        '</div>' +
        '<div class="name">' +
        '<p class="pintro">Maximillian Wiesner</p>' +
        '</div>' +
        '<div class="controls">' +
        '<p class="pintro">Use this to help you navigate. </p>' +
        '</div>';

    welcomeObject = new THREE.CSS3DObject(welcomeDiv);
    welcomeRoot.add(welcomeObject);
}

function createTwirlingCoordinates(len, save, x, y, z) {

    var vector = new THREE.Vector3();

    for (var i = 0; i < len; i += 1) {

        var obj = new THREE.Object3D();
        var formula = 2 * Math.PI * i / len;

        obj.position.x = (x * Math.cos(formula));
        obj.position.y = (y * Math.sin(formula));
        obj.position.z = (z * Math.sin(formula));

        vector.copy(obj.position).multiplyScalar(2);
        obj.lookAt(vector);

        // save to location 
        save[i] = obj;
    }
}

function createViewCoordinates(arr, save, x, y, z = 1800) {

    for (var i = 0; i < arr.length; i += 1) {

        var viewCoordinate = new THREE.Object3D();
        viewCoordinate.position.x = arr[i].position[0] * x;
        viewCoordinate.position.y = arr[i].position[1] * y;
        viewCoordinate.position.z = z;

        save[i] = viewCoordinate;
    }
}


function viewWorkCoordinates() {

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

function createCourseCards(arr, save) {

    for (var i = 0; i < arr.length; i += 1) {

        var courseDiv = document.createElement('div');
        courseDiv.className = 'course-element';

        courseDiv.innerHTML =
            '<div class="course-card ' + arr[i].number + '" onclick="flip(' + arr[i].number + ')">' +
            '<div class="front">' +
            '<h5 class="front-header">' +
            arr[i].name +
            '</h5>' +
            '</div>' +
            '<div class="back">' +
            '<div class="align-me">' +
            '<p class="course-header">' +
            arr[i].type + arr[i].number +
            '</p>' +
            '<p class="languages">' +
            arr[i].language +
            '</p>' +
            '</div>' +
            '<p class="course-description">' +
            arr[i].description +
            '</p>' +
            '</div>' +
            '</div>';

        var courseObj = new THREE.CSS3DObject(courseDiv);
        educationRoot.add(courseObj);
        save[i] = courseObj;
    }
}

function createEducationHeaderCards() {

    for (var i = 0; i < educationHeaderArray.length; i += 1) {

        var educationDiv = document.createElement('div');
        educationDiv.className = 'education-header';
        educationDiv.id = educationHeaderArray[i].cardId;

        var courseButton = document.createElement('button');
        courseButton.id = educationHeaderArray[i].id;
        courseButton.innerHTML = educationHeaderArray[i].label;
        courseButton.classList.add('menu-button');
        courseButton.classList.add('education-filter-buttons');

        if (courseButton.id == 'computer-button') {

            courseButton.addEventListener('click', function (x) {

                var mathBtn = document.getElementById("math-button");
                var econBtn = document.getElementById("econ-button");

                this.classList.toggle("button-active");
                mathBtn.classList.remove("button-active");
                econBtn.classList.remove("button-active");

                this.parentElement.classList.toggle("selected-header");
                mathBtn.parentElement.classList.remove("selected-header");
                econBtn.parentElement.classList.remove("selected-header");

                if (computerToggle) {

                    eliminateCourseFlipClass();
                    transform(allEducationObjects, alignState.standardEducationView, 500);
                    computerToggle = false;
                } else {

                    eliminateCourseFlipClass();
                    transform(allEducationObjects, alignState.computerView, 500);
                    computerToggle = true;
                    econToggle, mathToggle = false;
                }
                workToggle = false;
            }, false);
            
        } else if (courseButton.id == 'math-button') {

            courseButton.addEventListener('click', function (x) {

                var compBtn = document.getElementById("computer-button");
                var econBtn = document.getElementById("econ-button");

                this.classList.toggle("button-active");
                compBtn.classList.remove("button-active");
                econBtn.classList.remove("button-active");

                this.parentElement.classList.toggle("selected-header");
                compBtn.parentElement.classList.remove("selected-header");
                econBtn.parentElement.classList.remove("selected-header");

                this.classList.toggle("button-active");
                document.getElementById("computer-button").classList.remove("button-active");
                document.getElementById("econ-button").classList.remove("button-active");
                if (mathToggle) {

                    eliminateCourseFlipClass();
                    transform(allEducationObjects, alignState.standardEducationView, 500);
                    mathToggle = false;
                } else {

                    eliminateCourseFlipClass();
                    transform(allEducationObjects, alignState.mathView, 500);
                    mathToggle = true;
                    econToggle, computerToggle = false;
                }
                workToggle = false;
            }, false);
        } else if (courseButton.id == 'econ-button') {

            courseButton.addEventListener('click', function (x) {

                var compBtn = document.getElementById("computer-button");
                var mathBtn = document.getElementById("math-button");

                this.classList.toggle("button-active");
                compBtn.classList.remove("button-active");
                mathBtn.classList.remove("button-active");

                this.parentElement.classList.toggle("selected-header");
                mathBtn.parentElement.classList.remove("selected-header");
                compBtn.parentElement.classList.remove("selected-header");

                this.classList.toggle("button-active");
                document.getElementById("math-button").classList.remove("button-active");
                document.getElementById("computer-button").classList.remove("button-active");
                if (econToggle) {

                    eliminateCourseFlipClass();
                    transform(allEducationObjects, alignState.standardEducationView, 500);
                    econToggle = false;
                } else {

                    eliminateCourseFlipClass();
                    transform(allEducationObjects, alignState.econView, 500);
                    econToggle = true;
                    mathToggle, computerToggle = false;
                }
                workToggle = false;
            }, false);
        } 
        

        educationDiv.innerHTML =
            '<div class="education-card">' +
            '<h3 class="major">' +
            educationHeaderArray[i].major +
            '</h3>' +
            '<p class="ba">' +
            'Bachelor of Arts' +
            '</p>' +
            '<h5 class="college">' +
            educationHeaderArray[i].college +
            '</h5>' +
            '<h5 class="subcollege">' +
            educationHeaderArray[i].subcollege +
            '</h5>' +
            '<p class="track">' +
            educationHeaderArray[i].focus +
            '</p>' +
            '</div>';
        educationDiv.appendChild(courseButton);

        var educationObj = new THREE.CSS3DObject(educationDiv);
        educationRoot.add(educationObj);
        educationHeaderObjects[i] = educationObj;
    }
}

function createEducationSummaryCards() {

    for (var i = 0; i < educationSummaryArray.length; i += 1) {

        var educationSummaryCard = document.createElement('div');
        educationSummaryCard.className = 'summary-card';

        educationSummaryCard.innerHTML = 
            '<h4 class="club-header">' +
            educationSummaryArray[i].clubName + 
            '</h4>' + 
            '<p class="club-position">' +
            educationSummaryArray[i].role + 
            '</p>' + 
            '<p class="club-dates">' +
            educationSummaryArray[i].dates + 
            '</p>' + 
            '<p class="club-description">' +
            educationSummaryArray[i].description + 
            '</p>';
        
        var educationSummaryObj = new THREE.CSS3DObject(educationSummaryCard);
        educationRoot.add(educationSummaryObj);
        educationSummaryObjects[i] = educationSummaryObj;
    }
}

function createMenuButtons() {

    for (var i = 0; i < menuButtonArray.length; i += 1) {

        var menuButton = document.createElement('button');
        menuButton.id = menuButtonArray[i].id;
        menuButton.classList.add("menu-button");
        menuButton.innerHTML = menuButtonArray[i].label;

        var menuButtonObj = new THREE.CSS3DObject(menuButton);
        educationRoot.add(menuButtonObj);
        menuButtonObjects[i] = menuButtonObj;

        if (menuButton.id == 'education-button') {

            menuButton.addEventListener('click', function (x) {

                this.classList.toggle("button-active");
                document.getElementById("work-button").classList.remove("button-active");
                document.getElementById("bio-button").classList.remove("button-active");
                if (educationToggle) {
                    educationToggle = false;
                    eliminateCourseFlipClass();
                    transform(allEducationObjects, alignState.allEducationTwirling, 500);
                } else {
                    educationToggle = true;
                    eliminateCourseFlipClass();
                    transform(allEducationObjects, alignState.standardEducationView, 500);
                }
                workToggle = false;
            }, false);
        }
    }
}

function createWorkCards() {

    for (var i = 0; i < workArray.length; i += 1) {

        var workDiv = document.createElement('div');
        workDiv.className = 'work-element';

        var workHeaderDiv = document.createElement('div');
        workHeaderDiv.className = 'work-header-element';

        var tools = '';
        for (var j = 0; j < workArray[i].tools.length; j += 1) {
            tools += '<li>' + workArray[i].tools[j] + '</li>';
        }

        workHeaderDiv.innerHTML = 
            '<div class="header">' +
                '<h5 class="name">' + 
                    workArray[i].title + 
                '</h5>' +
                    workArray[i].timeline + 
                '<div>';
                    workDiv.innerHTML + '<div class="header">' + '<h5 class="name">' +
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

    // const time = Date.now() * 0.0004;

    // if (!educationToggle) {

    //     educationRoot.rotation.x = time;
    //     educationRoot.rotation.y = time * 0.6;
    // }

    // if (!workToggle) {

    //     workRoot.rotation.x = time * 0.6;
    //     workRoot.rotation.y = time;
    // }

    scene.updateMatrixWorld();
    controls.update();
    TWEEN.update();
    render();
    requestAnimationFrame(animate);
}

function flip(element) {
    $('.' + element).toggleClass('flipped');
}

function eliminateCourseFlipClass() {
    $('.course-card').removeClass('flipped');
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

function initRoots() {

    educationRoot = new THREE.Object3D();
    workRoot = new THREE.Object3D();
    welcomeRoot = new THREE.Object3D();

    scene.add(educationRoot);
    // scene.add(workRoot);
    scene.add(welcomeRoot);
}

function initCamera() {

    camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        100,
        5000);
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

function createAllEducationCards() {
    // creates the divs (cards) and saves them to the respective objects arrays

    createCourseCards(mathArray, mathObjects);
    createCourseCards(computerArray, computerObjects);
    createCourseCards(econArray, econObjects);
    createEducationHeaderCards();
    createEducationSummaryCards();
    createMenuButtons();

    allEducationObjects = mathObjects
        .concat(computerObjects)
        .concat(econObjects)
        .concat(educationHeaderObjects)
        .concat(menuButtonObjects)
        .concat(educationSummaryObjects);

}

function createAllTwirlingCoordinates() {
    // creates twirling coordinates and saves them to the respecive twirling arrays in align states 

    createTwirlingCoordinates(mathArray.length, alignState.mathTwirling, 500, 500, 0);
    createTwirlingCoordinates(econArray.length, alignState.econTwirling, 700, 700, 0);
    createTwirlingCoordinates(computerArray.length, alignState.computerTwirling, 900, 900, 0);
    createTwirlingCoordinates(educationHeaderArray.length, alignState.educationHeaderTwirling, 300, 300, 0);
    createTwirlingCoordinates(menuButtonArray.length, alignState.menuButtonTwirling, 50, 50, 0);
    createTwirlingCoordinates(educationSummaryArray.length, alignState.educationSummaryTwirling, 1100, 1100, 0);
}

function createAllViewCoordinates() {

    createViewCoordinates(mathArray, alignState.mathView, 500, 200);
    createViewCoordinates(econArray, alignState.econView, 500, 200);
    createViewCoordinates(computerArray, alignState.computerView, 500, 200);
    createViewCoordinates(educationHeaderArray, alignState.educationHeaderView, 500, 200);
    createViewCoordinates(EducationHeaderSelectedArray, alignState.educationHeaderSelectedView, 600, 200);
    createViewCoordinates(menuButtonArray, alignState.menuButtonView, 1000, 5, 1925);
    createViewCoordinates(educationSummaryArray, alignState.educationSummaryView, 200, 160);

    alignState.allEducationTwirling = alignState.mathTwirling
        .concat(alignState.computerTwirling)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderTwirling)
        .concat(alignState.menuButtonView)
        .concat(alignState.educationSummaryTwirling);

    alignState.standardEducationView = alignState.mathTwirling
        .concat(alignState.computerTwirling)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderView)
        .concat(alignState.menuButtonView)
        .concat(alignState.educationSummaryView);

    alignState.computerView = alignState.mathTwirling
        .concat(alignState.computerView)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderSelectedView)
        .concat(alignState.menuButtonView)
        .concat(alignState.educationSummaryTwirling);

    alignState.mathView = alignState.mathView
        .concat(alignState.computerTwirling)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderSelectedView)
        .concat(alignState.menuButtonView)
        .concat(alignState.educationSummaryTwirling);

    alignState.econView = alignState.mathTwirling
        .concat(alignState.computerTwirling)
        .concat(alignState.econView)
        .concat(alignState.educationHeaderSelectedView)
        .concat(alignState.menuButtonView)
        .concat(alignState.educationSummaryTwirling);
}

function startTransformAllCourseObjects() {

    transform(allEducationObjects, alignState.allEducationTwirling, 500);
    // transform(mathObjects, alignState.mathTwirling, 500);
    // transform(econObjects, alignState.econTwirling, 500);
    // transform(computerObjects, alignState.computerTwirling, 500);    
}