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

    createAllCards();
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

function createCourseCards(arr, save, saveRoot) {

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
        save[i] = courseObj;

        if (saveRoot == "computer") { /////////////////////////////////////////
            computerCourseRoot.add(courseObj);
        } else if (saveRoot == "math") {
            mathCourseRoot.add(courseObj);
        } else {
            econCourseRoot.add(courseObj);
        }
    }
}

function setEducationButtonSelects(b1, c2, c3) {

    var b2 = document.getElementById(c2);
    var b3 = document.getElementById(c3);

    b1.classList.toggle("button-active");
    b2.classList.remove("button-active");
    b3.classList.remove("button-active");

    b1.parentElement.classList.toggle("selected-header");
    b2.parentElement.classList.remove("selected-header");
    b3.parentElement.classList.remove("selected-header");
}

function clearAllNotSelected() {

    var b1 = document.getElementById("computer-button").parentElement;
    var b2 = document.getElementById("math-button").parentElement;
    var b3 = document.getElementById("econ-button").parentElement;

    b1.classList.remove("not-selected-header");
    b2.classList.remove("not-selected-header");
    b3.classList.remove("not-selected-header");
}

function clearAllSelected() {

    var b1 = document.getElementById("computer-button").parentElement;
    var b2 = document.getElementById("math-button").parentElement;
    var b3 = document.getElementById("econ-button").parentElement;

    b1.classList.remove("selected-header");
    b2.classList.remove("selected-header");
    b3.classList.remove("selected-header");
}

function clearAllActiveButtons() {

    var b1 = document.getElementById("computer-button");
    var b2 = document.getElementById("math-button");
    var b3 = document.getElementById("econ-button");

    b1.classList.remove("button-active");
    b2.classList.remove("button-active");
    b3.classList.remove("button-active");
}

function setNotSelected(selected) {

    var b1 = document.getElementById("computer-button").parentElement;
    var b2 = document.getElementById("math-button").parentElement;
    var b3 = document.getElementById("econ-button").parentElement;

    b1.classList.add("not-selected-header");
    b2.classList.add("not-selected-header");
    b3.classList.add("not-selected-header");

    if (selected == "computer") {
        b1.classList.remove("not-selected-header");
    } else if (selected == "math") {
        b2.classList.remove("not-selected-header");
    } else {
        b3.classList.remove("not-selected-header");
    }
}

function flipToggles(toggle) {

    computerToggle = false;
    mathToggle = false;
    econToggle = false;

    if (toggle == "computer") {
        computerToggle = true;
    } else if (toggle == "math") {
        mathToggle = true;
    } else {
        econToggle = true;
    }
}

function replaceButtonText(buttonId, add = 1) {

    if (add) {

        document.getElementById(buttonId).innerHTML = "Main View";
    } else {

        document.getElementById(buttonId).innerHTML = "See Courses";
    }
}

function resetAllButtonText() {

    document.getElementById("computer-button").innerHTML = "See Courses";
    document.getElementById("math-button").innerHTML = "See Courses";
    document.getElementById("econ-button").innerHTML = "See Courses";

    eliminateCourseFlipClass();
}

function manageButton(id) {

    flipToggles(id);
    setNotSelected(id);
    replaceButtonText(id + "-button");
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

        if (courseButton.id == 'computer-button') {

            courseButton.addEventListener('click', function (x) {

                setEducationButtonSelects(this, "math-button", "econ-button");
                resetAllButtonText();

                if (computerToggle) {

                    computerToggle = false;
                    clearAllNotSelected();
                    transform(allEducationObjects, alignState.standardEducationView, 500);
                } else {

                    manageButton("computer");
                    transform(allEducationObjects, alignState.computerView, 500);
                }
                workToggle = false;
            }, false);

        } else if (courseButton.id == 'math-button') {

            courseButton.addEventListener('click', function (x) {

                setEducationButtonSelects(this, "computer-button", "econ-button");
                resetAllButtonText();

                if (mathToggle) {

                    mathToggle = false;
                    clearAllNotSelected();
                    transform(allEducationObjects, alignState.standardEducationView, 500);
                } else {

                    manageButton("math");
                    transform(allEducationObjects, alignState.mathView, 500);
                }
                workToggle = false;
            }, false);
        } else if (courseButton.id == 'econ-button') {

            courseButton.addEventListener('click', function (x) {

                setEducationButtonSelects(this, "computer-button", "math-button");
                resetAllButtonText();

                if (econToggle) {

                    econToggle = false;
                    clearAllNotSelected();
                    transform(allEducationObjects, alignState.standardEducationView, 500);
                } else {

                    manageButton("econ");
                    transform(allEducationObjects, alignState.econView, 500);
                }
                workToggle = false;
            }, false);
        }


        educationDiv.innerHTML =
            '<div class="education-card">' +
            '<h4 class="major">' +
            educationHeaderArray[i].major +
            '</h4>' +
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
        educationHeaderObjects[i] = educationObj;

        educHeaderRoot.add(educationObj); //////////////////////////////////////////
    }
}

