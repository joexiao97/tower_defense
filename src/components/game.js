import TowerDefenseBoard from "./board";
import Enemies from "./enemies"
import Turret from "./turrets";

const ENEMY1 = {
    hp: 10,
    maxHP: 10,
    speed: .6,
    reward: 10,
    inrange: false,
    color: "yellow"
}

const ENEMY2 = {
    hp: 15,
    maxHP: 15,
    speed: 0.4,
    reward: 15,
    inrange: false,
    color: "brown"
};

const ENEMY3 = {
    hp: 30,
    maxHP: 30,
    speed: 0.6,
    reward: 50,
    inrange: false,
    color: "black"
};

const TURRET1 = {
    damage: 2,
    range: 3,
    attackSpeed: 2,
    color: "lightblue",
    cost: 50,
}

const TURRET2 = {
    damage: 3,
    range: 3,
    attackSpeed: 3,
    color: "purple",
    cost: 150
};

const TURRET3 = {
    damage: 3,
    range: 4,
    attackSpeed: 5,
    color: "orange",
    cost: 300
};


export default class TowerDefenseGame {

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        // this.board = new TowerDefenseBoard(this.canvas);

        this.health = 10;
        this.money = 200;
        this.turrets = [];
        this.enemies = [];
        this.projectiles = [];
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
        cancelAnimationFrame(this.requestId);
        this.requestId = undefined;
        clearInterval(this.checkClear);
        clearInterval(this.clearSpawn);
        clearInterval(this.clearMoney);
        clearInterval(this.clearHarder);
        clearInterval(this.clearFire);
        this.incrementMoney();
        this.spawnEnemies();
        this.checkEndPoint();
        this.intervalCheckFire();
        this.harderEnemies();
        ENEMY1.hp += 10;
        ENEMY1.speed = .6;
        ENEMY1.maxHP = 10;
        this.isOver = false;
        this.board = new TowerDefenseBoard(this.canvas);
        this.board.allBoxes = {};
        this.spawnPoint = this.board.spawnPoint;
        this.endPoint = this.board.endPoint;
        this.health = 10;
        this.money = 200;
        this.turrets = [];
        this.alerted = false;
        this.enemies = [];
        this.projectiles = [];
        this.animate();
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

    animate(){
        this.board.drawBoard();
        this.enemies.forEach((enemy) => {
            enemy.drawEnemy();
            enemy.moveEnemy();
        })
        this.turrets.forEach((turret) =>{
            turret.drawTurret(this.ctx);
        })
        this.projectiles.forEach((ownProps) =>{
            ownProps.turret.drawProjectile(ownProps.ctx, ownProps.enemyX, ownProps.enemyY)
        })
        this.projectiles = [];
        this.requestId = requestAnimationFrame(this.animate.bind(this));
    }


    checkEndPoint() {
        this.checkClear = setInterval(() => {
        this.checkEnemy()}, 100
        )
    }

    harderEnemies(){
        this.clearHarder = setInterval(() => {
            ENEMY1.hp += 2;
            ENEMY1.speed += .2;
            ENEMY1.maxHP += 2;
        }, 20000)
    }

    gameOver(){
        this.alerted = true;
        const modal = document.getElementById("lose-modal");
        modal.classList.remove('hide');

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
                    clearInterval(this.clearHarder);
                    clearInterval(this.clearFire);
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
            this.turrets.push(new Turret(target_box[0],target_box[1], TURRET1))
            target_box[2] = false;
        } 
    }   

    checkEnemiesInRange(){
        this.turrets.forEach((turret) => {
            let enemiesInRange = []
            this.enemies.forEach((enemy) => {
                if ((enemy.x < turret.posX + 20 * turret.range) && (enemy.x > turret.posX - 20 * turret.range)){
                    enemiesInRange.push(enemy)
                }
                // debugger
                if(enemiesInRange.length >= 1){
                    this.projectiles.push({turret: turret, ctx: this.ctx, enemyX: enemiesInRange[0].x, enemyY:enemiesInRange[0].posY})
                    enemiesInRange[0].hp -= turret.damage;
                }
            }
        )})
    }

    drawProjectile(enemyX, enemyY, turrX, turrY) {
        this.ctx.beginPath();
        this.ctx.moveTo(turrX, turrY);
        this.ctx.lineTo(enemyX, enemyY);
        this.ctx.stroke();
    }

    intervalCheckFire() {
        this.clearFire = setInterval((() => {
            this.checkEnemiesInRange()
        }), 1000);
    }


}

