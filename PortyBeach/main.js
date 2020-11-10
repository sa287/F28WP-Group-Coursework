let Main = {
  setGameStart: function(classType) {
    this.resetPlayer(classType);
    this.setPreFight();

  },
  resetPlayer: function(classType){
    switch (classType) {
      case "Rich":
        player = new Player(classType, 200, 100, 10);
        break;
    }
    let getInterface = document.querySelector(".interface");
    getInterface.innerHTML = '<img src="img/characters/' + classType.toLowerCase() + '.png" class="img-character"><div><h3>' + classType + '</h3><p>Health: '+ player.health + '</p><p>Strength: '+ player.strength + '</p><p>Speed: '+ player.speed + '</p></div>';
  },
  setPreFight: function(){
    let getHeader = document.querySelector(".header");
    let getActions = document.querySelector(".actions");
    let getArena = document.querySelector(".arena");
    getHeader.innerHTML = '<p>Task: Find an enemy!</p>';
    getActions.innerHTML = '<a href ="#" class="btn-prefight" onclick="Main.setFight()">Search for an enemy!</a>';
    getArena.style.visibility = "visisble";
  },
  setFight: function(){
    let getHeader = document.querySelector(".header");
    let getActions = document.querySelector(".actions");
    let getEnemy = document.querySelector(".enemy");
    //Create enemy!
    let enemy00 = new Enemy("PureGym PT", 300, 50, 50);
    let enemy01 = new Enemy("Mike", 300, 50, 50);
    let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(2));
    switch (chooseRandomEnemy) {
      case 0:
       enemy = enemy00;
       break;
      case 1:
       enemy = enemy01;
       break;
    }
    getHeader.innerHTML = '<p>Task: Choose your move!</p>';
    getActions.innerHTML = '<a href ="#" class="btn-prefight" onclick="PlayerMoves.calcAttack()">Attack!</a>';
    getEnemy.innerHTML = '<img src="img/enemies/' + enemy.enemyType.toLowerCase() + '.png" alt = "' + enemy.enemyType + '" class="img-character"><div><h3>' + enemy.enemyType + '</h3><p class="health-enemy">Health: ' + enemy.health +  '</p><p>Strength: ' + enemy.strength + '</p><p>Speed: ' + enemy.speed + '</p></div>';
  }
}
