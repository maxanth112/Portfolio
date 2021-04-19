// author: max wiesner
// personal website portfolio

window.addEventListener('load', function loader() {
    init();
    
    setTimeout(() => {
        $('.loader').remove();
    }, 1000);
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function updateInterestPage(pageChange, reset = "no") {

    currentPage += pageChange;
    if (!interestPage) {
        if (currentPage == 5) currentPage = 0;
        else if (currentPage == -1) currentPage = 4;
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
        transform(allObjects, roots[toSceneToggle].coordinates.viewFinal, toInterval + 400);
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
            var groupName = roots[rootName].group;
            var group = groups[groupName];
           

            switch (groupName) {
                case 'educDefault':
                    group.rotX += 0.00015;
                    group.rotY = 1;
                    group.rotZ += 0.00115;
                    break;

                case 'course':
                    group.rotX = 0;
                    group.rotY -= 0.0003;
                    group.rotZ -= 0.0013;
                    break;

                case 'default':
                    group.rotX -= 0.0003;
                    group.rotY = 5;
                    group.rotZ -= 0.001;
                    break;

                case 'pic':
                    group.rotX = 1.5;
                    group.rotY += 0.001;
                    group.rotZ -= 0.002;
                    break;

                case 'work':
                    group.rotX += 0.00025;
                    group.rotY = 1;
                    group.rotZ += 0.00075;   
                    break;                                        
            }

            rotate.x = group.rotX;
            rotate.y = group.rotY;
            rotate.z = group.rotZ;
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

    const flipDelay = 250;
    if ($('.' + element).hasClass('flipped')) {
        // back going to front
        $('.' + element).removeClass('flipped');
        setTimeout(function flipIt() {
            $('.' + element + ' .back').addClass('not-showing');
            $('.' + element + ' .front').removeClass('not-showing');
        }, flipDelay);

    } else {
        // front going to back
        $('.' + element).addClass('flipped');
        setTimeout(function flipIt() {
            $('.' + element + ' .front').addClass('not-showing');
            $('.' + element + ' .back').removeClass('not-showing');
        }, flipDelay);
    }
    removeClassMsg();
}

function revertAllFlippedCards() {
    $('.course-card').removeClass('flipped');
    $('.course-card .back').addClass('not-showing');
    $('.course-card .front').removeClass('not-showing');
}

function createGroupCouts() {

    rootNames.forEach(rootName => {
        if (groups[roots[rootName].group]) {

            groups[roots[rootName].group].count += roots[rootName].objects.length;
        } else {

            groups[roots[rootName].group] = {
                
                count: roots[rootName].objects.length,
                iterator: 0,
                sizeX: 0, sizeY: 0,
                rotX: 0, rotY: 0, rotZ: 0,
                addX: 0, addY: 0, addZ: 0,
            };
        }
    });
}

function createGroupRotations() {

    groupNames = ['course', 'pic', 'default', 'work', 'educDefault', 'none', 'menu'];
    groupNames.forEach(groupName => {
       
        switch (groupName) {
            case 'educDefault':
                sizeX = sizeY = 1000;
                break;
            case 'course':
                sizeX = sizeY = 1200;
                break;
            case 'default':
                sizeX = sizeY = 1550;
                break;
            case 'pic':
                sizeX = sizeY = 800;
                break;
            case 'work':
                sizeX = sizeY = 1400;   
                break;                                        
        }
        var group = groups[groupName];
        group.sizeX = sizeX;
        group.sizeY = sizeY;
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

    var len = groups[roots[rootName].group].count;
    var x = groups[roots[rootName].group].sizeX;
    var y = groups[roots[rootName].group].sizeY;
    var z = 0;

    var vector = new THREE.Vector3();
    roots[rootName].objects.forEach(element => {
        var formula = 2 * Math.PI * (groups[roots[rootName].group].iterator++) / len;

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
        if (element.title == 'timeline') {
            obj.position.z = z - 1;
        }

        obj.name = saveRoot + '-view';

        roots[saveRoot].coordinates.view.push(obj);
    });
}

function createViewCoordinatesWork() {

    j = 0;
    toolCategories.forEach(saveRoot => {
        workToolsArray.forEach(element => {

            var obj = new THREE.Object3D();   
            obj.position.x = -1.46 * 500;
            obj.position.y = element.position[j] * 200;
            obj.position.z = 1800;
            
            obj.name = saveRoot + '-toolstuff-view';
            roots[saveRoot].coordinates.view.push(obj);
        });
        j++;
    });
}

function createAllViewCoordinates() {

    // stationary
    createViewCoordinates(menuButtonArray, "stationary", 1000, 5, 1800);
    createViewCoordinates(nameSocialArray, "stationary", 1500, 4.92, 1800);

    // education
    ["math", "computer", "econ"].forEach(element => {
        createViewCoordinates(courseArray[element], element);
    });
    createViewCoordinates(educationHeaderArray, "educHeader");
    createViewCoordinates(EducationHeaderSelectedArray, "educSelect");
    createViewCoordinates(educationSummaryArray, "educSummary");

    // work history
    toolCategories.forEach(element => {
        createViewCoordinates(workViewDisplayArray, element);
    })
    createViewCoordinates(workTimelineDisplayArray, "workTimeline");
    createViewCoordinates(workDefaultArray, "workDefault");
    
    // bio
    createViewCoordinates(bioDefaultArray, "bioDefault");
    createViewCoordinates(travel1, "pic1");
    createViewCoordinates(travel2, "pic2");
    
    // createViewCoordinatesWork();

    // creates the specific views
    rootNames.forEach(rootName => {
        var rootCoords = roots[rootName].coordinates;
        if (rootCoords.include != rootCoords.exclude) {
            rootCoords.viewFinal = concatCoordinates(rootCoords.include, rootCoords.exclude);
            // console.log(rootName + ": \n");
            // console.log(rootCoords.viewFinal);
        }
    });
}

function createAllCards() {
   
    createMenuButtons();
    createNamedSocial();

    ["math", "computer", "econ"].forEach(element => {
        createCourseCards(courseArray[element], element);
    });
    createEducHeadersButtons();
    createEducationSummary();

    createWorkTimelineCards();
    createWorkButtons();

    createWorkHeaderCards();
    createWorkContentCards();
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

// initial site startup 
function startTransformAllCourseObjects() {

    setMotionAndToggleFalse();
    transform(allObjects, roots.stationary.coordinates.viewFinal, 500);
    // console.log(allObjects);
}

