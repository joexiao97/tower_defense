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

    drawTurret(){
        this.ctx.beginPath();
        this.ctx.fillRect(this.x, this.y / 2, 20, 20);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
    }

    handleClickPlaceUnit(e){
        //layerX layerY
                debugger
    }
}

