const ENEMY1 = {
    hp: 10,
    speed: .6,
    reward: 10
}

const ENEMY2 = {
  hp: 15,
  speed: 0.4,
  reward: 20
};

const ENEMY3 = {
  hp: 30,
  speed: 0.3,
  reward: 50
};

export default class Enemies {

  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.x = 0;
    this.y = this.dimensions.height;
    this.dx = ENEMY1.speed;
    this.moveEnemies();
    // this.run();
  };

  drawEnemy(){
      this.ctx.beginPath();
      this.ctx.fillRect(this.x, this.y / 2 ,20, 20);
      this.ctx.fillStyle = "yellow";
      this.ctx.fill();
    };

    moveEnemies(){
        this.ctx.clearRect(this.x - 1, this.y / 2, 20, 20);
        this.x += this.dx;
        this.drawEnemy();
        requestAnimationFrame(this.moveEnemies.bind(this));
    };    

    // run(){
        // setInterval(this.moveEnemies.bind(this), 10);
    // }
}
