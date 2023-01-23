"use strict";
// Main "boilerplate" code for a game loop. Unlikely to need to change this.
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const FRAME_LENGTH = 30;
const actorList = new ActorList();
const GRID_WIDTH = 7;
const GRID_HEIGHT= 8;
//Draw ~ 30 times a second
let grid = new Grid(GRID_WIDTH,GRID_HEIGHT);
// actorList.addActor(new Player());
const backgroundColor = "#252525";
let drawIntervalId = window.setInterval(draw, FRAME_LENGTH);
let player = new Player(3,4);
actorList.addActor(player);
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
  
    //Update all actors
    for (const actor of actorList.actors) {
        actor.update();
    }
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
// document.querySelector("#pause").addEventListener("click", pauseDrawing);
// document.querySelector("#continue").addEventListener("click", continueDrawing);
