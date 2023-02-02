
function drawImageCenter(nam, x,y){
    ctx.drawImage(document.getElementById(nam),x-grid.gridSize/2,y-grid.gridSize/2,grid.gridSize,grid.gridSize);
}
function drawImageCorner(nam, x,y){
    ctx.drawImage(document.getElementById(nam),x,y,grid.gridSize,grid.gridSize);

}
class Grid {
    constructor(width, height) {
        //set up properties
        this.width = width;
        this.height = height;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.gridSize = Math.min(canvas.width/20,canvas.height/20);
        this.gridSpace = Math.min(canvas.width/200,canvas.height/200);
        this.blocked = new Array(width);
      
        for (var i = 0; i < this.width; i++) {
            this.blocked[i] = new Array(this.height);
            for (var j = 0; j < this.height; j++) {
                this.blocked[i][j]=0;
            } 
        }
        this.centerImage = new Image();
        this.rightEdge = new Image();
        this.leftEdge = new Image();
        this.bottomEdge = new Image();
        this.topEdge = new Image();
        this.bottomLeftCorner = new Image();
        this.bottomRightCorner = new Image();
        this.topRightCorner = new Image();
        this.topLeftCorner = new Image();
        this.centerImage.src = "images/tileCenter.jpg";
        this.rightEdge.src = "images/rightEdge.jpg";
        this.leftEdge.src = "images/leftEdge.jpg";
        this.bottomEdge.src = "images/bottomEdge.jpg";
        this.topEdge.src = "images/topEdge.jpg";
        this.bottomLeftCorner.src = "images/bottomLeftCorner.jpg";
        this.bottomRightCorner.src = "images/bottomRightCorner.jpg";
        this.topRightCorner.src = "images/topRightCorner.jpg";
        this.topLeftCorner.src = "images/topLeftCorner.jpg";

    }
    /**
     * Draw the actor on the canvas.
     */
    draw() {
        this.gridSize = Math.min(canvas.width/this.width/1.5,
                                 canvas.height/this.height/1.5);
        this.gridSpace = 0;
        // this.gridSpace = Math.min(canvas.width/this.width/20,
        //                           canvas.height/this.height/20);
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        // Use ctx to draw. A sample (drawing a small circle):
        //console.log("hi");
        
      
        ctx.fillStyle = "#e3c47d";

        for (var i=0;i<this.height;i++){
            for (var j=0;j<this.width;j++){
                // detect four side surround, then three, then two, the one, then it's blank
                if (i == 0 && j == 0) {
                    var toBeDrawn = this.topLeftCorner;
                } else if (i == 0 && j == this.width - 1) {
                    var toBeDrawn = this.topRightCorner;
                } else if (i == 0) {
                    var toBeDrawn = this.topEdge;
                } else if (i == this.height - 1) {
                    var toBeDrawn = this.bottomEdge;
                } else if (j == 0) {
                    var toBeDrawn = this.leftEdge;
                } else if (j == this.width - 1) {
                    var toBeDrawn = this.rightEdge;
                } else {
                    var toBeDrawn = this.centerImage;
                }
                
                // ctx.fillRect(this.x - this.gridSize*(this.width/2.0 - j)
                // - this.gridSpace*(this.width/2.0 - j +.5),
                // this.y - this.gridSize*(this.height/2.0 - i) 
                // - this.gridSpace*(this.height/2.0 - i +.5)
                // ,this.gridSize,this.gridSize);
                // console.log(this.centerImage);
                ctx.drawImage(toBeDrawn, this.x - this.gridSize*(this.width/2.0 - j)
                - this.gridSpace*(this.width/2.0 - j +.5),
                this.y - this.gridSize*(this.height/2.0 - i) 
                - this.gridSpace*(this.height/2.0 - i +.5)
                ,this.gridSize,this.gridSize);
                // ctx.drawImage(this.centerImage, this.actX - grid.gridSize / 2, this.actY - grid.gridSize / 2, grid.gridSize, grid.gridSize);
            }
        }
    }
    /**
     * Update this actor for the next frame.
     */
   
