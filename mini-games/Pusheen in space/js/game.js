var isPaused = true;
var click = 0;
var stepCount = 0;

function KeyPressed(e) {
	var unicode = e.keyCode ? e.keyCode : e.charCode;

	isPaused = false;
	click++;
	if (click == 1) {
		start();
	}

	var allowedSpace = parseInt(document.getElementById("game_field").offsetWidth,
		10) - parseInt(document.getElementById("cat").offsetWidth, 10);
	var step = allowedSpace / 4;

	var position = parseInt(getComputedStyle(document.getElementById('cat')).left,
		10);
	var cat = document.getElementById('cat');

	if (unicode == 37 && stepCount > 0) {
		cat.style["left"] = position - step;
		stepCount--;
		cat.className = "";
	}

	if (unicode == 39 && stepCount < 4) {
		cat.style["left"] = position + step;
		stepCount++;
		cat.className = "flip_image";
	}
}

function CreateItem(name) {
	if(isPaused==true)
	{
		return;
	}
	var width = document.getElementById("game_field").offsetWidth;
	var item = document.createElement("img");

	item.src = name;
	item.style.position = "absolute";
	item.style.top = 0;
	item.style.left = Math.random() * (width - 70);

	spaceStone[name].push(item);
	document.getElementById("game_field").appendChild(item);
	setTimeout(function() {
		CreateItem(name);
	}, generateSpeeds[name]);
}

function MoveItem(name) {
	var length = spaceStone[name].length;
	var heigth = document.getElementById("game_field").offsetHeight;
	var positionCatLeft = parseInt(document.getElementById("cat").style.left, 10);
	var catHeight = document.getElementById("cat").clientHeight;
	var catWidth = document.getElementById("cat").clientWidth;
	
	for (var i = 0; i <= length; i++) {
		if (spaceStone[name][i] == undefined) continue;

		var position = parseInt(spaceStone[name][i].style.top, 10);
		spaceStone[name][i].style.top = position + 30;

		if (position + 64 > heigth) {
			score += itemsScores[name];
			document.getElementById('score').innerHTML = score;
			document.getElementById("game_field").removeChild(spaceStone[name][i]);
			spaceStone[name].splice(i, 1);

			var item = document.createElement("div");
			item.className = "happy-circle";
			item.style.left = positionCatLeft + catWidth / 2;
			document.getElementById("game_field").appendChild(item);
			FadeAway(item);
		}
	}

	IsWounded(name);
	setTimeout(function() {
		MoveItem(name);
	}, moveSpeeds[name]);
}

function IsWounded(name) {
	var length = spaceStone[name].length;
	for (var i = 0; i <= length; i++) {
		if (spaceStone[name][i] == undefined) continue;

		var heigth = document.getElementById("game_field").offsetHeight;
		var positionTop = parseInt(spaceStone[name][i].style.top, 10);
		var positionLeft = parseInt(spaceStone[name][i].style.left, 10);
		var positionCatLeft = parseInt(document.getElementById("cat").style.left, 10);

		var catHeight = document.getElementById("cat").clientHeight;
		var catWidth = document.getElementById("cat").clientWidth;
		
		if (positionTop > heigth - catHeight && positionLeft - positionCatLeft <
			catWidth && positionLeft > positionCatLeft) {
				document.getElementById("game_field").removeChild(spaceStone[name][i]);
			spaceStone[name].splice(i, 1);
			
			if(name == "img/like.png"){				
				if(lives < 3){
					lives++;
					document.getElementById(lives).className = "visible";
				}
			}
			else{
				lives--;
				if (lives == 0) {
				if (!alert('Game over!')) {
					window.location.reload();
				}
			}
				document.getElementById(lives+1).className = "hidden";
			}
			
		}
	}
}

function FadeAway(item) {
	console.log(item);
	if (item.style.opacity <= 0)
		document.getElementById("game_field").removeChild(item);
	else {
		item.style.opacity -= 0.1;
		setTimeout(function() {
			FadeAway(item);
		}, fade);
	}
}
