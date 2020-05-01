const TURRET1 = {
    damage: 2,
    range: 3,
    attackSpeed: 2,
    cost: 50,    
}

const TURRET2 = {
  damage: 3,
  range: 3,
  attackSpeed: 3,
  cost: 150
};

const TURRET3 = {
  damage: 3,
  range: 4,
  attackSpeed: 5,
  cost: 300
};

export default class Turrets {
    constructor(dimensions, turretType) {
        this.dimensions = dimensions;
        this.turretType = turretType;
    }

    
}