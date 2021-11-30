let insertGameForm = document.getElementById('INSERT-game');

insertGameForm.addEventListener('submit', function(e) {

    e.preventDefault();

    let inputGameName = document.getElementById("INSERT-game-name");
    let inputPrice = document.getElementById("INSERT-game-price");
    let inputDescription = document.getElementById("INSERT-game-description");

    let gameNameValue = inputGameName.value;
    let gamePriceValue = inputPrice.value;
    let gameDescriptionValue = inputDescription.value;

    let data = {
        GameName: gameNameValue,
        Price: gamePriceValue,
        Description: gameDescriptionValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/insert-game-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            
            addRowToTable(xhttp.response);

            inputGameName.value = '';
            inputPrice.value = '';
            inputDescription = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

});

addRowToTable = (data) => {

    let currentTable = document.getElementById("games-table");

    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length-1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let gameNameCell = document.createElement("TD");
    let gamePriceCell = document.createElement("TD");
    let gameDescriptionCell = document.createElement("TD");

    idCell.innerText = newRow.GameID;
    gameNameCell.innerText = newRow.GameName;
    gamePriceCell.innerText = newRow.Price;
    gameDescriptionCell.innerText = newRow.Description;

    row.appendChild(idCell);
    row.appendChild(gameNameCell);
    row.appendChild(gamePriceCell);
    row.appendChild(gameDescriptionCell);

    currentTable.appendChild(row);
}