function dadesRespostaTiradaFitxa(dada){
    document.getElementById("estat").innerText = dada;
}

/**
* Callback AJAX tirada de la fitxa
 */
function callbackCridaFitxaJugada() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {

            dada = JSON.parse(xhr.response);
            
           
            dadesRespostaTiradaFitxa(dada);
        } else {
            console.log('problemes amb l\'AJAX');
        }
    }
}



/**
 * Crida AJAX per fer el login
 * Passem url amb el nom
 */
function cridaFitxaJugada(url) {
    xhr = new XMLHttpRequest();

    if (!xhr) {
        alert('problemes amb XHR');
        return false;
    }
    xhr.onreadystatechange = callbackCridaFitxaJugada;
    xhr.open('POST', url, true);
    xhr.send(null);
}

/* Funció que dibuixa la fitxa seleccionada en el nou tauler
i esborra la del tauler ambles pròpies fitxes */
function mouFitxa(i){
    var mouFitxa = "[mouFitxa] ";
    console.log(mouFitxa+ "indicador posicio array: "+i);


    /* Calculem puntuació */
    var valorFitxa = 0;

    var string = dada.fitxes[i].split(":");
    console.log(mouFitxa+ string[1]);

    valorFitxa = string[0]*1+ string[1]*1;
    console.log(mouFitxa+ " suma punts fitxa "+valorFitxa);

    var punts = document.getElementById("punts").textContent;
    punts = punts*1;
    punts += valorFitxa;

    document.getElementById("punts").textContent = punts;
    var tauler = document.getElementById("divTauler");

    /* Dibuixem la fitxa al tauler */
    var fitxa = document.createElement("a");
    var t = document.createTextNode("Fitxa "+ dada.fitxes[i]);

    fitxa.appendChild(t);
    fitxa.setAttribute("id", "t"+i);
    fitxa.setAttribute("class", "fitxa");
    tauler.appendChild(fitxa);


    document.getElementById(i).setAttribute("hidden", "true");


    var url = "http://localhost:8888/tirarFitxa?fitxa="+i+"&jugador="+dada.nom;

    cridaFitxaJugada(url);

}

/* Funció que respon al click de la fitxa */
function clicaFitxa(i){
    var clicFitxa = "[clicFitxa] ";
    console.log(clicFitxa+ i);

    mouFitxa(i);
}



