var encaminador = require("./encaminador");
var peticions = require("./Peticions");

/* var jugador = require("./jugador"); */

var manegadors = {};
manegadors["/tirarFitxa"] = peticions.tirarFitxa;
manegadors["/consultes"] = peticions.consultaTauler;


var http = require("http");
var url = require("url");


var fitxes = new Array("1.1","1.2","1.3","1.4","1.5","1.6");




var  Jugador = {

    nom : "Marc",
    fitxes: new Array(),
    fitxa: 0,
    posicioFitxa : 0

};



var tauler = new Array();

var tiradaInicial = true;


function iniciar(encaminador, manegadors, Jugador){
    function jugant(request, response){
        //Url on ens volem dirigir
        var pathname = url.parse(request.url).pathname;

        console.log("Petició per a "+pathname+ " rebuda.");

        var consulta = url.parse(request.url).query;

        console.log("Paràmetre rebut: "+consulta);

        var fitxa;

        for(var clau in consulta){
            fitxa = consulta[clau];
        }

        fitxes[fitxa] = null;
        

        console.log("Valor rebut: "+fitxa);

        encaminador.encaminar(manegadors, pathname, Jugador, fitxes, fitxa, response);
    }

    http.createServer(jugant).listen(8888);

    
}

/* var fitxesJugador = new Array("1.1"); */
iniciar(encaminador, manegadors, Jugador);

console.log("Servidor iniciat");
/***
 * Envia fitxa
 * Consulta Taula
 */