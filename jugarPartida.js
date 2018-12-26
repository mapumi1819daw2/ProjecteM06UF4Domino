var encaminador = require("./encaminador");
var peticions = require("./Peticions");

var jugador = require("./jugador");

var manegadors = {};
manegadors["/tirarFitxa"] = peticions.tirarFitxa;
manegadors["/consultes"] = peticions.consultaTauler;


var http = require("http");
var url = require("url");


var fitxes = new Array("1.1","1.2","1.3","1.4","1.5","1.6");


var setFitxes = juga

jugador.setFitxes(fitxes);



var tauler = new Array();

var tiradaInicial = true;


function iniciar(encaminador, manegadors, jugadorDeTorn){
    function jugant(request, response){
        //Url on ens volem dirigir
        var pathname = url.parse(request.url).pathname;

        console.log("Petició per a "+pathname+ " rebuda.");

        var f = url.parse(request.url).query;

        console.log("Paràmetre rebut: "+f);

        encaminador.encaminar(manegadors, pathname, jugadorDeTorn, f.parametre, response);
    }

    http.createServer(jugant).listen(8888);

    
}

/* var fitxesJugador = new Array("1.1"); */
iniciar(encaminador, manegadors, jugador1);

console.log("Servidor iniciat");
/***
 * Envia fitxa
 * Consulta Taula
 */