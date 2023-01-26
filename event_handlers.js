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
        actorList.addActor(new Wall(2,0));
        actorList.addActor(new Wall(3,5));
        actorList.addActor(new Wall(4,2));
        actorList.addActor(new Wall(2,4));
        actorList.addActor(new Wall(5,2));
        actorList.addActor(new Wall(5,5));
        actorList.addActor(new Wall(6,5));
        actorList.addActor(new Wall(3,2));
        actorList.addActor(new Wall(3,1));
        actorList.addActor(new Wall(4,5));
        actorList.addActor(new Wall(0,6));
        actorList.addActor(new Wall(1,6));
       
        actorList.addActor(new Wall(7,6));
        let enemy = new WalkingEnemy(3,4);
        actorList.addActor(enemy);
        enemyList.addActor(enemy)
        enemy = new WalkingEnemy(7,0);
        actorList.addActor(enemy);
        enemyList.addActor(enemy)
        enemy = new WalkingEnemy(7,5);
        actorList.addActor(enemy);
        enemyList.addActor(enemy)
        actorList.addActor(new Goal(0,7));
       
    }
    if (event.key === "q") {
        let enemy = new WalkingEnemy();
        actorList.addActor(enemy);
        enemyList.addActor(enemy)
    
    }
    if (event.key === "j") {
        gameUpdateNonPlayers();
    }
    if (event.key === "m") {
        for (var enemy of enemyList.actors) {
        
            enemy.A_star([enemy.x,enemy.y],[0,7]);
            
        };
        
    }
    if (event.key === "g") {
        let goal = new Goal();
        actorList.addActor(goal);
    }
    
});
document.addEventListener("keyup", function (event) {
    
});