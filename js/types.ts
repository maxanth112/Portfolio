

// in can check to see if a certain property is presant in a type 
// const workR : Rotation = {
//     x: 1400,
//     y: 2000
// };
// if ('x' in workR) {
//     console.log("It sure is.");
// }

// write a type guard, to see if some unknown object is of a certain type 
type Person = {
    address: string
}

let person1: any;
const isPerson = (object: any): object is Person => "address" in object;
if (isPerson(person1)) { console.log("It sure is.")}

// singleton instances of a class 
class websiteState {
    counter = 0;
    private static instantReference : websiteState;

    private constructor() {}

    static getInstance() : websiteState {
        if (websiteState.instantReference === undefined) {
            websiteState.instantReference = new websiteState();
        }
        return websiteState.instantReference;
    }
}
// cannot create new instances, this wont compile 
// const newInst = new websiteState();

const theState = websiteState.getInstance();
const sameState = websiteState.getInstance();

interface Comparator <T> {                               1
    compareTo(value: T): number;                         
}
 
class Rectangle implements Comparator<Rectangle> {
 
    private width: number;
    private height: number;

    compareTo(value: Rectangle): number {                  
        return 1;
    }

    get Width() { // called like normal accessors ie. rect.Width = 12;
        return this.width;
    }

    set Width(newWidth: number) {
        this.width = newWidth;
    }
}