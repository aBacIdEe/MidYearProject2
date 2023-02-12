
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
        this.AA = new Image(); // blank
        this.AA.src = "images/AA.png";
        // this.debug = new Image();
        // this.debug.src = "images/debug.jpg";
        this.border = new Image();
        this.border.src = "images/border.jpg";
    }
    drawBorders() {

        for (var i = 0; i < this.width; i++){
            for (var j = 0 ; j < this.height; j++){
                if (grid.blocked[i][j] == 1) {
                    ctx.translate(this.x, this.y);
                ctx.drawImage(this.border, this.gridSize * (-this.width  / 2.0 + i) - 0.1 * this.gridSize, 
                                          -this.gridSize * (this.height / 2.0 - j) - 0.1 * this.gridSize,
                                           this.gridSize * 1.2, this.gridSize * 1.2);
                ctx.translate(-this.x, -this.y);
                }
            }
        }
    }

    /**
     * Draw the grid on the canvas.
     */
    draw() {
        this.gridSize = Math.min(canvas.width/this.width/1.5,
                                 canvas.height/this.height/1.5);
        this.gridSpace = 0;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        
        ctx.fillStyle = "#e3c47d";
        // i is x axis; j is y axis,  bot left is 1,1
        for (var i=1;i<this.width - 1;i++){
            for (var j=1;j<this.height - 1;j++){
                
                let toBeDrawn = this.AA;
                ctx.translate(this.x, this.y);
                ctx.drawImage(toBeDrawn, this.gridSize*(-this.width/2.0 + i), 
                                         this.gridSize*(this.height/2.0 - j - 1),
                                         this.gridSize,this.gridSize);
                ctx.translate(-this.x, -this.y);
                if (j == 2 && i == 1) {
                }
            }
        }
    }
    /**
     * Update this actor for the next frame.
     */
    onRoomLoad(){
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
    update() {
  
      
        for (var i = 0; i < this.width; i++) {
           
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
        this.isDead = 0;
    }

    draw() {
        if (this.isDead==0){
        ctx.drawImage(this.image, 
                        this.actX - grid.gridSize / 2 + grid.gridSize * 0.1, 
                        this.actY - grid.gridSize / 2 + grid.gridSize * 0.1, 
                        grid.gridSize * 0.8, grid.gridSize * 0.8);
        }
    }
    update() {
        this.actX = this.setX(this.x);
        this.actY = this.setY(this.y);
        this.r = grid.gridSize/3;
    }
    playerUpdate(){
        aboutToPlayerUpdate=1;
       
    }

    die(){
        this.isDead = 1;
    }

    move(dx,dy){
        if (player.isDead==0){
        var newx = dx + this.x;
        var newy = dy + this.y;
        if (newx<0 || newx>=GRID_WIDTH || newy<0 || newy>=GRID_HEIGHT){
            return;
        }
        if (grid.blocked[newx][newy]>0){
            return;
        }
        this.x = newx;
        this.y = newy;
    }
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
        this.image.src = "images/wall.png";
    }

    draw() {
        ctx.drawImage(this.image, this.actX - grid.gridSize / 2, this.actY - grid.gridSize / 2, grid.gridSize, grid.gridSize);
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
        super(x,y);
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
        
        else if (grid.blocked[newX][newY]>=1){
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
class LaserWall extends Wall{
    constructor(x, y, dir=0) {
        super(x, y);
        this.dir = dir;
        this.image.src = "images/laserSource.jpg";
        this.dist = 0;
        this.expImage = new Image();
        this.explosionStatus = 0;
        this.active = 0;
    }
   
    checkDist(){
        let dirs = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1]
            ];
        this.dist = 0;
        while(grid.blocked[this.x + (this.dist + 1) * dirs[this.dir][0]][this.y + (this.dist + 1) * dirs[this.dir][1]] == 0 
           || grid.blocked[this.x + (this.dist + 1) * dirs[this.dir][0]][this.y + (this.dist + 1) * dirs[this.dir][1]] == 2){
            this.dist++;
        }
    }

    draw() {
        super.draw();
        if (this.active==1){
            this.checkDist();
        }
            let dirs = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1]
            ];
        this.expImage.src = "images/anima/explo/" + this.explosionStatus + ".jpg";
        for (let i=1;i<=this.dist;i++){
            ctx.drawImage(this.expImage, this.setX(this.x+i*dirs[this.dir][0])- grid.gridSize / 2, this.setY(this.y+i*dirs[this.dir][1])- grid.gridSize / 2, grid.gridSize, grid.gridSize);
            if (player.x == this.x+i*dirs[this.dir][0]&& player.y==this.y+i*dirs[this.dir][1]){
                player.die();
            }
        }
        this.explode()
    }

    explode() {
        this.explosionStatus++;
        if (this.explosionStatus == 7) {
            this.explosionStatus = 0;
        }
    }

    playerUpdate(){
        this.active = 1;
        
            let dirs = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
        ];

        for (const enemy of enemyList.actors) {
            if (enemy instanceof Enemy) {
                enemy.update();
            }
        }
  
        for (let i=1;i<=this.dist;i++){
            if (player.x == this.x+i*dirs[this.dir][0]&& player.y==this.y+i*dirs[this.dir][1]){
                player.die();
            }    
        }
    }
       
    
}
class Enemy extends Actor {
    constructor(x, y) {
        super(x, y);
        this.attackState = 0;
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
        this.changeRoom = changeRoom;
        this.image = new Image();
        this.image.src = "images/goal.jpg";
    }

