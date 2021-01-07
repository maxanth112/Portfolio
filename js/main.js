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

function checkToggles() {

    console.clear();
    rootNames.forEach(rootName => {
        console.log(rootName + ": " + roots[rootName].toggle);
    });
}

function createTwirlingCoordinates(rootName, x = sphereSize, y = sphereSize, z = 600) {

    var vector = new THREE.Vector3();
    var counter = 0;
    var len = roots[rootName].objects.length;
    roots[rootName].objects.forEach(element => {
        var obj = new THREE.Object3D();
        var formula = 2 * Math.PI * (counter++) / len;

        obj.position.x = (x * Math.cos(formula));
        obj.position.y = (y * Math.sin(formula));
        obj.position.z = (z * Math.sin(formula));

        vector.copy(obj.position).multiplyScalar(2);
        obj.lookAt(vector);
        obj.name = rootName;
        roots[rootName].coordinates.rotate.push(obj);
    });
}

function createViewCoordinates(arr, saveRoot, x = 500, y = 200, z = 1800) {

    arr.forEach(element => {
        console.log(saveRoot);
        var viewCoordinate = new THREE.Object3D();
        viewCoordinate.position.x = element.position[0] * x;
        viewCoordinate.position.y = element.position[1] * y;
        viewCoordinate.position.z = z;

        roots[saveRoot].coordinates.view.push(viewCoordinate);
    });
}

