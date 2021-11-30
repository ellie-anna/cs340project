//Customer insert variables

let email = "";
let password = "";
let first_name = "";
let last_name = "";
let address = "";

const form = document.getElementById("INSERT-customer");
const insertsubmit = document.getElementById("insertbutton");

insertsubmit.addEventListener("submit", function (event) {

    email = form.elements[email].value;
    password = form.elements[password].value;
    first_name = form.elements[first_name].value;
    last_name = form.elements[last_name].value;
    address = form.elements[address].value;

    console.log(email, password, first_name, last_name, address);
});

