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
function updateLinkedThreesClass(updateClass, idArr, update = 'first') {

    // first element in id array gets active added, others get removed 
    updateClass.forEach(newClass => {
        for (var i = 0; i < idArr.length; i++) {
            var element = document.getElementById(idArr[i]);
            if ( (i == 0) && (update == 'first') ) {
                element.classList.toggle(newClass);
            } else if ( (i == 1 || i == 2) && (update == "last-two") ) {
                element.classList.add(newClass); 
            } else if (update == "add-all") {
                element.classList.add(newClass);
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
        if ( (i == 0) && (update == 'first') ) {
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
        roots[saveRoot].objects.push(element);
        roots[saveRoot].root.add(element);
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
                    'education-header-active'], arrElement.headerLinked, 'remove-all');
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
        setTimeout( function(x) {
            var classElements = document.getElementsByClassName(className);
            for (let classElement of classElements) {
                classElement.classList.add(className + "-active");
            }    
        }, time * timeDelay);
        if (type != "single") { timeDelay++; }
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
        pushRootandObjArr(saveRoot, element);
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
        button.addEventListener('click', function(x) {
            var pages = ['workDefault', 'matops', 'contract', 'intern'];
            for (let currPage of pages) {
                if (roots[currPage].toggle) {
                    setMotionAndToggleFalse();
                    
                    if (arrElement[currPage] ==  'workDefault') {

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

    pic1Obj = travel1;
    for (var i = 0; i < bioDefaultArray.length; i += 1) {

        var bioDiv = document.createElement('div');
        bioDiv.id = bioDefaultArray[i].id;
        bioDiv.classList.add("bio-default");

        if (bioDefaultArray[i].id == "bio-pic") {

            bioDiv.innerHTML = '<img class="bio-img" src="' + bioDefaultArray[i].img + '">';
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
            bioDiv.innerHTML = '<h3 class="bio-button-header">' + bioDefaultArray[i].description + '</h3>';

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
                    currentPage = 0;
                    interestPage = 0;
                    updateInterestPage(0);
                }, false);

            } else if (bioDefaultArray[i].id == "wood") {

                interestButton.addEventListener('click', function (x) {

                    var bikesButton = document.getElementById("bikes-button");
                    var travelButton = document.getElementById("travel-button");
                    updateBioInterestButtons(this, bikesButton, travelButton);
                    currentPage = 0;
                    interestPage = 1;
                    updateInterestPage(0);
                }, false);

            } else if (bioDefaultArray[i].id == "bikes") {

                interestButton.addEventListener('click', function (x) {

                    var woodButton = document.getElementById("wood-button");
                    var travelButton = document.getElementById("travel-button");
                    updateBioInterestButtons(this, woodButton, travelButton);
                    currentPage = 0;
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

        setMotionAndToggleFalse();
        stopRotationSetTrue(["pic2", "bioDefault"]);
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
        setMotionAndToggleFalse();
        stopRotationSetTrue(["pic1", "bioDefault"]);
    }
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
        if (ignoreArr.includes(rootName)) {
        } else if (inViewArr.includes(rootName)) {
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
        console.log(saveRoot);
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