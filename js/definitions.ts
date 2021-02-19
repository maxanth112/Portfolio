type RotateSpeed = {
    x? : number, // ? := optional argument
    y? : number,
    z? : number
};

interface Coordinates {
    view: Array<object>;
    rotating: Array<object>; // generic type declaration of array
    rotateSpeed: RotateSpeed;
}

interface Position {
    inView: boolean;
    coordinates: Coordinates;

    sendRotation(): void;
    sendView(): void;
}

enum sendTo {
    RtoV = "T0_VIEW",
    VtoR = "T0_ROTATE"
}

class Root { // adding access qualifiers in the constructor will initialize the passed variable to the local class varialbe instantly 
    static currentView = ''; // shared by all roots
    static numOfRoots = 0;
    constructor(readonly name : string, // const for classes 
        public group : string,
        public inView: boolean,
        public coordinates: Coordinates) {};

    sendRotation() {}
    sendView() {}
    addedRoot() {
        Root.numOfRoots++; // access static variables with the class name 
    }
}
