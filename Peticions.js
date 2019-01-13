var file = require("fs");
/* Poso ruta completa perquè en el fixe de casa no agafa la ruta al estar en un disc diferent */
var MongoClient = require("C:\\Users\\Marc\\node_modules\\mongodb").MongoClient;
var assert = require("assert");
/* var Objectid = require("mongodb").ObjectID; */


var ruta = 'mongodb://localhost:27017/domino';




/* Mostra la pàgina inicial del Joc de domino desde on
es pot iniciar sessió */
function login(response, data) {
    var login = "[login] ";
    console.log(login);

    file.readFile('Login.html', function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });

}

/* Retornem el el script */
function scriptjs(response, data){

    file.readFile('js/script.js', function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });
}


/* Retornem el full d'estils */
function stylecss(response, data){

    file.readFile('css/style.css', function (err, data) {
        response.writeHead(200, { "Content-Type": "text/css" });
        response.write(data);
        response.end();
    });
}


function home(response, data) {
    var home = "[home] ";



    

    

    /* console.log(home);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("be");
    response.end(); */
}


function iniciPartida(response, data){
     var iniciPartida = "[Inici Partida] ";
     console.log(iniciPartida);

     console.log(iniciPartida+" "+ data["nom"]);


     /* Estat 0 = Correcte
        Estat 1 = Error */
     var valor = {
         estat : 0,
         nom : "",
     };

     MongoClient.connect(ruta, function (err, db){
        assert.equal(err, null);
        console.log("Conexió correcta");
        var resposta = db.collection('usuaris').find({"nom":data["nom"]});

        response.writeHead(200, { "Content-Type": "application/json" });
        
        resposta.each(function (err, doc){
           
            assert.equal(err, null);
            if(doc!=null){

                console.log(iniciPartida+" entra doc");
                valor.estat =0;
                valor.nom = data["nom"];

                /* Nom trobat */
                
                response.write(JSON.stringify(valor));
                
            }
            else{
                console.log(iniciPartida+ "no s'ha trobat cap coincidència");
                valor.estat =1;
                valor.nom = data["nom"];
                response.write(JSON.stringify(valor));
                
                response.end();

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

function tirarFitxa(response, data) {

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

function consultaTauler(response, data) {

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