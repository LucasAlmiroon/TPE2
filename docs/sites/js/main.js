
let canvas = document.querySelector("#juego");
let ctx = canvas.getContext("2d");
//La matriz que hace de tablero.
let matriz = [];
let tablero;
let jugador1;
let jugador2;
let cliqueado;
let turno = true;
let ganador = 0;
let timer = 300;
let maxfichas = 22;
let col = 7;
let filas = 6;
let ytablero = 475;
let cantGanadora = 4;
let paraEmpatar = 44;

//Crea la matriz con la cantidad de columnas y filas.
function crearMatriz(){    
    for (x = 0; x < col; x++){
      matriz[x] = [];
      for (y = 0; y < filas; y++){
        matriz[x][y] = 0;
      }
    }
}

function CrearJugadores(){
    if(document.querySelector("#nombre1").value != "" && document.querySelector("#nombre2").value != "" && document.querySelector("#colorF1").value != document.querySelector("#colorF2").value){
        jugador1 = new Jugador(document.querySelector("#nombre1").value,document.querySelector("#colorF1").value,true,false,20,20);
        jugador2 = new Jugador(document.querySelector("#nombre2").value,document.querySelector("#colorF2").value,false,false,20,1020);

        juegoNuevo();
    }else{
        alert("Ingrese nombre de jugadores y ponga fichas de colores diferentes.");
    }
    

}
//Se crea un juego nuevo, por ahora solo crea las fichas.
function juegoNuevo(){
    let tamanio = document.querySelector("#tamanio").value;
    document.querySelector("#turno").innerHTML = "Turno jugador: " + jugador1.name;
    //Se crea el tablero, con una imagen de fondo.
    let imageTablero = new Image();
    if(tamanio == 1){
        imageTablero.src = "./sites/img/tablero.png";
        maxfichas = 22;
        col = 7;
        filas = 6;
        ytablero = 475;
        cantGanadora = 4;
        paraEmpatar = 44;
    }else if (tamanio == 2){
        cantGanadora = 5;
        paraEmpatar = 56;
        filas = 7
        col = 8
        maxfichas = 28
        ytablero = 560
        imageTablero.src = "./sites/img/tablero7x8.png";
    }else if (tamanio == 3){
        cantGanadora = 6;
        paraEmpatar = 72;
        filas = 8
        col = 9
        maxfichas = 36
        ytablero = 645
        imageTablero.src = "./sites/img/tablero8x9.png";
    }
    crearMatriz();
    imageTablero.onload = function(){
        let imageBackground = new Image();
        imageBackground.src = "./sites/img/background.png";
        imageBackground.onload = function(){
            tablero = new Tablero(200,10,canvas,ctx,matriz,imageTablero,imageBackground);
            tablero.drawBack();
            tablero.draw();
            dibujarFichas();
            
        }
    }
    jugador1.generarFichas(ctx,maxfichas);
    jugador2.generarFichas(ctx,maxfichas);

    document.querySelector("#botonPrincipal").style.margin = 0;
    document.querySelector(".juegoNuevo").innerHTML = 'Reiniciar';

    let interval = setInterval(function(){
        timer--;
        if(timer >= 1){
            document.querySelector("#timer").innerHTML = 'Restan: ' + timer + ' segundos';
            chequearGanador();
            if(jugador1.ganador || jugador2.ganador){
                clearInterval(interval);
                document.querySelector("#timer").innerHTML = 'Hay un ganador';
            }
        }else if(timer <= 0){
            console.log("entra")
            document.querySelector("#timer").innerHTML = 'Se termino el tiempo';
            chequearGanador();
            clearInterval(interval);
        }
    },1000)
    console.log(filas);
    console.log(col);
}

//Dibuja cada ficha del arreglo y el tablero.
function dibujarFichas(){
    if (tablero){
        tablero.drawBack();
        tablero.draw();
    }

    for (let i = 0; i < jugador1.fichas.length; i++){
        jugador1.fichas[i].draw();
        jugador2.fichas[i].draw();
    }
    
}

