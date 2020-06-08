# TOWER DEFENSE
[Live Demo](https://joexiao97.github.io/tower_defense/)
## 1. Background and Overview

Tower defense is one of the most iconic and most common strategy games out there! Players place turrets or defensive units on the map and when they are ready, they can start the round. The objective is to stop the wave of enemies from reaching their destination. Turrets can be upgraded to become stronger, or sell them for a fraction of the price you paid for it.

Each map has certain levels of difficulties and rounds to win. Each map also has different types of monsters/enemies to fight.

## 2. Functionality and MVPs

Tower Defense users will be able to:

Start a game by selecting a map and difficulty.
Purchase and set up their board with their turrents or defensive units.
Able to start each round whenever they are ready.
In addition, the following will be included:
A "How to Play" instructions modal explaining the rules of the game
A production README

## 3. Wireframes

The tower defense game will be on a single screen with an intrsuctions modal. Users will also be able to select maps in the main screen.

https://wireframe.cc/kf4y83

## 4. Architecture and Technology

The project will be implemented with:
* JavaScript for the overall gaming logic
* CanvasHTML for graphics and animation rendering
* Webpack as the JS module bundler

In addition to the entry file, there will be the following scripts to support the project:

* game.js: The script will contain the connection between user interaction, including logic for rendering canvasHTML elements to the DOM.
* map.js: The script will contain the map the user picked and it will handle all the enemy movements and possible possitions to place a defensive unit or turret.
* turrets.js: The script will contain all turrets the user can choose from and place for their defense.
* enemies.js: The script will contain all enemies that can possibly appear on the map.

## 5. Implementation Timeline

### Day 1
Set up webpack and Node modules. Write rudimentary entry files and skeletons for supporting scripts. Review canvasHTML to brush up on knowledge & animation loops.

### Day 2
Create a map and board with path

### Day 3
Create turrets and enemies with stats such as hp

### Day 4
Fix all bugs and test to make sure everything works correctly.

## 6. Bonus Features

