function tirarFitxa(response, jugadorDeTorn, fitxes, fitxa){

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<p>Fitxa rebuda: "+ fitxa+"</p><BR><BR>");
    response.write("<p>Jugador: "+ jugadorDeTorn.nom+"</p><BR>");

    
    response.end();
    console.log("Fitxa rebuda: "+fitxa);
    console.log("Fitxa restants: ");

    for(var f in fitxes){
        console.log("Fitxa: "+fitxes[f]);
    }

}

function consultaTauler(response, jugadorDeTorn, fitxes, fitxa){

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Entra consulta tauler");
    response.end();
    console.log("Entra consulta tauler");

}


exports.tirarFitxa = tirarFitxa;    
exports.consultaTauler = consultaTauler;