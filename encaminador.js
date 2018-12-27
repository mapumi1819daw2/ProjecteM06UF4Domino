function encaminar(manegador, pathame, jugadorDeTorn, fitxes, fitxa, response){
    console.log("Encaminador de la petició: "+pathame);

    if(typeof manegador[pathame] === 'function'){
        return manegador[pathame](response, jugadorDeTorn,fitxes, fitxa);
    }
    else{
        console.log("Encaminador no trobat: "+pathame);
    }

}

exports.encaminar = encaminar;