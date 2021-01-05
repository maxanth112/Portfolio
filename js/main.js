// author: max wiesner
// personal website portfolio

init();

function init() {

    cssRenderer = createCssRenderer();

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

// general use helper funcitons
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
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

function createViewCoordinates(arr, save, x = 500, y = 200, z = 1800) {

    for (var i = 0; i < arr.length; i += 1) {

        var viewCoordinate = new THREE.Object3D();
        viewCoordinate.position.x = arr[i].position[0] * x;
        viewCoordinate.position.y = arr[i].position[1] * y;
        viewCoordinate.position.z = z;

        save[i] = viewCoordinate;
    }
}

// main threejs rendering functions 
function initRoots() {

    educationRoot = new THREE.Object3D();
    workRoot = new THREE.Object3D();
    stationaryRoot = new THREE.Object3D();

    scene.add(educationRoot);
    scene.add(workRoot);
    scene.add(stationaryRoot);

    mathCourseRoot = new THREE.Object3D();
    computerCourseRoot = new THREE.Object3D();
    econCourseRoot = new THREE.Object3D();
    educHeaderRoot = new THREE.Object3D();
    educSummaryRoot = new THREE.Object3D();

    scene.add(mathCourseRoot);
    scene.add(computerCourseRoot);
    scene.add(econCourseRoot);
    scene.add(educHeaderRoot);
    scene.add(educSummaryRoot);

    workInternRoot = new THREE.Object3D();
    workMatOpsRoot = new THREE.Object3D();
    workContractRoot = new THREE.Object3D();
    workTimelineRoot = new THREE.Object3D();
    workDefaultRoot = new THREE.Object3D();

    scene.add(workInternRoot);
    scene.add(workMatOpsRoot);
    scene.add(workContractRoot);
    scene.add(workTimelineRoot);
    scene.add(workDefaultRoot);

    defaultBioRoot = new THREE.Object3D();
    interestPic1Root = new THREE.Object3D();
    interestPic2Root = new THREE.Object3D();

    scene.add(defaultBioRoot);
    scene.add(interestPic1Root);
    scene.add(interestPic2Root);
}

function initCamera() {

    camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        100,
        8000);
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
        // console.log("start " + i + "  : ");
        // console.log(start[i]);
        // console.log("end " + i + "  : ");
        // console.log(end[i]);
        // console.log("");

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
    // updateRotations();
}

// general event listeners 
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