// main threejs rendering functions 
function initRoots() {

    rootNames.forEach(rootObj => {
        roots[rootObj].root = new THREE.Object3D();
        scene.add(roots[rootObj].root);

        roots[rootObj].toggle = false;
        roots[rootObj].motion = false;
    });
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
    controls.update();
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
function createCourseCards(arr, saveRoot) {

    arr.forEach(arrElement => {
        var element = document.createElement('div');
        element.className = 'course-element';
        element.innerHTML =
            '<div class="course-card ' + arrElement.number + '" onclick="flip(' + arrElement.number + ')">' +
            '<div class="front">' +
            '<h5 class="front-header">' + arrElement.name + '</h5>' +
            '</div>' +
            '<div class="back">' +
            '<div class="align-me">' +
            '<p class="course-header">' + arrElement.type + arrElement.number + '</p>' +
            '<p class="languages">' + arrElement.language + '</p>' +
            '</div>' +
            '<p class="course-description">' + arrElement.description + '</p>' +
            '</div>' +
            '</div>';

        element = new THREE.CSS3DObject(element);
        roots[saveRoot].objects.push(element);
        roots[saveRoot].root.add(element);
    });
}

function createEducationHeaderCards() {

    educationHeaderArray.forEach(arrHeader => {
        var element = document.createElement('div');
        element.className = 'education-header';
        element.id = arrHeader.cardId;

        var elementButton = document.createElement('button');
        elementButton.id = arrHeader.id;
        elementButton.innerHTML = arrHeader.label;
        elementButton.classList.add('menu-button');

        if (elementButton.id == 'computer-button') {

            elementButton.addEventListener('click', function (x) {
                setEducationButtonSelects("computer-button");

                if (roots["computer"].toggle) {

                    setMotionAndToggleFalse("computer");
                    stopRotationSetTrue("educSummary");
                    clearAllNotSelected();

                    transform(allObjects, roots.educSummary.coordinates.viewFinal, backInterval);
                } else {

                    stopRotationSetTrue("computer"); // stop rotation
                    setMotionAndToggleFalse("educSummary"); // start rotation and set toggle (up) to false 
                    setMotionAndToggleFalse("math");
                    setMotionAndToggleFalse("econ");
                    manageButton("computer");

                    transform(allObjects, roots.stationary.viewFinal, toInterval);
                }
                roots["workDefault"].toggle = false;
            }, false);

        } else if (elementButton.id == 'math-button') {

            elementButton.addEventListener('click', function (x) {
                setEducationButtonSelects("math-button");

                if (roots["math"].toggle) {

                    setMotionAndToggleFalse("math");
                    stopRotationSetTrue("educSummary");
                    clearAllNotSelected();

                    transform(allObjects, roots.educSummary.coordinates.viewFinal, backInterval);
                } else {

                    stopRotationSetTrue("math");
                    setMotionAndToggleFalse("educSummary");
                    setMotionAndToggleFalse("computer");
                    setMotionAndToggleFalse("econ");
                    manageButton("math");

                    transform(allObjects, roots.math.coordinates.viewFinal, toInterval);
                }
                roots["workDefault"].toggle = false;
            }, false);
        } else if (elementButton.id == 'econ-button') {

            elementButton.addEventListener('click', function (x) {
                setEducationButtonSelects("econ-button");

                if ( roots["econ"].toggle) {

                    setMotionAndToggleFalse("econ");
                    stopRotationSetTrue("educSummary");
                    clearAllNotSelected();

                    transform(allObjects, roots.educSummary.coordinates.viewFinal, backInterval);
                } else {

                    stopRotationSetTrue("econ");
                    setMotionAndToggleFalse("educSummary");
                    setMotionAndToggleFalse("math");
                    setMotionAndToggleFalse("computer");
                    manageButton("econ");

                    transform(allObjects, roots.econ.coordinates.viewFinal, toInterval);
                }
                roots["workDefault"].toggle = false;
            }, false);
        }


        element.innerHTML =
            '<div class="education-card">' +
            '<h4 class="major">' + arrHeader.major + '</h4>' +
            '<p class="ba">' + 'Bachelor of Arts' + '</p>' +
            '<h5 class="college">' + arrHeader.college + '</h5>' +
            '<h5 class="subcollege">' + arrHeader.subcollege + '</h5>' +
            '<p class="track">' + arrHeader.focus + '</p>' +
            '</div>';
        element.appendChild(elementButton);
        element = new THREE.CSS3DObject(element);
        roots["educHeader"].objects.push(element);
        roots["educHeader"].root.add(element);
    });
}

function createEducationSummary() {

    educationSummaryArray.forEach(elementSummary => {
        var element = document.createElement('div');
        element.id = elementSummary.id;
        
        if (elementSummary.id == "capa" || elementSummary.id == "lax") {
            
            element.className = 'summary-card';
            element.innerHTML =
                '<div class="summary-flip ' + elementSummary.id + `" onclick='flip("` + elementSummary.id + `")'>` +
                '<div class="front">' +
                '<h4 class="club-header">' + elementSummary.clubName + '</h4>' +
                '<p class="club-position">' + elementSummary.role + '</p>' +
                '<p class="club-dates">' + elementSummary.dates + '</p>' +
                '<p class="club-description">' + elementSummary.description + '</p>' +
                '</div>' +
                '<div class="back">' +
                '<p class="club-description">' + elementSummary.description + '</p>' +
                '</div>' +
                '</div>';
        } else if (elementSummary.id == "degree" || elementSummary.id == "extra") {
            
            element.className = elementSummary.id;
            element.innerHTML = '<h2>' + elementSummary.role + '</h2>';
        } else {

            element.className = 'summary-card';
            element.innerHTML =
                '<h4 class="club-header">' + elementSummary.clubName + '</h4>' +
                '<p class="club-position">' + elementSummary.role + '</p>' +
                '<p class="club-dates">' + elementSummary.dates + '</p>' +
                '<p class="club-description">' + elementSummary.description + '</p>';
        }
        element = new THREE.CSS3DObject(element);
        roots["educSummary"].objects.push(element);
        roots["educSummary"].root.add(element);
    });
}

function createMenuButtons() {

    for (var i = 0; i < menuButtonArray.length; i += 1) {

        var menuButton = document.createElement('button');
        menuButton.id = menuButtonArray[i].id;
        menuButton.classList.add("menu-button");
        menuButton.innerHTML = menuButtonArray[i].label;

        var menuButtonObj = new THREE.CSS3DObject(menuButton);
        roots["stationary"].root.add(menuButtonObj);
        roots["stationary"].objects.push(menuButtonObj);

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
                setMotionAndToggleFalse("intern");
                setMotionAndToggleFalse("contract");
                setMotionAndToggleFalse("matops");
                setMotionAndToggleFalse("workTimeline");
                updateWorkSelected("home");


                if (roots["educHeader"].toggle) {

                    setMotionAndToggleFalse("educSummary");
                    setMotionAndToggleFalse("educHeader");
                    transform(allObjects, roots.stationary.coordinates.viewFinal, backInterval);

                } else {

                    stopRotationSetTrue("educSummary");
                    stopRotationSetTrue("educHeader");
                    transform(allObjects, roots.educSummary.coordinates.viewFinal, toInterval);
                }
                roots["bioDefault"].toggle = false;
                roots["workTimeline"].toggle = false;
                
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


                if (roots["workTimeline"].toggle) {

                    setMotionAndToggleFalse("workDefault");
                    setMotionAndToggleFalse("workTimeline");

                    transform(allObjects,  roots.stationary.coordinates.viewFinal, backInterval);

                } else {

                    stopRotationSetTrue("workDefault");
                    stopRotationSetTrue("workTimeline");

                    transform(allObjects,  roots.workDefault.coordinates.viewFinal, toInterval);

                    startCompText();
                }
                roots["bioDefault"].toggle = false;
                roots["educHeader"].toggle = false;
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
                    setMotionAndToggleFalse("pic1");
                    setMotionAndToggleFalse("pic2");
                    transform(allObjects,  roots.stationary.coordinates.viewFinal, backInterval);

                } else {

                    resetBioButtons();
                    interestPage = 0;
                    currentInterest = 0;
                    pic2Obj = travel2;

                    stopRotationSetTrue("bioDefault");
                    stopRotationSetTrue("pic1");

                    transform(allObjects,  roots.pic1.coordinates.viewFinal, toInterval);
                }
                roots["workTimeline"].toggle = false;
                roots["educHeader"].toggle = false;
                
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
                roots["pic1"].toggle = true;

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
        roots["bioDefault"].objects.push(bioDivObj);
        roots["bioDefault"].root.add(bioDivObj);
    }
}

