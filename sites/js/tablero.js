class Tablero{

    constructor (posX,posY,canvas,ctx,matriz,imageT,imageB){
        this.posX = posX;
        this.posY = posY;
        this.canvas = canvas;
        this.ctx = ctx;
        this.matriz = matriz;
        this.imageT = imageT;
        this.imageB = imageB;
    }

    draw(){
        this.ctx.drawImage(this.imageT,this.posX,this.posY);
    }

    drawBack(){
        this.ctx.drawImage(this.imageB,0,0,canvas.width,canvas.height);
    }

    verificarTablero(){
        let empate = 0;
        for(let f = 0;f < FILAS; f++){
            for (let c = 0; c < COL; c++){
                if(matriz[c][f] == 1 || matriz[c][f] == 2){
                    empate++;
                }
            }
        }
	//Buscamos en horizontal
        for (let f = 0; f < FILAS; f++){
            let n1 = 0;
            let n2 = 0;
            for (let c = 0; c < COL; c++){
                if (matriz[c][f] == 0){
                    n1 = 0;
                    n2 = 0;
                }
                else if (matriz[c][f] == 1){
                    n1++;
                    n2 = 0;
                    if (n1 == 4)
                        return 1;
                }
                else{
                    n1 = 0;
                    n2++;
                    if (n2 == 4)
                        return 2;
                }
            }
        }
            
        //Vertical
        for (let c = 0; c < COL; c++){
            let n1 = 0;
            let n2 = 0;
            for (let f = FILAS-1; f >= 0; f--){
                if (matriz[c][f] == 0){
                   n1 = 0;
                   n2 = 0;
                }
                else if (matriz[c][f] == 1){
                    n1++;
                    n2 = 0;
                    if (n1 == 4)
                        return 1;
                }
                else{
                    n1 = 0;
                    n2++;
                    if (n2 == 4)
                        return 2;
                }
            }
        }
        
        //Buscamos en diagonal de izquierda a derecha
        for (let i = -(COL + 4); i < COL; i++){
            let n1 = 0;
            let n2 = 0;
            for (let f = 0; f < FILAS; f++){
                let c = i + f;
                if ((c < 0) || (c >= COL))
                    continue;
                if (matriz[c][f] == 0){
                    n1 = 0;
                    n2 = 0;
                }
                else if (matriz[c][f] == 1){
                    n1++;
                    n2 = 0;
                    if (n1 == 4)
                        return 1;
                }
                else{
                    n1 = 0;
                    n2++;
                    if (n2 == 4)
                        return 2;
                }
            }
        }
        
        //Buscamos en diagonal de derecha a izquierda
        for (let i = 0; i < COL + 4; i++){
            let n1 = 0;
            let n2 = 0;
            for (let f = 0; f < FILAS; f++){
                let c = i - f;
                if ((c < 0) || (c >= COL))
                    continue;
                if (matriz[c][f] == 0){
                    n1 = 0;
                    n2 = 0;
                }
                else if (matriz[c][f] == 1){
                    n1++;
                    n2 = 0;
                    if (n1 == 4)
                        return 1;
                }
                else{
                    n1 = 0;
                    n2++;
                    if (n2 == 4)
                        return 2;
                }
            }
        }
        if(empate == 42){
            return 3;
        }
        return 0;
    }
}