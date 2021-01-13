// author: max wiesner
// personal website portfolio

init();

function init() {

    cssRenderer = createCssRenderer();

    initMouseSceneMenu();
    initRoots();
    initCamera();
    initControls();

    introduction();

    // createAllCards();
    // createAllTwirlingCoordinates();
    // createAllViewCoordinates();

    // startTransformAllCourseObjects();

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
    startSphereRotation(introSphereToggle);
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

        element = new THREE.CSS3DObject(element);
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
            roots[rootName].root.rotation.x += roots[rootName].rotationX;
            roots[rootName].root.rotation.y += roots[rootName].rotationY;
            roots[rootName].root.rotation.z += roots[rootName].rotationZ;
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

    var exclude = ['2-2', '2-1', '2-0', '2-6', '3-6',
        '3-5', '3-1', '3-0', '4-6', '4-2', '4-1', '4-0',
        '10-0', '11-0', '10-1', '11-1', '10-3', '11-3',
        '10-4', '11-4', '11-5', '11-5', '12-4', '12-3',
        '12-0', '12-1', '13-6', '14-5', '14-6', '16-2',
        '16-3', '16-4', '17-3', '18-0', '18-6', '19-0',
        '19-1', '19-5', '19-6', '20-0', '20-6', '21-3',
        '22-3', '22-4', '22-2', '8-6', '9-6', '8-5'
    ];
    var scaleX = 0.15 + scale[0];
    var scaleY = 0.34 + scale[1];
    var shiftX = -1.48 + scale[2];
    var shiftY = -1.09 + scale[3];

    for (var i = iStart; i < iStart + rowCount; i++) {
        for (var j = 0; j < 7; j++) {

            if (exclude.includes(i + '-' + j)) {
                continue;
            }
            var obj = {
                content: String(i) + String(j)
            };
            introElements.push(obj);

            var viewObj = new THREE.Object3D();
            viewObj.name = 'view-coordinate';

            viewObj.position.x = ((i * scaleX) + shiftX) * 500;
            viewObj.position.y = ((j * scaleY) + shiftY) * 200;
            viewObj.position.z = 1800;
            introElementsView.push(viewObj);


        }
    }
}

function initIntroElements() {
    // M
    createColumn(0, 2, [-0.002, 0, 0, 0]);
    createColumn(2, 1, [-0.003, 0, -0.03, 0]);
    createColumn(3, 1, [-0.015, 0.02, 0, -0.06]);
    createColumn(4, 1, [-0.003, 0, -0.05, 0]);
    createColumn(5, 2, [0.002, 0, -0.1, 0]);
    // A
    createColumn(8, 2, [-0.009, 0.005, -0.06, -0.0007]);
    createColumn(10, 2, [-0.009, 0.005, -0.07, -0.007]);
    createColumn(12, 3, [-0.009, 0.005, -0.11, -0.007]);
    // X
    createColumn(16, 3, [-0.009, 0, -0.14, -0.008]);
    createColumn(19, 1, [-0.009, 0, -0.16, 0]);
    createColumn(20, 3, [-0.009, 0, -0.17, -0.008]);
}

function initNameElement() {

    var element = document.createElement('div');
    element.id = 'name-hide';
    element.classList.add('name-container', 'hidde');
    element.innerHTML = '<h1 class="name" data-text="Max" contenteditable>MAX</h1>' +
        '<div class="gradient"></div>' +
        '<div class="spotlight"></div>';

    element = new THREE.CSS3DObject(element);
    introRootObjects.push(element);
    nameRoot.add(element);

    //view position 
    var nameObj = new THREE.Object3D();
    nameObj.position.x = 25;
    nameObj.position.y = 0;
    nameObj.position.z = 1775;

    introElementsView.push(nameObj);
}

function initParsedTweenCoordinates() {

    var introTweenLength = introElementsSphere.length;
    tweenSplit = introTweenLength / step;
    var rightLimit = step;

    for (var i = 0; i < tweenSplit; i++) {

        introTweeningArray.push([]);
        var j = 0;

        while (j < rightLimit) {

            introTweeningArray[i][j] = introElementsView[j];
            j++;
        }
        introTweeningArray[i].push(...introElementsSphere.slice(rightLimit, introTweenLength));
        rightLimit += step;
    }
}

function introSphereElements() {

    var vector = new THREE.Vector3();
    var len = introElements.length;
    var scale = 1800;


    for (var i = 0; i < len; i++) {

        var phi = Math.acos(-1 + (2 * i) / len);
        var theta = Math.sqrt(len * Math.PI) * phi;
        var sphereObj = new THREE.Object3D();
        sphereObj.name = "sphere-coordinate";

        sphereObj.position.x = scale * Math.cos(theta) * Math.sin(phi);
        sphereObj.position.y = scale * Math.sin(theta) * Math.sin(phi);
        sphereObj.position.z = scale * Math.cos(phi);

        vector.copy(sphereObj.position).multiplyScalar(2);

        sphereObj.lookAt(vector);
        introElementsSphere.push(sphereObj);
    }
}

