import TowerDefenseBoard from "./board";
import Enemies from "./enemies"

export default class TowerDefenseGame {

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };

        this.health = 10;
        this.money = 200;
        document.getElementById("money-container").textContent = "Money: " + this.money + "$"
        document.getElementById("health-container").textContent = "Health: " + this.health
        this.handleClickPlaceUnit = this.handleClickPlaceUnit.bind(this);
        canvas.addEventListener("click", this.handleClickPlaceUnit);
        this.incrementMoney()
    }

    restart(){
        this.isOver = false;
        this.board = new TowerDefenseBoard(this.canvas);
        this.spawnPoint = this.board.spawnPoint;
        this.endPoint = this.board.endPoint;
        this.enemies = new Enemies(this.canvas);
        this.enemies.drawEnemy(this.ctx);
    }

    start(){
        this.isOver = false;
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

