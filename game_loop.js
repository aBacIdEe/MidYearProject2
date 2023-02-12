
// Main "boilerplate" code for a game loop. Unlikely to need to change this.
const canvas = document.querySelector("#myCanvas");
canvas.style.display = "none";
const projection = document.querySelector("#projection");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const frame = projection.getContext("2d", { willReadFrequently: true });
frame.canvas.width = window.innerWidth;
frame.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
const FRAME_LENGTH = 33;
const actorList = new ActorList();
const enemyList = new ActorList();
var GRID_WIDTH = 10;
var GRID_HEIGHT = 10;
const backgroundColor = "#252525";
var screeeen = 0;
playing = 0;
var isStarting = 0;

let grid = new Grid(GRID_WIDTH, GRID_HEIGHT);
let player = new Player(3, 4);

aboutToPlayerUpdate = -1;
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
    player.draw();
    // Update all actors

    for (const actor of actorList.actors) {
        actor.draw();
    }
    for (const actor of enemyList.actors) {
        actor.draw();
    }
    if (!playing) {
        ctx.fillStyle = backgroundColor;

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#42a852";
        size = Math.floor(Math.min((window.innerWidth - 20) / 3, (window.innerHeight - 20) / 3));
        shiftX = Math.floor((window.innerWidth - 20) / 2 - size / 2);
        shiftY = Math.floor((window.innerHeight - 20) / 2 - size / 2);


        ctx.fillRect(shiftX, shiftY, size, size);
        ctx.font = "48px serif";
        ctx.textAlign = "center";
        ctx.fillText("Block Maze", window.innerWidth / 2, window.innerHeight / 4);
    }


    // Update all actors
    grid.update();

    for (const actor of actorList.actors) {
        actor.update();
    }
    for (const actor of enemyList.actors) {
        actor.update();
    }
    player.update();
    if (aboutToPlayerUpdate != -1) {
        grid.update()
        grid.blocked[player.x][player.y] = 2;
        for (const actor of actorList.actors) {
            actor.update();

        }
        for (const actor of enemyList.actors) {
            actor.update();

        }
        for (const enemy of enemyList.actors) { enemy.playerUpdate(); }
        aboutToPlayerUpdate = -1;
    }
    //console.log(aboutToChange);
    if (aboutToChange != -1) {
        // console.log('hi',aboutToChange);
        loadRoom(aboutToChange);
        // console.log('hi');
        aboutToChange = -1;
    }

    // Text

    if (isStarting == 1) {
        screeeen += 4;
        if (screeeen > 30) {

            isStarting = 2;

            playing = true;

        }
    }
    else if (isStarting == 2) {
        screeeen -= 4;
        if (screeeen <= 0) {
            screeeen = 0;
            isStarting = 0;
        }
    }
    ctx.fillStyle = "rgba(0, 0, 0, " + screeeen / 29 + ")";
    //console.log(ctx.fillStyle)
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
