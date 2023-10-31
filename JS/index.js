"use strict";
class Payload {
    constructor(massKg) {
        this.massKg = massKg;
    }
}
class Astronaut extends Payload {
    constructor(massKg, name) {
        super(massKg);
        this.massKg = massKg;
        this.name = name;
    }
}
class Cargo extends Payload {
    constructor(massKg, material) {
        super(massKg);
        this.massKg = massKg;
        this.material = material;
    }
}
class Rocket {
    constructor(name, totalCapacityKg) {
        this.name = name;
        this.totalCapacityKg = totalCapacityKg;
        this.cargoItems = [];
        this.astronauts = [];
        this.sumMass = (items) => items.reduce((acc, item) => acc + item.massKg, 0);
        this.currentMassKg = () => this.sumMass([...this.astronauts, ...this.cargoItems]);
        this.canAdd = (item) => this.currentMassKg() + item.massKg <= this.totalCapacityKg;
        this.addCargo = (cargo) => {
            if (this.canAdd(cargo)) {
                this.cargoItems.push(cargo);
                return true;
            }
            return false;
        };
        this.addAstronaut = (astronaut) => {
            if (this.canAdd(astronaut)) {
                this.astronauts.push(astronaut);
                return true;
            }
            return false;
        };
    }
}
// Run a simulation
const astronaut1 = new Astronaut(75, "John");
const astronaut2 = new Astronaut(80, "Jane");
const cargo1 = new Cargo(100, "Food");
const cargo2 = new Cargo(200, "Equipment");
const rocket = new Rocket("Saturn V", 1000);
console.log(`Adding astronauts to the rocket ${rocket.name}:`);
console.log(rocket.addAstronaut(astronaut1)); // true
console.log(rocket.addAstronaut(astronaut2)); // true
console.log(`Adding cargo to the rocket ${rocket.name}:`);
console.log(rocket.addCargo(cargo1)); // true
console.log(rocket.addCargo(cargo2)); // false (exceeds total capacity)
console.log("Current rocket mass: " + rocket.currentMassKg() + " kg");