    draw() {
        //ctx.drawImage(this.image, this.actX - grid.gridSize / 2, this.actY - grid.gridSize / 2, grid.gridSize, grid.gridSize);
        ctx.drawImage(this.image, 
            this.actX - grid.gridSize / 2 + grid.gridSize * 0.1, 
            this.actY - grid.gridSize / 2 + grid.gridSize * 0.1, 
            grid.gridSize * 0.8, grid.gridSize * 0.8);
    }

    update() {
        this.actX = this.setX(this.x);
        this.actY = this.setY(this.y);
        this.r = grid.gridSize/3;
        if (player.x == this.x && player.y == this.y) {
            aboutToChange = this.changeRoom;
            for (var enemy of enemyList.actors){
                if (enemy instanceof LaserWall){
                    enemy.active = 0;
                }
            }
            console.log('hi232')
            grid.update()
            console.log('hi232')
        }
    }
}
class WalkingEnemy extends Enemy {
    constructor(x=Math.floor(Math.random() * GRID_WIDTH), y=Math.floor(Math.random()*  GRID_WIDTH),dir=0){
        super(x,y);
        this.color = "#a461c0";
        this.r = grid.gridSize/3;
        this.image = new Image();
        this.image.src = "images/enemyS1.jpg";
        this.dir = dir;
        this.explosionStatus = 0;
        
    }

    draw() {
        //ctx.fillStyle = "blue";
         
        //ctx.drawImage(this.image, this.actX - grid.gridSize / 2, this.actY - grid.gridSize / 2, grid.gridSize, grid.gridSize);
        ctx.drawImage(this.image, 
            this.actX - grid.gridSize / 2 + grid.gridSize * 0.1, 
            this.actY - grid.gridSize / 2 + grid.gridSize * 0.1, 
            grid.gridSize * 0.8, grid.gridSize * 0.8);
        if (this.attackState==3&&player.isDead){
            this.explode();
            for (var i=-1;i<2;i++){
                for (var j=-1;j<2;j++){
                    if (grid.blocked[this.x+i][this.y+j]==0 || grid.blocked[this.x+i][this.y+j]==2){
                        ctx.drawImage(this.image, this.setX(this.x+i)- grid.gridSize / 2, this.setY(this.y+j)- grid.gridSize / 2, grid.gridSize, grid.gridSize);
                    }
                }
            }
            this.image.src = "images/anima/explo/" + this.explosionStatus + ".jpg";
            
        }
        
    }
    
    update(){
        super.update()
        grid.blocked[this.x][this.y]=3;
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
            
             if ((newX!=player.x||newY!=player.y)&&grid.blocked[newX][newY]>=1){
                isValid =false;
            }
             if(grid.blocked[newX][newY]==3){
                isValid = false;
            }
            if (isValid) {validMoves.push([newX, newY])}
        }
        return validMoves;
    }
        playerUpdate(){
            if (this.attackState==0){
                let dirs = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1]
            ];
            var newx =dirs[this.dir][0]+this.x
            var newy =dirs[this.dir][1]+this.y
            if (newx>=0&&newx<GRID_WIDTH&&newy>=0&&newy<GRID_HEIGHT&&(grid.blocked[newx][newy]==0)){
                
                this.x=newx
                this.y =newy
                
                if (Math.abs( player.x-this.x)<=1&&Math.abs( player.y-this.y)<=1){
                    this.attackState=1;
                }
            }
           
            else{
                if (Math.abs( player.x-this.x)<=1&&Math.abs( player.y-this.y)<=1){
                    this.attackState=1;
                }
                this.dir++;
                this.dir%=4;
            }
                
            }
            else if (this.attackState==1){
                this.image.src="images/enemyS2.jpg";
                this.attackState=2;
            }
            else if (this.attackState==2){
                this.image.src="images/enemyS3.jpg";
                this.attackState=3;
            }
            else if (this.attackState==3){
                if (Math.abs( player.x-this.x)<=1&&Math.abs( player.y-this.y)<=1){
                    player.die();
                } else {
                    this.attackState=0;
                    this.image.src = "images/enemyS1.jpg";
                }
            }
            
            this.update()
        }

        explode() {
            this.explosionStatus++;
            if (this.explosionStatus == 7) {
                this.explosionStatus = 0;
            }
        }
    }