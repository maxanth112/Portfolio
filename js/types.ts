type Rotation = {
    x? : number, // ? := optional argument
    y? : number,
    z? : number
};

class Root {
    constructor(readonly name : string, // const for classes 
        public group : string,
        public viewCoordinates : number,
        public rotation : Rotation) {};
}