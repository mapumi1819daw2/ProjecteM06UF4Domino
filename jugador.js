/*Classe jugador*/

function Jugador(){

    var fitxes;

    /**Posició esquerra-> 0
     * Posició dreta -> 1
     */
    var posicioFitxa = 0;


    function setFitxes(f){
        fitxes = f;
    }

    function getPosicioFitxa(){
        return posicioFitxa;
    }

    return {
        setFitxes : setFitxes,
        getPosicioFitxa : getPosicioFitxa

    };
}

exports.Jugador = Jugador;