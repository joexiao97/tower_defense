import TowerDefenseBoard from "./board";
import Enemies from "./enemies"

export default class TowerDefenseGame {

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };

        this.health = 10;
        this.money = 200;
        this.enemies = [];
        document.getElementById("money-container").textContent = "Money: " + this.money + "$"
        document.getElementById("health-container").textContent = "Health: " + this.health
        this.handleClickPlaceUnit = this.handleClickPlaceUnit.bind(this);
        canvas.addEventListener("click", this.handleClickPlaceUnit);
        this.incrementMoney()
        this.spawnEnemies = this.spawnEnemies.bind(this)
        this.spawnEnemies();
        this.checkEndPoint = this.checkEndPoint.bind(this);
        this.checkEndPoint();
    }

    restart(){
        this.isOver = false;
        this.board = new TowerDefenseBoard(this.canvas);
        this.spawnPoint = this.board.spawnPoint;
        this.endPoint = this.board.endPoint;
        // this.enemies = new Enemies(this.canvas);
        // this.enemies.drawEnemy(this.ctx);
    }

    start(){
        this.isOver = false;
    }

    newEnemy(){
        this.enemies.push(new Enemies(this.canvas))
    }

    spawnEnemies(){
        setInterval(() => {
          this.newEnemy()}, 1688
        )
    }

    checkEndPoint() {
        setInterval(() => {
        this.checkEnemy()}, 100
        )
    }

    checkEnemy(){
        const endGoal = this.dimensions.width
        let health = this.health;
        debugger
        this.enemies = this.enemies.map((enemy) => {
            if (enemy.x >= endGoal){
                health -= 1;
                return undefined
            }else{
                return enemy
            }
        })
        this.enemies = this.enemies.filter((enemy) => enemy !== undefined);
        this.health = health
        document.getElementById("health-container").textContent = "Health: " + this.health
    }

    drawTurret1(x,y){
        this.ctx.beginPath();
        this.ctx.fillStyle = "lightblue";
        this.ctx.fill();
        this.ctx.fillRect(x, y , 20, 20);
    }

    drawTurret2(x, y) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "purple";
        this.ctx.fill();
        this.ctx.fillRect(x, y, 20, 20);
    }

    drawTurret3(x, y) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "orange";
        this.ctx.fill();
        this.ctx.fillRect(x, y, 20, 20);
    }

    incrementMoney(){
        setInterval( (() => {
            this.money += 1;
            document.getElementById("money-container").textContent = "Money: " + this.money + "$"
        }), 368);
    }

    handleClickPlaceUnit(e){
        //layerX layerY
        let target_box;
        Object.values(this.board.allBoxes).forEach((col) => {
            Object.values(col).forEach((box) => {
                if ((box[0] < e.layerX && box[0] + 20 > e.layerX) && (box[1] < e.layerY && box[1] + 20 > e.layerY))
                target_box = box;
            })
        })
        if(target_box[2] && this.money >= 50){
            this.money -= 50;
            document.getElementById("money-container").textContent = "Money: " + this.money + "$"
            target_box[2] = false;
            this.drawTurret1(target_box[0],target_box[1]);
        }
    }   
}

