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
    this.y = this.dimensions.height;
    this.dx = enemy.speed;
    this.hp = enemy.hp;
    this.reward = enemy.reward;
    this.moveEnemies1();
  };

  drawEnemy1(){
      this.ctx.beginPath();
      this.ctx.fillRect(this.x, this.y / 2 ,20, 20);
      this.ctx.fillStyle = "yellow";
      this.ctx.fill();
    };

    drawDeadEnemy(){
      this.ctx.beginPath();
      this.ctx.fillRect(this.x, this.y / 2, 20, 20);
      this.ctx.fillStyle = "white";
      this.ctx.fill();
    }
  // drawEnemy2() {
  //   this.ctx.beginPath();
  //   this.ctx.fillRect(this.x, this.y / 2, 20, 20);
  //   this.ctx.fillStyle = "yellow";
  //   this.ctx.fill();
  // };
  // drawEnemy3() {
  //   this.ctx.beginPath();
  //   this.ctx.fillRect(this.x, this.y / 2, 20, 20);
  //   this.ctx.fillStyle = "yellow";
  //   this.ctx.fill();
  // };

  moveEnemies1(){
      this.ctx.clearRect(this.x - 1, this.y / 2, 20, 20);
      this.x += this.dx;
      if(this.hp <= 0){
        this.drawDeadEnemy();
      }
      else{
        this.drawEnemy1();
      }
      requestAnimationFrame(this.moveEnemies1.bind(this));
  };
  // moveEnemies2() {
  //   this.ctx.clearRect(this.x - 1, this.y / 2, 20, 20);
  //   this.x += ENEMY2.speed;
  //   this.drawEnemy2();
  //   requestAnimationFrame(this.moveEnemies2.bind(this));
  // }; 
  // moveEnemies3() {
  //   this.ctx.clearRect(this.x - 1, this.y / 2, 20, 20);
  //   this.x += ENEMY3.speed;
  //   this.drawEnemy3();
  //   requestAnimationFrame(this.moveEnemies3.bind(this));
  // };     

  
}