function introRandomElements() {


}

function startSphereRotation(toggle) {

    if (toggle) {

        var speed = 0.02;
        var shrink = 10;
        introRoot.rotation.x += speed;
        introRoot.rotation.y += speed;
        introRoot.rotation.z += speed;
    }
}

function transformDelay(i) {

    setTimeout(() => {
        transform(introRootObjects, introTweeningArray[i], 40);
    }, i * 80);
} 

function introduction() {

    initIntroElements();
    introSphereElements();
    introElements.forEach(arrElement => {
        var element = document.createElement('div');
        element.classList.add('intro-card');

        element = new THREE.CSS3DObject(element);
        introRootObjects.push(element);
        introRoot.add(element);
    });

    initParsedTweenCoordinates();
    transform(introRootObjects, introElementsSphere, 1000);


    setTimeout(() => {
        for (var i = 0; i < tweenSplit; i++) { 
            transformDelay(i); 
        }
    }, 2000);

    setTimeout(() => {
        initNameElement();
        transform(introRootObjects, introElementsView, 1);
    }, tweenSplit * 160);

    setTimeout(() => {
        document.querySelectorAll('.intro-card').forEach(e => e.classList.add('hide'));
    }, 8000);

    // animate();
}



var mp3explosion = '';

var prefixes = ["webkit", "moz", "ms", ""];

function prefixedEvent(element, type, callback) {
    for (var p = 0; p < prefixes.length; p++) {
        if (!prefixes[p]) type = type.toLowerCase();
        
        document.querySelectorAll('.intro-card').forEach(e => e.addEventListener(prefixes[p] + type, callback, false));

        // element.addEventListener(prefixes[p] + type, callback, false);
    }
}

function transformExplode(explode, x, y, scale, rotation, percent) {
    x = x || 0;
    y = y || 0;
    scale = scale || 1;
    unit = percent ? '%' : 'px';
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

function explode(container) {
    var particles = [];

    particles.push(createParticle(0, 0, 1));
    particles.push(createParticle(50, -15, 0.4));
    particles.push(createParticle(50, -105, 0.2));
    particles.push(createParticle(-10, -60, 0.8));
    particles.push(createParticle(-10, 60, 0.4));
    particles.push(createParticle(-50, -60, 0.2));
    particles.push(createParticle(-50, -15, 0.75));
    particles.push(createParticle(-100, -15, 0.4));
    particles.push(createParticle(-100, -15, 0.2));
    particles.push(createParticle(-100, -115, 0.2));
    particles.push(createParticle(80, -15, 0.1));

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

function exolpodeGroup(x, y, trans) {
    var container = document.createElement('div');
    container.className = 'container';
    container.style.top = y + 'px';
    container.style.left = x + 'px';

    transformExplode(container, trans.x, trans.y, trans.scale, trans.r, true);
    explode(container);
    return container;
}

function sparcle(event) {
    var explosions = [];

    explosions.push(exolpodeGroup(event.pageX, event.pageY, {
        scale: 1,
        x: -50,
        y: -50,
        r: 0
    }));
    explosions.push(exolpodeGroup(event.pageX, event.pageY, {
        scale: .5,
        x: -30,
        y: -50,
        r: 180
    }));
    explosions.push(exolpodeGroup(event.pageX, event.pageY, {
        scale: .5,
        x: -50,
        y: -20,
        r: -90
    }));
    explosions.push(exolpodeGroup(event.pageX, event.pageY, {
        scale: .5,
        x: -30,
        y: -70,
        r: 180
    }));
    explosions.push(exolpodeGroup(event.pageX, event.pageY, {
        scale: 1.5,
        x: 0,
        y: -20,
        r: 180
    }));

    requestAnimationFrame(function () {
        explosions.forEach(function (boum, i) {
            setTimeout(function () {
                document.body.appendChild(boum);
            }, i * 100);
        });
    });
}

var interactionEvent = 'click';
if ('ontouchstart' in document.documentElement) {
    interactionEvent = 'touchstart';
}

document.addEventListener(interactionEvent, sparcle);




















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

function createTwirlingCoordinates(rootName, x = sphereSize, y = sphereSize, z = 0) {

    var vector = new THREE.Vector3();
    var counter = 0;
    var len = roots[rootName].objects.length;
    roots[rootName].objects.forEach(element => {
        var formula = 2 * Math.PI * (counter++) / len;

        var obj = new THREE.Object3D();
        obj.position.x = (x * Math.cos(formula));
        obj.position.y = (y * Math.sin(formula));
        obj.position.z = (z * Math.sin(formula));

        vector.copy(obj.position).multiplyScalar(2);
        obj.lookAt(vector);
        obj.name = rootName + '-rotate';
        roots[rootName].coordinates.rotate.push(obj);
    });
}

function createAllTwirlingCoordinates() {

    rootNames.forEach(rootName => {
        if (rootName == "stationary") {
            createTwirlingCoordinates("stationary", 50, 50, 0);
        } else if (rootName != "educSelect") {
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