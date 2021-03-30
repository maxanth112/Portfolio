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

    setTimeout(() => { 
        introSwapClass('ic-5', 'ic-10', getRandomInt(15));            
        introSwapClass('ic-5', 'ic-11', getRandomInt(15));
        transformCreateSphere(spheres.large, 1200, delay);
    }, delay * 6);

    setTimeout(introSwapClass, delay * 5, 'ic-4', 'ic-3', 2.5);
    setTimeout(() => {
        introSwapClass('ic-5', 'ic-4');
        speeds = [0, 0, 0, 1];  
    }, delay * 9);
    
    setTimeout(introSwapClass, delay * 7, 'ic-6', 'ic-5');
}

function transformCreateSphere(sphereName, size, time) {
    
    sphereName = [];
    createSphereCoordinates(size, sphereName);
    sphereName.unshift(nameCoordinate);
    transform(introRootObjects, sphereName, time);
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

function throwName() {

    setTimeout( () => { 
      
        createSphereCoordinates(1600, finalSphere); 
        finalSphere.unshift(nameCoordinate);

        createIteratedCoordinates(finalSphere, introViewCoordinates, iteratedIntroView, 2);
        createIteratedCoordinates(introViewCoordinates, introDropCoordinates, iteratedIntroDrop, 10);

        for (var i = 0; i < 50; i++) { transformDelay(i, iteratedIntroView, 35, 70); }
    }, delay * 10);
}