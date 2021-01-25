// author: max wiesner
// personal website portfolio

init();

function init() {
    
    cssRenderer = createCssRenderer();
    initMouseSceneMenu();
    initRoots();
    initCamera();
    initControls();
    
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    // addButton();

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
    rootNames.forEach(rootName => {
        console.log(rootName + ": " + roots[rootName].toggle);
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
    controls.update();
    render();

    requestAnimationFrame(animate);
    updateIntroSphere();
    updateRotations();
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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// managing buttons and toggles 
function updateLinkedThreesClass(updateClass, idArr, update = 'first', parent = "no") {
    // first element in id array gets active added, others get removed 
    updateClass.forEach(newClass => {
        for (var i = 0; i < idArr.length; i++) {
            var element = document.getElementById(idArr[i]);
            if (((i == 0) && (update == 'first')) && (parent == "yes")) {
                element.parentElement.classList.add(newClass);
            } else if ((i == 0) && (update == 'first')) {
                element.classList.toggle(newClass);
            } else if ((i == 1 || i == 2) && (update == "last-two")) {
                element.classList.add(newClass);
            } else if (update == "add-all") {
                element.classList.add(newClass);
            } else if (parent == "yes") {
                element.parentElement.classList.remove(newClass);
            } else { // remove all for 'remove-all'
                element.classList.remove(newClass);
            }
        }
    });
}

function updateLinkedThreesText(updateText, defaultText, idArr, update = 'first') {
    // first element in id array gets active added, others get removed 
    for (var i = 0; i < idArr.length; i++) {
        var element = document.getElementById(idArr[i]);
        if ((i == 0) && (update == 'first')) {
            element.innerHTML = updateText;
        } else { // make all default
            element.innerHTML = defaultText;
        }
    }
}

// creating cards and divs 
function createCourseCards(arr, saveRoot) {

    console.log(arr);
    arr.forEach(arrElement => {
        var element = document.createElement('div');
        element.classList.add('course-element');
        element.innerHTML =
            '<div class="course-card ' + arrElement.number + ' ' + saveRoot + '-color' + '" onclick="flip(' + arrElement.number + ')">' +
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
        pushRootandObjArr(saveRoot, element);
    });
}

function createEducHeadersButtons() {

    educationHeaderArray.forEach(arrElement => {
        var element = document.createElement('div');
        element.classList.add(arrElement.id + '-header-color',
            'education-header');
        element.id = arrElement.id + '-header';
        element.innerHTML = '<div class="education-card">' +
            '<h4 class="major">' + arrElement.major + '</h4>' +
            '<p class="ba">' + 'Bachelor of Arts' + '</p>' +
            '<h5 class="college">University of Colorado Bounder,</h5>' +
            '<h5 class="subcollege">' + arrElement.subcollege + '</h5>' +
            '<p class="track">' + arrElement.focus + '</p>' +
            '</div>';

        var button = document.createElement('button');
        button.classList.add('educ-button');
        button.id = arrElement.id + '-button';
        button.innerHTML = '<p>See Courses</p>';

        element.appendChild(button);
        pushRootandObjArr('educHeader', element);
        button.addEventListener('click', function addButtonSpecs(x) {

            revertAllFlippedCards();
            if (roots[arrElement.id].toggle) {

                setMotionAndToggleFalse();
                stopRotationSetTrue(["educSummary", "educHeader"]);
                updateLinkedThreesClass(['education-header-selected',
                    'education-header-active'
                ], arrElement.headerLinked, 'remove-all');
                updateLinkedThreesText('', 'See Courses', arrElement.buttonLinked, 'default-all');

                transform(allObjects, roots.educSummary.coordinates.viewFinal, backInterval);
                removeInViewClass(educationCourseColors);
                addInViewClass(["education-main-color"]);
            } else {

                setMotionAndToggleFalse();
                stopRotationSetTrue(arrElement.setTrue);
                updateLinkedThreesClass(['education-header-selected'], arrElement.headerLinked, 'last-two');
                updateLinkedThreesClass(['education-header-active'], arrElement.headerLinked, 'first');
                updateLinkedThreesText('Main View', 'See Courses', arrElement.buttonLinked, 'first');

                transform(allObjects, roots[arrElement.id].coordinates.viewFinal, toInterval);
                removeInViewClass(educationCourseColors.concat('education-main-color'));
                addInViewClass(arrElement.add);
            }
        });
    });
}

function addInViewClass(classArr, type = "single", time = timeoutTime) {

    var timeDelay = 1;

    classArr.forEach(className => {
        setTimeout(function (x) {
            var classElements = document.getElementsByClassName(className);
            for (let classElement of classElements) {
                classElement.classList.add(className + "-active");
            }
        }, time * timeDelay);
        if (type != "single") {
            timeDelay++;
        }
    });
}

function removeInViewClass(classArr) {

    classArr.forEach(className => {
        var classElements = document.getElementsByClassName(className);
        for (let classElement of classElements) {
            classElement.classList.remove(className + '-active');
        }
    });
}

function createEducationSummary() {

    educationSummaryArray.forEach(elementSummary => {
        var element = document.createElement('div');
        element.id = elementSummary.id;

        if (elementSummary.id == "capa" || elementSummary.id == "lax") {

            element.classList.add('summary-card');
            element.innerHTML =
                '<div class="summary-flip ' + elementSummary.id + ' education-main-color' + `" onclick='flip("` + elementSummary.id + `")'>` +
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


            element.classList.add('education-main-color', elementSummary.id);
            element.innerHTML = '<h2>' + elementSummary.role + '</h2>';
        } else {


            element.classList.add('education-main-color', 'summary-card');
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

    menuButtonArray.forEach(arrElement => {
        var button = document.createElement('button');
        button.classList.add("menu-button");
        button.id = arrElement.id;
        button.innerHTML = arrElement.label;
        button.addEventListener('click', function (x) {

            revertAllFlippedCards();
            updateWorkSelected("workDefault");
            updateLinkedThreesClass(['menu-button-active'], arrElement.buttonLinked, 'first');
            updateLinkedThreesClass(educationResetClasses, educationHeaderClasses, 'remove-all');
            updateLinkedThreesText('', 'See Courses', educationButtonClasses, 'default-all');
            removeInViewClass(allColors);
            resetBioScenes();
            if (roots[arrElement.toggle].toggle) {

                setMotionAndToggleFalse();
                transform(allObjects, roots.stationary.coordinates.viewFinal, backInterval);
            } else {

                setMotionAndToggleFalse();
                stopRotationSetTrue(arrElement.setTrue);
                transform(allObjects, roots[arrElement.sendTo].coordinates.viewFinal, toInterval);
                addInViewClass(arrElement.add, "delay", 500);
            }
        });
        pushRootandObjArr('stationary', button);
    });
}

function createWorkHeaderCards() {

    workContentArray.forEach(workElement => {
        var element = document.createElement('div');
        element.classList.add(workElement.id + '-color', 'work-header-element');
        element.innerHTML = '<div class="work-top">' +
            '<h5 class="work-top-name">' +
            workElement.title +
            '</h5>' +
            '<h3 class="work-top-span">' +
            workElement.comit +
            '</h3>' +
            '</div>';
        pushRootandObjArr(workElement.id, element);
    });
}

function createWorkContentCards() {

    workContentArray.forEach(workElement => {
        var element = document.createElement('div');
        element.classList.add(workElement.id + '-color', 'work-element');
        element.innerHTML = '<div class="work-header">' +
            '<h5 class="work-name">' +
            workElement.timeline +
            '</h5>' +
            '<p class="work-details">' +
            workElement.description +
            '</p>' +
            '</div>';
        pushRootandObjArr(workElement.id, element);
    });
}

function createWorkToolsCards() {

    var toolCategories = ["intern", "matops", "contract"];
    toolCategories.forEach(category => {
        workToolsArray.forEach(arrElement => {
            var element = document.createElement('div');
            element.classList.add('work-tools');
            element.id = category;
            var hide = arrElement.score[category] ? "" : "hide";
            var toolHtml = '<ul class="tool-row ' + hide + '">' +
                '<img class="tool-row-img ' + arrElement.id + '" src="' +
                arrElement.image + '">' + '<div class="all-tools">';

            for (var i = 0; i < 10; i++) {
                if (i < arrElement.score[category]) {
                    toolHtml += '<li class="active ' + category + '-color">' + '</li>';
                } else {
                    toolHtml += '<li></li>';
                }
            }
            toolHtml += '</div>' + '</ul>';
            element.innerHTML = toolHtml;
            console.log(element);
            pushRootandObjArr(category, element);
        });
    });
}

function createWorkToolsContainer() {

    var toolCategories = ["intern", "matops", "contract"];
    toolCategories.forEach(tool => {
        var element = document.createElement('div');
        element.classList.add(tool + '-color', 'tool-container');
        element.innerHTML = '<h1 class="tools-header">Software/Tools Used:</h1>';
        pushRootandObjArr(tool, element);
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

        element.classList.add(arrElement.id + '-timeline-color',
            "timeline-events");
        element.id = arrElement.id + "-timeline-event";
        element.innerHTML = '<div id="' + '" class="timeline-months-' + arrElement.months + '">' +
            '<h2>' + arrElement.timeline + '</h2>' +
            '<h3>' + arrElement.company + '</h3>' +
            '<h4>' + arrElement.title + '</h4>' +
            '</div>';
        pushRootandObjArr('workTimeline', element);
    });

    // timeline bar 
    var element = document.createElement('ul');
    element.classList.add("timeline-years", "workDefault-timeline-color");
    element.innerHTML = '<div class="timelines-years">' +
        '<li class="tyears">2019</li>' +
        '<li class="tyears">2020</li>' +
        '<li class="tyears">2021</li>' +
        '</ul>';
    pushRootandObjArr('workTimeline', element);

    // home button 
    element = document.createElement('div');
    element.classList.add("timeline-events", "workDefault-timeline-color");
    element.id = "workDefault-timeline-event";
    element.innerHTML = '<div id="' + '" class="timeline-months-' + 3 + '">' +
        '<h4>' + 'Home Page' + '</h4>' +
        '</div>';
    pushRootandObjArr('workTimeline', element);
}

function createWorkButtons() {

    workButtonArray.forEach(arrElement => {
        var button = document.createElement('div');
        button.classList.add(arrElement.id + '-arrow', 'flex-container');
        button.id = arrElement.id;
        button.innerHTML = '<i class="fa fa-arrow-' + arrElement.id + ' fa-5x icon-3d"></i>';
        button.addEventListener('click', function (x) {
            var pages = ['workDefault', 'matops', 'contract', 'intern'];
            for (let currPage of pages) {
                if (roots[currPage].toggle) {
                    setMotionAndToggleFalse();

                    if (arrElement[currPage] == 'workDefault') {

                        removeInViewClass(removeWorkColors);
                        addInViewClass(['workDefault-color', 'workDefault-timeline-color']);
                    } else {

                        removeInViewClass(removeWorkColors);
                        addInViewClass(workTimelineColors.concat(arrElement[currPage] + '-color'),
                            "single",
                            timeoutTime + 1000);
                    }
                    updateWorkSelected(arrElement[currPage]);
                    stopRotationSetTrue([arrElement[currPage], 'workTimeline']);
                    transform(allObjects, roots[arrElement[currPage]].coordinates.viewFinal, backInterval);
                    break;
                }
            }
        }, false);
        pushRootandObjArr('workTimeline', button);
    });
}

function updateWorkSelected(newSelected) {

    document.getElementById(newSelected + '-timeline-event').classList.toggle('selected-timeline');
    var notSelected = ['contract', 'workDefault', 'matops', 'intern'].filter(x => x != newSelected);
    notSelected.forEach(id => {
        document.getElementById(id + '-timeline-event').classList.remove('selected-timeline');
    });
}

function createWorkDefaultCards() {

    workDefaultArray.forEach(workElement => {
        var element = document.createElement('div');
        element.classList.add('workDefault-color');
        element.id = workElement.id;

        if ((workElement.id != "data-code") && (workElement.id != "comp-code")) {

            element.classList.add('workDefault');
            element.innerHTML =
                '<h3 class="workDefault-header">' +
                workElement.header +
                '</h3>' +
                '<p class="workDefault-description">' +
                workElement.description +
                '</p>';
        }

        element = new THREE.CSS3DObject(element);
        roots["workDefault"].objects.push(element);
        roots["workTimeline"].root.add(element);
    });
}

function createBioDefaultCards() {

    bioDefaultArray.forEach(arrElement => {
        var element = document.createElement('div');
        element.id = arrElement.id;
        element.classList.add('bio-default-color');

        if (((arrElement.id == "bio-pic") || (arrElement.id == "bio-header")) ||
            ((arrElement.id == "bio-main") || (arrElement.id == "interests"))) {

            element.innerHTML = arrElement.inner;
        } else if (arrElement.id.includes('button')) { // arrow buttons

            element.classList.add('bio-button', "up-arrow");
            element.innerHTML = '<i class="fa fa-arrow-' + arrElement.direction + ' fa-5x icon-3d"></i>';
            element.addEventListener('click', function (x) {
                updateInterestPage(arrElement.changeRate);
            }, false);
        } else { // new interest buttons 
            element.classList.add('interest-cards');
            element.innerHTML = arrElement.inner;

            var button = document.createElement('button');
            button.classList.add('bio-button', arrElement.id + '-button-color');
            button.id = arrElement.id + "-button";
            button.addEventListener('click', function (x) {
                currentPage = 0;
                interestPage = arrElement.interestPage;
                updateInterestPage(0);
                updateLinkedThreesClass(['interest-selected'], arrElement.buttonLinked, 'first', 'yes');
                updateLinkedThreesText('Like Em\'?', 'See Pics', arrElement.buttonLinked, 'first');
            });
            element.appendChild(button);
        }
        pushRootandObjArr('bioDefault', element);
    });
}

function createImgCards(arr, saveRoot) {

    arr.forEach(arrElement => {
        var element = document.createElement('div');
        element.classList.add(arrElement.id, 'bio-default-color');

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
        pushRootandObjArr(saveRoot, element);
    });
}

function updateInterestPage(pageChange, reset = "no") {

    currentPage += pageChange;
    if (!interestPage) {
        if (currentPage == 4) currentPage = 0;
        else if (currentPage == -1) currentPage = 3;
    } else {
        if (currentPage == 3) currentPage = 0;
        else if (currentPage == -1) currentPage = 2;
    }
    var newScene = allInterestObjs[interestPage][currentPage];
    var currSceneToggle = roots.pic1.toggle ? 'pic1' : 'pic2';
    var toSceneToggle = currSceneToggle == 'pic1' ? 'pic2' : 'pic1';

    for (var i = 0; i < newScene.length; i++) {
        if (newScene[i].card == 's') {
            document.getElementById(alternatingScenes[toSceneToggle][i].newid + "-img").src = newScene[i].img;
        } else {
            document.getElementById(alternatingScenes[toSceneToggle][i].newid + "-p").innerHTML = newScene[i].description;
            document.getElementById(alternatingScenes[toSceneToggle][i].newid + "-h3").innerHTML = newScene[i].header;
        }
    }
    if (reset == 'no') {
        transform(allObjects, roots[toSceneToggle].coordinates.viewFinal, toInterval);
        setMotionAndToggleFalse();
        stopRotationSetTrue([toSceneToggle, "bioDefault"]);
    }
}

function resetBioScenes() { 
    interestPage = 0;
    currentPage = 0;
    alternatingScenes = {
        pic1: travel1,
        pic2: travel2
    }
    updateLinkedThreesClass(['interest-selected'], bioResetButtonLinked, 'first', 'yes');
    updateLinkedThreesText('Like Em\'?', 'See Pics', bioResetButtonLinked, 'first');
    updateInterestPage(0, 'yes');
}

// managing rotations and toggles 
function stopRotationSetTrue(rootNames) {

    rootNames.forEach(rootName => {
        roots[rootName].toggle = true;
        roots[rootName].motion = true;
        roots[rootName].root.rotation.x = 0;
        roots[rootName].root.rotation.y = 0;
        roots[rootName].root.rotation.z = 0;
    });
}

function updateRotations() {

    rootNames.forEach(rootName => {
        if (!roots[rootName].motion) {
            var rotate = roots[rootName].root.rotation;
            var group = roots[rootName].group;
            rotate.x += groups[group + '-rotX'];
            rotate.y += groups[group + '-rotY'];
            rotate.z += groups[group + '-rotZ'];
        }
    });
}

function pushRootandObjArr(rootName, element) {

    element = new THREE.CSS3DObject(element);
    roots[rootName].objects.push(element);
    roots[rootName].root.add(element);
}

function setMotionAndToggleFalse(rootNameArr = "nada") {

    if (rootNameArr != "nada") {
        rootNameArr.forEach(rootName => {
            roots[rootName].toggle = false;
            roots[rootName].motion = false;
        });
        return;
    }

    rootNames.forEach(rootName => {
        roots[rootName].toggle = false;
        roots[rootName].motion = false;
    });

};

function flipToggle(toggle) {

    roots[toggle].toggle = true;
}

// managing flipping cards 
function flip(element) {
    $('.' + element).toggleClass('flipped');
}

function revertAllFlippedCards() {
    $('.course-card').removeClass('flipped');
    $('.summary-flip').removeClass('flipped');
}

// INTRODUCTION 
function createColumn(iStart, rowCount = 2, scale = [0, 0, 0, 0]) {

    var scaleX = 0.15 + scale[0];
    var scaleY = 0.34 + scale[1];
    var shiftX = -1.48 + scale[2];
    var shiftY = -1.09 + scale[3];
    for (var i = iStart; i < iStart + rowCount; i++) {
        for (var j = 0; j < 7; j++) {

            if (introCardExclude.includes(i + '-' + j)) { continue; }
            var obj = { content: String(i) + String(j) };
            cardElements.push(obj);

            for (var l = 0; l < 2; l++) {
                var element = new THREE.Object3D();
                var yPosition = ((j * scaleY) + shiftY) * 200;

                element.position.x = ((i * scaleX) + shiftX) * 500;
                element.position.y = l == 0 ? yPosition : yPosition - 1000;
                element.position.z = 1800;
                if (l == 0) { introViewCoordinates.push(element); }
                else { introDropCoordinates.push(element); }
            }
        }
    }
}

function createIntroElements() {

    createColumn(0, 2, [-0.002, 0, 0, 0]);
    createColumn(2, 1, [-0.003, 0, -0.03, 0]);
    createColumn(3, 1, [-0.015, 0.02, 0, -0.06]);
    createColumn(4, 1, [-0.003, 0, -0.05, 0]);
    createColumn(5, 2, [0.002, 0, -0.1, 0]);
    
    createColumn(8, 2, [-0.009, 0.005, -0.06, -0.0007]);
    createColumn(10, 2, [-0.009, 0.005, -0.07, -0.007]);
    createColumn(12, 3, [-0.009, 0.005, -0.11, -0.007]);
    
    createColumn(16, 3, [-0.009, 0, -0.14, -0.008]);
    createColumn(19, 1, [-0.009, 0, -0.16, 0]);
    createColumn(20, 3, [-0.009, 0, -0.17, -0.008]);

    // intro cards 
    cardElements.forEach(() => {
        var element = document.createElement('div');
        element.classList.add('intro-card');
        
        element = new THREE.CSS3DObject(element);
        introRootObjects.push(element);
        introRoot.add(element);
    });
    
    createNames();
}

function createNames() {
    // first name 
    var firstName = document.createElement('div');
    firstName.id = 'firstName';
    firstName.classList.add('name-container', 'hide');
    firstName.innerHTML = '<h1 class="name" id="shrink-name" data-text="Max" contenteditable>MAX</h1>' +
    '<div class="gradient"></div>' +
    '<div class="spotlight"></div>';

    firstName = new THREE.CSS3DObject(firstName);
    nameElement = firstName;
    introRootObjects.unshift(firstName);
    nameRoot.add(firstName);

    // view coordinate
    element = new THREE.Object3D();
    element.position.x = 25;
    element.position.y = 0;
    element.position.z = 1775;
    nameCoordinate = element;

    // shrink coordinate
    var element = new THREE.Object3D();
    element.position.x = -750;
    element.position.y = 530;
    element.position.z = 1950;
    shrinkCoordinate = element;

    // last name 
    var lastName = document.createElement('div');
    lastName.id = 'lastName';
    lastName.classList.add('name-container', 'hide');
    lastName.innerHTML = '<h1 class="name" data-text="Wiesner" contenteditable>WIESNER</h1>' +
    '<div class="gradient"></div>' +
    '<div class="spotlight"></div>';

    lastName = new THREE.CSS3DObject(lastName);
    lastName.position.x = -610;
    lastName.position.y = 530;
    lastName.position.z = 1950;
    nameRoot.add(lastName);
}

function createIteratedCoordinates(start, end, saveArr, step) {

    var totalLength = end.length;
    var newLength = totalLength / step;
    var rightStop = step;
    for (var i = 0; i < newLength; i++) {

        saveArr.push([]);
        var j = 0;
        while (j < rightStop) {

            saveArr[i][j] = end[j];
            j++;
        }
        saveArr[i].push(...start.slice(rightStop, totalLength));
        saveArr[i].unshift(nameCoordinate);
        rightStop += step;
    }
}

function createSphereCoordinates(scale, saveArr) {

    var vector = new THREE.Vector3();
    var len = introRootObjects.length - 1;
    for (var i = 0; i < len; i++) {

        var phi = Math.acos(-1 + (2 * i) / len);
        var theta = Math.sqrt(len * Math.PI) * phi;
        var element = new THREE.Object3D();

        element.position.x = scale * Math.cos(theta) * Math.sin(phi);
        element.position.y = scale * Math.sin(theta) * Math.sin(phi);
        element.position.z = scale * Math.cos(phi);

        vector.copy(element.position).multiplyScalar(2);
        element.lookAt(vector);
        saveArr.push(element);
    }
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

function transformDelay(counter, toPosition, tweenSpeed, delayTime) {

    setTimeout(() => {
        transform(introRootObjects, toPosition[counter], tweenSpeed);
    }, counter * delayTime);
} 

function addButton() {
// 
    var button = document.createElement('div');
    button.innerHTML = '<span>CLICK ME</span>';
    button.id = 'start-button';
    document.body.appendChild(button);

    button.addEventListener('click', () => {
        button.classList.add('pressed');
        setTimeout(() => { button.classList.remove("pressed"); }, 300);
        setTimeout(introduction, 1000);
    }, false);
}

function introSwapClass(addClass, removeClass, delay = 0) {
    
    var elementList = document.getElementsByClassName('intro-card');
    var iterator = addClass == 'ic-11' ? 5 : 1;
    
    for (var i = 0; i < elementList.length; i += iterator) {
        
        setTimeout(swapHelper, delay * i, elementList[i], addClass, removeClass);
    }
}

function swapHelper(element, addClass, removeClass) {
    
    element.classList.remove(removeClass);
    element.classList.add(addClass);            
}

function colorSphere() {
    
    { // put into large sphere coordinates and make starting color
        setTimeout(() => { 
            introSwapClass('ic-0', 'none');
            transformCreateSphere(spheres.large, 3500, delay);
        }, delay * 1);
    }
    
    { // add disco ball colors and make sphere small 
        setTimeout(() => { 
            transformCreateSphere(spheres.small, 700, delay);
        }, delay * 2);
        
        setTimeout(() => { 
            introSwapClass('ic-10', 'ic-0', getRandomInt(15));            
            introSwapClass('ic-11', 'ic-10', getRandomInt(15));
            speeds = [0, 0.02, 0];
        }, delay * 3);
    }
    
    { // change to larger sphere and do initial color quick switches         
        setTimeout(introSwapClass, delay * 10, 'ic-1', 'ic-11', 2.5);
        setTimeout(() => {
            introSwapClass('none', 'ic-10');
            transformCreateSphere(spheres.medLarge, 1300, delay);
            speeds = [-0.02, 0, 0];
        }, delay * 12);
        
        setTimeout(introSwapClass, delay * 13, 'ic-2', 'ic-1', 2.5);
        setTimeout(() => {
            transformCreateSphere(spheres.medLarge, 1450, delay);
            speeds = [0, 0.02, 0];
        }, delay * 15);
        
        setTimeout(introSwapClass, delay * 16, 'ic-3', 'ic-2', 2.5);
        setTimeout(() => {
            transformCreateSphere(spheres.medLarge, 1600, delay * 2);
            speeds = [0, -0.02, 0];
        }, delay * 18);
        
        setTimeout(introSwapClass, delay * 19, 'ic-4', 'ic-3', 2.5);
        setTimeout(() => {
            introSwapClass('ic-5', 'ic-4');
            speeds = [0, 0, 0, 1];  
        }, delay * 21);
        
        setTimeout(introSwapClass, delay * 23, 'ic-6', 'ic-5');
    }
}

function transformCreateSphere(sphereName, size, time) {
    
    sphereName = [];
    createSphereCoordinates(size, sphereName);
    sphereName.unshift(nameCoordinate);
    transform(introRootObjects, sphereName, time);
}

function throwName() {
    // var delay = 10; // while editing use this one 
    
    setTimeout( () => { // add sparkle listener
        document.addEventListener('click', sparcle);

        createSphereCoordinates(1600, finalSphere); // temporary
        finalSphere.unshift(nameCoordinate);

        createIteratedCoordinates(finalSphere, introViewCoordinates, iteratedIntroView, 2);
        createIteratedCoordinates(introViewCoordinates, introDropCoordinates, iteratedIntroDrop, 10);

        for (var i = 0; i < 50; i++) { transformDelay(i, iteratedIntroView, 35, 70); }
        
        // for (var i = 0; i < 50; i++) { transformDelay(i, iteratedIntroView, 0, 0); }
    }, delay * 23);

    setTimeout(() => {  // start the exploding animation 
            var nameObj = document.getElementById('firstName');
            nameObj.classList.remove('hide'); // unhide the big name 

            nameObj.click();
        }, delay * 30);
    
    
}

function introduction() {
    
    document.getElementById('start-button').remove(); // remove button 
    
    createIntroElements(); // all 100 cards/big name are in introRootObjects and dropped/view coordinates are made 
    
    animate();
    colorSphere();
    throwName();
    
    
    
    
    
   
    
    setTimeout(() => { // start the incremental dropping transformation 
        for (var i = 0; i < 10; i++) { transformDelay(i, iteratedIntroDrop, 2000, 20); }
    }, delay * 36);
    
    setTimeout(() => { // remove all of the explosion containers, hide intro cards, and remove click event listener
        document.removeEventListener('click', sparcle);
        document.querySelectorAll('.container').forEach(element => { element.remove(); });
        document.querySelectorAll('.intro-card').forEach(element => { element.classList.add('hide'); });
    }, delay * 36);
    
    setTimeout(() => { 
        document.getElementById('shrink-name').classList.add('shrink');
        sphereMedium.unshift(shrinkCoordinate);
        transform(introRootObjects, sphereMedium, 1500);
        setTimeout(() => {
            var lastName = document.getElementById('lastName');
            lastName.classList.remove('hide');
            lastName.classList.add('faded');
            setTimeout(() => {
                document.getElementById('lastName').classList.remove('faded');
            }, 5000)


            document.querySelectorAll('.intro-card').forEach(element => { element.remove(); });  
            startStatic();
        }, 2000);
     }, delay * 47);



}

function prefixedEvent(element, type, callback) {
    
    var prefixes = ["webkit", "moz", "ms", ""];
    for (var p = 0; p < prefixes.length; p++) {
        if (!prefixes[p]) type = type.toLowerCase();
            element.addEventListener(prefixes[p] + type, callback, false);
    }
}

function transformExplode(explode, x, y, scale, rotation, percent) {
    
    x = x || 0;
    y = y || 0;
    scale = scale || 1;
    unit = percent ? '%' : 'rem';
    rotation = rotation || 0;
    transfromString = 'translate(' + x + unit + ', ' + y + unit + ') ' +
        'scale(' + scale + ') ' +
        'rotate(' + rotation + 'deg)';

    explode.style.webkitTransform = transfromString;
    explode.style.MozTransform = transfromString;
    explode.style.transform = transfromString;
}

function createParticle(x, y, scale) {
    var particle = document.createElement('i');
    var sparcle = document.createElement('i');
    particle.className = 'particle';
    sparcle.className = 'sparcle';

    transformExplode(particle, x, y, scale);
    particle.appendChild(sparcle);
    return particle;
}

function explode(container, number) {

    var particles = [];
    switch(number) {

        case 1: {
            particles.push(createParticle(0, 0, 1));
            particles.push(createParticle(10, -10, 0.5));
            break;
        }
        case 2: {
            particles.push(createParticle(0, 0, 1));
            particles.push(createParticle(10, -10, 0.8));
            break;
        }
        case 3: {
            particles.push(createParticle(0, 0, 0.5));
            particles.push(createParticle(10, -10, 0.7));
            particles.push(createParticle(10, -10, 0.6));
            break;
        }
        case 4: {
            particles.push(createParticle(5, 0, 0.9));
            particles.push(createParticle(-5, -5, 0.4));
            particles.push(createParticle(-5, 5, 0.4));
            particles.push(createParticle(5, 5, 0.45));
            particles.push(createParticle(10, -2, 1));
            break;
        }
        case 5: {
            
            particles.push(createParticle(0, 0, 1));
            particles.push(createParticle(10, -10, 0.5));
            particles.push(createParticle(15, -10, 0.2));
            particles.push(createParticle(10, 10, 0.2));
            break;
        }
        case 6: {
            
            particles.push(createParticle(0, -5, 1));
            particles.push(createParticle(5, 10, 0.7));
            particles.push(createParticle(-5, -15, 1));
            // particles.push(createParticle(10, -15, 0.9));
        }
    }
    // particles.push(createParticle(-30, -15, 0.4));
    // particles.push(createParticle(-30, -15, 0.2));
    // particles.push(createParticle(-40, -15, 0.2));
    // particles.push(createParticle(10, -15, 0.1));

    
    // particles.push(createParticle(-30, -15, 0.2));
    // particles.push(createParticle(-40, -15, 0.2));
    // particles.push(createParticle(10, -15, 0.1));

    particles.forEach(function (particle) {
        container.appendChild(particle);
        prefixedEvent(particle, "AnimationEnd", function () {
            var self = this;
            setTimeout(function () {
                requestAnimationFrame(function () {
                    container.removeChild(self);
                });
            }, 100);
        });
    });
}

function exolpodeGroup(x, y, trans, number) {
    var container = document.createElement('div');
    container.className = 'container';
    container.style.top = y + 'rem';
    container.style.left = x + 'rem';
    transformExplode(container, trans.x, trans.y, trans.scale, trans.r, true);
    explode(container, number);
    return container;
}

function sparcle(event) {
    var explosions = [];
    var delays = [];

    for (var i = 0; i < 4; i++) {

        explosions.push(exolpodeGroup(event.pageX, event.pageY, { // large one in the middle 
            scale: 1.5,
            x: 50 + (100 * i), // left most on M
            y: 100, // in middle of MAX
            r: 180
        }, 5));
        delays.push(0);

        explosions.push(exolpodeGroup(event.pageX, event.pageY, { // large one in the middle 
            scale: 1.5,
            x: 150, // left most on M
            y: 10, // in middle of MAX
            r: 180
        }, 6));
        delays.push(0);
    }

    explosions.push(exolpodeGroup(event.pageX, event.pageY, { // big in middle 
        scale: 1,
        x: 60, 
        y: 0, 
        r: 180
    }, 1));
    delays.push(300);
        
    explosions.push(exolpodeGroup(event.pageX, event.pageY, { // big in middle 
        scale: 1.5,
        x: 260, 
        y: 100, 
        r: 180
    }, 2));
    delays.push(1300);

    explosions.push(exolpodeGroup(event.pageX, event.pageY, { // big in middle 
        scale: 1.2,
        x: 380, 
        y: 30, 
        r: 180
    }, 3));
    delays.push(1700);

    explosions.push(exolpodeGroup(event.pageX, event.pageY, { // big in middle 
        scale: 0.8,
        x: 50, 
        y: 150, 
        r: 180
    }, 4));
    delays.push(1800);

    requestAnimationFrame(function () {
        explosions.forEach(function (boum, i) {
            setTimeout(function () {
                document.body.appendChild(boum);
            }, i * 100 + delays[i]);
        });
    });
}

// calling all create/coordinate functions 
function createAllCards() {
    // creates the divs (cards) and saves them to the respective objects arrays and all objects
    createMenuButtons();

    createCourseCards(mathArray, "math");
    createCourseCards(computerArray, "computer");
    createCourseCards(econArray, "econ");
    createEducHeadersButtons();
    createEducationSummary();

    createWorkTimelineCards();
    createWorkButtons();
    createWorkHeaderCards();
    createWorkContentCards();
    createWorkToolsCards();
    createWorkToolsContainer();
    createWorkDefaultCards();

    createImgCards(travel1, "pic1");
    createImgCards(travel2, "pic2");
    createBioDefaultCards();

    rootNames.forEach(rootName => {
        if (!rootName.includes("educSelect")) {
            allObjects = allObjects.concat(roots[rootName].objects);
        }
    });
}

function createGroupCouts() {

    rootNames.forEach(rootName => {
        if (groups[roots[rootName].group]) {

            groups[roots[rootName].group] += roots[rootName].objects.length;
        } else {

            groups[roots[rootName].group + '-counter'] = 0;
            groups[roots[rootName].group] = roots[rootName].objects.length;
        }
        console.log(roots[rootName].group + ': ' + groups[roots[rootName].group]);
    });
    console.log(groups);
}

function createGroupRotations() {

    groupNames = ['course', 'pic', 'default', 'work', 'weird', 'none', 'menu'];
    groupNames.forEach(groupName => {

        var rotX, rotY, rotZ, sizeX, sizeY;
        rotX = rotY = rotZ = sizeX = sizeY = 0;
        switch (groupName) {

            case 'course': 
                sizeX = sizeY = 0;
                break;
            case 'pic': 
                sizeX = sizeY = 0;
                break;
            case 'default': 
                sizeX = sizeY = 1200;
                rotX = rotY = 0.005;
                break;   
            case 'work': 
                // sizeX = sizeY = 0;
                // rotX = rotY = 0.005;
                break;   
            case 'weird': 
                sizeX = sizeY = 0;
                break;           
        }

        groups[groupName + '-rotX'] = rotX;
        groups[groupName + '-rotY'] = rotY;
        groups[groupName + '-rotZ'] = rotZ;
        groups[groupName + '-sizeX'] = sizeX;
        groups[groupName + '-sizeY'] = sizeY;
    });
}

function concatCoordinates(inViewArr, ignoreArr = []) {

    var coordinates = [];
    inViewArr.push("stationary");
    rootNames.forEach(rootName => {
        if (ignoreArr.includes(rootName)) {} else if (inViewArr.includes(rootName)) {
            coordinates = coordinates.concat(roots[rootName].coordinates.view);
        } else {
            coordinates = coordinates.concat(roots[rootName].coordinates.rotate);
        }
    });
    return coordinates;
}

function createTwirlingCoordinates(rootName) {

    var len = groups[roots[rootName].group];
    var x = groups[roots[rootName].group + '-sizeX'];
    var y = groups[roots[rootName].group + '-sizeY'];
    var z = 0;

    var vector = new THREE.Vector3();
    roots[rootName].objects.forEach(element => {
        var formula = 2 * Math.PI * (groups[roots[rootName].group + '-counter']++) / len;

        var obj = new THREE.Object3D();
        obj.position.x = (x * Math.cos(formula));
        obj.position.y = (y * Math.sin(formula));
        obj.position.z = (z * Math.sin(formula));

        obj.rotation

        vector.copy(obj.position).multiplyScalar(2);
        obj.lookAt(vector);
        obj.name = rootName + '-rotate';
        roots[rootName].coordinates.rotate.push(obj);
    });
}

function createAllTwirlingCoordinates() {

    rootNames.forEach(rootName => {
        if (rootName != "educSelect") { // replace w groups here
            createTwirlingCoordinates(rootName); 
        }
    });
}

function createViewCoordinates(arr, saveRoot, x = 500, y = 200, z = 1800) {

    arr.forEach(element => {
        var obj = new THREE.Object3D();
        obj.position.x = element.position[0] * x;
        obj.position.y = element.position[1] * y;
        obj.position.z = z;

        obj.name = saveRoot + '-view';
        roots[saveRoot].coordinates.view.push(obj);
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
    createViewCoordinates(workViewDisplayArrayIntern, "intern");
    createViewCoordinates(workViewDisplayArrayMatOps, "matops");
    createViewCoordinates(workViewDisplayArrayContract, "contract");
    createViewCoordinates(workTimelineDisplayArray, "workTimeline");
    createViewCoordinates(workDefaultArray, "workDefault");
    // bio
    createViewCoordinates(bioDefaultArray, "bioDefault");
    createViewCoordinates(travel1, "pic1");
    createViewCoordinates(travel2, "pic2");

    // creates the specific views
    rootNames.forEach(rootName => {
        var rootCoords = roots[rootName].coordinates;
        if (rootCoords.include != rootCoords.exclude) {
            rootCoords.viewFinal = concatCoordinates(rootCoords.include, rootCoords.exclude);
        }
    });
}

// initial site startup 
function startTransformAllCourseObjects() {

    setMotionAndToggleFalse();
    transform(allObjects, roots.stationary.coordinates.viewFinal, 500);
    // console.log(allObjects);
}