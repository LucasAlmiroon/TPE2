class Jugador {


    constructor(name, colorF,turno,ganador,sety,setx){
        this.name = name;
        this.colorF = colorF;
        this.turno = turno;
        this.ganador = ganador;
        this.fichas = new Array();
        this.sety = sety;
        this.setx = setx;

    }
    
    generarFichas(ctx,maxfichas){
        let sety = this.sety;
        let setx = this.setx;
        let fichas = this.fichas;
        let image = new Image();

        image.src = "./sites/img/"+ this.colorF + ".png";
        image.onload = function(){
            
            for(let i = 0; i < maxfichas; i ++){
                let ficha = new Ficha(((Math.random()*100)+setx),((Math.random()*400)+sety),ctx,32,image);
                fichas.push(ficha);
            }
        }
    }
    

    setTurno(){
        if(this.turno){
            this.turno = false;
        }else{
            this.turno = true;
        }
    }
}