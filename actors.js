
class Grid {
    constructor(width, height) {
        //set up properties
        this.width = width;
        this.height = height;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.gridSize = Math.min(canvas.width/20,canvas.height/20);
        this.gridSpace = Math.min(canvas.width/200,canvas.height/200);
    }
    /**
     * Draw the actor on the canvas.
     */
    draw() {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.gridSize = Math.min(canvas.width/15,canvas.height/15);
        this.gridSpace = Math.min(canvas.width/100,canvas.height/100);
        // Use ctx to draw. A sample (drawing a small circle):
        //console.log("hi");
        
      
        ctx.fillStyle = "#e3c47d";

        for (var i=0;i<this.height;i++){
            for (var j=0;j<this.width;j++){
                
                ctx.fillRect(this.x - this.gridSize*(this.width/2.0 - j) - this.gridSpace*(this.width/2.0 - j +.5),this.y - this.gridSize*(this.height/2.0 - i) - this.gridSpace*(this.height/2.0 - i +.5),this.gridSize,this.gridSize);
            }
        }
    }
    /**
     * Update this actor for the next frame.
     */
    update() {
        // Update properties or other Actors in the actorList.
    }
}





class Actor {
    constructor(x, y) {
        //set up properties
        this.x = x;
        this.y = y;
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