// creating cards and divs 
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
                setEducationButtonSelects("computer-button");

                if (computerToggle) {

                    setMotionAndToggleFalse("computer");
                    stopRotationSetTrue("educSummary");
                    clearAllNotSelected();

                    transform(allObjects, alignState.standardEducationView, backInterval);
                } else {

                    stopRotationSetTrue("computer"); // stop rotation
                    setMotionAndToggleFalse("educSummary"); // start rotation and set toggle (up) to false 
                    setMotionAndToggleFalse("math");
                    setMotionAndToggleFalse("econ");
                    manageButton("computer");

                    transform(allObjects, alignState.computerView, toInterval);
                }
                workDefaultToggle = false;
                checkToggles();
            }, false);

        } else if (courseButton.id == 'math-button') {

            courseButton.addEventListener('click', function (x) {
                setEducationButtonSelects("math-button");

                if (mathToggle) {

                    setMotionAndToggleFalse("math");
                    stopRotationSetTrue("educSummary");
                    clearAllNotSelected();

                    transform(allObjects, alignState.standardEducationView, backInterval);
                } else {

                    stopRotationSetTrue("math");
                    setMotionAndToggleFalse("educSummary");
                    setMotionAndToggleFalse("computer");
                    setMotionAndToggleFalse("econ");
                    manageButton("math");

                    transform(allObjects, alignState.mathView, toInterval);
                }
                workDefaultToggle = false;
                checkToggles();
            }, false);
        } else if (courseButton.id == 'econ-button') {

            courseButton.addEventListener('click', function (x) {
                setEducationButtonSelects("econ-button");

                if (econToggle) {

                    setMotionAndToggleFalse("econ");
                    stopRotationSetTrue("educSummary");
                    clearAllNotSelected();

                    transform(allObjects, alignState.standardEducationView, backInterval);
                } else {

                    stopRotationSetTrue("econ");
                    setMotionAndToggleFalse("educSummary");
                    setMotionAndToggleFalse("math");
                    setMotionAndToggleFalse("computer");
                    manageButton("econ");

                    transform(allObjects, alignState.econView, toInterval);
                }
                workDefaultToggle = false;
                checkToggles();
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

function createEducationSummaryCards() {

    for (var i = 0; i < educationSummaryArray.length - 2; i += 1) {

        var educationSummaryCard = document.createElement('div');
        educationSummaryCard.id = educationSummaryArray[i].id;
        educationSummaryCard.className = 'summary-card';

        if (educationSummaryArray[i].id == "capa" || educationSummaryArray[i].id == "lax") {

            educationSummaryCard.innerHTML =
                '<div class="summary-flip ' + educationSummaryArray[i].id + `" onclick='flip("` + educationSummaryArray[i].id + `")'>` +
                '<div class="front">' +
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
                '</p>' +
                '</div>' +
                '<div class="back">' +
                '<p class="club-description">' +
                educationSummaryArray[i].description +
                '</p>' +
                '</div>' +
                '</div>';
        } else {

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
        }

        var educationSummaryObj = new THREE.CSS3DObject(educationSummaryCard);
        educationSummaryObjects[i] = educationSummaryObj;

        educSummaryRoot.add(educationSummaryObj);
    }
    // education category headers 
    var educationCategoryDegree = document.createElement('div');
    educationCategoryDegree.className = 'degree';
    educationCategoryDegree.innerHTML = '<h2>Degrees</h2>';

    var degreeObj = new THREE.CSS3DObject(educationCategoryDegree);
    educationSummaryObjects.push(degreeObj);
    educSummaryRoot.add(degreeObj);


    var educationCategoryExtra = document.createElement('div');
    educationCategoryExtra.className = 'extra';
    educationCategoryExtra.innerHTML = '<h2>Clubs/Associations</h2>';

    var extraObj = new THREE.CSS3DObject(educationCategoryExtra);
    educationSummaryObjects.push(extraObj);
    educSummaryRoot.add(extraObj);
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

                // education reset 
                resetAllButtonText();
                clearAllSelected();
                clearAllNotSelected();
                clearAllActiveButtons();
                eliminateCourseFlipClass();

                setMotionAndToggleFalse("econ");
                setMotionAndToggleFalse("math");
                setMotionAndToggleFalse("computer");
                setMotionAndToggleFalse("workDefault");
                setMotionAndToggleFalse("defaultTools");
                setMotionAndToggleFalse("intern");
                setMotionAndToggleFalse("contract");
                setMotionAndToggleFalse("matops");
                setMotionAndToggleFalse("workTimeline");
                updateWorkSelected("home");


                if (educationToggle) {

                    setMotionAndToggleFalse("educSummary");
                    setMotionAndToggleFalse("educHeader");


                    transform(allObjects, alignState.startingView, backInterval);

                } else {

                    stopRotationSetTrue("educSummary");
                    stopRotationSetTrue("educHeader");


                    transform(allObjects, alignState.standardEducationView, toInterval);
                }
                workTimelineToggle = false;
                bioDefaultToggle = false;
                checkToggles();
            }, false);
        } else if (menuButton.id == 'work-button') {

            menuButton.addEventListener('click', function (x) {

                this.classList.toggle("button-active");
                document.getElementById("education-button").classList.remove("button-active");
                document.getElementById("bio-button").classList.remove("button-active");

                // education reset 
                resetAllButtonText();
                clearAllSelected();
                clearAllNotSelected();
                clearAllActiveButtons();
                eliminateCourseFlipClass();
                setMotionAndToggleFalse("educHeader");
                setMotionAndToggleFalse("educSummary");
                setMotionAndToggleFalse("econ");
                setMotionAndToggleFalse("math");
                setMotionAndToggleFalse("computer");
                setMotionAndToggleFalse("intern");
                setMotionAndToggleFalse("contract");
                setMotionAndToggleFalse("matops");
                updateWorkSelected("home");


                if (workTimelineToggle) {

                    setMotionAndToggleFalse("workDefault");
                    setMotionAndToggleFalse("workTimeline");

                    transform(allObjects, alignState.startingView, backInterval);

                } else {

                    stopRotationSetTrue("workDefault");
                    stopRotationSetTrue("workTimeline");

                    transform(allObjects, alignState.workDefaultView, toInterval);

                    setTimeout(function(){ 

                        var app = document.getElementById("comp-code");
                        var typewriter = new Typewriter(app, {
                            loop: true,
                            delay: 75,
                            cursor: "_"
                          });
                          
                          typewriter
                            .pauseFor(200)
                            .typeString('<span style="color: white;">PS C:\Users\maxwiesner></span>')
                            .pauseFor(300)
                            .typeString('<span style="color: white;">wsl</span>')
                            .pauseFor(300)
                            .deleteAll()
                            .typeString('<span style="color: #27ae60;">maxwies@DESKTOP-BA4NIFH:/mnt/c/Users/maximil$</span>')
                            .deleteChars(10)
                            .typeString('<strong>only <span style="color: #27ae60;">5kb</span> Gzipped!</strong>')
                            .pauseFor(1000)
                            .start();
                     }, 2000);

                }

                educationToggle = false;
                bioDefaultToggle = false;
                checkToggles();
            }, false);
        } else if (menuButton.id == 'bio-button') {

            menuButton.addEventListener('click', function (x) {

                this.classList.toggle("button-active");
                document.getElementById("education-button").classList.remove("button-active");
                document.getElementById("work-button").classList.remove("button-active");

                // education reset 
                resetAllButtonText();
                clearAllSelected();
                clearAllNotSelected();
                clearAllActiveButtons();
                eliminateCourseFlipClass();
                setMotionAndToggleFalse("educHeader");
                setMotionAndToggleFalse("educSummary");
                setMotionAndToggleFalse("econ");
                setMotionAndToggleFalse("math");
                setMotionAndToggleFalse("computer");
                setMotionAndToggleFalse("intern");
                setMotionAndToggleFalse("contract");
                setMotionAndToggleFalse("matops");
                setMotionAndToggleFalse("workDefault");
                setMotionAndToggleFalse("workTimeline");
                updateWorkSelected("home");



                if (bioDefaultToggle) {

                    resetBioButtons();
                    setMotionAndToggleFalse("bioDefault");
                    setMotionAndToggleFalse("bioPic1");
                    setMotionAndToggleFalse("bioPic2");

                    transform(allObjects, alignState.startingView, backInterval);

                } else {

                    resetBioButtons();
                    interestPage = 0;
                    currentInterest = 0;
                    pic2Obj = travel2;

                    stopRotationSetTrue("bioDefault");
                    stopRotationSetTrue("bioPic1");

                    transform(allObjects, alignState.interestPic1View, toInterval);
                }
                educationToggle = false;
                workTimelineToggle = false;
                checkToggles();
            }, false);
        }
    }
}

