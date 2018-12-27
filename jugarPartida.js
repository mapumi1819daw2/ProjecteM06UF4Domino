var encaminador = require("./encaminador");
var peticions = require("./Peticions");

/* var jugador = require("./jugador"); */

var manegadors = {};
manegadors["/tirarFitxa"] = peticions.tirarFitxa;
manegadors["/consultes"] = peticions.consultaTauler;


var http = require("http");
var url = require("url");


var fitxes = new Array("1.1","1.2","1.3","1.4","1.5","1.6");




var  JugadorA = {

    nom : "Marc",
    fitxes: new Array("1.1","1.2","1.3","1.4","1.5","1.6"),
    fitxa: 0,
    posicioFitxa : 0

};

var  JugadorB = {

    nom : "Jordi",
    fitxes: new Array("2.1","2.2","2.3","2.4","2.5","2.6"),
    fitxa: 1,
    posicioFitxa : 0

};

var jugadors = new Array(JugadorA, JugadorB);



var tauler = new Array();

var tiradaInicial = true;


function iniciar(encaminador, manegadors){
    function jugant(request, response){
        //Url on ens volem dirigir
        var pathname = url.parse(request.url).pathname;

        console.log("Petició per a "+pathname+ " rebuda.");

        var consulta = url.parse(request.url, true).query;

        

        var fitxa;

        for(var clau in consulta){
        
           console.log("Clau: "+ clau);
            console.log("For: "+ consulta[clau]);
        }


        /**S'assignen els valors del PATH a la classe Jugador */
        jugadors[0].fitxa = consulta["fitxa"];

        jugadors[0].fitxes[jugadors[0].fitxa] = null;

        console.log("Fitxa: "+ jugadors[0].fitxa);


        fitxes[fitxa] = null;
        

        encaminador.encaminar(manegadors, pathname, jugadors[0], response);
    }

    http.createServer(jugant).listen(8888);

    
}

/* var fitxesJugador = new Array("1.1"); */
iniciar(encaminador, manegadors, jugadors);

console.log("Servidor iniciat");
/***
 * Envia fitxa
 * Consulta Taula
 */