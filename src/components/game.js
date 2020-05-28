import TowerDefenseBoard from "./board";
import Enemies from "./enemies"
import Turrets from "./turrets";

const ENEMY1 = {
    hp: 10,
    maxHP: 10,
    speed: .6,
    reward: 10,
    inrange: false
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


export default class TowerDefenseGame {

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };

        this.health = 10;
        this.money = 200;
        this.enemies = [];
        this.checkClear;
        this.clearSpawn;
        this.clearMoney;
        this.alerted = false;
        document.getElementById("money-container").textContent = "Money: " + this.money + "$"
        document.getElementById("health-container").textContent = "Health: " + this.health
        this.handleClickPlaceUnit = this.handleClickPlaceUnit.bind(this);
        canvas.addEventListener("click", this.handleClickPlaceUnit);
        this.incrementMoney()
        this.spawnEnemies = this.spawnEnemies.bind(this)
        this.spawnEnemies();
        this.checkEndPoint = this.checkEndPoint.bind(this);
        this.checkEndPoint();
        this.intervalCheckFire = this.intervalCheckFire.bind(this);
        this.intervalCheckFire();
        this.harderEnemies = this.harderEnemies.bind(this);
        this.harderEnemies();
    }

    restart(){
        this.isOver = false;
        this.board = new TowerDefenseBoard(this.canvas);
        this.spawnPoint = this.board.spawnPoint;
        this.endPoint = this.board.endPoint;
    }

    start(){
        this.isOver = false;
    }

    newEnemy1(){
        this.enemies.push(new Enemies(this.canvas, ENEMY1))
    }

    spawnEnemies(){
        this.clearSpawn = setInterval(() => {
          this.newEnemy1()}, 1688
        )
    }

    checkEndPoint() {
        this.checkClear = setInterval(() => {
        this.checkEnemy()}, 100
        )
    }

    harderEnemies(){
        setInterval(() => {
            ENEMY1.hp += 2;
            ENEMY1.speed += .2;
            ENEMY1.maxHP += 2;
        }, 20000)
    }

    gameOver(){
        this.alerted = true;
        alert("You lose! Please refresh to play again!")
    }

    checkEnemy(){
        const endGoal = this.dimensions.width
        let health = this.health;
        let money = this.money;
        this.enemies = this.enemies.map((enemy) => {
            if(enemy.hp <= 0){
                money += 5;
                return undefined
            }
            if (enemy.x >= endGoal){
                health -= 1;
                if (health <= 0 && !this.alerted) {
                    document.getElementById("health-container").textContent = "Health: " + 0;
                    clearInterval(this.checkClear);
                    clearInterval(this.clearSpawn);
                    clearInterval(this.clearMoney);
                    this.gameOver();
                }
                return undefined
            }else{
                return enemy
            }
        })
        this.enemies = this.enemies.filter((enemy) => enemy !== undefined);
        this.health = health
        if(this.health <= 0){
            document.getElementById("health-container").textContent = "Health: " + 0
        }else{
            document.getElementById("health-container").textContent = "Health: " + this.health
        }
        this.money = money;
        document.getElementById("money-container").textContent = "Money: " + this.money + "$"

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

    // drawProjectile(enemyX, enemyY, turrX, turrY){
    //     this.ctx.beginPath();
    //     this.ctx.moveTo(turrX, turrY);
    //     this.ctx.lineTo(enemyX, enemyY);
    //     this.ctx.stroke();
    //     // debugger
    // }

    incrementMoney(){
        this.clearMoney = setInterval( (() => {
            this.money += 1;
            document.getElementById("money-container").textContent = "Money: " + this.money + "$"
        }), 1368);
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
            target_box[3] = new Turrets
            this.drawTurret1(target_box[0],target_box[1]);
        }
    }   

    checkEnemiesInRange(){
        Object.values(this.board.allBoxes).forEach((col) => {
            Object.values(col).forEach((box) => {
                if(box[3] !== null){
                    // box[3].range
                    let enemiesInRange = []
                    this.enemies.forEach((enemy) => {
                        if ((enemy.x < box[0] + 20 * box[3].range) && (enemy.x > box[0] - 20 * box[3].range)){
                            enemiesInRange.push(enemy)
                        }
                    })
                    if(enemiesInRange.length >= 1){
                        // this.drawProjectile(enemiesInRange[0].x , enemiesInRange[0].y , box[0], box[1]);
                        enemiesInRange[0].hp -= box[3].damage;
                    }
                }
            })
        })
    }

    intervalCheckFire() {
        setInterval((() => {
            this.checkEnemiesInRange()
        }), 1000);
    }


}