    update() {
        this.width = GRID_WIDTH;
        this.height = GRID_HEIGHT
        this.blocked = new Array(this.width);
      
        for (var i = 0; i < this.width; i++) {
            this.blocked[i] = new Array(this.height);
            for (var j = 0; j < this.height; j++) {
                this.blocked[i][j]=0;
            } 
        }
        
    }

}





class Actor {

    setX(n){
        let x = canvas.width/2;
        let gridSize = grid.gridSize;
        let gridSpace = grid.gridSpace;
        return x - gridSize * (GRID_WIDTH/2 - n) + (gridSize/2) - gridSpace * (GRID_WIDTH/2 - n +.5);
    }
    setY(n){
        let y = canvas.height/2;
        let gridSize = grid.gridSize;
        let gridSpace = grid.gridSpace;
        return y - gridSize * (GRID_HEIGHT/2 - n) + (gridSize/2) - gridSpace * (GRID_HEIGHT/2 - n +.5);
    }
    constructor(x, y) {
        //set up properties
        this.x = x;
        this.y = y;
        this.actX = this.setX(x);
        this.actY = this.setY(y); 
    }
    /**
     * Draw the actor on the canvas.
     */
    draw() {
        // Use ctx to draw. A sample (drawing a small circle):
    }
    /**
     * Update this actor for the next frame.
     */
    update() {
        // Update properties or other Actors in the actorList.
    }

    move() {

    }
    playerUpdate(){
        
    }
}

class Player extends Actor{
    constructor(x, y) {
        super(x, y);
        this.iFrames = 0;
        this.iTime = 60;
        this.color = "#1451e0";
        this.iColor = "#587acc";
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.r = grid.gridSize/3;
        this.image = new Image();
        this.image.src = "images/penny.jpg";
    }

    draw() {
        //ctx.fillStyle = "blue";
         
            ctx.fillStyle = this.color;
           
            ctx.beginPath();
            //console.log(this.actX,  this.actY, this.r , 0, Math.PI * 2);
            ctx.arc(this.actX,  this.actY, this.r, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            //console.log(typeof(this.image));
            ctx.drawImage(this.image, this.actX - grid.gridSize / 2, this.actY - grid.gridSize / 2, grid.gridSize, grid.gridSize);
        
        //console.log(this.x,this.y)
    }
    update() {
        this.actX = this.setX(this.x);
        this.actY = this.setY(this.y);
        this.r = grid.gridSize/3;
    }
    playerUpdate(){
        
        grid.update()
        grid.blocked[this.x][this.y]=2;
  
        for (const actor of actorList.actors) {
            actor.update();

        }
        for (const actor of enemyList.actors) {
        actor.update();
        
        }
        for (const enemy of enemyList.actors){ enemy.playerUpdate();}
        
    }
    move(dx,dy){
        
        var newx = dx + this.x;
        var newy = dy + this.y;
        if (newx<0 || newx>=GRID_WIDTH || newy<0 || newy>=GRID_HEIGHT){
            return;
        }
        if (grid.blocked[newx][newy]==1){
            return;
        }
        this.x = newx;
        this.y = newy;
        this.playerUpdate()
    }
}

class Wall extends Actor{
    constructor(x, y) {
        super(x,y)
        this.iFrames = 0;
        this.iTime = 60;
        this.color = "#1451e0";
        this.r = grid.gridSize/3;
        this.image = new Image();
        this.image.src = "images/wall.jpg";
    }

