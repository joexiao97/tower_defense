# TOWER DEFENSE
[Live Demo](https://joexiao97.github.io/tower_defense/)
## 1. Background and Overview

Tower defense is one of the most iconic and most common strategy games out there! Players place turrets or defensive units on the map. The objective is to stop the
endless waves of enemies from reaching their destination.

Enemies spawn when loaded and users can click on the grid to place turrets at that location! Turrets cost 50 gold each and can be stacked onto the same location. Defeating enemies grants 5 gold!

Here is an example gif of how the gameplay works.

![tower defense gif](/towerdefense.gif)

## 2. Functionality and MVPs

Waves will automatically start upon loading.

Tower Defense users will be able to:

Purchase and set up their board with their turrents or defensive units.
The following will be included:
A "How to Play" instructions modal explaining the rules of the game
A production README

## 3. Wireframes

The tower defense game will be on a single screen with an intrsuctions dropdown. Users will also have a reset button and their statistics below the game canvas. Also included are links to my repo and online presence sites.

![tower defense wireframe](/wireframes.png)

## 4. Architecture and Technology

The project will be implemented with:
* JavaScript for the overall gaming logic
* CanvasHTML for graphics and animation rendering
* Webpack as the JS module bundler

In addition to the entry file, there will be the following scripts to support the project:

* game.js: The script will contain the connection between user interaction, including logic for rendering canvasHTML elements to the DOM. This will also control enemy movement and all game related calculations.
* map.js: The script will contain the map.
* turrets.js: The script will contain turrets the user can place for their defense. This will also be responsible for rendering turret lasers.
* enemies.js: The script will contain all enemies that can possibly appear on the map, including their health, speed, and reward.

## 5. Highlighted Feature

The below snippet of code checks the clicked position and gets its x and y coordinates and check if its between the grids value that is stored inside the allBoxes object, which consists of arrays for every box on the grid. The script then assigns a turret to that spot and saves it into a turrets array.


```javascript
   handleClickPlaceUnit(e){
        Object.values(this.board.allBoxes).map((col) => {
            Object.values(col).map((box) => {
                if ((box[0] < e.layerX && box[0] + 20 > e.layerX) && (box[1] < e.layerY && box[1] + 20 > e.layerY)){
                    if(box[2] && this.money >= 50){
                        this.money -= 50;
                        document.getElementById("money-container").textContent = "Money: " + this.money + "$";
                        this.turrets.push(new Turret(box[0],box[1], TURRET1));
                        box[2] = false;
                    };
                }
            })
        })
    };
```

The snippet of code below checks all potential targets in a turrets range and stores it into an array. If there is any targets in the array, the turrets will target the first enemy closests to the end line.

```javascript
    checkEnemiesInRange(){
        this.turrets.forEach((turret) => {
            let enemiesInRange = [];
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
```

## 6. Implementation Timeline

### Day 1
Set up webpack and Node modules. Write rudimentary entry files and skeletons for supporting scripts. Review canvasHTML to brush up on knowledge & animation loops.

### Day 2
Create a map and board with a starting and ending path.

### Day 3
Create turrets and enemies with stats such as hp and speed.

### Day 4
Fix all bugs and test to make sure everything works correctly. Implemented restart button and losing screen.




