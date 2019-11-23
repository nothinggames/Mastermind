function getRandomInt(min, max) {
    max++;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


function generateNumber(){
    number = "";
    for (var i = 0; i < 4; i++){
        number += getRandomInt(1, 6);
    }
    return number

}

function well_placed(c1, c2){
	var invalids = c1.slice();
	var bad = c2.slice();
	var valid = 0
	for (var i = 0; i < 4; i++){
		if(c1[i] == c2[i]){
			valid += 1
			invalids[i] = 0
			bad[i] = 0
		}
	}
	return [valid, bad, invalids]
}

function misplaced(c1, c2){
	var bad = 0
	for (var i = 0; i < 4; i++){
		if (c2.includes(c1[i]) && c1[i] != 0){
			bad += 1
			c2[c2.indexOf(c1[i])] = 0
		}
	}
	return bad
}

function check(input){
	if (input == response){
		return true
	}
	c1 = input.split('');
	c2 = response.split('');
	test = well_placed(c1, c2);
	bad = misplaced(test[2], test[1]);
	return [0, test[0], bad]
}