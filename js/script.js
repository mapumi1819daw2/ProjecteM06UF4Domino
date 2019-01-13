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


function pantallaJoc() {

}

function dadesRespostaLogin(dada) {
    var login = "[Funcio dadesRespostaLogin]: ";


    switch (dada.estat) {
        /* 0 OK */
        case 0:
            pantallaJoc(dada.nom);
            break;

        /* ERROR */
        case 1:
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