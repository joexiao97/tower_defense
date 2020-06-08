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
    damage: 2/10,
    range: 3,
    attackSpeed: 2,
    color: "lightblue",
    cost: 50,
}

const TURRET2 = {
    damage: 3/10,
    range: 3,
    attackSpeed: 3,
    color: "purple",
    cost: 150
};

const TURRET3 = {
    damage: 3/10,
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

        this.highScore = this.getCookie("highScore")
        if (this.highScore === "undefined"){
            this.highScore = 0;
        }
        this.currentScore = 0;
        this.health = 10;
        this.money = 200;
        this.turrets = [];
        this.enemies = [];
        this.projectiles = [];
        this.checkClear;
        this.clearSpawn;
        this.clearMoney;
        this.alerted = false;
        document.getElementById("money-container").textContent = "Money: " + this.money + "$";
        document.getElementById("health-container").textContent = "Health: " + this.health;
        document.getElementById("currentscore-container").textContent = "Current Score: " + this.currentScore;
        document.getElementById("highscore-container").textContent = "High Score to beat: " + this.highScore;
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
        this.setCookieForHS();
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
        this.currentScore = 0;
        this.highScore = this.getCookie("highScore")
        document.getElementById("currentscore-container").textContent = "Current Score: " + this.currentScore;
        document.getElementById("highscore-container").textContent = "High Score to beat: " + this.highScore;
        ENEMY1.hp = 10;
        ENEMY1.speed = .6;
        ENEMY1.maxHP = 10;
        this.isOver = false;
        this.board = new TowerDefenseBoard(this.canvas, this.highScore);
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
          this.newEnemy1()}, 1288
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
        }, 10000)
    }

    gameOver(){
        this.alerted = true;
        const modal = document.getElementById("lose-modal");
        document.getElementById("lose-score").textContent = "Your score: " + this.currentScore;
        document.getElementById("lose-highscore").textContent = "Current Score to beat: " + this.highScore;
        modal.classList.remove('hide');

    }

    checkEnemy(){
        const endGoal = this.dimensions.width
        let health = this.health;
        let money = this.money;
        this.enemies = this.enemies.map((enemy) => {
            if(enemy.hp <= 0){
                money += 5;
                this.currentScore += 1;
                document.getElementById("currentscore-container").textContent = "Current Score: " + this.currentScore;
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
            this.setCookieForHS();
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
        }), 60);
    }

    setCookieForHS() {
    var d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();

    if(this.highScore === undefined){
        this.highScore = 0;
    }

    if(this.currentScore > this.highScore){
        this.highScore = this.currentScore;
    }
    document.cookie = "highScore" + "=" + this.highScore + ";" + expires + ";path=/";
    }

    getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
}

