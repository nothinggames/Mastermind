let colors = ["white", "rgb(138, 19, 19)", "rgb(14, 141, 71)", "rgb(14, 58, 141)", "rgb(141, 133, 14)", "rgb(141, 71, 14)", "rgb(120, 14, 141)"]

function addLine(parent, id, n){
	var div = document.createElement("div");
	div.className = "line";
	div.id = `LINE${id}`;

	for (var i = 0; i < 4; i++){
		addSelect(div, id, i);
	}
	addLabel(div, id);
	parent.appendChild(div);	
}

function addSelect(parent, id, n){
	var element = document.createElement("select");
	element.className = "input_color";
	element.id = `LINE${id}-SELECT${n}`
	for (var i = 0; i < 7; i++){
		option = new Option();
		option.style = `background-color: ${colors[i]};`
		element.options[i] = option;
	}
	element.disabled = true;

	element.onchange = function update(e){
		for (var i = 0; i < e.target.options.length; i++) {
			if (e.target.options[i].selected) {
				e.target.style = `background-color: ${colors[i]};`
			}
		}
		onSelectorUpdate(e)
	}

	parent.appendChild(element);	
}

function addLabel(parent, id, text=`Essai n°${id}`){
	var element = document.createElement("p");
	element.className = "label";
	element.id = `LINE${id}-LABEL`
	//element.innerHTML = "Valides: 0 Mals placés: 4"
	element.innerHTML = text
	parent.appendChild(element)
}

function removeLabel(id){
    var element = document.getElementById(`LINE${id}-LABEL`);
    element.parentNode.removeChild(element);
}

function displayButton(id){
	parent = document.getElementById(`LINE${id}-LABEL`);
	var element = document.createElement("button");
	element.className = "confirm";
	element.id = `LINE${id}-BUTTON`;
	element.innerHTML = "Valider";
	element.disabled = true;
	element.onclick = function update(e){onConfirm(e);}
	parent.innerHTML = "";
	parent.appendChild(element)
}

function getSelected(element){
	for (i=0; i< element.options.length; i++) {
        if (element.options[i].selected ) {
			return i
        }
    }
}

function customAlert(message){
	if(!alertify.custom_alert){
		//define a new dialog
		alertify.dialog('custom_alert',function(){
		  return{
			main:function(message){
			  this.message = message;
			},
			setup:function(){
				return { 
				  buttons:[{text: "Rejouer", key:27/*Esc*/}],
				  focus: { element:0 },
				  options: {
					  title: "Partie terminée !",
					  movable: false,
					  closable: false,
					  resizable: false,
					  maximizable: false
				  }
				};
				
			},
			hooks:{
				onclose: function(){
					reset()
				},
		 	},
			prepare:function(){
			  this.setContent(this.message);
			}
		}});
	  }
	  alertify.custom_alert(message);
}

function reset(){
	var content = document.getElementById("content");

	for (var i = 10; i > 0; i--) {
		content.removeChild(document.getElementById(`LINE${i}`))
		addLine(content, i);
	}	
	initGame();
	
}

for (var i = 10; i > 0; i--) {
	addLine(document.getElementById("content"), i);
}