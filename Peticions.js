function tirarFitxa(response, jugadorDeTorn, fitxa){

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Fitxa rebuda: "+ fitxa);
    response.end();
    console.log("Fitxa rebuda: "+fitxa);

}

function consultaTauler(response, jugadorDeTorn, fitxa){

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Entra consulta tauler");
    response.end();
    console.log("Entra consulta tauler");

}


exports.tirarFitxa = tirarFitxa;
exports.consultaTauler = consultaTauler;