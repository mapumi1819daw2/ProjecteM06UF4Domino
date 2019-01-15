var file = require("fs");
/* Poso ruta completa perquè en el fixe de casa no agafa la ruta al estar en un disc diferent */
var MongoClient = require("C:\\Users\\Marc\\node_modules\\mongodb").MongoClient;
var assert = require("assert");
/* var Objectid = require("mongodb").ObjectID; */


var ruta = 'mongodb://localhost:27017/domino';


matriufitxes = [ '1:1', '2:2','3:3','4:4','5:5','6:6','1:2','1:3', '1:4', '1:5', '1:6','2:2','2:3',
            '2:4', '2:5', '2:6','3:2','3:3', '3:4', '3:5', '3:6','4:2','4:3', '4:4', '4:5', '4:6',
            '5:2','5:3', '5:4', '5:5', '5:6','6:2','6:3', '6:4', '6:5', '6:6' ];


var partida = {

    "id" : 1,
    "jugadors" : [
        {
            "estat": 0,
            "nom": "Marc",
            "fitxes" : [],
            /* new Array("1:1","1:2","1:3","1:4","1:5","1:6","1:7") */
            "posicio": 0,
            "punts": 0,

        },

        {
            "estat" : 0,
            "nom": "Aaron",
            "fitxes" :[] /* new Array("2:1","2:2","2:3","2:4","2:5","2:6","2:7") */,
            "posicio": 1,
            "punts": 0,

        }
    ]
};




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

/* Retornem el script */
function scriptjs(response, data) {

    file.readFile('js/script.js', function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });
}


/* Retornem el script del joc */
function jocjs(response, data) {

    file.readFile('js/joc.js', function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });
}


/* Retornem el full d'estils */
function stylecss(response, data) {

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


function prepararTauler(nom){

    

    var preparaPartida = "[preparaPartida] ";
    console.log(preparaPartida);

    

    /* Fitxes jugador 1 */
    if(nom == "Marc"){
        for(i=0; i<7; i++){
            var fitxes=matriufitxes.length;
            numero=Math.floor(Math.random()*fitxes);
            var a = matriufitxes[numero];
            partida.jugadors[0].fitxes.push(a);
            var fitxa = matriufitxes.indexOf(a);
            matriufitxes.splice(fitxa, 1);
        }
    }else{
        var fitxes=matriufitxes.length;
            numero=Math.floor(Math.random()*fitxes);
            var a = matriufitxes[numero];
            partida.jugadors[1].fitxes.push(a);
            var fitxa = matriufitxes.indexOf(a);
            matriufitxes.splice(fitxa, 1);
    }
    

    /* var id = Math.floor(Math.random()*10);
    console.log("valor: "+id);
    partida.id = id;
    
    partida.id.jugadors[nom].nom = nom;

    console.log(preparaPartida+ partida.id); */

    

}

function iniciPartida(response, data) {
    var iniciPartida = "[Inici Partida] ";

    prepararTauler(data["nom"]);

    console.log(iniciPartida);

    console.log(iniciPartida + " " + data["nom"]);
    console.log(iniciPartida + " " + partida.jugadors[0].nom);




    /* Estat 0 = Correcte
       Estat 1 = Error */
    var valor = {
        estat: 0,
        nom: "",
    };


    var trobat = false;

    MongoClient.connect(ruta, function (err, db) {
        assert.equal(err, null);
        console.log("Conexió correcta");
        var resposta = db.collection('usuaris').find({ "nom": data["nom"] });

        response.writeHead(200, { "Content-Type": "application/json" });

        resposta.each(function (err, doc) {

            assert.strictEqual(err, null);
            if (doc != null) {

                console.log(iniciPartida + " entra doc");
                
                partida.jugadors[0].estat = 1;

                trobat = true;

                
                
                /* Nom trobat */
                console.log(iniciPartida+ partida.jugadors[0].nom);
                response.write(JSON.stringify(partida.jugadors[0]));

            }
            else {
                console.log(iniciPartida + "no s'ha trobat cap coincidència");


                if(!trobat)
                response.write(JSON.stringify(partida.jugadors[0]));


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

    var tiraFitxa = "[tirarFitxa] ";
    console.log(tiraFitxa);

    
    console.log(tiraFitxa +"Fitxa rebuda: " + data["fitxa"]+"["+partida.jugadors[0].fitxes[data["fitxa"]]+"]");
    console.log(tiraFitxa+ "usuari: "+ data.jugador);

    var fitxaMoguda;

    /* Treiem la fitxa del jugador que ha llançat la fitxa */
    for(var i = 0; i< partida.jugadors.length; i++){
        if(partida.jugadors[i].nom == data.jugador){
            fitxaMoguda = partida.jugadors[i].fitxes[data["fitxa"]];
            partida.jugadors[i].fitxes[data["fitxa"]] = null;
        }
    }



    var missatge = null;
    missatge = "Fitxa "+ fitxaMoguda+ " moguda, "+data.jugador+". Esperant el torn del teu rival!";
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(missatge));
   

    


    response.end();

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
exports.jocjs = jocjs;
exports.stylecss = stylecss;
exports.iniciPartida = iniciPartida;
exports.tirarFitxa = tirarFitxa;
exports.consultaTauler = consultaTauler;