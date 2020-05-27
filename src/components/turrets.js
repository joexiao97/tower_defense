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
        this.damage = TURRET1.damage;
        this.range = TURRET1.range;
        this.attackSpeed = TURRET1.attackSpeed;
    }

    // checkEnemies(){

    // }

  // drawTurret1(x, y) {
  //   this.ctx.beginPath();
  //   this.ctx.fillStyle = "lightblue";
  //   this.ctx.fill();
  //   this.ctx.fillRect(x, y, 20, 20);
  // }

  // drawTurret2(x, y) {
  //   this.ctx.beginPath();
  //   this.ctx.fillStyle = "purple";
  //   this.ctx.fill();
  //   this.ctx.fillRect(x, y, 20, 20);
  // }

  // drawTurret3(x, y) {
  //   this.ctx.beginPath();
  //   this.ctx.fillStyle = "orange";
  //   this.ctx.fill();
  //   this.ctx.fillRect(x, y, 20, 20);
  // }

  // handleClickPlaceUnit(e) {
  //   //layerX layerY
  //   let target_box;
  //   Object.values(this.board.allBoxes).forEach((col) => {
  //     Object.values(col).forEach((box) => {
  //       if ((box[0] < e.layerX && box[0] + 20 > e.layerX) && (box[1] < e.layerY && box[1] + 20 > e.layerY))
  //         target_box = box;
  //     })
  //   })
  //   if (target_box[2] && this.money >= 50) {
  //     this.money -= 50;
  //     document.getElementById("money-container").textContent = "Money: " + this.money + "$"
  //     target_box[2] = false;
  //     this.drawTurret1(target_box[0], target_box[1]);
  //   }
  // }   
    
}