"use strict";

// creating cards and divs 
function createCourseCards(arr, save, saveRoot) {
  for (var i = 0; i < arr.length; i += 1) {
    var courseDiv = document.createElement('div');
    courseDiv.className = 'course-element';
    courseDiv.innerHTML = '<div class="course-card ' + arr[i].number + '" onclick="flip(' + arr[i].number + ')">' + '<div class="front">' + '<h5 class="front-header">' + arr[i].name + '</h5>' + '</div>' + '<div class="back">' + '<div class="align-me">' + '<p class="course-header">' + arr[i].type + arr[i].number + '</p>' + '<p class="languages">' + arr[i].language + '</p>' + '</div>' + '<p class="course-description">' + arr[i].description + '</p>' + '</div>' + '</div>';
    var courseObj = new THREE.CSS3DObject(courseDiv);
    save[i] = courseObj;

    if (saveRoot == "computer") {
      /////////////////////////////////////////
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

    educationDiv.innerHTML = '<div class="education-card">' + '<h4 class="major">' + educationHeaderArray[i].major + '</h4>' + '<p class="ba">' + 'Bachelor of Arts' + '</p>' + '<h5 class="college">' + educationHeaderArray[i].college + '</h5>' + '<h5 class="subcollege">' + educationHeaderArray[i].subcollege + '</h5>' + '<p class="track">' + educationHeaderArray[i].focus + '</p>' + '</div>';
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
      educationSummaryCard.innerHTML = '<div class="summary-flip ' + educationSummaryArray[i].id + "\" onclick='flip(\"" + educationSummaryArray[i].id + "\")'>" + '<div class="front">' + '<h4 class="club-header">' + educationSummaryArray[i].clubName + '</h4>' + '<p class="club-position">' + educationSummaryArray[i].role + '</p>' + '<p class="club-dates">' + educationSummaryArray[i].dates + '</p>' + '<p class="club-description">' + educationSummaryArray[i].description + '</p>' + '</div>' + '<div class="back">' + '<p class="club-description">' + educationSummaryArray[i].description + '</p>' + '</div>' + '</div>';
    } else {
      educationSummaryCard.innerHTML = '<h4 class="club-header">' + educationSummaryArray[i].clubName + '</h4>' + '<p class="club-position">' + educationSummaryArray[i].role + '</p>' + '<p class="club-dates">' + educationSummaryArray[i].dates + '</p>' + '<p class="club-description">' + educationSummaryArray[i].description + '</p>';
    }

    var educationSummaryObj = new THREE.CSS3DObject(educationSummaryCard);
    educationSummaryObjects[i] = educationSummaryObj;
    educSummaryRoot.add(educationSummaryObj);
  } // education category headers 


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
        document.getElementById("bio-button").classList.remove("button-active"); // education reset 

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
        document.getElementById("bio-button").classList.remove("button-active"); // education reset 

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
          startCompText();
        }

        educationToggle = false;
        bioDefaultToggle = false;
        checkToggles();
      }, false);
    } else if (menuButton.id == 'bio-button') {
      menuButton.addEventListener('click', function (x) {
        this.classList.toggle("button-active");
        document.getElementById("education-button").classList.remove("button-active");
        document.getElementById("work-button").classList.remove("button-active"); // education reset 

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

  if (interestPage == 0 && currentPage == 4) {
    // currently on last travel page, taking to first
    currentPage = 0;
  } else if (interestPage == 0 && currentPage == -1) {
    // currently on last travel page, taking to first
    currentPage = 3;
  } else if (interestPage != 0 && currentPage == 3) {
    // on wood or bikes last page, taking to first 
    currentPage = 0;
  } else if (interestPage != 0 && currentPage == -1) {
    // on wood or bikes last page, taking to first 
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
  allBioObjects = defaultBioObjects.concat(interestPic1Objects).concat(interestPic2Objects);
  allObjects = allStationaryObjects.concat(allEducationObjects).concat(allWorkObjects).concat(allBioObjects);
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
    workHeaderDiv.innerHTML = '<div class="work-top">' + '<h5 class="work-top-name">' + workContentArray[i].title + '</h5>' + '<h3 class="work-top-span">' + workContentArray[i].comit + '</h3>' + '</div>';
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
    workContentDiv.innerHTML = '<div class="work-header">' + '<h5 class="work-name">' + workContentArray[i].timeline + '</h5>' + '<p class="work-details">' + workContentArray[i].description + '</p>' + '</div>';
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
      workToolsDiv.id = toolCategories[k]; // the tool div inner html

      var hide = workToolsArray[i].score[toolCategories[k]] ? "" : "hide";
      var toolHtml = '<ul class="tool-row ' + hide + '">' + '<img class="tool-row-img ' + workToolsArray[i].id + '" src="' + workToolsArray[i].image + '">' + '<div class="all-tools">'; // build the rankings 

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
  var html = '<div class="flex-center">' + '<i class="fa fa-github fa-4x icon-3d">' + '</i>' + '</div>';
}

function createWorkTimelineCards() {
  for (var i = 0; i < workContentArray.length; i += 1) {
    var workTimelineDiv = document.createElement('div');
    workTimelineDiv.classList.add("timeline-events");
    workTimelineDiv.id = workContentArray[i].id + "-timeline-event";
    workTimelineDiv.innerHTML = '<div id="' + '" class="timeline-months-' + workContentArray[i].months + '">' + '<h2>' + workContentArray[i].timeline + '</h2>' + '<h3>' + workContentArray[i].company + '</h3>' + '<h4>' + workContentArray[i].title + '</h4>' + '</div>';
    var workTimelineObj = new THREE.CSS3DObject(workTimelineDiv);
    workTimelineObjects.push(workTimelineObj);
    workTimelineRoot.add(workTimelineObj);
  }

  var workTimelineList = document.createElement('ul');
  workTimelineList.classList.add("timeline-years");
  workTimelineList.innerHTML = '<div class="timelines-years">' + '<li class="tyears">2019</li>' + '<li class="tyears">2020</li>' + '<li class="tyears">2021</li>' + '</ul>';
  var workTimelineListObj = new THREE.CSS3DObject(workTimelineList);
  workTimelineObjects.push(workTimelineListObj);
  workTimelineRoot.add(workTimelineListObj); // home button 

  var workTimelineDiv = document.createElement('div');
  workTimelineDiv.classList.add("timeline-events");
  workTimelineDiv.id = "home-button";
  workTimelineDiv.innerHTML = '<div id="' + '" class="timeline-months-' + 3 + '">' + '<h4>' + 'Home Page' + '</h4>' + '</div>';
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
    if (workDefaultToggle) {
      // default -> contract
      updateWorkSelected("contract");
      stopRotationSetTrue("contract");
      stopRotationSetTrue("workTimeline");
      setMotionAndToggleFalse("workDefault");
      setMotionAndToggleFalse("defaultTools");
      setMotionAndToggleFalse("intern");
      setMotionAndToggleFalse("matops");
      transform(allObjects, alignState.workContractView, backInterval);
    } else if (workMatOpsToggle) {
      // matops -> intern
      updateWorkSelected("intern");
      stopRotationSetTrue("intern");
      stopRotationSetTrue("workTimeline");
      setMotionAndToggleFalse("workDefault");
      setMotionAndToggleFalse("defaultTools");
      setMotionAndToggleFalse("contract");
      setMotionAndToggleFalse("matops");
      transform(allObjects, alignState.workInternView, backInterval);
    } else if (workContractToggle) {
      // contract -> matops 
      updateWorkSelected("matops");
      stopRotationSetTrue("matops");
      stopRotationSetTrue("workTimeline");
      setMotionAndToggleFalse("workDefault");
      setMotionAndToggleFalse("defaultTools");
      setMotionAndToggleFalse("intern");
      setMotionAndToggleFalse("contract");
      transform(allObjects, alignState.workMatOpsView, backInterval);
    } else if (workInternToggle) {
      // intern -> default
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
    if (workDefaultToggle) {
      // default -> intern 
      updateWorkSelected("intern");
      stopRotationSetTrue("intern");
      stopRotationSetTrue("workTimeline");
      setMotionAndToggleFalse("workDefault");
      setMotionAndToggleFalse("defaultTools");
      setMotionAndToggleFalse("contract");
      setMotionAndToggleFalse("matops");
      transform(allObjects, alignState.workInternView, backInterval);
    } else if (workMatOpsToggle) {
      // matops -> contract
      updateWorkSelected("contract");
      stopRotationSetTrue("contract");
      stopRotationSetTrue("workTimeline");
      setMotionAndToggleFalse("workDefault");
      setMotionAndToggleFalse("defaultTools");
      setMotionAndToggleFalse("matops");
      setMotionAndToggleFalse("intern");
      transform(allObjects, alignState.workContractView, backInterval);
    } else if (workContractToggle) {
      // contract -> default
      updateWorkSelected("home");
      stopRotationSetTrue("workDefault");
      stopRotationSetTrue("defaultTools");
      stopRotationSetTrue("workTimeline");
      setMotionAndToggleFalse("intern");
      setMotionAndToggleFalse("contract");
      setMotionAndToggleFalse("matops");
      transform(allObjects, alignState.workDefaultView, backInterval);
    } else if (workInternToggle) {
      // intern -> matops
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

    if (workDefaultArray[i].id != "data-code" && (workDefaultArray[i].id = "comp-code")) {} else {
      workDefaultMain.classList.add('work-default');
      workDefaultMain.innerHTML = '<h3 class="work-default-header">' + workDefaultArray[i].header + '</h3>' + '<p class="work-default-description">' + workDefaultArray[i].description + '</p>';
    }

    var workDefaultObj = new THREE.CSS3DObject(workDefaultMain);
    workDefaultObjects.push(workDefaultObj);
    workTimelineRoot.add(workDefaultObj);
  }
} // managing buttons and toggles 


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
    return button != mainButton;
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