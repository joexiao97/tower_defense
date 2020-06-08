// const TURRET1 = {
//     damage: 2,
//     range: 3,
//     attackSpeed: 2,
//     color: "lightblue",
//     cost: 50,    
// }

// const TURRET2 = {
//   damage: 3,
//   range: 3,
//   attackSpeed: 3,
//   color: "purple",
//   cost: 150
// };

// const TURRET3 = {
//   damage: 3,
//   range: 4,
//   attackSpeed: 5,
//   color: "orange",
//   cost: 300
// };

export default class Turret {
    constructor(posX, posY, turretType) {
        this.posX = posX;
        this.posY = posY;
        // this.dimensions = dimensions;
        this.turretType = turretType;
        this.damage = turretType.damage;
        this.range = turretType.range;
        this.attackSpeed = turretType.attackSpeed;
    }
  
  drawTurret(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.turretType.color; //future update add more turrets
    ctx.fill();
    ctx.fillRect(this.posX, this.posY, 19, 19);
  }

  drawProjectile(ctx, enemyX, enemyY){
    ctx.beginPath();
    // ctx.strokeStyle = "black";
    // ctx.linewidth = 40;
    ctx.moveTo(this.posX + 10, this.posY + 10);
    ctx.lineTo(enemyX + 10, enemyY);
    ctx.stroke();
    ctx.closePath();
  }

}