    draw() {
        //ctx.fillStyle = "blue";
         
            ctx.fillStyle = this.color;
           
            ctx.beginPath();
            //console.log(this.actX,  this.actY, this.r , 0, Math.PI * 2);
            ctx.arc(this.actX,  this.actY, this.r , 0, Math.PI * 2);
            //ctx.fillRect(this.actX-.5*grid.gridSize,this.actY-.5*grid.gridSize,grid.gridSize,grid.gridSize)
            ctx.closePath();
            ctx.fill();
            ctx.drawImage(this.image, this.actX - grid.gridSize / 2, this.actY - grid.gridSize / 2, grid.gridSize, grid.gridSize);
        
        //console.log(this.x,this.y)
    }
    update() {
        this.actX =this.setX(this.x);
        this.actY =this.setY(this.y);
        this.r = grid.gridSize/3;
        grid.blocked[this.x][this.y]=1;
        
    }
    playerUpdate(){
        
    }
 
}
class Voyd extends Wall{
    constructor(x, y) {
        super(x,y)
        //this.dir = dir
        console.log('hi');
    }
    draw(){
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(this.actX-.5*grid.gridSize,this.actY-.5*grid.gridSize,grid.gridSize,grid.gridSize);
    }
}
class WalkingWall extends Wall{
    constructor(x, y,dir=0) {
        super(x,y)
        this.dir = dir
    }
    
getMoves() {
    let validMoves = []; // const means const reference not a const array
    let possibleMoves = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ];
    for (const move of possibleMoves) {
        let isValid = true;
        let newX = move[0] + this.x;
        let newY = move[1] + this.y;
        if (newX < 0 || newX >= GRID_WIDTH) {isValid = false;}
        else if (newY < 0 || newY >= GRID_HEIGHT) {isValid = false;}
        
        else if (grid.blocked[newX][newY]==1){
            isValid =false;
        }
        if (isValid) {validMoves.push([newX, newY])}
    }
    return validMoves;
}
    playerUpdate(){
            let dirs = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
        ];
        var newx =dirs[this.dir][0]+this.x
        var newy =dirs[this.dir][1]+this.y
        console.log(newx,newy)
        if (newx>=0&&newx<GRID_WIDTH&&newy>=0&&newy<GRID_HEIGHT&&grid.blocked[newx][newy]==0){
            this.x=newx
            this.y =newy

        }
        else{
            this.dir++;
            this.dir%=4;
        }
        this.update()
        
    }
}
class Enemy extends Actor {
    constructor(x, y) {
        super(x, y);
    }

    A_star(start, goal, h) {
        const openSet = [];
        const cameFrom = [];

        while (openSet) {

        }
    }
    playerUpdate(){
        
    }
    update() {
        this.actX =this.setX(this.x);
        this.actY =this.setY(this.y);
       
        
    }
}

class Goal extends Actor {
    constructor(x=Math.floor(Math.random() * GRID_WIDTH), y=Math.floor(Math.random()*  GRID_WIDTH), changeRoom=0) {
        super(x, y);
        this.color = "#888888";
        console.log(x, y);
        this.changeRoom = changeRoom;
    }

    draw() {
        //ctx.fillStyle = "blue";
        ctx.fillStyle = this.color;
       
        ctx.beginPath();
        //console.log(this.actX,  this.actY, this.r , 0, Math.PI * 2);
        ctx.arc(this.actX,  this.actY, this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        //console.log(this.x,this.y)
    }

    update() {
        this.actX = this.setX(this.x);
        this.actY = this.setY(this.y);
        this.r = grid.gridSize/3;
        if (player.x == this.x && player.y == this.y) {
            loadRoom(this.changeRoom);
        }
    }
}

class WalkingEnemy extends Enemy {
    constructor(x=Math.floor(Math.random() * GRID_WIDTH), y=Math.floor(Math.random()*  GRID_WIDTH),dir=0){
        super(x,y);
        this.color = "#a461c0";
        this.r = grid.gridSize/3;
        this.image = new Image();
        this.image.src = "images/chicken.jpg";
        this.dir = dir;
    }

    draw() {
        //ctx.fillStyle = "blue";
         
        ctx.drawImage(this.image, this.actX - grid.gridSize / 2, this.actY - grid.gridSize / 2, grid.gridSize, grid.gridSize);
        
        
    }
        
    update(){
        super.update()
        grid.blocked[this.x][this.y]=1;
    }
    getMoves() {
        let validMoves = []; // const means const reference not a const array
        let possibleMoves = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1]
        ];
        for (const move of possibleMoves) {
            let isValid = true;
            let newX = move[0] + this.x;
            let newY = move[1] + this.y;
            if (newX < 0 || newX >= GRID_WIDTH) {isValid = false;}
            else if (newY < 0 || newY >= GRID_HEIGHT) {isValid = false;}
            
            else if (grid.blocked[newX][newY]==1){
                isValid =false;
            }
            if (isValid) {validMoves.push([newX, newY])}
        }
        return validMoves;
    }
        playerUpdate(){
                let dirs = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1]
            ];
            var newx =dirs[this.dir][0]+this.x
            var newy =dirs[this.dir][1]+this.y
            console.log(newx,newy)
            if (newx>=0&&newx<GRID_WIDTH&&newy>=0&&newy<GRID_HEIGHT&&grid.blocked[newx][newy]!=1){
                if (newx==player.x&&newy==player.y){
                    alert("DEATh")
                }
                this.x=newx
                this.y =newy
                
    
            }
            else{
                this.dir++;
                this.dir%=4;
            }
            this.update()
            
        }
    }
