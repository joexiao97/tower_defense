// const ENEMY1 = {
//     hp: 10,
//     speed: .6,
//     reward: 10
// }

// const ENEMY2 = {
//   hp: 15,
//   speed: 0.4,
//   reward: 20
// };

// const ENEMY3 = {
//   hp: 30,
//   speed: 0.3,
//   reward: 50
// };

export default class Enemies {

  constructor(canvas, enemy) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.x = 0;
    this.posY = 210
    this.y = this.dimensions.height;
    this.dx = enemy.speed;
    this.hp = enemy.hp;
    this.maxHP = enemy.maxHP;
    this.inrange = enemy.inrange;
    this.reward = enemy.reward;
  };

    drawLiveEnemy(){
      this.ctx.beginPath();
      this.ctx.fillRect(this.x, this.y / 2 ,20, 20);
      this.ctx.fillStyle = "yellow";
      this.ctx.fill();
      this.ctx.closePath();
    };

    drawDeadEnemy(){
      this.ctx.beginPath();
      this.ctx.fillRect(this.x, this.y / 2, 20, 20);
      this.ctx.fillStyle = "white";
      this.ctx.fill();
      this.ctx.closePath();
    }
    hitEnemy(){
      this.ctx.beginPath();
      this.ctx.fillRect(this.x, this.y / 2, 20, 20);
      this.ctx.fillStyle = "red";
      this.ctx.fill();
      this.ctx.closePath();
    }

  moveEnemy(){
      // this.ctx.clearRect(this.x, this.y / 2, 20, 20);
      this.x += this.dx;
  };

  drawEnemy(){
    // if (this.hp <= 0) {
    //   this.drawDeadEnemy();
    // }
    if (this.hp < this.maxHP && this.hp > 0) {
      this.hitEnemy();
    }
    else {
      this.drawLiveEnemy();
    }
  }  
}