function updateInterestPage(pageChange) {
    currentPage += pageChange;

    if ((interestPage == 0) && (currentPage == 4)) { // currently on last travel page, taking to first

        currentPage = 0;
    } else if ((interestPage == 0) && (currentPage == -1)) { // currently on last travel page, taking to first

        currentPage = 3;
    } else if ((interestPage != 0) && (currentPage == 3)) { // on wood or bikes last page, taking to first 

        currentPage = 0;
    } else if ((interestPage != 0) && (currentPage == -1)) { // on wood or bikes last page, taking to first 

        currentPage = 2;
    }

    newObj = allInterestObjs[interestPage][currentPage];

    if (roots["pic1"].toggle) {

        for (var i = 0; i < newObj.length; i += 1) {

            if (i < 3) {

                document.getElementById(pic2Obj[i].newid + "-img").src = newObj[i].img;
            } else {

                document.getElementById(pic2Obj[i].newid + "-p").innerHTML = newObj[i].description;
                document.getElementById(pic2Obj[i].newid + "-h3").innerHTML = newObj[i].header;
            }
        }

        transform(allObjects, roots.pic2.coordinates.viewFinal, toInterval);
        roots["pic1"].toggle = false; // in back
        roots["pic2"].toggle = true; // now in view

    } else {

        for (var i = 0; i < newObj.length; i += 1) {

            if (i < 3) {

                document.getElementById(pic1Obj[i].newid + "-img").src = pic1Obj[i].img;
            } else {

                document.getElementById(pic1Obj[i].newid + "-p").innerHTML = newObj[i].description;
                document.getElementById(pic1Obj[i].newid + "-h3").innerHTML = newObj[i].header;
            }
        }

        transform(allObjects, roots.pic1.coordinates.viewFinal, toInterval);
        roots["pic2"].toggle = false; // in back
        roots["pic1"].toggle = true; // now in view
    }
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

function createImgCards(arr, saveRoot) {

    arr.forEach(arrElement => {
        var element = document.createElement('div');
        element.classList.add(arrElement.id);

        if (arrElement.card == "s") {
            var elementImg = document.createElement('img');
            elementImg.src = arrElement.img;
            elementImg.id = arrElement.newid + '-img';

            element.appendChild(elementImg);
        } else {
            var elementHeader = document.createElement('h3');
            elementHeader.id = arrElement.newid + '-h3';
            elementHeader.classList.add("img-loc");
            elementHeader.innerHTML = arrElement.header;

            var elementP = document.createElement('p');
            elementP.id = arrElement.newid + '-p';
            elementP.innerHTML = arrElement.description;

            element.appendChild(elementHeader);
            element.appendChild(elementP);
        }

        element = new THREE.CSS3DObject(element);
        roots[saveRoot].objects.push(element);
        roots[saveRoot].root.add(element);
    });
}

function createWorkHeaderCards() {

    workContentArray.forEach(workElement => {

        var element = document.createElement('div');
        element.className = 'work-header-element';
        element.innerHTML =
            '<div class="work-top">' +
            '<h5 class="work-top-name">' +
            workElement.title +
            '</h5>' +
            '<h3 class="work-top-span">' +
            workElement.comit +
            '</h3>' +
            '</div>';

        element = new THREE.CSS3DObject(element);
        roots[workElement.id].root.add(element);
        roots[workElement.id].objects.push(element);
    });
}

function createWorkContentCards() {

    workContentArray.forEach(workElement => {

        var element = document.createElement('div');
        element.classList.add('work-element');
        element.classList.add(workElement.id);
        element.innerHTML =
            '<div class="work-header">' +
            '<h5 class="work-name">' +
            workElement.timeline +
            '</h5>' +
            '<p class="work-details">' +
            workElement.description +
            '</p>' +
            '</div>';

        element = new THREE.CSS3DObject(element);
        roots[workElement.id].root.add(element);
        roots[workElement.id].objects.push(element);
    });
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
            roots[toolCategories[k]].root.add(workToolsObj);
            roots[toolCategories[k]].objects.push(workToolsObj);
        }
    }
}

