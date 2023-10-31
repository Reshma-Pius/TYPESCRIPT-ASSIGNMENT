class Payload {
  constructor(public massKg: number) {}
}

class Astronaut extends Payload {
  constructor(public massKg: number, public name: string) {
    super(massKg);
  }
}

class Cargo extends Payload {
  constructor(public massKg: number, public material: string) {
    super(massKg);
  }
}

class Rocket {
  cargoItems: Cargo[] = [];
  astronauts: Astronaut[] = [];

  constructor(public name: string, public totalCapacityKg: number) {}

  sumMass = (items: Payload[]): number =>
    items.reduce((acc, item) => acc + item.massKg, 0);

  currentMassKg = (): number =>
    this.sumMass([...this.astronauts, ...this.cargoItems]);

  canAdd = (item: Payload): boolean =>
    this.currentMassKg() + item.massKg <= this.totalCapacityKg;

  addCargo = (cargo: Cargo): boolean => {
    if (this.canAdd(cargo)) {
      this.cargoItems.push(cargo);
      return true;
    }
    return false;
  };

  addAstronaut = (astronaut: Astronaut): boolean => {
    if (this.canAdd(astronaut)) {
      this.astronauts.push(astronaut);
      return true;
    }
    return false;
  };
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
