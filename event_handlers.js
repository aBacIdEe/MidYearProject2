const upKey = "w";
const leftKey = "a";
const downKey = "s";
const rightKey = "d";

// [x,y,]
const rooms = [
    
    [1,4,7,7,
        [
        [0,0,0],
        [1,1,0],
        [0,2,0],
        [1,3,0],
        [0,4,0],
        [1,5,0],
        [5,5,0],
        [5,4,0],
        [5,3,0],
        [5,2,0],
        [6,4,1,1]]
    ], 
    [1, 4, 8, 8,
        [
        [0,0,0],
        [1,1,0],
        [0,2,0],
        [1,3,0],
        [0,4,0],
        [1,5,0],
        [6,6,1,2]]
    ], 
    [1, 4, 9, 9,
        [
        [0,0,0],
        [1,1,0],
        [0,2,0],
        [1,3,0],
        [0,4,0],
        [1,5,0],
        [6,6,1,0]]
    ]
]

window.addEventListener("load", function () {
    //Handle when the whole page finishes loading
    //Use this to "set up" the initial state of things;
    //Often, this includes populating the actorList.
    // A sample:
    onStart();
});
function onStart() {
   loadRoom(0);
}

function createEnemy(x,y,type){
    console.log(type);
    if (type==0){
        console.log(type,x,y);
        wall = new WalkingWall(x,y);
        enemyList.addActor(wall)
    }
    if (type==1){
        console.log(type,x,y);
        goal = new Goal(x,y);
        enemyList.addActor(goal)
    }
}

function loadRoom(room) {
    
    player.x = rooms[room][0];
    player.y = rooms[room][1];
    GRID_WIDTH = rooms[room][2];
    GRID_HEIGHT = rooms[room][3];
    enemyList.removeAllActors();
    for (const thing of rooms[room][4]){
        if (thing.length === 4) { // it means it's a goal and has a specified destination
            goal = new Goal(thing[0], thing[1], thing[3]);
            enemyList.addActor(goal);
        } else {
            createEnemy(thing[0], thing[1], thing[2])
        }
    }
    
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
        // actorList.addActor(new Wall(2,3));
        // actorList.addActor(new Wall(2,0));
        // actorList.addActor(new Wall(3,5));
        // actorList.addActor(new Wall(4,2));
        // actorList.addActor(new Wall(2,4));
        // actorList.addActor(new Wall(5,2));
        // actorList.addActor(new Wall(5,5));
        // actorList.addActor(new Wall(6,5));
        // actorList.addActor(new Wall(3,2));
        // actorList.addActor(new Wall(3,1));
        // actorList.addActor(new Wall(4,5));
        // actorList.addActor(new Wall(0,6));
        // actorList.addActor(new Wall(1,6));
       
        // actorList.addActor(new Wall(7,6));
        // let enemy = new WalkingEnemy(3,4);
        // actorList.addActor(enemy);
        // enemyList.addActor(enemy)
        // enemy = new WalkingEnemy(7,0);
        // actorList.addActor(enemy);
        // enemyList.addActor(enemy)
        // enemy = new WalkingEnemy(7,5);
        // actorList.addActor(enemy);
        // enemyList.addActor(enemy)
        // actorList.addActor(new Goal(0,7));
       
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