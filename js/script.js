
/**
 * Crida AJAX per fer el login
 * Passem url amb el nom
 */
function cridaAJAXLogin(url) {
    xhr = new XMLHttpRequest();

    if (!xhr) {
        alert('problemes amb XHR');
        return false;
    }
    xhr.onreadystatechange = callbackLogin;
    xhr.open('POST', url, true);
    xhr.send(null);
}

function logOut(){

    document.getElementById("usuari").setAttribute("hidden", "true");
    document.getElementById("estat").setAttribute("hidden", "true");
    document.getElementById("pPunts").setAttribute("hidden", "true");
    document.getElementById("divTauler").setAttribute("hidden", "true");
    document.getElementById("divFitxes").setAttribute("hidden", "true");
    document.getElementById("divLogin").removeAttribute("hidden");
    
}

function pantallaJoc(dada) {

    /* Amaguem apartat Login */

    document.getElementById("usuari").innerText = "Partida iniciada, "+dada.nom;
    document.getElementById("pPunts").removeAttribute("hidden");
    document.getElementById("divLogin").setAttribute("hidden", "true");


    /* Creem el logout */
    var divPare = document.getElementById("usuari");
    var nou = document.createElement("button");
    nou.setAttribute("id", "out");
    nou.setAttribute("onClick", "logOut()");
    var t = document.createTextNode("Log Out");
    
    nou.appendChild(t);
    
    divPare.appendChild(nou);

    


    var pantallaJoc = "[pantallaJoc] ";
    console.log(pantallaJoc+ dada.nom);


    /* DIV TAULER */
    var divTauler = document.createElement("div");
    divTauler.setAttribute("id", "divTauler");
    document.body.appendChild(divTauler);



    /* DIV FITXES */
    var divFitxes = document.createElement("div");
    divFitxes.setAttribute("id", "divFitxes");
    document.body.appendChild(divFitxes);

    for(var i=0; i< dada.fitxes.length; i++){
            console.log("Fitxa "+ dada.fitxes[i]);
            
            var para = document.createElement("a");

            /* Posició dins l'array */
            para.setAttribute("id",i);
            para.setAttribute("onClick","clicaFitxa("+i+")");
            para.setAttribute("class","fitxa");
            var t = document.createTextNode("Fitxa "+ dada.fitxes[i]);
            para.appendChild(t);

            divFitxes.appendChild(para);
    }

}

function dadesRespostaLogin(dada) {
    var login = "[Funcio dadesRespostaLogin]: ";


    switch (dada.estat) {
        /* 0 OK */
        case 1:
            pantallaJoc(dada);
            break;

        /* ERROR */
        case 0:
            var para = document.createElement("P");
            var t = document.createTextNode("L'usuari/a " + dada.nom + " no consta a la base de dades.");
            para.appendChild(t);
            document.body.appendChild(para);
            break;


    }
    console.log(login + dada.estat);
}


/**
* Callback AJAX del Login
 */
function callbackLogin() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {

            dada = JSON.parse(xhr.response);
            
           
            dadesRespostaLogin(dada);
        } else {
            console.log('problemes amb l\'AJAX');
        }
    }
}






/* OnClick login */
function login() {

    var login = "[Funcio login]: ";


    var nom = document.getElementById("nom").value;


    console.log(login + "Nom introduit: " + nom);

    var url = "http://localhost:8888/iniciPartida?nom=" + nom;

    cridaAJAXLogin(url);


}










//http://localhost:8888/iniciPartida?