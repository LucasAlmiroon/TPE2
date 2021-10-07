class Ficha{

    constructor(posX,posY,ctx,radius,image){
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.radius = radius;
        this.image = image;
    }

    // Setea la posicion donde se va a dibujar la ficha.
    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    //La dibuja.
    draw(){
        
        this.ctx.beginPath();
        this.ctx.arc(this.posX,this.posY,this.radius, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.drawImage(this.image,this.posX-this.radius,this.posY-this.radius);
        this.ctx.closePath();
    }
    
    //Verifica que este dentro del canvas.
    isPointInside(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x*_x + _y*_y) < this.radius;
    }
}