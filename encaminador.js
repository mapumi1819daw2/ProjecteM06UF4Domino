function encaminador(manegador, pathame, response, data){
    console.log("Encaminador de la petició: "+pathame);

    if(typeof manegador[pathame] === 'function'){
        return manegador[pathame](response, data);
    }
    else{
        console.log("Encaminador no trobat: "+pathame);
    }

}

exports.encaminador = encaminador;