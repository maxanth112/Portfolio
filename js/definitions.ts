type RotateSpeed = {
    x? : number, // ? := optional argument
    y? : number,
    z? : number
};

interface Coordinates {
    view: object[];
    rotating: object[];
    rotateSpeed: RotateSpeed;
}

interface Position {
    inView: boolean;
    coordinates: Coordinates;

    sendRotation(): void;
    sendView(): void;
}

class Root { // adding access qualifiers in the constructor will initialize the passed variable to the local class varialbe instantly 
    static numOfRoots = 0; // shared by all roots

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


stationary: {
    root: '',
    toggle: '',
    motion: '',
    inViewClass: '',
    classToUpdate: [],
    objects: [],
    coordinates: {
        view: [],
        rotate: [],
        viewFinal: [],
        include: [],
        exclude: ["educSelect"]
    },
    group: 'menu',
},