
// Main "boilerplate" code for a game loop. Unlikely to need to change this.
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const FRAME_LENGTH = 30;
const actorList = new ActorList();
const enemyList = new ActorList();
var GRID_WIDTH = 10;
var GRID_HEIGHT= 10;
const backgroundColor = "#252525";
// const ROOMS = [];
// Promise.all([
//     fetch('rooms/room1.txt').then(x => x.text()),
//     fetch('rooms/room2.txt').then(x => x.text()),
//     fetch('rooms/room3.txt').then(x => x.text()),
//     fetch('rooms/room4.txt').then(x => x.text()),
//     fetch('rooms/room5.txt').then(x => x.text()),
// ]).then(([r1, r2, r3, r4, r5]) => {
//     ROOMS.push(r1);
//     ROOMS.push(r2);
//     ROOMS.push(r3);
//     ROOMS.push(r4);
//     ROOMS.push(r5);
// });
// console.log(ROOMS);
// let thing = ROOMS[0];
// console.log(thing);
// for (var i = 0; i < ROOMS.length; i++) {
//     let toBeAdded = ROOMS[i];
//     console.log(toBeAdded);
//     // alert(toBeAdded);
//     let tempArr = toBeAdded.split("\n");
//     let newRoom = [0, 0, tempArr[0].length, tempArr.length, []]
//     rooms.push(newRoom);
// }

let turnCount = 1;
let screen
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
