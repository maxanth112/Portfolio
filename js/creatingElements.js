
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


function addInViewClass(classArr, type = "single") {

    var timeDelay = 1;

    classArr.forEach(className => {
        setTimeout(function (x) {
            var classElements = document.getElementsByClassName(className);
            for (let classElement of classElements) {
                classElement.classList.add(className + "-active");
            }
        }, timeoutTime * timeDelay);
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

            element.classList.add('summary-card', 'education-main-color');
            element.innerHTML =
                '<div class="summary-flip ' + elementSummary.id + `" onclick='flip("` + elementSummary.id + `")'>` +
                '<div class="front">' +
                '<h4 class="club-header">' + elementSummary.clubName + '</h4>' +
                '<p class="club-position">' + elementSummary.role + '</p>' +
                '<p class="club-dates">' + elementSummary.dates + '</p>' +
                '<p class="club-description">' + elementSummary.descriptionFront + '</p>' +
                '</div>' +
                '<div class="back">' +
                '<p class="club-description description-back">' + elementSummary.descriptionBack + '</p>' +
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


function createWorkToolsContainer() {

    var toolCategories = ["intern", "matops", "contract", "lab"];
    toolCategories.forEach(tool => {
        var toolCont = document.createElement('div');
        toolCont.classList.add(tool + '-color', 'tool-container');
        toolCont.innerHTML = '<h1 class="tools-header">Software/Tools Used:</h1>';

        for (var i = 0; i < workToolsArray.length; i++) {
            var arrElement = workToolsArray[i];
            
            var element = document.createElement('div');
            element.classList.add('work-tools');
            element.id = tool;
            var hide = arrElement.score[tool] ? "" : "hide";
            var toolHtml = 
                '<span class="tool-left">' + '<img class="tool-row-img ' + arrElement.id + '" src="' + arrElement.image + '">' + '</span>' + 
                '<span class="tool-right">' + '<ul class="tool-row ' + hide + '">' + '</span>';

            for (var j = 0; j < 10; j++) {
                if (j < arrElement.score[tool]) {
                    toolHtml += '<li class="active ' + tool + '-color">' + '</li>';
                } else {
                    toolHtml += '<li></li>';
                }
            }
            toolHtml += '</ul>';
            element.innerHTML = toolHtml;

            if (arrElement.score[tool] != 0) {
                toolCont.append(element);
            }
        }
        pushRootandObjArr(tool, toolCont);
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

    // // home button 
    element = document.createElement('div');
    element.classList.add("timeline-events", "workDefault-timeline-color");
    element.id = "workDefault-timeline-event";
    element.innerHTML = '<div id="' + '" class="timeline-months-' + 4 + '">' +
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
            var pages = ['workDefault', 'matops', 'contract', 'intern', 'lab'];
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
    var notSelected = ['contract', 'workDefault', 'matops', 'intern', 'lab'].filter(x => x != newSelected);
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
        element.classList.add('bioDefault-color');

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
        element.classList.add(arrElement.id, 'bioDefault-color');
        
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
