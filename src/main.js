function onSelectorUpdate(e){
    var count = 0
    for (var i = 0; i < 4; i++){
        if (getSelected(document.getElementById(`LINE${life}-SELECT${i}`)) != 0){
            count++;
        }
    }
    if (count == 4){
        document.getElementById(`LINE${life}-BUTTON`).disabled = false;
    }
}

function onConfirm(e){
    var input = '';
	for (var i = 0; i < 4; i++){
        input += getSelected(document.getElementById(`LINE${life}-SELECT${i}`));
    }
    test = check(input)
    if (test == true){
        customAlert(`Vous avez gagné la partie !<br>Nombre d'essais: ${life}`)
    }else{
        disableLine(life, test, true)
        life++;
        if (life<=10){enableLine(life);}
        else{
			var message = 'Vous avez perdu !<br>Le code était: <div style="display: flex; flex-direction: row;">'
			for (var i = 0; i < 4; i++){
				message += `<div class="input_color" style="background-color: ${colors[response[i]]};"></div>`
			}
			message += "</div>"
            customAlert(message)
        }
        
    }
}

function enableLine(id){
    displayButton(id);
	for (var i = 0; i < 4; i++){
		document.getElementById(`LINE${id}-SELECT${i}`).disabled = false
    }
}

function disableLine(id, test, text=false){
    removeLabel(id)
    if (text != false){
        addLabel(document.getElementById(`LINE${id}`), id, text=`Valides: ${test[1]} Mals placés: ${test[2]}`);
    }else{
        addLabel(document.getElementById(`LINE${id}`), id);
    }
    
    for (var i = 0; i < 4; i++){
		document.getElementById(`LINE${id}-SELECT${i}`).disabled = true
    }   
}

function initGame(){
    response = generateNumber();
    console.log(response)
    life = 1;
    enableLine(life);
}

var response
var life;
initGame();
