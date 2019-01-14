

/* dada */




function mouFitxa(i){
    var mouFitxa = "[mouFitxa] ";
    console.log(mouFitxa+ i);

    var tauler = document.getElementById("divTauler");

    /* Dibuixem la fitxa al tauler */
    var fitxa = document.createElement("a");
    var t = document.createTextNode("Fitxa "+ dada.fitxes[i]);
    fitxa.appendChild(t);
    fitxa.setAttribute("id", "t"+i);
    tauler.appendChild(fitxa);


    document.getElementById(i).setAttribute("hidden", "true");

}

/* Funció que respon al click de la fitxa */
function clicaFitxa(i){
    var clicFitxa = "[clicFitxa] ";
    console.log(clicFitxa+ i);

    mouFitxa(i);
}