//Limpia el canvas, para cuando mueve la ficha.
function clearCanvas(){
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//Se verifica en que ficha se hizo click y la devuelve, verificando el turno del jugador.
function clickEnFicha(x,y){
    if(jugador1.turno){
      for (let i = 0; i < jugador1.fichas.length; i++){
        const elemento = jugador1.fichas[i];
        console.log(x + " - " + y); 
        if (elemento.isPointInside(x,y) && x < 200){
          
          return elemento;
        }
      }
    }else if(jugador2.turno) {
      for (let i = 0; i < jugador2.fichas.length; i++){
        const elemento = jugador2.fichas[i];
        console.log(x + " - " + y); 
        if (elemento.isPointInside(x,y) && x > 1000){
          
          return elemento;
        }
  
      }
    }
  }
//Captura el evento del mouse.
function onMouseDown(e){
    cliqueado = clickEnFicha(e.layerX,e.layerY);
    if (cliqueado != null && !jugador1.ganador && !jugador2.ganador) {
        canvas.addEventListener('mousemove', e => {
            dibujado(e.layerX,e.layerY);
        });
        canvas.addEventListener('mouseup',onMouseUp);
    }else{
        console.log("No se agarro ficha, es el turno del otro jugador o ya hay ganador");
    }
}
//Setea la posicion de Y de la ficha en el tablero, segun la cantidad de fichas que tiene por debajo.
function setY(a){
    let j = 0;
    let y = 0;
    //En este while, se verifica si hay una ficha del jugador uno o dos debajo, si es asi, suma una fila.
    while(matriz[a][j] == 1 || matriz[a][j] == 2 && j < filas){
        j++;
    }
    if(cliqueado){
        if (jugador1.turno){
            matriz[a][j] = 1;
        }else{
            matriz[a][j] = 2;
        }
        return y =  ytablero - (j*85);
    }
}
//Seteo los turnos y muestro en pantalla.  
function setTurno(){
    let body = document.querySelector("#turno");
    if (!jugador1.ganador && !jugador2.ganador){
        jugador1.setTurno();
        jugador2.setTurno();
    }
    if(jugador1.turno){
        body.innerHTML = "Turno jugador: " + jugador1.name;

    }else{
        body.innerHTML = "Turno jugador: " + jugador2.name; 
    }
}
//Verifico si hay ganador y lo muestro en pantalla.
function chequearGanador(){
    let body = document.querySelector("#turno");
    if (jugador1.ganador){
        body.innerHTML = "Ganador jugador: " + jugador1.name;
    }else if (jugador2.ganador){
        body.innerHTML = "Ganador jugador: " + jugador2.name;
    }else if(timer <= 0){
        body.innerHTML = "Se acabo el tiempo, empate!"
        jugador1.turno = false;
        jugador2.turno = false;
    }
}

function dibujado(x,y){
    if(cliqueado && !jugador1.ganador && !jugador2.ganador){
      cliqueado.setPosition(x,y);
      clearCanvas();
      dibujarFichas();
    }
}

/*Captura el evento del mouse, dibuja las fichas segun los parametros, 
se establece un rango para saber en que columna y fila va la ficha y setea el turno.*/
function onMouseUp(e){
    if(cliqueado != null){  
      let x = e.layerX;
      let y;
      
    if (x >= 216 && x <= 295){
        y = setY(0);
        dibujado(250,y);
        setTurno();
    }else if (x >= 296 && x <= 380){
        y = setY(1);
        dibujado(335,y);
        setTurno();
    }else if (x >= 381 && x <= 465){
        y = setY(2);
        dibujado(420,y);
        setTurno();
    }else if(x >= 466 && x <= 550){
        y = setY(3);
        dibujado(505,y);
        setTurno();
    }else if(x >= 551 && x <= 635){
        y = setY(4);
        dibujado(590,y);
        setTurno();
    }else if(x >= 636 && x <= 720){
        y = setY(5);
        dibujado(673,y);
        setTurno();
    }else if(x >= 721 && x <= 805){
        y = setY(6);
        dibujado(758,y);
        setTurno();
    }else if(ytablero >= 560 && x >=806 && x <= 890){
        y = setY(7);
        dibujado(840,y);
        setTurno();
    }else if (ytablero == 645 && x >= 891 && x <= 976){
        y = setY(8);
        dibujado(920,y);
        setTurno();
    }else{
        if(jugador1.turno){
          dibujado(50,50);
        }else{
          dibujado(1020,50);
        }
    }
    cliqueado = null;
    if(tablero.verificarTablero(filas,col,cantGanadora,paraEmpatar) == 1){
        jugador1.ganador = true;
    }else if (tablero.verificarTablero(filas,col,cantGanadora,paraEmpatar) == 2){
        jugador2.ganador = true;
    };
        chequearGanador();
    }
  }
  
  canvas.addEventListener('mousedown',onMouseDown,false);

  document.querySelector('.empezar').addEventListener('click',CrearJugadores);