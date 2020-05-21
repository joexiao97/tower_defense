import { throws } from "assert";

export default class TowerDefenseBoard {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.allBoxes = {};
    
    this.width = this.dimensions.width / 20
    this.height = this.dimensions.height / 20

    for(let x = 0; x < this.width; x++){
      this.allBoxes[x] = {};
      for(let y = 0; y < this.height; y++){
        this.ctx.beginPath();
        this.ctx.rect(x * 20, y * 20, 20, 20);
        this.ctx.stroke();
        this.ctx.closePath();
        this.allBoxes[x][y] = [x* 20,y *20,true]
        // this.allBoxes["x"] = x*20;
        // this.allBoxes["y"] = y*20;
        // this.allBoxes["empty"] = true;
      }
    }
    Object.values(this.allBoxes[0]).forEach((box) => {
      box[2] = false;
    });
    Object.values(this.allBoxes[Object.values(this.allBoxes).length - 1]).forEach((box) => {
      box[2] = false;
    })
    for (let x = 0; x < 30; x++) {
      this.allBoxes[x][0][2] = false;
      this.allBoxes[x][10][2] = false;
      this.allBoxes[x][19][2] = false;
    }

    // this.handleOnclick = this.handleOnclick.bind(this);
    // this.ctx.beginPath();
    // this.ctx.lineWidth = 5;
    // this.ctx.rect(100, 15, 10, 10);
    
    // this.ctx.beginPath();
    // this.ctx.fillStyle = "red";
    // this.ctx.rect(0, this.dimensions.height / 2, this.dimensions.width, 20);
    // this.ctx.fill();
    // this.ctx.stroke();

    //path
    this.ctx.beginPath();
    this.ctx.rect(0, this.dimensions.height / 2, this.dimensions.width - 1, 20);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    
    //border
    this.ctx.beginPath();
    this.ctx.lineWidth = "40";
    this.ctx.strokeStyle = "orange";
    this.ctx.rect(0,0, this.dimensions.width, this.dimensions.height)
    this.ctx.stroke();
    this.ctx.closePath();

    //start
    this.ctx.beginPath();
    this.ctx.fillStyle = "green";
    this.ctx.rect(0, this.dimensions.height / 2 - 20, 20, 60);
    this.ctx.fill();
    this.ctx.closePath();
    
    //end
    this.ctx.beginPath();
    this.ctx.fillStyle = "blue";
    this.ctx.rect(this.dimensions.width-20, this.dimensions.height / 2 - 20, 20, 60);
    this.ctx.fill();
    this.ctx.closePath();

    this.spawnPoint = {x: 0 , y: this.dimensions.height / 2}
    this.endPoint = {x: this.dimensions.width - 20 , y: this.dimensions.height / 2}
  }

  // handleOnclick(e){
  //   this.canvas.addEventListener("click", () => console.log(e))
  // }
}

//layerx layery