function createWorkToolsContainer() {

    var toolCategories = ["intern", "matops", "contract"];

    toolCategories.forEach(tool => {

        var element = document.createElement('div');
        element.innerHTML = '<div class="tool-container"><h1 class="tools-header">Software/Tools Used:</h1></div>';
        element = new THREE.CSS3DObject(element);
        roots[tool].root.add(element);
        roots[tool].objects.push(element);
    });
}

function createSocialMedia() {
    var html = '<div class="flex-center">' +
        '<i class="fa fa-github fa-4x icon-3d">' + '</i>' +
        '</div>';
}

function createWorkTimelineCards() {

    workContentArray.forEach(arrElement => {

        var element = document.createElement('div');
        element.classList.add("timeline-events");
        element.id = arrElement.id + "-timeline-event";
        element.innerHTML =
            '<div id="' + '" class="timeline-months-' + arrElement.months + '">' +
            '<h2>' + arrElement.timeline + '</h2>' +
            '<h3>' + arrElement.company + '</h3>' +
            '<h4>' + arrElement.title + '</h4>' +
            '</div>';

        element = new THREE.CSS3DObject(element);
        roots["workTimeline"].objects.push(element);
        roots["workTimeline"].root.add(element);
    });

    // timeline bar 
    var element = document.createElement('ul');
    element.classList.add("timeline-years");
    element.innerHTML =
        '<div class="timelines-years">' +
        '<li class="tyears">2019</li>' +
        '<li class="tyears">2020</li>' +
        '<li class="tyears">2021</li>' +
        '</ul>';

    element = new THREE.CSS3DObject(element);
    roots["workTimeline"].objects.push(element);
    roots["workTimeline"].root.add(element);

    // home button 
    element = document.createElement('div');
    element.classList.add("timeline-events");
    element.id = "home-button";
    element.innerHTML =
        '<div id="' + '" class="timeline-months-' + 3 + '">' +
        '<h4>' + 'Home Page' + '</h4>' +
        '</div>';

    element = new THREE.CSS3DObject(element);
    roots["workTimeline"].objects.push(element);
    roots["workTimeline"].root.add(element);
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

        if (roots["workDefault"].toggle) { // default -> contract


            updateWorkSelected("contract");
            stopRotationSetTrue("contract");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("intern");
            setMotionAndToggleFalse("matops");
            transform(allObjects, roots.contract.coordinates.viewFinal, backInterval);
        } else if (roots["matops"].toggle) { // matops -> intern


            updateWorkSelected("intern");
            stopRotationSetTrue("intern");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("contract");
            setMotionAndToggleFalse("matops");
            transform(allObjects, roots.intern.coordinates.viewFinal, backInterval);
        } else if (roots["contract"].toggle) { // contract -> matops 


            updateWorkSelected("matops");
            stopRotationSetTrue("matops");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("intern");
            setMotionAndToggleFalse("contract");
            transform(allObjects, roots.matops.coordinates.viewFinal, backInterval);
        } else if (roots["pinternc1"].toggle) { // intern -> default


            updateWorkSelected("home");
            stopRotationSetTrue("workDefault");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("contract");
            setMotionAndToggleFalse("intern");
            setMotionAndToggleFalse("matops");
            transform(allObjects, roots.workDefault.coordinates.viewFinal, backInterval);
        }
    }, false);

    rightButton.addEventListener('click', function (x) {

        if (roots["workDefault"].toggle) { // default -> intern 

            updateWorkSelected("intern");
            stopRotationSetTrue("intern");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("contract");
            setMotionAndToggleFalse("matops");
            transform(allObjects, roots.intern.coordinates.viewFinal, backInterval);
        } else if (roots["matops"].toggle) { // matops -> contract

            updateWorkSelected("contract");
            stopRotationSetTrue("contract");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("matops");
            setMotionAndToggleFalse("intern");
            transform(allObjects, roots.contract.coordinates.viewFinal, backInterval);
        } else if (roots["contract"].toggle) { // contract -> default


            updateWorkSelected("home");
            stopRotationSetTrue("workDefault");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("intern");
            setMotionAndToggleFalse("contract");
            setMotionAndToggleFalse("matops");
            transform(allObjects, roots.default.coordinates.viewFinal, backInterval);
        } else if (roots["intern"].toggle) { // intern -> matops


            updateWorkSelected("matops");
            stopRotationSetTrue("matops");
            stopRotationSetTrue("workTimeline");

            setMotionAndToggleFalse("workDefault");
            setMotionAndToggleFalse("intern");
            setMotionAndToggleFalse("contract");
            transform(allObjects, roots.matops.coordinates.viewFinal, backInterval);
        }
    }, false);

    
    roots["workTimeline"].objects.push(leftButtonObj);
    roots["workTimeline"].objects.push(rightButtonObj);
    roots["workTimeline"].root.add(leftButtonObj);
    roots["workTimeline"].root.add(rightButtonObj);
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

    workDefaultArray.forEach(workElement => {
        var element = document.createElement('div');
        element.id = workElement.id;

        if ((workElement.id != "data-code") && (workElement.id != "comp-code")) {

            element.classList.add('work-default');
            element.innerHTML =
                '<h3 class="work-default-header">' +
                workElement.header +
                '</h3>' +
                '<p class="work-default-description">' +
                workElement.description +
                '</p>';
        }

        element = new THREE.CSS3DObject(element);
        roots["workDefault"].objects.push(element);
        roots["workTimeline"].root.add(element);
    });
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
function stopRotationSetTrue(rootName) {

    roots[rootName].toggle = true;
    roots[rootName].motion = true;
    roots[rootName].root.rotation.x = 0;
    roots[rootName].root.rotation.y = 0;
    roots[rootName].root.rotation.z = 0;
}

