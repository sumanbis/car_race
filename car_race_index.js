let road = document.getElementById("road");
let player = { speed : 5};
let lives = 3;

// providing information about the size of an element , its position , etc .=======
let boundaryRoad = road.getBoundingClientRect();
console.log(boundaryRoad)


// create dynamic Player Car==========================
let userCar = document.createElement("div");
userCar.setAttribute('class','userCar');
// userCar.style.backgroundImage = "url('./download.png')";
road.appendChild(userCar);


//create dynamic center road white lines===================
function createCenterRoadLines() {
    for(let i=0 ; i < 5 ; i++)
    {
        let centerRoadLine = document.createElement("div");
        centerRoadLine.setAttribute('id','centerRoadLine')
        centerRoadLine.setAttribute('class','roadLine');
        centerRoadLine.y_axis = (i * 150);
        
        centerRoadLine.style.top = centerRoadLine.y_axis + "px" ;
    
        road.appendChild(centerRoadLine);
    
    }
}
createCenterRoadLines();

function carCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.left > bRect.right) 
    || (aRect.right < bRect.left))

}

function endgame(){
    player.start=false; 
}



//move lines==================================

function moveLines(){
    strips.forEach(function(item){
        if(item.y_axis >700){
            item.y_axis -= 750; 
        }
        // console.log(item.y_axis)
        item.y_axis += player.speed;
        item.style.top = item.y_axis + "px";
    })
}
 
let strips = document.querySelectorAll('.roadLine');
// console.log(strips);


//keyboard press detect ========================

document.addEventListener('keydown' , keyDown);
document.addEventListener('keyup' , keyUp);
let keys = { ArrowLeft : false , ArrowRight : false }
function keyDown(e){
    keys[e.key] = true ;
    //console.log(keys);
}

function keyUp(e){
    keys[e.key] = false ;
    //console.log(keys);
}



//play game==========================

road.addEventListener('click' , playGame)

function playGame(){
    player.start = true ;
    console.log('Play game ' + lives)
    window.requestAnimationFrame(raceStart)
}
//


//race start==============================

function raceStart(){
   // console.log('text');
    if(player.start)
    {
        moveLines();
        moveTraffic(userCar);
        if(keys.ArrowLeft && player.x_axis > 0) { player.x_axis -= player.speed;  }
        if(keys.ArrowRight  && player.x_axis < (boundaryRoad.width -58) ) { player.x_axis += player.speed;  }
        
        userCar.style.left = player.x_axis + "px";
        
        window.requestAnimationFrame(raceStart);
    }
    
}


//size of user car with respect to x axis (horizontal)==========
player.x_axis  = userCar.offsetLeft;
player.y_axis  = userCar.offsetTop;


// random car generate function=====================
function randomCarGenerator() {
    for (var i = 0; i < 5 ; i++) {
        let trafficCar = document.createElement("div");
        trafficCar.setAttribute('class', 'traffic');
        trafficCar.y_axis = ((i + 1) * 350) * -1;
        trafficCar.style.top = trafficCar.y_axis + "px";
        trafficCar.style.backgroundImage = "url(car-145009_960_720.png)";
        trafficCar.style.left=Math.floor(Math.random() * 350 ) + "px";
        road.appendChild(trafficCar);
    }
}
randomCarGenerator();

let traffic = document.querySelectorAll(".traffic");

//move traffic================================
function moveTraffic(userCar){
    traffic.forEach(function(item){
        if(carCollide(userCar, item)){
            player.start = false;
            lives--;
            restartGame();
            if(lives === 0) {
                gameOver();
                lives = 3;
            }
            endgame();
        }
        if(item.y_axis >=700){
            item.y_axis = -200; 
            item.style.left=Math.floor(Math.random() * 350 ) + "px";
        }
        // console.log(item.y_axis)
        item.y_axis += player.speed;
        item.style.top = item.y_axis + "px";
    })
}

function restartGame() {
    road.innerHTML = '';
    road = document.getElementById("road");
    road.appendChild(userCar);
    traffic.innerHTML = '';
    createCenterRoadLines();
    randomCarGenerator();
    // playGame();
    player.start = true ;
    window.requestAnimationFrame(raceStart);
    raceStart();
    console.log(road);
    return
}

function gameOver() {
    alert("Game Over!!!")
}