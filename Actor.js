class Actor {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // go places! or something
    move() {

    }

    getLocation() {
        return (x, y);
    }

    draw() {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.rect(20, 20, 150, 100);
        ctx.stroke();
    }

}