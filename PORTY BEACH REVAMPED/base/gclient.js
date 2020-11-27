// global variable to store the current team for the corresponding client.
let TEAM;

//initalize client side socket.io 
var socket= io();
    // set the TEAM variable = to this clients team, taken from server-side.
    socket.on('teamID',(data) =>{
              TEAM = data;
});

// creates constants that relate to the buttons room1 and room2
const room1 = document.getElementById('room1');
const room2 = document.getElementById('room2');
// create event listeners so input is recognized when clicked. when room 1 button is clicked for example, newGame method is executed.
room1.addEventListener('click', newGame);
room2.addEventListener('click', newGame2);

// newGame and newGame2, create events room1 and room2 
function newGame(){
    socket.emit("room1");

}
function newGame2(){
    socket.emit('room2');
    
}

// initalise the game once createGame event is recieved by the socket.
socket.on('createGame', createGame);
function createGame(){
    init();
}

// create global variables to be used in the meat of the program. Game already
let gameAlready = true;
let tempx;
let tempy;
let points = 0;

//start the main game function which draws/adds/modifies game rules and sprites
function game() {
    // game() is already used, so we set it to false;
    gameAlready = false;
    // create the map,sprite and sprite2  using variable playArea,sprite and sprite2 and the document object model DOM, from a div specified and styling used in CSS.
    // Populates these pseudo-classes with their relevant data. There are helper variables to be used for positioning and movement, i.e. key or spritePos.
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
    //Creates child nodes from the parent classes (playArea, sprite i.e.) and adds them to the display using classList.add
    document.body.appendChild(playArea);
    playArea.classList.add('playArea');
    document.body.appendChild(sprite);
    sprite.classList.add('sprite');
    // Set the position of sprite2 and sprite inside the playArea stage, using mathematical equations.
    spritePos.x = (playArea.offsetWidth / 2 + playArea.offsetLeft) - (sprite.offsetWidth / 2);
    spritePos.y = (playArea.offsetHeight + playArea.offsetTop) - (sprite.offsetHeight * 2);
    document.body.appendChild(sprite2);
    sprite2.classList.add('sprite2');
    spritePos2.x = (playArea.offsetWidth / 4 + playArea.offsetLeft) - (sprite2.offsetWidth / 2);
    spritePos2.y = (playArea.offsetHeight + playArea.offsetTop) - (sprite2.offsetHeight * 2);
    // Create and display the foodSprite i.e. the food for the game.
    document.body.appendChild(foodSprite);
    foodSprite.classList.add('food');

    // Create restrictions on where the players can go in the staging area, using the offsetWidth and offsetHeight and essentially the thickness of the sprite
    // to halt it whenever it reaches these.
    playArea.leftBoundary = playArea.offsetLeft + 10;
    playArea.rightBoundary = (playArea.offsetLeft + playArea.offsetWidth - 10) - sprite.offsetWidth;
    playArea.topBoundary = playArea.offsetTop + 10;
    playArea.bottomBoundary = (playArea.offsetTop + playArea.offsetHeight - 10) - sprite.offsetHeight;
   // initialise the food function
    food();
    
    //create an socket.io listener that looks for instances of key being sent, and recieves them and puts their values into a call to the keyDown function.
    socket.on('key',(keyCode) => {
        keyDown(keyCode);
    });
    
    //Checks the input, (keycode) which is e, if they match the letters for w,a,s,d or up down left right arrow keys, it will return key(2 depending if its sprite2 movement).direction
    
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
    // does the same as the previous function, but is used so as when the key is unpressed, the actions dont stick. As such, it returns false whenever e(the keyboard event).keyCode is false.
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

    // this function refers to the movement of the sprite, and adjusts its positioning using spritePos.x and spritePos.y and spriteSpeed. It will + or - them wherever necessary.
    // it also checks for collision between sprite and the playArea boundarys set beforehand, and deals with them accordingly.
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
        // if sprite tries to go past the playArea boundaries, it will set their position = to the boundaries, rubber-banding them back instantly.
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
        // used to update the position of the DOM element sprite, in style.css, this ensures that we see it move normally.
        sprite.style.left = spritePos.x + 'px';
        sprite.style.top = spritePos.y + 'px';

        // if the movement of the sprite and its position in the css matches the foodSprite's position in the css at any point, it will add enumerate the points variable accordingly
        // and change the HTML <p> text with id score, to showcase the current score and for what team that is for.
        if (sprite.style.left == foodSprite.style.left && sprite.style.top == foodSprite.style.top){
            points += 1;   
            document.getElementById("score").innerHTML = "Team " +TEAM+" has " +points+ " points";
            // if the points variable is equal to the value 5, use socket.io to emit to the server the event winner1, and then get ready to reset after 5 seconds using setTimeout and the init function.
            if (points == 5){
                socket.emit('winner1');



                setTimeout(init, 5000);
            }
            
            // Used to make sure the food function continues on after food has been eaten, and that it spawns again at a different place.
            


        }
        else if(foodSprite === null){
        // if at any point, the foodSprite doesnt exist, create one. Another safety measure to ensure the code runs as intended.
            food();
        }






    }
    // same as the previous function movesprite but for sprite2's movement. It works the same, but like said previously, for sprite2 and its collisions and point increasing.
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




            // includes the winning statement here just to seperate it from the rest of the code chunks. It will change the score element in the html to the output shwon
            
            if (points == 5){
                document.getElementById("score").innerHTML = "Team "+TEAM +" has won";
                
                // set 5 second intervals that will first set the event winner1 out to the serverside and then init after 5 more, to get ready to congratulate and then wipe the program.
                setTimeout(socket.emit('winner1'), 5000);
                setTimeout(init, 5000);
            }
            
            //both of these are same as before
            food();


            }
            else if(foodSprite === null){
            food();
            }



    }

    // add eventlisters in the DOM that check for the keydown event, and utilize the keyDown and KeyUp functions with the input false.
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);

    
    // food function that populates the foodSpritePos.x and .y with mathematical functions and especially the Math.random and round modules. This is to create a random
    // spawn point for the foodSprite, but also make sure that this value is rounded so that we can actually collide with it using our sprites. Checks for said spawn point being beyond the
    // playArea boundaries and if so, sets the position of foodSprite to right next to it. This makes sure it will never spawn beyond the boundaries.
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

        // updates the placement of the foodSprite like the other elements, in the css.
        foodSprite.style.left = foodSpritePos.x + 'px';
        foodSprite.style.top = foodSpritePos.y + 'px';




    }


    //this is our gameplay loop, and is used to set the effective fps of our game using setTimeout, and to continually call the moving functions movesprite1() and movesprite2().
    function loop() {
        movesprite1();
        movesprite2();
        setTimeout(loop, 1000 / 60);
    }
    loop();


}


// used to call the game function, initialising this program as a whole. Has conditional statement that checks to see if the boolean variable gameAlready is true, if so it will
// call the game function, otherwise it will refresh the current page using location.reload(). Used for error-control and resetting game.
function init(){
    if (gameAlready === true) {
        game();
    }
    else{location.reload()}
}

// creates socket listeners that look for the keywords winner1close and winnner2close, these indicate that the game has reached its end and a winner is established
// therefore it needs to refresh the page and reset the game. This is what close() does.
socket.on('winner1close', close);
socket.on('winner2close', close);
//the event full is used to indicate whether there are too many sockets(clients/users) in the server/webpage and they cannot get into a room. 
socket.on('full', fullGame);
function close(){
    location.reload();
}
// Once the fullGame() is called by the socket finding a full event, it will alert to the user ( which is a pop-up prompt to the browser), with the text
// "Servers are full, please try again later." It will then reset the game after 2 seconds using the close() function.

function fullGame(){
    alert("Servers are full, please try again later.");
    setTimeout(close,2000);
}



