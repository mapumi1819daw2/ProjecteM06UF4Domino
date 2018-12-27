function tirarFitxa(response, jugador){

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<p>Fitxa rebuda: "+ jugador.fitxa+"</p><BR><BR>");
    response.write("<p>Jugador: "+ jugador.nom+"</p><BR>");

    
    response.end();
    console.log("Fitxa rebuda: "+jugador.fitxa);
    console.log("Fitxa restants: ");

    for(var f in jugador.fitxes){
        console.log("Fitxa: "+jugador.fitxes[f]);
    }

}

function consultaTauler(response, jugador){

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Entra consulta tauler");
    response.end();
    console.log("Entra consulta tauler");

}


exports.tirarFitxa = tirarFitxa;    
exports.consultaTauler = consultaTauler;