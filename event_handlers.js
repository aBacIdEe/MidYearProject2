const upKey = "w";
const leftKey = "a";
const downKey = "s";
const rightKey = "d";
let curRoom = 0;
let aboutToChange  =-1
var audio = new Audio("music/1.mp3");
audio.volume = 0.3;
audio.muted = true;
var songNum = 1;
var isStarting = 0;
var shiftX = 0;
var shiftY = 0;
var size = 0;
// [x,y,]
const rooms = [
    
    // ROOM 1
    [2,5,25,15,
        [
        [-1,-1,-1],
        [10,1,0],
        [10,2,0],
        [10,3,0],
        [10,4,0],
        [10,5,0],
        [10,6,0],
        [10,8,0],
        [10,9,0],
        [10,10,0],
        [10,11,0],
        [10,12,0],
        [10,13,0],
        [9,6,0],
        [8,6,0],
        [8,8,0],
        [9,8,0],
        [10,8,0],

        [15,4,0], [16,4,0],[17,4,0],[18,4,0],[19,4,0],
        [15,5,0],
        [15,6,0],
        [15,8,0],
        [15,7,0],
        [15,9,0],
        [15,10,0], [16,10,0],[17,10,0],[18,10,0],[19,10,0],

        [10,8,0],
    
        [20,7,1,1],
        
        // [20,7,2],
        // [13,13,2],
    
    // corner walls for turning
        [11,1,0],[11,2,0],[12,1,0],
        [23,1,0],[23,2,0],[22,1,0],
        [11,13,0],[11,12,0],[12,13,0],
        [23,13,0],[23,12,0],[22,13,0],
      //  [23,7,0], [13,7,0],
      [13,2,2], [13,12,2.2], [22,7,2.1],[12,7,2.3], [21,2,2], [21,12,2.2],

    ]
    ], 

    // ROOM 2
    [1, 5, 19, 11,
        [
            [-1,-1,-1],
        [3, 1, 0], 
        [4, 1, 0],
        [5, 1, 0],
        [6, 1, 0],
        [7, 1, 0],
        [8, 1, 0],
        [9, 1, 0],
        [10, 1, 0],
        [11, 1, 0],
        [12, 1, 0],
        [13, 1, 0],
        [14, 1, 0],
        [15, 1, 0],
        [16, 1, 0],
        [17, 1, 0],

        [3, 2, 0], 
        [4, 2, 0],
        [5, 2, 0],
        //[6, 2, 0],
        //[7, 2, 0],
        //[8, 2, 0],
        //[9, 2, 0],
        [10, 2, 0],
        [11, 2, 0],
        //[12, 2, 0],
        //[13, 2, 0],
        //[14, 2, 0],
        //[15, 2, 0],
        [16, 2, 0],
        [17, 2, 0],

        [3, 3, 0], 
        [4, 3, 0],
        [5, 3, 0],
        //[6, 3, 0],
        [7, 3, 0],
        [8, 3, 0],
        //[9, 3, 0],
        [10, 3, 0],
        [11, 3, 0],
        //[12, 3, 0],
        [13, 3, 0],
        [14, 3, 0],
        //[15, 3, 0],
        [16, 3, 0],
        [17, 3, 0],

        [3, 4, 0], 
        [4, 4, 0],
        [5, 4, 0],
        //[6, 4, 0],
        [7, 4, 0],
        [8, 4, 0],
        //[9, 4, 0],
        [10, 4, 0],
        [11, 4, 0],
        //[12, 4, 0],
        [13, 4, 0],
        [14, 4, 0],
        //[15, 4, 0],
        [16, 4, 0],
        [17, 4, 0],

        [3, 5, 0],
        [4, 5, 0],
        
        [3, 6, 0], 
        [4, 6, 0],
        [5, 6, 0],
        //[6, 6, 0],
        [7, 6, 0],
        [8, 6, 0],
        //[9, 6, 0],
        [10, 6, 0],
        [11, 6, 0],
        //[12, 6, 0],
        [13, 6, 0],
        [14, 6, 0],
        //[15, 6, 0],
        [16, 6, 0],
        [17, 6, 0],

        [3, 7, 0], 
        [4, 7, 0],
        [5, 7, 0],
        //[6, 7, 0],
        [7, 7, 0],
        [8, 7, 0],
        //[9, 7, 0],
        [10, 7, 0],
        [11, 7, 0],
        //[12, 7, 0],
        [13, 7, 0],
        [14, 7, 0],
        //[15, 7, 0],
        [16, 7, 0],
        [17, 7, 0],

        //[3, 8, 0], 
        //[4, 8, 0],
        //[5, 8, 0],
        //[6, 8, 0],
        [7, 8, 0],
        [8, 8, 0],
        //[9, 8, 0],
        //[10, 8, 0],
        //[11, 8, 0],
        //[12, 8, 0],
        [13, 8, 0],
        [14, 8, 0],
        //[15, 8, 0],
        //[16, 8, 0],
        //[17, 8, 0],

        [3, 9, 0], 
        [4, 9, 0],
        [5, 9, 0],
        [6, 9, 0],
        [7, 9, 0],
        [8, 9, 0],
        [9, 9, 0],
        [10, 9, 0],
        [11, 9, 0],
        [12, 9, 0],
        [13, 9, 0],
        [14, 9, 0],
        [15, 9, 0],
        [16, 9, 0],
        [17, 9, 0],
        [17, 5, 3.2],
        [16, 5, 2.2],
        [17, 8, 1, 2]
        
    ]


    ], 

    // ROOM 3
    [1, 4, 16, 13,
        [
            [-1,-1,-1],

        [4,1,0],
        [4,11,0],

        [14,1,0],
        [14,11,0],

        // enemies

        [7,4,3.1],
        [11,4,3.2],
        [7,8,3.0],
        [11,8,3.3],

        [5,11,2.3],
        //[14,10,2.1],

        // goal
        [9,6,1,0]]
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
    audio.muted = false;
    audio.play();
    loadRoom(0);
}
window.addEventListener("click", function (event) {
    //Handle click events
    //Get position of click on canvas: event.offsetX, event.offsetY
    if (!playing) {
        // shiftX = Math.min((window.innerWidth - 20)/3,(window.innerHeight - 20)/3);
         shiftY = shiftX;
         size = Math.min((window.innerWidth - 20)/3,(window.innerHeight - 20)/3);
        if (event.offsetX > shiftX && event.offsetX < shiftX + 3 * size / 3 && event.offsetY > shiftY && event.offsetY < shiftY + 3 * size / 3) {
            console.log('hi');
            
            isStarting = 1;
        }
        
        }
       
});

function createEnemy(x,y,type){
    if (type==-1){
        for (var i=0;i<GRID_WIDTH;i++){
            for (var j=0;j<GRID_HEIGHT;j++){
                if (j==0||i==0||j==GRID_HEIGHT-1||i==GRID_WIDTH-1){
                    voyd = new Voyd(i,j);
                    enemyList.addActor(voyd)
                }
            }
        }
    }
    if (type==0){
        wall = new Wall(x,y);
        grid.blocked[x][y]=1;

        enemyList.addActor(wall)
    }
    if (type==0.5){
        wall = new WalkingWall(x,y);
        enemyList.addActor(wall)
    }
    if (type==1){
        goal = new Goal(x,y);
        enemyList.addActor(goal)
    }
    if (type>=2 && type<3){
        chicken = new WalkingEnemy(x,y,Math.round((type-2)*10));
        enemyList.addActor(chicken)
    }
    if (type>=3 && type<4) {
        //laser = new LaserWall(x,y);
        laser = new LaserWall(x,y,Math.round((type-3)*10));
       // console.log('hi')
        enemyList.addActor(laser);
    }
    
}

function loadRoom(room) {
    
    curRoom = room;
    player.x = rooms[room][0];
    player.y = rooms[room][1];
    player.isDead = 0;
    GRID_WIDTH = rooms[room][2];
    GRID_HEIGHT = rooms[room][3];
    actorList.removeAllActors();
    enemyList.removeAllActors();
    grid.onRoomLoad();
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
    if (event.key === "r") {
        loadRoom(curRoom);
    }
    if (event.key === "p") {
        player.move(0,0);
    }
    if (event.key === ".") {
        audio.volume += 0.01;
    }
    if (event.key === ",") {
        audio.volume -= 0.01;
    }
    if (event.key === "/") {
        songNum += 1
        if (songNum == 2) {
            songNum = 1
        }
        audio.src = "music/" + songNum + ".mp3";
        audio.play();
    }
    
});
document.addEventListener("keyup", function (event) {
    
});