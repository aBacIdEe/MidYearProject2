
// Main "boilerplate" code for a game loop. Unlikely to need to change this.
const canvas = document.querySelector("#myCanvas");
canvas.style.display="none";
const projection = document.querySelector("#projection");
const ctx = canvas.getContext("2d", {willReadFrequently: true});
const frame = projection.getContext("2d", {willReadFrequently: true});
frame.canvas.width  = window.innerWidth;
frame.canvas.height = window.innerHeight;
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
const FRAME_LENGTH = 33;
const actorList = new ActorList();
const enemyList = new ActorList();
var GRID_WIDTH = 10;
var GRID_HEIGHT= 10;
const backgroundColor = "#252525";

let grid = new Grid(GRID_WIDTH, GRID_HEIGHT);
let player = new Player(3, 4);


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
    grid.drawBorders();
        
    player.draw();
    // Update all actors

    for (const actor of actorList.actors) {
        actor.draw();
    }
    for (const actor of enemyList.actors) {
        actor.draw();
    }
    player.draw();
    // Update all actors
    grid.update();
  
    for (const actor of actorList.actors) {
        actor.update();
    }
    for (const actor of enemyList.actors) {
        actor.update();
    }
    player.update();
    if (aboutToChange!=-1){
        loadRoom(aboutToChange);
        aboutToChange = -1;
    }
        
    // Text
    ctx.font = "48px serif";
    ctx.fillText("Hi There", 100, 100);

    var render = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    frame.putImageData(render, 0, 0);
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
