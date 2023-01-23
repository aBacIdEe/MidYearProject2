const upKey = "w";
const leftKey = "a";
const downKey = "s";
const rightKey = "d";

window.addEventListener("load", function () {
    //Handle when the whole page finishes loading
    //Use this to "set up" the initial state of things;
    //Often, this includes populating the actorList.
    // A sample:
    onStart();
});
function onStart() {
  
}
document.addEventListener("keydown", function (event) {
   
    if (event.key === leftKey || event.key === "ArrowLeft") {
        if (player.x){player.x--;}
    }
    if (event.key === rightKey || event.key === "ArrowRight") {
        if (player.x<GRID_WIDTH-1){player.x++;}
    }
    if (event.key === upKey || event.key === "ArrowUp") {
        if (player.y){player.y--;}
    }
    if (event.key === downKey || event.key === "ArrowDown") {
        if (player.y<GRID_HEIGHT-1){player.y++;}
    }
});
document.addEventListener("keyup", function (event) {
    
});