function updateRotations() {

    rootNames.forEach(rootName => {
        if (!roots[rootName].motion) {
            roots[rootName].root.rotation.x += roots[rootName].rotationX;
            roots[rootName].root.rotation.y += roots[rootName].rotationY;
            roots[rootName].root.rotation.z += roots[rootName].rotationZ;
        }
    });
}

function setMotionAndToggleFalse(rootName) {

    roots[rootName].toggle = false;
    roots[rootName].motion = false;
}

function flipToggles(toggle) {

    roots[toggle].toggle = true;
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

    console.log(roots["stationary"].objects);

    // education
    createCourseCards(mathArray, "math");
    createCourseCards(computerArray, "computer");
    createCourseCards(econArray, "econ");
    createEducationHeaderCards();
    createEducationSummary();

    allEducationObjects = roots["math"].objects
        .concat(roots["computer"].objects)
        .concat(roots["econ"].objects)
        .concat(roots["educHeader"].objects)
        .concat(roots["educSummary"].objects);

    // work history
    createWorkTimelineCards();
    createWorkButtons();
    createWorkHeaderCards();
    createWorkContentCards();
    createWorkToolsCards();
    createWorkToolsContainer();
    createWorkDefaultCards();

    allWorkObjects = roots["workTimeline"].objects
        .concat(roots["intern"].objects)
        .concat(roots["matops"].objects)
        .concat(roots["contract"].objects)
        .concat(roots["workDefault"].objects);

    // bio
    createImgCards(travel1, "pic1");
    createImgCards(travel2, "pic2");
    createBioDefaultCards();

    allBioObjects = roots["bioDefault"].objects
        .concat(roots["pic1"].objects)
        .concat(roots["pic2"].objects);

    // ALL OBJECTS
    allObjects = roots["stationary"].objects
        .concat(allEducationObjects)
        .concat(allWorkObjects)
        .concat(allBioObjects);
}

