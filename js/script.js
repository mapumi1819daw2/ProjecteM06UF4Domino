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
    console.log()
    xhr.open('POST', url, false);
    xhr.send(null);
}

/**
* Callback AJAX del Login
 */
function callbackLogin() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            
            dada = JSON.parse(xhr.response);
            dadesRespostaLogin();
        } else {
            console.log('problemes amb l\'AJAX');
        }
    }
}

function dadesRespostaLogin(){
    var login = "[Funcio dadesRespostaLogin]: ";
    console.log(login+ dada.estat);
}




/* OnClick login */
function login(){

    var login = "[Funcio login]: ";
    
   
    var nom = document.getElementById("nom").value;


    console.log(login+ "Nom introduit: "+ nom);

    var url = "http://localhost:8888/iniciPartida?nom="+nom;

    cridaAJAXLogin(url);


}

   








//http://localhost:8888/iniciPartida?