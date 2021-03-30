var delayMultiplyer = 700;
var introRoot;
var nameRoot;
var delay = 500;

var introRootObjects = [];
var cardElements = [];

var introViewCoordinates = [];
var introDropCoordinates = [];

var speeds = [0, 0, 0];
var spheres = {
    small: [],
    smallMed: [],
    med: [],
    medLarge: [],
    large: [],
    larger: [],
};

var finalSphere = [];

var nameElement;
var nameCoordinate;
var shrinkCoordinate;
var shrinkCoordinates;

var iteratedIntroView = [];
var iteratedIntroDrop = [];

var introCardExclude = ['2-2', '2-1', '2-0', '2-6', '3-6',
    '3-5', '3-1', '3-0', '4-6', '4-2', '4-1', '4-0',
    '10-0', '11-0', '10-1', '11-1', '10-3', '11-3',
    '10-4', '11-4', '11-5', '11-5', '12-4', '12-3',
    '12-0', '12-1', '13-6', '14-5', '14-6', '16-2',
    '16-3', '16-4', '17-3', '18-0', '18-6', '19-0',
    '19-1', '19-5', '19-6', '20-0', '20-6', '21-3',
    '22-3', '22-4', '22-2', '8-6', '9-6', '8-5'
];