function createBioDefaultCards() {

    pic1Obj = travel1;
    for (var i = 0; i < bioDefaultArray.length; i += 1) {

        var bioDiv = document.createElement('div');
        bioDiv.id = bioDefaultArray[i].id;
        bioDiv.classList.add("bio-default");

        if (bioDefaultArray[i].id == "bio-pic") {

            bioDiv.innerHTML =
                '<img class="bio-img" src="' + bioDefaultArray[i].img + '">';
        } else if (bioDefaultArray[i].id == "bio-button-down") {

            bioDiv.addEventListener('click', function (x) {

                updateInterestPage(-1);
 
             }, false);

            bioDiv.classList.add("flex-container");
            bioDiv.classList.add("down-arrow");
            bioDiv.innerHTML = '<i class="fa fa-arrow-down fa-5x icon-3d"></i>';
        } else if (bioDefaultArray[i].id == "bio-button-up") {

            bioDiv.addEventListener('click', function (x) {

               updateInterestPage(1);

            }, false);

            bioDiv.classList.add("flex-container");
            bioDiv.classList.add("up-arrow");
            bioDiv.innerHTML = '<i class="fa fa-arrow-up fa-5x icon-3d"></i>';
        } else if (bioDefaultArray[i].id == "bio-main") {

            bioDiv.innerHTML = '<p>' + bioDefaultArray[i].description + '</p>';
        } else if (bioDefaultArray[i].id == "bio-header" || bioDefaultArray[i].id == "interests") {

            bioDiv.innerHTML = '<h3>' + bioDefaultArray[i].description + '</h3>';
        } else {


            bioDiv.classList.add('interest-cards');
            bioDiv.innerHTML =
                '<h3 class="bio-button-header">' + bioDefaultArray[i].description + '</h3>';

            var interestButton = document.createElement('button');
            interestButton.id = bioDefaultArray[i].id + "-button";
            interestButton.innerHTML = "See Pics";

            if (bioDefaultArray[i].id == "travel") {

                bioDiv.classList.add('interest-selected');
                interestButton.innerHTML = "Like Em'?";
                interestPic1Toggle = true;

                interestButton.addEventListener('click', function (x) {

                    var woodButton = document.getElementById("wood-button");
                    var bikesButton = document.getElementById("bikes-button");
                    updateBioInterestButtons(this, bikesButton, woodButton);

                    interestPage = 0;
                    updateInterestPage(0);

                }, false);

            } else if (bioDefaultArray[i].id == "wood") {



                interestButton.addEventListener('click', function (x) {

                    var bikesButton = document.getElementById("bikes-button");
                    var travelButton = document.getElementById("travel-button");
                    updateBioInterestButtons(this, bikesButton, travelButton);

                    interestPage = 1;
                    updateInterestPage(0);

                }, false);

            } else if (bioDefaultArray[i].id == "bikes") {



                interestButton.addEventListener('click', function (x) {

                    var woodButton = document.getElementById("wood-button");
                    var travelButton = document.getElementById("travel-button");
                    updateBioInterestButtons(this, woodButton, travelButton);

                    interestPage = 2;
                    updateInterestPage(0);

                }, false);
            }

            bioDiv.appendChild(interestButton);
        }

        var bioDivObj = new THREE.CSS3DObject(bioDiv);
        defaultBioObjects.push(bioDivObj);
        defaultBioRoot.add(bioDivObj);
    }
}

function updateInterestPage(pageChange) {
    currentPage += pageChange;
    
    if ( (interestPage == 0 ) && ( currentPage == 4 ) ) { // currently on last travel page, taking to first
        
        currentPage = 0;
    } else if ( (interestPage == 0 ) && ( currentPage == -1 ) ){ // currently on last travel page, taking to first
        
        currentPage = 3;
    } else if ( ( interestPage != 0 ) && ( currentPage == 3 ) ) { // on wood or bikes last page, taking to first 
        
        currentPage = 0;
    } else if ( ( interestPage != 0 ) && ( currentPage == -1 ) ) { // on wood or bikes last page, taking to first 
        
        currentPage = 2;
    }
    
    newObj = allInterestObjs[interestPage][currentPage];
    
    if (interestPic1Toggle) { 

        for (var i = 0; i < newObj.length; i += 1) {

            if (i < 3) {

                document.getElementById(pic2Obj[i].newid + "-img").src = newObj[i].img;
            } else {
                
                document.getElementById(pic2Obj[i].newid + "-p").innerHTML = newObj[i].description;
                document.getElementById(pic2Obj[i].newid + "-h3").innerHTML = newObj[i].header;
            }
        }
        
        transform(allObjects, alignState.interestPic2View, toInterval);
        interestPic1Toggle = false; // in back
        interestPic2Toggle = true; // now in view

    } else { 
        
        for (var i = 0; i < newObj.length; i += 1) {

            if (i < 3) {

                document.getElementById(pic1Obj[i].newid + "-img").src = pic1Obj[i].img;
            } else {
                
                document.getElementById(pic1Obj[i].newid + "-p").innerHTML = newObj[i].description;
                document.getElementById(pic1Obj[i].newid + "-h3").innerHTML = newObj[i].header;
            }
        }

        transform(allObjects, alignState.interestPic1View, toInterval);
        interestPic2Toggle = false; // in back
        interestPic1Toggle = true; // now in view
        
        console.log("now pic 2 is in back");
    }
    console.log("ending:");
    console.log("interest pic 1 toggle: " + interestPic1Toggle);
    console.log("interest pic 2 toggle: " + interestPic2Toggle);
}

function updateAllObjects() {

    allBioObjects = defaultBioObjects
        .concat(interestPic1Objects)
        .concat(interestPic2Objects);

    allObjects = allStationaryObjects
        .concat(allEducationObjects)
        .concat(allWorkObjects)
        .concat(allBioObjects);
}

function updateBioInterestButtons(selected, not1, not2) {

    not1.innerHTML = "See Pics";
    not2.innerHTML = "See Pics";
    selected.innerHTML = "Like Em'?";

    not1.parentElement.classList.remove('interest-selected');
    not2.parentElement.classList.remove('interest-selected');
    selected.parentElement.classList.toggle('interest-selected');
}

function resetBioButtons() {

    var woodButton = document.getElementById("wood-button");
    var travelButton = document.getElementById("travel-button");
    var bikesButton = document.getElementById("bikes-button");

    woodButton.parentElement.classList.remove('interest-selected');
    bikesButton.parentElement.classList.remove('interest-selected');
    travelButton.parentElement.classList.add('interest-selected');

    travelButton.innerHTML = "Like Em'?";
    woodButton.innerHTML = "See Pics";
    bikesButton.innerHTML = "See Pics";
}

function createImgCards(arr, saveArr, saveRoot) {

    for (var i = 0; i < arr.length; i += 1) {

        var travelDiv = document.createElement('div');
        travelDiv.classList.add(arr[i].id);

        if (arr[i].card == "s") {
           var travelDivImg = document.createElement('img');
           travelDivImg.src = arr[i].img;
           travelDivImg.id = arr[i].newid + '-img';

           travelDiv.appendChild(travelDivImg);
           console.log(travelDivImg.id);

        } else {
            var travelDivH3 = document.createElement('h3');
            travelDivH3.id = arr[i].newid + '-h3';
            travelDivH3.classList.add("img-loc");
            travelDivH3.innerHTML = arr[i].header;

            var travelDivP = document.createElement('p');
            travelDivP.id = arr[i].newid + '-p';
            travelDivP.innerHTML = arr[i].description;


           travelDiv.appendChild(travelDivH3);
           travelDiv.appendChild(travelDivP);
            
           console.log(travelDivP.id);
           console.log(travelDivH3.id);
        }

        var travelObj = new THREE.CSS3DObject(travelDiv);
        saveArr.push(travelObj);

        if (saveRoot == "pic1") {
            interestPic1Root.add(travelObj);
        } else {
            interestPic2Root.add(travelObj);
        }
    }
}

