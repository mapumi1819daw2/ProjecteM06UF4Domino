function encaminar(manegador, pathame, jugadorDeTorn, response){
    console.log("Encaminador de la petició: "+pathame);

    if(typeof manegador[pathame] === 'function'){
        return manegador[pathame](response, jugadorDeTorn);
    }
    else{
        console.log("Encaminador no trobat: "+pathame);
    }

}

exports.encaminar = encaminar;