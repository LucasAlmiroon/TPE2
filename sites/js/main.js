const MAXFICHAS = 22;
const COL = 7;
const FILAS = 6;

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

//Crea la matriz con la cantidad de columnas y filas.
function crearMatriz(){    
    for (x = 0; x < COL; x++){
      matriz[x] = [];
      for (y = 0; y < FILAS; y++){
        matriz[x][y] = 0;
      }
    }
}

function CrearJugadores(){
    if(document.querySelector("#nombre1").value != "" && document.querySelector("#nombre2").value != "" && document.querySelector("#colorF1").value != document.querySelector("#colorF2").value){
        jugador1 = new Jugador(document.querySelector("#nombre1").value,document.querySelector("#colorF1").value,true,false,20,20);
        jugador2 = new Jugador(document.querySelector("#nombre2").value,document.querySelector("#colorF2").value,false,false,20,850);

        juegoNuevo();
    }else{
        alert("Ingrese nombre de jugadores y ponga fichas de colores diferentes.");
    }
    

}
//Se crea un juego nuevo, por ahora solo crea las fichas.
function juegoNuevo(){
    crearMatriz();
    document.querySelector("#turno").innerHTML = "Turno jugador: " + jugador1.name;
    //Se crea el tablero, con una imagen de fondo.
    let imageTablero = new Image();
    imageTablero.src = "./sites/img/tablero.png";
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
    jugador1.generarFichas(ctx);
    jugador2.generarFichas(ctx);

    document.querySelector("#botonPrincipal").style.margin = 0;
    document.querySelector(".juegoNuevo").innerHTML = 'Reiniciar';

    setInterval(function(){
        timer--;
        if(timer >= 1){
            document.querySelector("#timer").innerHTML = 'Restan: ' + timer + ' segundos';
        }else if(timer <= 0){
            console.log("entra")
            document.querySelector("#timer").innerHTML = 'Restan : 0 segundos';
            chequearGanador();
        }
    },1000)
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
        if (elemento.isPointInside(x,y) && x > 800){
          
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
    //En este while, se verifica si hay una ficha del jugador uno o dos debajo, si es asi, suma una fila.
    while(matriz[a][j] == 1 || matriz[a][j] == 2 && j < FILAS){
        j++;
    }
    if(cliqueado){
        switch (j) {
            case 0:
                if (jugador1.turno){
                    matriz[a][j] = 1;
                }else{
                    matriz[a][j] = 2;
                }
                return 473;
                break;
            case 1:
                if (jugador1.turno){
                    matriz[a][j] = 1;
                }else{
                    matriz[a][j] = 2;
                }
                return 390;
                break;
            case 2:
                if (jugador1.turno){
                    matriz[a][j] = 1;
                }else{
                    matriz[a][j] = 2;
                }
                return 305;
                break;
            case 3:
                if (jugador1.turno){
                    matriz[a][j] = 1;
                }else{
                    matriz[a][j] = 2;
                }
                return 217;
                break;
            case 4:
                if (jugador1.turno){
                    matriz[a][j] = 1;
                }else{
                    matriz[a][j] = 2;
                }
                return 141;
                break;
            case 5:
                if (jugador1.turno){
                    matriz[a][j] = 1;
                }else{
                    matriz[a][j] = 2;
                }
                return 55;
                break;
            default:
                return 50;
                break;
        }
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
      if (x >= 214 && x <= 283){
         y = setY(0);
        dibujado(248,y);
        setTurno();
      }else if (x >= 298 && x <= 366){
        y = setY(1);
        dibujado(332,y);
        dibujarFichas();
        setTurno();
      }else if (x >= 380 && x <= 448){
        y = setY(2);
        dibujado(414,y);
        dibujarFichas();
        setTurno();
      }else if(x >= 467 && x <= 535){
        y = setY(3);
        dibujado(500,y);
        dibujarFichas();
        setTurno();
      }else if(x >= 549 && x <= 615){
        y = setY(4);
        dibujado(583,y);
        dibujarFichas();
        setTurno();
      }else if(x >= 634 && x <= 700){
        y = setY(5);
        dibujado(668,y);
        dibujarFichas();
        setTurno();
      }else if(x >= 715 && x <= 785){
        y = setY(6);
        dibujado(749,y);
        dibujarFichas();
        setTurno();
      }else{
        if(jugador1.turno){
          dibujado(50,50);
          dibujarFichas();
        }else{
          dibujado(850,50);
          dibujarFichas();
        }
      }
      cliqueado = null;
      if(tablero.verificarTablero() == 1){
          jugador1.ganador = true;
      }else if (tablero.verificarTablero() == 2){
          jugador2.ganador = true;
      };
      chequearGanador();
    }
  }
  
  canvas.addEventListener('mousedown',onMouseDown,false);

  document.querySelector('.empezar').addEventListener('click',CrearJugadores);