function createWorkHeaderCards() {

    for (var i = 0; i < workContentArray.length; i += 1) {

        var workHeaderDiv = document.createElement('div');
        workHeaderDiv.className = 'work-header-element';

        workHeaderDiv.innerHTML =
            '<div class="work-top">' +
            '<h5 class="work-top-name">' +
            workContentArray[i].title +
            '</h5>' +
            '<h3 class="work-top-span">' +
            workContentArray[i].comit +
            '</h3>' +
            '</div>';

        var workHeaderObj = new THREE.CSS3DObject(workHeaderDiv);

        if (workContentArray[i].id == "intern") {

            workInternObjects.push(workHeaderObj);
            workInternRoot.add(workHeaderObj);
        } else if (workContentArray[i].id == "matops") {

            workMatOpsObjects.push(workHeaderObj);
            workMatOpsRoot.add(workHeaderObj);
        } else if (workContentArray[i].id == "contract") {

            workContractObjects.push(workHeaderObj);
            workContractRoot.add(workHeaderObj);
        }
    }
}

function createWorkContentCards() {

    for (var i = 0; i < workContentArray.length; i += 1) {

        var workContentDiv = document.createElement('div');
        workContentDiv.classList.add('work-element');
        workContentDiv.classList.add(workContentArray[i].id);

        workContentDiv.innerHTML =
            '<div class="work-header">' +
            '<h5 class="work-name">' +
            workContentArray[i].timeline +
            '</h5>' +
            '<p class="work-details">' +
            workContentArray[i].description +
            '</p>' +
            '</div>';

        var workContentObj = new THREE.CSS3DObject(workContentDiv);

        if (workContentArray[i].id == "intern") {

            workInternObjects.push(workContentObj);
            workInternRoot.add(workContentObj);
        }
        if (workContentArray[i].id == "matops") {

            workMatOpsObjects.push(workContentObj);
            workMatOpsRoot.add(workContentObj);
        }
        if (workContentArray[i].id == "contract") {

            workContractObjects.push(workContentObj);
            workContractRoot.add(workContentObj);
        }
    }
}

function createWorkToolsCards() {

    var toolCategories = ["intern", "matops", "contract"];

    for (var k = 0; k < toolCategories.length; k += 1) {

        // for each element in the tools array
        for (var i = 0; i < workToolsArray.length; i += 1) {

            var workToolsDiv = document.createElement('div');
            workToolsDiv.classList.add('work-tools');
            workToolsDiv.id = toolCategories[k];

            // the tool div inner html
            var hide = workToolsArray[i].score[toolCategories[k]] ? "" : "hide";

            var toolHtml = '<ul class="tool-row ' + hide + '">' +
                '<img class="tool-row-img ' + workToolsArray[i].id + '" src="' +
                workToolsArray[i].image +
                '">' + '<div class="all-tools">';

            // build the rankings 
            for (var j = 0; j < 10; j += 1) {

                if (j < workToolsArray[i].score[toolCategories[k]]) {

                    toolHtml += '<li class="active">' + '</li>';
                } else {

                    toolHtml += '<li></li>';
                }
            }

            toolHtml += '</div>' + '</ul>';
            workToolsDiv.innerHTML = toolHtml;
            var workToolsObj = new THREE.CSS3DObject(workToolsDiv);

            if (toolCategories[k] == "intern") {

                workInternObjects.push(workToolsObj);
                workInternRoot.add(workToolsObj);
            }
            if (toolCategories[k] == "matops") {

                workMatOpsObjects.push(workToolsObj);
                workMatOpsRoot.add(workToolsObj);
            }
            if (toolCategories[k] == "contract") {

                workContractObjects.push(workToolsObj);
                workContractRoot.add(workToolsObj);
            }
        }
    }
}

function createWorkToolsContainer() {

    var toolCategories = ["intern", "matops", "contract"];

    for (var i = 0; i < toolCategories.length; i += 1) {

        var toolContainer = document.createElement('div');
        toolContainer.innerHTML = '<div class="tool-container"><h1 class="tools-header">Software/Tools Used:</h1></div>';
        var toolContainerObj = new THREE.CSS3DObject(toolContainer);

        if (toolCategories[i] == "intern") {

            workInternObjects.push(toolContainerObj);
            workInternRoot.add(toolContainerObj);
        }
        if (toolCategories[i] == "matops") {

            workMatOpsObjects.push(toolContainerObj);
            workMatOpsRoot.add(toolContainerObj);
        }
        if (toolCategories[i] == "contract") {

            workContractObjects.push(toolContainerObj);
            workContractRoot.add(toolContainerObj);
        }
    }
}

function createSocialMedia() {
    var html = '<div class="flex-center">' +
        '<i class="fa fa-github fa-4x icon-3d">' + '</i>' +
        '</div>';
}

function createWorkTimelineCards() {

    for (var i = 0; i < workContentArray.length; i += 1) {

        var workTimelineDiv = document.createElement('div');
        workTimelineDiv.classList.add("timeline-events");
        workTimelineDiv.id = workContentArray[i].id + "-timeline-event";

        workTimelineDiv.innerHTML =
            '<div id="' + '" class="timeline-months-' + workContentArray[i].months + '">' +
            '<h2>' + workContentArray[i].timeline + '</h2>' +
            '<h3>' + workContentArray[i].company + '</h3>' +
            '<h4>' + workContentArray[i].title + '</h4>' +
            '</div>';

        var workTimelineObj = new THREE.CSS3DObject(workTimelineDiv);

        workTimelineObjects.push(workTimelineObj);
        workTimelineRoot.add(workTimelineObj);
    }

    var workTimelineList = document.createElement('ul');
    workTimelineList.classList.add("timeline-years");

    workTimelineList.innerHTML =
        '<div class="timelines-years">' +
        '<li class="tyears">2019</li>' +
        '<li class="tyears">2020</li>' +
        '<li class="tyears">2021</li>' +
        '</ul>';

    var workTimelineListObj = new THREE.CSS3DObject(workTimelineList);
    workTimelineObjects.push(workTimelineListObj);
    workTimelineRoot.add(workTimelineListObj);

    // home button 
    var workTimelineDiv = document.createElement('div');
    workTimelineDiv.classList.add("timeline-events");
    workTimelineDiv.id = "home-button";

    workTimelineDiv.innerHTML =
        '<div id="' + '" class="timeline-months-' + 3 + '">' +
        '<h4>' + 'Home Page' + '</h4>' +
        '</div>';

    var workTimelineObj = new THREE.CSS3DObject(workTimelineDiv);

    workTimelineObjects.push(workTimelineObj);
    workTimelineRoot.add(workTimelineObj);
}

