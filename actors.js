
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
        }

    }
    /**
     * Draw the actor on the canvas.
     */
    draw() {
        this.gridSize = Math.min(canvas.width/this.width/1.5,
                                 canvas.height/this.height/1.5);
        this.gridSpace = Math.min(canvas.width/this.width/12,
                                  canvas.height/this.height/12);
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        // Use ctx to draw. A sample (drawing a small circle):
        //console.log("hi");
        
      
        ctx.fillStyle = "#e3c47d";

        for (var i=0;i<this.height;i++){
            for (var j=0;j<this.width;j++){
                
                ctx.fillRect(this.x - this.gridSize*(this.width/2.0 - j)
                - this.gridSpace*(this.width/2.0 - j +.5),
                this.y - this.gridSize*(this.height/2.0 - i) 
                - this.gridSpace*(this.height/2.0 - i +.5)
                ,this.gridSize,this.gridSize);
            }
        }
    }
    /**
     * Update this actor for the next frame.
     */
   
    update() {
        for (var i = 0; i < this.width; i++) {
            for (var j=0; i < this.height; j++) {
                this.blocked[i][j] = 0;
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
    }

    draw() {
        //ctx.fillStyle = "blue";
         
            ctx.fillStyle = this.color;
           
            ctx.beginPath();
            //console.log(this.actX,  this.actY, this.r , 0, Math.PI * 2);
            ctx.arc(this.actX,  this.actY, this.r , 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        
        //console.log(this.x,this.y)
    }
    update() {
        
        this.actX =this.setX(this.x);
        this.actY =this.setY(this.y);
        this.r = grid.gridSize/3;
    }
 
}



class Wall extends Actor{
    constructor(x, y) {
        super(x, y);
        this.iFrames = 0;
        this.iTime = 60;
        this.color = "#1451e0";
        this.r = grid.gridSize/3;
        
    }

    draw() {
        //ctx.fillStyle = "blue";
         
            ctx.fillStyle = this.color;
           
            ctx.beginPath();
            //console.log(this.actX,  this.actY, this.r , 0, Math.PI * 2);
            ctx.arc(this.actX,  this.actY, this.r , 0, Math.PI * 2);
            ctx.fillRect(this.actX-.5*grid.gridSize,this.actY-.5*grid.gridSize,grid.gridSize,grid.gridSize)
            ctx.closePath();
            ctx.fill();
        
        //console.log(this.x,this.y)
    }
    update() {
        this.actX =this.setX(this.x);
        this.actY =this.setY(this.y);
        this.r = grid.gridSize/3;
        grid.blocked[this.x][this.y]=1;
        
    }
 
}