window.onload = start;
setInterval(movingUniverse, 50) // to move the background image of the universe and simulate spaceship movement
setInterval(flyingSatellite, 30) // to move the satellites from up to down
window.onkeydown = pressDownKey; // to move the spaceship
window.onresize = measurements;

// main variables
let rocketLocationY = 0; // vertical coordinates to move the ship up and down; the initial position is zero
let rocketLocationX // horizontal coordinates to move the ship from left to right
let windowWidth, rocketWidth, windowHeight, rocketHeight; 
let satelliteLocationX // horizontal coordinates of the satellites
let satelliteLocationY = -30 // vertical coordinates of the satellites; the initial position is -30
let rocket, satellite;
let coordRocket, coordSatellite; // position of the ship and the satellites relative to the viewport 
let truncCoordRocketTop, truncCoordRocketLeft, truncCoordSatelliteTop, truncCoordSatelliteLeft; // the integer part of the coordinates by removing any decimal digits
let yUniverse1 = -650 //initial position of the universe image 1 before moving from up to down to create a sense of movement
let yUniverse2 = 0 // //initial position of the universe image 2 before moving from up to down to create a sense of movement
let keyDownOn = true // boolean value to determine if the down arrow key is on to move the ship


// function to start the game 
function start(){
	rocket = document.getElementById('rocket');
	measurements();
	rocketLocationX = windowWidth/2 - rocketWidth/2;
	rocketLocation();
}

// function to set the ship position
const rocketLocation = () => {
	rocket = document.getElementById('rocket');
	rocket.style.left = `${rocketLocationX}px`;
	rocket.style.bottom = `${rocketLocationY}px`;
	coordRocket = rocket.getBoundingClientRect();
	truncCoordRocketTop = Math.trunc(coordRocket.top);
	truncCoordRocketLeft = Math.trunc(coordRocket.left);
}

// function to set window measurements and ship position
function measurements(){
	windowWidth = window.innerWidth;
	rocketWidth = rocket.offsetWidth;
	windowHeight = window.innerHeight;
	rocketHeight = rocket.offsetHeight;
	if(rocketLocationY+rocketHeight+30>windowHeight && rocketLocationY>0){
		rocketLocationY=windowHeight - rocketHeight - 30;
		rocketLocation();
	}
}

// function to activate the cursor keys and move the spaceship 
function pressDownKey(e){
	let pressedKey = e.key;
	let maxTop = windowHeight - rocketHeight - 30; 
	
	if(pressedKey == 'ArrowUp' && rocketLocationY<maxTop){
		rocketLocationY += 20;
		keyDownOn = true;
		rocketLocation();
	}
	if(pressedKey == 'ArrowDown' && rocketLocationY>15 && keyDownOn==true){
		rocketLocationY -= 20;
		rocketLocation();
		if(rocketLocationY<50){
			keyDownOn = false;
		} 
		if(rocketLocationY>50){
			keyDownOn = true;
		}
	}
	if(pressedKey == 'ArrowLeft' && rocketLocationY>15){
		rocketLocationX -= 20;
		if(rocketLocationX<-rocketWidth + 15){
			rocketLocationX=windowWidth-20;
		}
		rocketLocation();
	}
	if(pressedKey == 'ArrowRight' && rocketLocationY>15){
		rocketLocationX += 20;
		if(rocketLocationX>windowWidth-15){
			rocketLocationX=-rocketWidth+20;
		}
		rocketLocation();
	}
}

// helper function to create an array of numbers;
// these numbers will be added to the coordinates of the spaceship and satellites 
// to create more contact margin between the spaceship and the satellite 
function pushNumbersIntoArray(num){
	let array = [];
	for(let i=1; i<=num; i++){
		array.push(i);
	}
	return array;
}

let counter=0 // to count the number of times the spaceship clears a satellite

// function to make the satellite moves from up to down and to make the ship clear space of satellites
function flyingSatellite(){
	if(rocketLocationY>15){
		satelliteLocationY+=10;
		satellite = document.getElementById('sat');
		satellite.style.left = `${satelliteLocationX}px`;
		satellite.style.top = `${satelliteLocationY}px`;
		coordSatellite = satellite.getBoundingClientRect();
		truncCoordSatelliteTop = Math.trunc(coordSatellite.top);
		truncCoordSatelliteLeft = Math.trunc(coordSatellite.left);

		if(satelliteLocationY>windowHeight){
			satelliteLocationY = -30;
			satelliteLocationX = Math.random() * windowWidth;
		}

		let addCoords = pushNumbersIntoArray(40);
		let addCoords2 = pushNumbersIntoArray(40);

		for(let i=0; i<addCoords.length; i++){
			for(let j=0; j<addCoords2.length; j++){
				if(truncCoordSatelliteLeft == truncCoordRocketLeft + addCoords[i] 
					&& truncCoordSatelliteTop == truncCoordRocketTop + addCoords2[j]){
					satelliteLocationY = -30;
					satelliteLocationX = Math.random() * windowWidth;
					counter+=1;
					if(counter===5){
						window.location.href = "../html/gameover.html";
					}			
				}
			}
		}
	}
}

// function to move the background image of the universe and simulate spaceship movement
function movingUniverse(){
	if(rocketLocationY>35){
		let universe1 = document.getElementById('universe1');
		let universe2 = document.getElementById('universe2');
		yUniverse2+=10;
		yUniverse1+=10;
		universe1.style.top = `${yUniverse1}px`;
		universe2.style.top = `${yUniverse2}px`;

		if(yUniverse1 == 0){
			yUniverse1 = -650;
			yUniverse2 = 0;
		}
	}
}