function createWorkButtons() {

    var leftButton = document.createElement('div');
    var rightButton = document.createElement('div');

    leftButton.classList.add("flex-container");
    rightButton.classList.add("flex-container");
    leftButton.classList.add('left-arrow');
    rightButton.classList.add('right-arrow');

    leftButton.innerHTML = '<i class="fa fa-arrow-left fa-5x icon-3d"></i>';
    rightButton.innerHTML = '<i class="fa fa-arrow-right fa-5x icon-3d"></i>';

    var leftButtonObj = new THREE.CSS3DObject(leftButton);
    var rightButtonObj = new THREE.CSS3DObject(rightButton);

    leftButton.addEventListener('click', function (x) {

        if (workDefaultToggle) { // default -> contract


            updateWorkSelected("contract");
            stopRotationSetTrue("contract");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("defaultTools");
            setMotionAndToggleFalse("intern");
            setMotionAndToggleFalse("matops");
            transform(allObjects, alignState.workContractView, backInterval);
        } else if (workMatOpsToggle) { // matops -> intern


            updateWorkSelected("intern");
            stopRotationSetTrue("intern");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("defaultTools");
            setMotionAndToggleFalse("contract");
            setMotionAndToggleFalse("matops");
            transform(allObjects, alignState.workInternView, backInterval);
        } else if (workContractToggle) { // contract -> matops 


            updateWorkSelected("matops");
            stopRotationSetTrue("matops");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("defaultTools");
            setMotionAndToggleFalse("intern");
            setMotionAndToggleFalse("contract");
            transform(allObjects, alignState.workMatOpsView, backInterval);
        } else if (workInternToggle) { // intern -> default


            updateWorkSelected("home");
            stopRotationSetTrue("workDefault");
            stopRotationSetTrue("defaultTools");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("contract");
            setMotionAndToggleFalse("intern");
            setMotionAndToggleFalse("matops");
            transform(allObjects, alignState.workDefaultView, backInterval);
        }
        checkToggles();

    }, false);

    rightButton.addEventListener('click', function (x) {

        if (workDefaultToggle) { // default -> intern 

            updateWorkSelected("intern");
            stopRotationSetTrue("intern");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("defaultTools");
            setMotionAndToggleFalse("contract");
            setMotionAndToggleFalse("matops");
            transform(allObjects, alignState.workInternView, backInterval);
        } else if (workMatOpsToggle) { // matops -> contract

            updateWorkSelected("contract");
            stopRotationSetTrue("contract");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("defaultTools");
            setMotionAndToggleFalse("matops");
            setMotionAndToggleFalse("intern");
            transform(allObjects, alignState.workContractView, backInterval);
        } else if (workContractToggle) { // contract -> default


            updateWorkSelected("home");
            stopRotationSetTrue("workDefault");
            stopRotationSetTrue("defaultTools");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("intern");
            setMotionAndToggleFalse("contract");
            setMotionAndToggleFalse("matops");
            transform(allObjects, alignState.workDefaultView, backInterval);
        } else if (workInternToggle) { // intern -> matops


            updateWorkSelected("matops");
            stopRotationSetTrue("matops");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("defaultTools");
            setMotionAndToggleFalse("intern");
            setMotionAndToggleFalse("contract");
            transform(allObjects, alignState.workMatOpsView, backInterval);
        }
        checkToggles();

    }, false);

    workTimelineObjects.push(leftButtonObj);
    workTimelineObjects.push(rightButtonObj);

    workTimelineRoot.add(leftButtonObj);
    workTimelineRoot.add(rightButtonObj);
}

function updateWorkSelected(newSelected) {

    if (newSelected == "home") {

        document.getElementById("home-button").classList.toggle("selected-timeline");
        document.getElementById("intern-timeline-event").classList.remove("selected-timeline");
        document.getElementById("matops-timeline-event").classList.remove("selected-timeline");
        document.getElementById("contract-timeline-event").classList.remove("selected-timeline");
    } else if (newSelected == "intern") {

        document.getElementById("intern-timeline-event").classList.toggle("selected-timeline");
        document.getElementById("matops-timeline-event").classList.remove("selected-timeline");
        document.getElementById("contract-timeline-event").classList.remove("selected-timeline");
        document.getElementById("home-button").classList.remove("selected-timeline");
    } else if (newSelected == "matops") {

        document.getElementById("matops-timeline-event").classList.toggle("selected-timeline");
        document.getElementById("intern-timeline-event").classList.remove("selected-timeline");
        document.getElementById("contract-timeline-event").classList.remove("selected-timeline");
        document.getElementById("home-button").classList.remove("selected-timeline");
    } else if (newSelected == "contract") {

        document.getElementById("contract-timeline-event").classList.toggle("selected-timeline");
        document.getElementById("intern-timeline-event").classList.remove("selected-timeline");
        document.getElementById("matops-timeline-event").classList.remove("selected-timeline");
        document.getElementById("home-button").classList.remove("selected-timeline");
    } else {

        document.getElementById("contract-timeline-event").classList.remove("selected-timeline");
        document.getElementById("intern-timeline-event").classList.remove("selected-timeline");
        document.getElementById("matops-timeline-event").classList.remove("selected-timeline");
        document.getElementById("home-button").classList.remove("selected-timeline");
    }
}

