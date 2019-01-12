var file = require("fs");
var MongoClient = requrie("mongodb").MongoClient;
var assert = require("assert");
var Objectid = require("mongodb").ObjectID;

var ruta = 'mongodb://localhost:270/domino';




/* Mostra la pàgina inicial del Joc de domino desde on
es pot iniciar sessió */
function home(response, jugador) {

    file.readFile('Login.html', function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });

}


function login(response, jugador) {
    var login = "[login]";



    MongoClient.connect(ruta, function (err, db){
        assert.equal(err, null);
        console.log("Conexió correcta");
        var resposta = db.collection('jugadors').find({"nom":jugador.nom});
        resposta.each(function (err, doc){
            assert(err, null);
            if(doc!=null){

                /* Nom trobat */
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write("<p>Benvingut al domino: ")
            }
            else{
                /* No trobat */
            }
        });

    });

    console.log(login);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("be");
    response.end();
}

function tirarFitxa(response, jugador) {

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<p>Fitxa rebuda: " + jugador.fitxa + "</p><BR><BR>");
    response.write("<p>Jugador: " + jugador.nom + "</p><BR>");


    response.end();
    console.log("Fitxa rebuda: " + jugador.fitxa);
    console.log("Fitxa restants: ");

    for (var f in jugador.fitxes) {
        console.log("Fitxa: " + jugador.fitxes[f]);
    }

}

function consultaTauler(response, jugador) {

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Entra consulta tauler");
    response.end();
    console.log("Entra consulta tauler");

}

exports.home = home;
exports.login = login;
exports.tirarFitxa = tirarFitxa;
exports.consultaTauler = consultaTauler;