let TEAM;

var socket= io();
    socket.on('teamID',(data) =>{
              TEAM = data;
});


const room1 = document.getElementById('room1');
const room2 = document.getElementById('room2');

room1.addEventListener('click', newGame);
room2.addEventListener('click', newGame2);


function newGame(){
    socket.emit("room1");

}
function newGame2(){
    socket.emit('room2');
}
socket.on('createGame', createGame);
function createGame(){
    init();
}

let gameAlready = true;
let tempx;
let tempy;
let points = 0;

function game() {
    gameAlready = false;
    var playArea = document.createElement('div'),
        sprite = document.createElement('div'),
        spritePos = {
            x: 0,
            y: 0
        },
        spriteSpeed = 1,
        key = {
            right: false,
            left: false,
            up: false,
            down: false
        },
        sprite2 = document.createElement('div'),
        spritePos2 = {
            x: 0,
            y: 0
        },
        foodSprite = document.createElement('div'),
        foodSpritePos =  {
            x: 0,
            y: 0,
        },

        key2 = {
            right: false,
            left: false,
            up: false,
            down: false
        }

    document.body.appendChild(playArea);
    playArea.classList.add('playArea');
    document.body.appendChild(sprite);
    sprite.classList.add('sprite');
    spritePos.x = (playArea.offsetWidth / 2 + playArea.offsetLeft) - (sprite.offsetWidth / 2);
    spritePos.y = (playArea.offsetHeight + playArea.offsetTop) - (sprite.offsetHeight * 2);
    document.body.appendChild(sprite2);
    sprite2.classList.add('sprite2');
    spritePos2.x = (playArea.offsetWidth / 4 + playArea.offsetLeft) - (sprite2.offsetWidth / 2);
    spritePos2.y = (playArea.offsetHeight + playArea.offsetTop) - (sprite2.offsetHeight * 2);
    document.body.appendChild(foodSprite);
    foodSprite.classList.add('food');


    playArea.leftBoundary = playArea.offsetLeft + 10;
    playArea.rightBoundary = (playArea.offsetLeft + playArea.offsetWidth - 10) - sprite.offsetWidth;
    playArea.topBoundary = playArea.offsetTop + 10;
    playArea.bottomBoundary = (playArea.offsetTop + playArea.offsetHeight - 10) - sprite.offsetHeight;
    food();

    socket.on('key',(keyCode) => {
        keyDown(keyCode);
    });
    function keyDown(e) {
        if (e.keyCode === 39) {
            key.right = true;

        } else if (e.keyCode === 37) {
            key.left = true;
        }
        if (e.keyCode === 38) {
            key.up = true;
        } else if (e.keyCode === 40) {
            key.down = true;
        }

        if (e.keyCode === 87){
            key2.up = true;
        }
        else if(e.keyCode === 83 ){
            key2.down = true;
        }
        if (e.keyCode === 65 ){
            key2.left = true;
        }
        else if(e.keyCode === 68){
            key2.right = true;
        }






    }

    function keyUp(e) {
        if (e.keyCode === 39) {
            key.right = false;
        } else if (e.keyCode === 37) {
            key.left = false;
        }
        if (e.keyCode === 38) {
            key.up = false;
        } else if (e.keyCode === 40) {
            key.down = false;
        }
        if (e.keyCode === 87){
            key2.up = false;
        }
        else if(e.keyCode === 83 ){
            key2.down = false;
        }
        if (e.keyCode === 65 ){
            key2.left = false;
        }
        else if(e.keyCode === 68){
            key2.right = false;
        }


    }


    function movesprite1() {
        if (key.right === true) {
            spritePos.x += spriteSpeed;
        } else if (key.left === true) {
            spritePos.x -= spriteSpeed;
        }
        if (key.up === true) {
            spritePos.y -= spriteSpeed;
        } else if (key.down === true) {
            spritePos.y += spriteSpeed;
        }
        if (spritePos.x < playArea.leftBoundary) {
            spritePos.x = playArea.leftBoundary;
        }
        if (spritePos.x > playArea.rightBoundary) {
            spritePos.x = playArea.rightBoundary;
        }
        if (spritePos.y < playArea.topBoundary) {
            spritePos.y = playArea.topBoundary;
        }
        if (spritePos.y > playArea.bottomBoundary) {
            spritePos.y = playArea.bottomBoundary;
        }
        sprite.style.left = spritePos.x + 'px';
        sprite.style.top = spritePos.y + 'px';


        if (sprite.style.left == foodSprite.style.left && sprite.style.top == foodSprite.style.top){
            points += 1;
            console.log(TEAM);
            document.getElementById("score").innerHTML = "Team " +TEAM+" has " +points+ " points";
            if (points == 5){
                socket.emit('winner1');



                setTimeout(init, 5000);
            }

            food();


        }
        else if(foodSprite === null){
            console.log("hello2")
            food();
        }






    }
    function movesprite2() {
        if (key2.right === true) {
            spritePos2.x += spriteSpeed;
        } else if (key2.left === true) {
            spritePos2.x -= spriteSpeed;
        }
        if (key2.up === true) {
            spritePos2.y -= spriteSpeed;
        } else if (key2.down === true) {
            spritePos2.y += spriteSpeed;
        }
        if (spritePos2.x < playArea.leftBoundary) {
            spritePos2.x = playArea.leftBoundary;
        }
        if (spritePos2.x > playArea.rightBoundary) {
            spritePos2.x = playArea.rightBoundary;
        }
        if (spritePos2.y < playArea.topBoundary) {
            spritePos2.y = playArea.topBoundary;
        }
        if (spritePos2.y > playArea.bottomBoundary) {
            spritePos2.y = playArea.bottomBoundary;
        }
        sprite2.style.left = spritePos2.x + 'px';
        sprite2.style.top = spritePos2.y + 'px';

        if (sprite2.style.left == foodSprite.style.left && sprite2.style.top == foodSprite.style.top){
            points += 1;
            document.getElementById("score").innerHTML = "Team " +TEAM +" has " +points+ " points";





            if (points == 5){
                document.getElementById("score").innerHTML = "Team "+TEAM +" has won";
                socket.emit('winner1');

                setTimeout(init, 5000);
            }

            food();


        }
        else if(foodSprite === null){
            console.log("hello2")
            food();
        }



    }


    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);

    function food() {

        foodSpritePos.x = Math.round(800* (Math.random()*2));
        foodSpritePos.y = Math.round(400*(Math.random()*2));

        tempx = foodSpritePos.x;
        tempy = foodSpritePos.y;

        if (foodSpritePos.x < playArea.leftBoundary) {
            foodSpritePos.x = playArea.leftBoundary;
        }
        if (foodSpritePos.x > playArea.rightBoundary) {
            foodSpritePos.x = playArea.rightBoundary;
        }
        if (foodSpritePos.y < playArea.topBoundary) {
            foodSpritePos.y = playArea.topBoundary;
        }
        if (foodSpritePos.y > playArea.bottomBoundary) {
            foodSpritePos.y = playArea.bottomBoundary;
        }


        foodSprite.style.left = foodSpritePos.x + 'px';
        foodSprite.style.top = foodSpritePos.y + 'px';




    }



    function loop() {
        movesprite1();
        movesprite2();
        setTimeout(loop, 1000 / 60);
    }
    loop();


}



function init(){
    if (gameAlready === true) {
        game();
    }
    else{location.reload()}
}

socket.on('winner1close', close);
socket.on('winner2close', close);
socket.on('full', fullGame);
function close(){
    location.reload();
}

function fullGame(){
    alert("Servers are full, please try again later.");
    setTimeout(close,2000);
}