function createEducationSummaryCards(saveRoot) {

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
        educationSummaryObjects[i] = educationSummaryObj;

        educSummaryRoot.add(educationSummaryObj);
    }
}

function createMenuButtons() {

    for (var i = 0; i < menuButtonArray.length; i += 1) {

        var menuButton = document.createElement('button');
        menuButton.id = menuButtonArray[i].id;
        menuButton.classList.add("menu-button");
        menuButton.innerHTML = menuButtonArray[i].label;

        var menuButtonObj = new THREE.CSS3DObject(menuButton);
        stationaryRoot.add(menuButtonObj); /////////////////////////////////

        menuButtonObjects[i] = menuButtonObj;

        if (menuButton.id == 'education-button') {

            menuButton.addEventListener('click', function (x) {

                this.classList.toggle("button-active");
                document.getElementById("work-button").classList.remove("button-active");
                document.getElementById("bio-button").classList.remove("button-active");
                resetAllButtonText();
                clearAllSelected();
                clearAllNotSelected();
                clearAllActiveButtons()

                if (educationToggle) {

                    educHeaderRootMotion = false;
                    educSummaryRootMotion = false

                    educationToggle = false;
                    eliminateCourseFlipClass();
                    transform(allEducationObjects, alignState.allEducationTwirling, 500);

                } else {

                    educHeaderRootMotion = true;
                    educSummaryRootMotion = true;

                    educationToggle = true;
                    eliminateCourseFlipClass();

                    transform(allEducationObjects, alignState.standardEducationView, 500);
                    
                }
                workToggle = false;
            }, false);
        }
    }
}


function createWorkHeaderCards() {

    for (var i = 0; i < workContentArray.length; i += 1) {

        var workHeaderDiv = document.createElement('div');
        workHeaderDiv.className = 'work-header-element';
       
        workHeaderDiv.innerHTML =
            '<div class="header">' +
                '<h5 class="name">' +
                    workContentArray[i].title +
                '</h5>' +
                    workContentArray[i].timeline +
            '</div>';

        var workHeaderObj = new THREE.CSS3DObject(workHeaderDiv);
        workHeaderObjects[i] = workHeaderObj;
        
        workRoot.add(workHeaderObj);
    }
}

