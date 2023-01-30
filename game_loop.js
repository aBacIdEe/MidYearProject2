"use strict";
// Main "boilerplate" code for a game loop. Unlikely to need to change this.
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const FRAME_LENGTH = 30;
const actorList = new ActorList();
const enemyList = new ActorList();
var GRID_WIDTH = 10;
var GRID_HEIGHT= 10;
const backgroundColor = "#252525";

let turnCount = 1;

let grid = new Grid(GRID_WIDTH,GRID_HEIGHT);
let player = new Player(3,4);


//Draw ~ 30 times a second
let drawIntervalId = window.setInterval(draw, FRAME_LENGTH);

function draw() {
    // Clear the stage!
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight - 20;
    ctx.fillStyle = backgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Re-draw all the actors!
    grid.draw();
    for (const actor of actorList.actors) {
        actor.draw();
        
    }
    for (const actor of enemyList.actors) {
        actor.draw();
        
    }
    player.draw();
  
    // Update all actors
   grid.update()
    for (const actor of actorList.actors) {
        actor.update();
        
    }
    for (const actor of enemyList.actors) {
        actor.update();
        
    }
    
    player.update();
    // Text
    ctx.font = "48px serif";
    ctx.fillText(turnCount, 100, 100);
}
// Functions to control (pause/continue) the game loop.
function pauseDrawing() {
    if (drawIntervalId !== undefined)
        clearInterval(drawIntervalId);
    drawIntervalId = undefined;
}
function continueDrawing() {
    if (drawIntervalId === undefined)
        drawIntervalId = window.setInterval(draw, FRAME_LENGTH);
}
function gameUpdateNonPlayers() {
    turnCount++;
    for (const enemy of enemyList.actors) {
        
        enemy.move();
        
    };
}
// document.querySelector("#pause").addEventListener("click", pauseDrawing);
// document.querySelector("#continue").addEventListener("click", continueDrawing);
