var file = require("fs");
/* Poso ruta completa perquè en el fixe de casa no agafa la ruta al estar en un disc diferent */
var MongoClient = require("C:\\Users\\Marc\\node_modules\\mongodb").MongoClient;
var assert = require("assert");
/* var Objectid = require("mongodb").ObjectID; */


var ruta = 'mongodb://192.168.1.16:27017/domino';




/* Mostra la pàgina inicial del Joc de domino desde on
es pot iniciar sessió */
function login(response, jugador) {
    var login = "[login] ";
    console.log(login);

    file.readFile('Login.html', function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });

}

/* Retornem el el script */
function scriptjs(response, jugador){

    file.readFile('js/script.js', function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });
}


/* Retornem el full d'estils */
function stylecss(response, jugador){

    file.readFile('css/style.css', function (err, data) {
        response.writeHead(200, { "Content-Type": "text/css" });
        response.write(data);
        response.end();
    });
}


function home(response, jugador) {
    var home = "[home] ";



    

    

    /* console.log(home);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("be");
    response.end(); */
}


function iniciPartida(response, jugador){
     var iniciPartida = "[Inici Partida] ";
     console.log(iniciPartida);

     console.log(iniciPartida+" "+ jugador.nom);


     /* Estat 0 = Correcte
        Estat 1 = Error */
     var resposta = {
         estat : 0,
         nom : "",
     };

     MongoClient.connect(ruta, { useNewUrlParser: true }, function (err, db){
        assert.equal(err, null);
        console.log("Conexió correcta");
        var resposta = db.collection('usuaris').find({"nom":jugador.nom});
        resposta.each(function (err, doc){
            assert(err, null);
            if(doc!=null){

                resposta.estat =0;
                resposta.nom = jugador.nom;

                /* Nom trobat */
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify(resposta));
            }
            else{
                /* No trobat */
                resposta.estat = 1;
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify(resposta));
                

            }
        });

    });

     /* file.readFile('taulerDeJoc.html', function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });
 */
    
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
exports.scriptjs = scriptjs;
exports.stylecss = stylecss;
exports.iniciPartida = iniciPartida;
exports.tirarFitxa = tirarFitxa;
exports.consultaTauler = consultaTauler;