function encaminador(manegador, pathame, fitxa){
    console.log("Encaminador de la petició: "+pathame);

    if(typeof manegador[pathame] === 'function'){
        return manegador[pathame](fitxa);
    }
    else{
        console.log("Encaminador no trobat: "+pathame);
    }

}

exports.encaminador = encaminador;