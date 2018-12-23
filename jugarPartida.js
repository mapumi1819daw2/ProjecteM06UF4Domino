var encaminador = require("encaminador");
var peticions = require("Peticions");

var manegadors = {};
manegadors["/tirarFitxa"] = peticions.tirarFitxa;
manegadors["/consultes"] = peticions.consultaTauler ;


var http = require("http");
var url = require("url");

var fitxes = array("1.1","1.2","1.3","1.4","1.5","1.6");

var tauler = array();

var tiradaInicial = true;


function iniciar(encaminador, manegadors, array){
    function jugant(request, response){
        //Url on ens volem dirigir
        var pathname = url.parse(request.url).pathname;

        console.log("Petició per a "+pathname+ " rebuda.");

        var f = url.parse(request.url).query.parametre;

        console.log("Paràmetre rebut: "+f);

        encaminador.encaminador(manegadors, pathname, f);
    }

    http.createServer(jugant).listen(8888);

    
}

var fitxesJugador = array("1.1");
iniciar(encaminador.encaminador, manegadors, fitxesJugador);

console.log("Servidor iniciat");
/***
 * Envia fitxa
 * Consulta Taula
 */