function encaminador(manegador, pathame, response, jugador){
    console.log("Encaminador de la petició: "+pathame);

    if(typeof manegador[pathame] === 'function'){
        return manegador[pathame](response, jugador);
    }
    else{
        console.log("Encaminador no trobat: "+pathame);
    }

}

exports.encaminador = encaminador;