function createWorkContentCards() {

    for (var i = 0; i < workContentArray.length; i += 1) {

        var workContentDiv = document.createElement('div');
        workContentDiv.className = 'work-element';

        var tools = '';
        for (var j = 0; j < workContentArray[i].tools.length; j += 1) {
            tools += '<li>' + workContentArray[i].tools[j] + '</li>';
        }

        workContentDiv.innerHTML = 
            '<div class="header">' + 
                '<h5 class="name">' +
                    workContentArray[i].timeline + 
                '</h5>' + 
                '<p class="details">' +
                    workContentArray[i].description + 
                '</p>' + 
                '<ol class="work-tools">' +
                    tools + 
                '</ol>' + 
            '</div>';

        var workContentObj = new THREE.CSS3DObject(workContentDiv);
        workContentObjects[i] = workContentObj;

        workRoot.add(workContentObj);
    }
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

    scene.updateMatrixWorld();
    controls.update();
    TWEEN.update();
    render();
    requestAnimationFrame(animate);

    

    if (!educHeaderRootMotion) {

        for ( var i = 0; i < educationHeaderObjects.length; i += 1) {
            educationHeaderObjects[i].rotation.x += Math.PI / 400;
            educationHeaderObjects[i].rotation.y += Math.PI / 400;
        }
    } 
    // if (!educHeaderRootMotion) {

    //     educHeaderRoot.rotation.x += Math.PI / 400;
    //     educHeaderRoot.rotation.y += Math.PI / 400;
    // } 

    // if (true) {

        // educHeaderRoot.rotation.x = time;
        // educHeaderRoot.rotation.y = time * 0.6;

    //     educHeaderRoot.rotation.x += Math.PI / 400;
    //     educHeaderRoot.rotation.y += Math.PI / 400;
    // }

    // if (!workToggle) {

    //     workRoot.rotation.x = time * 0.6;
    //     workRoot.rotation.y = time;
    // }

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

    targetQuaternion = new THREE.Quaternion();

    educationRoot = new THREE.Object3D();
    workRoot = new THREE.Object3D();
    stationaryRoot = new THREE.Object3D();

    mathCourseRoot = new THREE.Object3D();
    computerCourseRoot = new THREE.Object3D();
    econCourseRoot = new THREE.Object3D();
    educHeaderRoot = new THREE.Object3D();
    educSummaryRoot = new THREE.Object3D();

    scene.add(educationRoot);
    scene.add(workRoot);
    scene.add(stationaryRoot);

    scene.add(mathCourseRoot);
    scene.add(computerCourseRoot);
    scene.add(econCourseRoot);
    scene.add(educHeaderRoot);
    scene.add(educSummaryRoot);
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

function createAllCards() {
    // creates the divs (cards) and saves them to the respective objects arrays

    // stationary
    createMenuButtons();

    allStationaryObjects = menuButtonObjects;

    // education
    createCourseCards(mathArray, mathObjects, "math");
    createCourseCards(computerArray, computerObjects, "computer");
    createCourseCards(econArray, econObjects, "econ");
    createEducationHeaderCards();
    createEducationSummaryCards();

    allEducationObjects = mathObjects
        .concat(computerObjects)
        .concat(econObjects)
        .concat(educationHeaderObjects)
        .concat(educationSummaryObjects);

    // work history
    createWorkHeaderCards();
    createWorkContentCards();

    allWorkObjects = workHeaderObjects
        .concat(workContentObjects);
}

function createAllTwirlingCoordinates() {
    // creates twirling coordinates and saves them to the respecive twirling arrays in align states 

    // stationary
    createTwirlingCoordinates(menuButtonArray.length, alignState.menuButtonTwirling, 50, 50, 0);

    // education 
    createTwirlingCoordinates(mathArray.length, alignState.mathTwirling, 500, 500, 0);
    createTwirlingCoordinates(econArray.length, alignState.econTwirling, 700, 700, 0);
    createTwirlingCoordinates(computerArray.length, alignState.computerTwirling, 900, 900, 0);
    createTwirlingCoordinates(educationHeaderArray.length, alignState.educationHeaderTwirling, 300, 300, 0);
    createTwirlingCoordinates(educationSummaryArray.length, alignState.educationSummaryTwirling, 1100, 1100, 0);

    // work history 
    createTwirlingCoordinates(workContentArray.length, alignState.workContentTwirling, 1200, 1200, 0);
    createTwirlingCoordinates(workHeaderArrayPosition.length, alignState.workHeaderTwirling, 1300, 1300, 0);
}

function createAllViewCoordinates() {

    // stationary
    createViewCoordinates(menuButtonArray, alignState.menuButtonView, 1000, 5, 1925);

    // education
    createViewCoordinates(mathArray, alignState.mathView, 500, 200);
    createViewCoordinates(econArray, alignState.econView, 500, 200);
    createViewCoordinates(computerArray, alignState.computerView, 500, 200);
    createViewCoordinates(educationHeaderArray, alignState.educationHeaderView, 500, 200);
    createViewCoordinates(EducationHeaderSelectedArray, alignState.educationHeaderSelectedView, 600, 200);
    createViewCoordinates(educationSummaryArray, alignState.educationSummaryView, 200, 160);

    alignState.allEducationTwirling = alignState.mathTwirling
        .concat(alignState.computerTwirling)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderTwirling)
        .concat(alignState.educationSummaryTwirling);

    alignState.standardEducationView = alignState.mathTwirling
        .concat(alignState.computerTwirling)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderView)
        .concat(alignState.educationSummaryView);

    alignState.computerView = alignState.mathTwirling
        .concat(alignState.computerView)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderSelectedView)
        .concat(alignState.educationSummaryTwirling);

    alignState.mathView = alignState.mathView
        .concat(alignState.computerTwirling)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderSelectedView)
        .concat(alignState.educationSummaryTwirling);

    alignState.econView = alignState.mathTwirling
        .concat(alignState.computerTwirling)
        .concat(alignState.econView)
        .concat(alignState.educationHeaderSelectedView)
        .concat(alignState.educationSummaryTwirling);

    // work history
    createViewCoordinates(workContentArray, alignState.workContentView, 300, 200);
    createViewCoordinates(workHeaderArrayPosition, alignState.workHeaderView, 340, 230);

    alignState.allWorkTwirling = alignState.workContentTwirling
        .concat(alignState.workHeaderTwirling);
}

function startTransformAllCourseObjects() {

    transform(allEducationObjects
            .concat(allWorkObjects)
            .concat(allStationaryObjects), 
        alignState.allEducationTwirling
            .concat(alignState.allWorkTwirling)
            .concat(alignState.menuButtonView), 500);
}