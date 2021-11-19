//Customer insert variables

var email = "";
var password = "";
var first_name = "";
var last_name = "";
var address = "";

var insertsubmit = document.getElementById("insertbutton");

insertsubmit.addEventListener("click", insertSubmit);

function insertSubmit(){

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    first_name = document.getElementById("first_name").value;
    last_name = document.getElementById("last_name").value;
    address = document.getElementById("address").value;
}