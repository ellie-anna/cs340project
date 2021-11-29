//Customer insert variables

var email = "";
var password = "";
var first_name = "";
var last_name = "";
var address = "";

var form = document.getElementById("INSERT-customer");
var insertsubmit = document.getElementById("insertbutton");

insertsubmit.addEventListener("submit", function (event) {

    email = form.elements[email].value;
    password = form.elements[password].value;
    first_name = form.elements[first_name].value;
    last_name = form.elements[last_name].value;
    address = form.elements[address].value;

    console.log(email, password, first_name, last_name, address);
});