function createWorkDefaultCards() {

    for (var i = 0; i < workDefaultArray.length; i += 1) {

        var workDefaultMain = document.createElement('div');
        workDefaultMain.id = workDefaultArray[i].id;

        if ( (workDefaultArray[i].id == "data-code") || (workDefaultArray[i].id == "comp-code") ) {
            
            workDefaultMain.innerHTML = '<p></p>';

        } else {

            workDefaultMain.classList.add('work-default');
            workDefaultMain.innerHTML =
                '<h3 class="work-default-header">' +
                workDefaultArray[i].header +
                '</h3>' +
                '<p class="work-default-description">' +
                workDefaultArray[i].description +
                '</p>';
        }

        var workDefaultObj = new THREE.CSS3DObject(workDefaultMain);
        workDefaultObjects.push(workDefaultObj);
        workTimelineRoot.add(workDefaultObj);
    }
}

// managing buttons and toggles 
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

function replaceButtonText(buttonId) {

    document.getElementById(buttonId).innerHTML = "Main View";
}

function resetAllButtonText() {

    document.getElementById("computer-button").innerHTML = "See Courses";
    document.getElementById("math-button").innerHTML = "See Courses";
    document.getElementById("econ-button").innerHTML = "See Courses";
}

function manageButton(id) {

    flipToggles(id);
    setNotSelected(id);
    replaceButtonText(id + "-button");
}

function setEducationButtonSelects(mainButton) {

    var buttons = ["computer-button", "math-button", "econ-button"];
    buttons = buttons.filter(function removeMain(button) {
        return button != mainButton
    });

    var b1 = document.getElementById(mainButton);
    var b2 = document.getElementById(buttons[0]);
    var b3 = document.getElementById(buttons[1]);

    b1.classList.toggle("button-active");
    b1.parentElement.classList.toggle("selected-header");

    b2.classList.remove("button-active");
    b2.parentElement.classList.remove("selected-header");

    b3.classList.remove("button-active");
    b3.parentElement.classList.remove("selected-header");

    resetAllButtonText();
    eliminateCourseFlipClass();
}

// managing rotations and toggles 
function stopRotationSetTrue(root) {

    if (root == "math") {

        mathRootMotion = true;
        mathCourseRoot.rotation.x = 0;
        mathCourseRoot.rotation.y = 0;
        mathCourseRoot.rotation.z = 0;
    } else if (root == "computer") {

        computerRootMotion = true;
        computerCourseRoot.rotation.x = 0;
        computerCourseRoot.rotation.y = 0;
        computerCourseRoot.rotation.z = 0;
    } else if (root == "econ") {

        econRootMotion = true;
        econCourseRoot.rotation.x = 0;
        econCourseRoot.rotation.y = 0;
        econCourseRoot.rotation.z = 0;
    } else if (root == "educHeader") {

        educationToggle = true;
        educHeaderRootMotion = true;
        educHeaderRoot.rotation.x = 0;
        educHeaderRoot.rotation.y = 0;
        educHeaderRoot.rotation.z = 0;
    } else if (root == "educSummary") {

        educationToggle = true;
        educSummaryRootMotion = true;
        educSummaryRoot.rotation.x = 0;
        educSummaryRoot.rotation.y = 0;
        educSummaryRoot.rotation.z = 0;
    } else if (root == "workTimeline") {

        workTimelineToggle = true;
        workTimelineRootMotion = true;
        workTimelineRoot.rotation.x = 0;
        workTimelineRoot.rotation.y = 0;
        workTimelineRoot.rotation.z = 0;
    } else if (root == "workDefault") {

        workDefaultToggle = true;
        workDefaultRootMotion = true;
        workDefaultRoot.rotation.x = 0;
        workDefaultRoot.rotation.y = 0;
        workDefaultRoot.rotation.z = 0;
    } else if (root == "intern") {

        workInternToggle = true;
        workInternRootMotion = true;
        workInternRoot.rotation.x = 0;
        workInternRoot.rotation.y = 0;
        workInternRoot.rotation.z = 0;
    } else if (root == "matops") {

        workMatOpsToggle = true;
        workMatOpsRootMotion = true;
        workMatOpsRoot.rotation.x = 0;
        workMatOpsRoot.rotation.y = 0;
        workMatOpsRoot.rotation.z = 0;
    } else if (root == "contract") {

        workContractToggle = true;
        workContractRootMotion = true;
        workContractRoot.rotation.x = 0;
        workContractRoot.rotation.y = 0;
        workContractRoot.rotation.z = 0;
    } else if (root == "bioDefault") {

        defaultBioToggle = true;
        defaultBioRootMotion = true;
        defaultBioRoot.rotation.x = 0;
        defaultBioRoot.rotation.y = 0;
        defaultBioRoot.rotation.z = 0;
    } else if (root == "bioPic1") {

        interestPic1Toggle = true;
        interestPic1Motion = true;
        interestPic1Root.rotation.x = 0;
        interestPic1Root.rotation.y = 0;
        interestPic1Root.rotation.z = 0;
    } else if (root == "bioPic2") {

        interestPic2Toggle = true;
        interestPic2Motion = true;
        interestPic2Root.rotation.x = 0;
        interestPic2Root.rotation.y = 0;
        interestPic2Root.rotation.z = 0;
    }
}

function checkToggles() {
    return;
    console.clear();

    console.log("EDUCATION: ");
    console.log("   toggle: " + educationToggle);

    console.log("EDUC SUMMARY: ");
    console.log("   rootMotion: " + educSummaryRootMotion);

    console.log("EDUC HEADER: ");
    console.log("   rootMotion: " + educHeaderRootMotion);

    console.log("computer: ");
    console.log("   rootMotion: " + computerRootMotion);
    console.log("   toggle: " + computerToggle);

    console.log("math: ");
    console.log("   rootMotion: " + mathRootMotion);
    console.log("   toggle: " + mathToggle);

    console.log("econ: ");
    console.log("   rootMotion: " + econRootMotion);
    console.log("   toggle: " + econToggle);

    console.log("");

    console.log("WORK TIMELINE: ");
    console.log("   rootMotion: " + workTimelineRootMotion);
    console.log("   toggle: " + workTimelineToggle);

    console.log(" Work Default: ");
    console.log("   rootMotion: " + workDefaultRootMotion);
    console.log("   toggle: " + workDefaultToggle);

    console.log("Intern: ");
    console.log("   rootMotion: " + workInternRootMotion);
    console.log("   toggle: " + workInternToggle);

    console.log("MatOps: ");
    console.log("   rootMotion: " + workMatOpsRootMotion);
    console.log("   toggle: " + workMatOpsToggle);

    console.log("Contract: ");
    console.log("   rootMotion: " + workContractRootMotion);
    console.log("   toggle: " + workContractToggle);
}