function concatCoordinates(inViewArr, ignoreArr = []) {

    var coordinates = [];
    inViewArr.push("stationary");

    rootNames.forEach(rootName => {
        if (ignoreArr.includes(rootName)){
           
        } else if (inViewArr.includes(rootName)) {

            coordinates = coordinates.concat(roots[rootName].coordinates.view);
        } else {
            coordinates = coordinates.concat(roots[rootName].coordinates.rotate);
        }
    });
    console.log(coordinates);
    return coordinates;
}

function createAllTwirlingCoordinates() {

    rootNames.forEach(rootName => {
        if (rootName == "stationary"){

            createTwirlingCoordinates("stationary", 50, 50, 0);
        } else if (rootName != "educSelect") {

            createTwirlingCoordinates(rootName);
        }
    });
}

function createAllViewCoordinates() {

    // stationary
    createViewCoordinates(menuButtonArray, "stationary", 1000, 5, 1800);

    // education
    createViewCoordinates(mathArray, "math");
    createViewCoordinates(econArray, "econ");
    createViewCoordinates(computerArray, "computer");
    createViewCoordinates(educationHeaderArray, "educHeader");
    createViewCoordinates(EducationHeaderSelectedArray, "educSelect");
    createViewCoordinates(educationSummaryArray, "educSummary");

    // work history
    createViewCoordinates(workViewDisplayArrayIntern,"intern");
    createViewCoordinates(workViewDisplayArrayMatOps, "matops");
    createViewCoordinates(workViewDisplayArrayContract, "contract");
    createViewCoordinates(workTimelineDisplayArray, "workTimeline");
    createViewCoordinates(workDefaultArray, "workDefault");

    // bio
    createViewCoordinates(bioDefaultArray, "bioDefault");
    createViewCoordinates(travel1, "pic1");
    createViewCoordinates(travel2, "pic2");

    // specific education views
    roots.educSummary.coordinates.viewFinal = concatCoordinates(["educSummary", "educHeader"], "educSelect");
    roots.computer.coordinates.viewFinal = concatCoordinates(["educSummary", "educSelect", "computer"], "educHeader");
    roots.math.coordinates.viewFinal = concatCoordinates(["educSummary", "educSelect", "math"], "educHeader");
    roots.econ.coordinates.viewFinal = concatCoordinates(["educSummary", "educSelect", "econ"], "educHeader");
    
    // specific work views 
    roots.workDefault.coordinates.viewFinal = concatCoordinates(["workTimeline", "workDefault"], "educSelect");
    roots.intern.coordinates.viewFinal = concatCoordinates(["workTimeline", "workDefault", "intern"], "educSelect");
    roots.matops.coordinates.viewFinal = concatCoordinates(["workTimeline", "workDefault", "matops"], "educSelect");
    roots.contract.coordinates.viewFinal = concatCoordinates(["workTimeline", "workDefault", "contract"], "educSelect");

    // specific bio views 
    roots.pic1.coordinates.viewFinal = concatCoordinates(["defaultBio", "pic1"], "educSelect");
    roots.pic2.coordinates.viewFinal = concatCoordinates(["defaultBio", "pic2"], "educSelect");

    // starting will be stationarys view final
    roots.stationary.coordinates.viewFinal = concatCoordinates([], "educSelect");
}

// initial site startup 
function startTransformAllCourseObjects() {

    transform(allObjects, roots.stationary.coordinates.viewFinal, 500);
    
    console.log(allObjects);
}