//  // start and goal will be in format of (x,y)
//  A_star(start, goal) {
//     // things in open list will be in format f, g, h, x, y
//     console.log("hi:",start);
//     console.log("hi:",goal);
//     this.curPath = []
//     var openList   = [];
//     var parent = {start:null}
//     var costTo = {start:0}
//     var x = start[0]
//     var y = start[1]
//     var g = 0
//     var visited = new Array(GRID_WIDTH);
  
//     for (var i = 0; i < GRID_WIDTH; i++) {
//         visited[i] = new Array(GRID_HEIGHT);
//         visited[i].fill(0);
//     }
//     var h = Math.abs(goal[0]-x)+Math.abs(goal[1]-y);
//     let dirs = [
//         [1, 0],
//         [0, 1],
//         [-1, 0],
//         [0, -1]
//     ];
//     openList.push([g+h,g,h,x,y]);
//     //console.log([g+h,g,h,x,y]);
//     var count = 1;
//     while(openList.length > 0) {
//         //console.log(count,"uewfoj");
//         openList.sort(function(x,y){return x[0]-y[0]});
        
//         var cur = openList.shift();
//         // console.log(cur)
//         visited[cur[3]][cur[4]] = 1;
//         var isGood = 0;
//         for (var i =0;i<4;i++){
//             x = cur[3]+dirs[i][0];
//             y = cur[4]+dirs[i][1];
//             if ([x,y]==[goal[0],goal[1]]){
//                 parent[[x,y]] = [cur[3],cur[4]];
//                 console.log([cur[3],cur[4]]);
//                 isGood=1;
//                 break;
//             }
//             if (x<0||y<0||x>=GRID_WIDTH||y>=GRID_HEIGHT){
//                 continue;
//             }
//             //console.log(x,y);
//            // console.log(grid.blocked[x][y])
//             if (grid.blocked[x][y]!=1 && (visited[x][y]==0||cur[1]+1<costTo[[x,y]])){
                
               
//                 costTo[[x,y]]=cur[1]+1;
//                 g = cur[1]+1;
//                 h = Math.abs(goal[0]-x)+Math.abs(goal[1]-y);
//                 openList.push([g+h,g,h,x,y]);
//                 parent[[x,y]] = [cur[3],cur[4]];
                
//             }
//         }
//         if (isGood==1){
//             break;
//         }
       
//     }
//     let spot = [goal[0],goal[1]];
//     let retPath = [];
//     while (spot[0]!=start[0]||spot[1]!=start[1]){
//         console.log(retPath);
//         var par = parent[spot];
//         retPath.unshift([spot[0]-par[0],spot[1]-par[1]]);
//         this.curPath.unshift([spot[0]-par[0],spot[1]-par[1]]);
//         spot = par;
        
//     }
//     // No result was found -- empty array signifies failure to find path
//     console.log(retPath);
    
//     return retPath;
// }

// getMoves() {
//     let validMoves = []; // const means const reference not a const array
//     let possibleMoves = [
//         [1, 0],
//         [0, 1],
//         [-1, 0],
//         [0, -1]
//     ];
//     for (const move of possibleMoves) {
//         let isValid = true;
//         let newX = move[0] + this.x;
//         let newY = move[1] + this.y;
//         if (newX < 0 || newX >= GRID_WIDTH) {isValid = false;}
//         if (newY < 0 || newY >= GRID_HEIGHT) {isValid = false;}
//         if (isValid) {validMoves.push([newX, newY])}
//     }
//     return validMoves;
// }

// // Gets path to nearest goal node for 3 turns.
// getPath(turns) {
    
// }