function updateRotations() {

    if (!educHeaderRootMotion) {

        educHeaderRoot.rotation.x += 0.0015;
        educHeaderRoot.rotation.y += 0.002;
    }

    if (!educSummaryRootMotion) {

        educSummaryRoot.rotation.y += 0.003;
        educSummaryRoot.rotation.z += 0.0015;
    }

    if (!mathRootMotion) {

        mathCourseRoot.rotation.x += 0.002;
        mathCourseRoot.rotation.y += 0.0015;
    }

    if (!computerRootMotion) {

        computerCourseRoot.rotation.y += 0.003;
        computerCourseRoot.rotation.z += 0.0015;
    }

    if (!econRootMotion) {

        econCourseRoot.rotation.x += 0.005;
        econCourseRoot.rotation.z += 0.001;
    }

    if (!workDefaultRootMotion) {

        workDefaultRoot.rotation.y += 0.005;
        workDefaultRoot.rotation.z += 0.002;
    }

    if (!workInternRootMotion) {

        workInternRoot.rotation.x += 0.005;
        workInternRoot.rotation.y += 0.002;
    }

    if (!workMatOpsRootMotion) {

        workMatOpsRoot.rotation.x += 0.0015;
        workMatOpsRoot.rotation.z += 0.002;
    }

    if (!workContractRootMotion) {

        workContractRoot.rotation.y += 0.0015;
        workContractRoot.rotation.z += 0.002;
    }

    if (!workTimelineRootMotion) {

        workTimelineRoot.rotation.y += 0.0015;
        workTimelineRoot.rotation.z += 0.002;
    }

    if (!defaultBioRootMotion) {

        defaultBioRoot.rotation.y += 0.0015;
        defaultBioRoot.rotation.z += 0.002;
    }

    if (!interestPic1Motion) {
        interestPic1Root.rotation.z += 0.002;
        interestPic1Root.rotation.x += 0.0015;
    }

    if (!interestPic2Motion) {
        interestPic2Root.rotation.z += 0.002;
        interestPic2Root.rotation.y += 0.0015;
    }
}

