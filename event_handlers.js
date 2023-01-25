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
        player.move(-1,0); 
    }
    if (event.key === rightKey || event.key === "ArrowRight") {
        player.move(1,0);
    }
    if (event.key === upKey || event.key === "ArrowUp") {
        player.move(0,-1);
    }
    if (event.key === downKey || event.key === "ArrowDown") {
        player.move(0,1);
    }
    if (event.key === "p") {
        actorList.addActor(new Wall(2,3));
    }
    if (event.key === "q") {
        let enemy = new WalkingEnemy();
        actorList.addActor(enemy);
        enemyList.addActor(enemy)
    }
    if (event.key === "j") {
        gameUpdateNonPlayers();
    }
    if (event.key === "g") {
        let goal = new Goal();
        actorList.addActor(goal);
    }
    
});
document.addEventListener("keyup", function (event) {
    
});