function setMotionAndToggleFalse(root) {

    if (root == "math") {

        mathRootMotion = false;
        mathToggle = false;
    } else if (root == "computer") {

        computerRootMotion = false;
        computerToggle = false;
    } else if (root == "econ") {

        econRootMotion = false;
        econToggle = false;
    } else if (root == "educHeader") {

        educationToggle = false;
        educHeaderRootMotion = false;
    } else if (root == "educSummary") {

        educSummaryRootMotion = false;
    } else if (root == "workDefault") {

        workDefaultToggle = false;
        workDefaultRootMotion = false;
    } else if (root == "intern") {

        workInternToggle = false;
        workInternRootMotion = false;
    } else if (root == "matops") {

        workMatOpsToggle = false;
        workMatOpsRootMotion = false;
    } else if (root == "contract") {

        workContractToggle = false;
        workContractRootMotion = false;
    } else if (root == "workTimeline") {

        workTimelineToggle = false;
        workTimelineRootMotion = false;
    } else if (root == "bioDefault") {

        defaultBioToggle = false;
        defaultBioRootMotion = false;
    } else if (root == "bioPic1") {

        interestPic1Motion = false;
        interestPic1Toggle = false;
    } else if (root == "bioPic2") {

        interestPic2Motion = false;
        interestPic2Toggle = false;
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

// managing flipping cards 
function flip(element) {
    $('.' + element).toggleClass('flipped');
}

function eliminateCourseFlipClass() {
    $('.course-card').removeClass('flipped');
    $('.summary-flip').removeClass('flipped');
}

// calling all create/coordinate functions 
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
    createWorkTimelineCards();
    createWorkButtons();
    createWorkHeaderCards();
    createWorkContentCards();
    createWorkToolsCards();
    createWorkToolsContainer();
    createWorkDefaultCards();

    allWorkObjects = workTimelineObjects
        .concat(workInternObjects)
        .concat(workMatOpsObjects)
        .concat(workContractObjects)
        .concat(workDefaultObjects);

    // bio
    createImgCards(travel1, interestPic1Objects, "pic1");
    createImgCards(travel2, interestPic2Objects, "pic2");
    createBioDefaultCards();

    allBioObjects = defaultBioObjects
        .concat(interestPic1Objects)
        .concat(interestPic2Objects);

    // ALL OBJECTS
    allObjects = allStationaryObjects
        .concat(allEducationObjects)
        .concat(allWorkObjects)
        .concat(allBioObjects);
}

function createAllTwirlingCoordinates() {
    // creates twirling coordinates and saves them to the respecive twirling arrays in align states 

    // stationary
    createTwirlingCoordinates(menuButtonArray.length, alignState.menuButtonTwirling, 50, 50, 0);

    // education 
    createTwirlingCoordinates(mathArray.length, alignState.mathTwirling, sphereSize, sphereSize, 0);
    createTwirlingCoordinates(econArray.length, alignState.econTwirling, sphereSize, sphereSize, 0);
    createTwirlingCoordinates(computerArray.length, alignState.computerTwirling, sphereSize, sphereSize, 0);
    createTwirlingCoordinates(educationHeaderArray.length, alignState.educationHeaderTwirling, sphereSize, sphereSize, 0);
    createTwirlingCoordinates(educationSummaryArray.length, alignState.educationSummaryTwirling, sphereSize, sphereSize, 0);

    // work history 
    createTwirlingCoordinates(workTimelineObjects.length, alignState.workTimelineTwirling, 200, 200, 0);
    createTwirlingCoordinates(workInternObjects.length, alignState.workInternTwirling, sphereSize, sphereSize, 0);
    createTwirlingCoordinates(workMatOpsObjects.length, alignState.workMatOpsTwirling, sphereSize, sphereSize, 0);
    createTwirlingCoordinates(workContractObjects.length, alignState.workContractTwirling, sphereSize, sphereSize, 0);
    createTwirlingCoordinates(workDefaultObjects.length, alignState.workDefaultTwirling, sphereSize, sphereSize, 0);

    // bio
    createTwirlingCoordinates(defaultBioObjects.length, alignState.defaultBioTwirling, 1000, 1000, 0);
    createTwirlingCoordinates(interestPic1Objects.length, alignState.interestPic1Twirling, 1000, 1000, 0);
    createTwirlingCoordinates(interestPic2Objects.length, alignState.interestPic2Twirling, 1000, 1000, 0);
}

function createAllViewCoordinates() {

    // stationary
    createViewCoordinates(menuButtonArray, alignState.menuButtonView, 1000, 5, 1800);

    // education
    createViewCoordinates(mathArray, alignState.mathView);
    createViewCoordinates(econArray, alignState.econView);
    createViewCoordinates(computerArray, alignState.computerView);
    createViewCoordinates(educationHeaderArray, alignState.educationHeaderView);
    createViewCoordinates(EducationHeaderSelectedArray, alignState.educationHeaderSelectedView);
    createViewCoordinates(educationSummaryArray, alignState.educationSummaryView);

    // work history
    createViewCoordinates(workViewDisplayArrayIntern, alignState.workInternView);
    createViewCoordinates(workViewDisplayArrayMatOps, alignState.workMatOpsView);
    createViewCoordinates(workViewDisplayArrayContract, alignState.workContractView);
    createViewCoordinates(workTimelineDisplayArray, alignState.workTimelineView);
    createViewCoordinates(workDefaultArray, alignState.workDefaultView);

    // bio
    createViewCoordinates(bioDefaultArray, alignState.defaultBioView);
    createViewCoordinates(travel1, alignState.interestPic1View);
    createViewCoordinates(travel2, alignState.interestPic2View);

    // just all education twirling 
    alignState.allEducationTwirling = alignState.mathTwirling
        .concat(alignState.computerTwirling)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderTwirling)
        .concat(alignState.educationSummaryTwirling);

    // just all work twirling 
    alignState.allWorkTwirling = alignState.workTimelineTwirling
        .concat(alignState.workInternTwirling)
        .concat(alignState.workMatOpsTwirling)
        .concat(alignState.workContractTwirling)
        .concat(alignState.workDefaultTwirling);

    // just all bio twirling
    alignState.allBioTwirling = alignState.defaultBioTwirling
        .concat(alignState.interestPic1Twirling)
        .concat(alignState.interestPic2Twirling);

    // specific education views 
    alignState.standardEducationView = alignState.menuButtonView
        .concat(alignState.mathTwirling)
        .concat(alignState.computerTwirling)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderView)
        .concat(alignState.educationSummaryView)
        .concat(alignState.allWorkTwirling)
        .concat(alignState.allBioTwirling);

    alignState.computerView = alignState.menuButtonView
        .concat(alignState.mathTwirling)
        .concat(alignState.computerView)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderSelectedView)
        .concat(alignState.educationSummaryTwirling)
        .concat(alignState.allWorkTwirling)
        .concat(alignState.allBioTwirling);

    alignState.mathView = alignState.menuButtonView
        .concat(alignState.mathView)
        .concat(alignState.computerTwirling)
        .concat(alignState.econTwirling)
        .concat(alignState.educationHeaderSelectedView)
        .concat(alignState.educationSummaryTwirling)
        .concat(alignState.allWorkTwirling)
        .concat(alignState.allBioTwirling);

    alignState.econView = alignState.menuButtonView
        .concat(alignState.mathTwirling)
        .concat(alignState.computerTwirling)
        .concat(alignState.econView)
        .concat(alignState.educationHeaderSelectedView)
        .concat(alignState.educationSummaryTwirling)
        .concat(alignState.allWorkTwirling)
        .concat(alignState.allBioTwirling);

    // specific work views 
    alignState.workDefaultView = alignState.menuButtonView
        .concat(alignState.allEducationTwirling)
        .concat(alignState.workTimelineView)
        .concat(alignState.workInternTwirling)
        .concat(alignState.workMatOpsTwirling)
        .concat(alignState.workContractTwirling)
        .concat(alignState.workDefaultView)
        .concat(alignState.allBioTwirling);

    alignState.workInternView = alignState.menuButtonView
        .concat(alignState.allEducationTwirling)
        .concat(alignState.workTimelineView)
        .concat(alignState.workInternView)
        .concat(alignState.workMatOpsTwirling)
        .concat(alignState.workContractTwirling)
        .concat(alignState.workDefaultTwirling)
        .concat(alignState.allBioTwirling);

    alignState.workMatOpsView = alignState.menuButtonView
        .concat(alignState.allEducationTwirling)
        .concat(alignState.workTimelineView)
        .concat(alignState.workInternTwirling)
        .concat(alignState.workMatOpsView)
        .concat(alignState.workContractTwirling)
        .concat(alignState.workDefaultTwirling)
        .concat(alignState.allBioTwirling);

    alignState.workContractView = alignState.menuButtonView
        .concat(alignState.allEducationTwirling)
        .concat(alignState.workTimelineView)
        .concat(alignState.workInternTwirling)
        .concat(alignState.workMatOpsTwirling)
        .concat(alignState.workContractView)
        .concat(alignState.workDefaultTwirling)
        .concat(alignState.allBioTwirling);

    // specific bio views 
    alignState.interestPic1View = alignState.menuButtonView
        .concat(alignState.allEducationTwirling)
        .concat(alignState.allWorkTwirling)
        .concat(alignState.defaultBioView)
        .concat(alignState.interestPic1View)
        .concat(alignState.interestPic2Twirling);

    alignState.interestPic2View = alignState.menuButtonView
        .concat(alignState.allEducationTwirling)
        .concat(alignState.allWorkTwirling)
        .concat(alignState.defaultBioView)
        .concat(alignState.interestPic1Twirling)
        .concat(alignState.interestPic2View);

    // ALL OBJECTS 
    alignState.startingView = alignState.menuButtonView
        .concat(alignState.allEducationTwirling)
        .concat(alignState.allWorkTwirling)
        .concat(alignState.allBioTwirling);

    // console.log(alignState.defaultBioView);
}

// initial site startup 
function startTransformAllCourseObjects() {

    transform(allObjects, alignState.startingView, 500);
}