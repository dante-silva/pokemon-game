//This is the database
var pokemonDB = [
   {
     name: 'charmander',
     type: 'fire',
     hp: 45,
     attack: 52,
     defense: 43,
     level: 1,
     img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
   },
   {
     name: 'bulbasaur',
     type: 'fire',
     hp: 45,
     attack: 49,
     defense: 49,
     level: 1,
     img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'

   },
   {
     name: 'squirtle',
     type: 'water',
     hp: 45,
     attack: 48,
     defense: 65,
     level: 1,
     img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'

   },
]

//State
var gameState = {
  userPokemon: '',
  rivalPokemon: ''
}

console.log(gameState)
//Elements
var pokemonsEl = document.querySelector('.select-screen').querySelectorAll('.character')
var battleScreenEl = document.getElementById('battle-screen')
var attackBtnsEl = document.getElementById('battle-screen').querySelectorAll('.attack')

//This is the initial loop
var i = 0;

while (i < pokemonsEl.length) {
  //add function to all characters on screen select
  pokemonsEl[i].onclick = function() {
    //current selected pokemons name
    var pokemonName = this.dataset.pokemon
    //elements for images on battle screen
    var player1Img = document.querySelector('.player1').getElementsByTagName('img')
      var player2Img = document.querySelector('.player2').getElementsByTagName('img')
    //we save the current pokemon
    gameState.userPokemon = pokemonName
    //Cpu picks a pokemon
    cpuPick()
    //change screen to battle screen
    battleScreenEl.classList.toggle('active')
    //select data from current user pokemon
    gameState.currentPokemon = pokemonDB.filter(function(pokemon){
      return pokemon.name == gameState.userPokemon
    })
      player1Img[0].src = gameState.currentPokemon[0].img

    //select data from current cpu pokemon

      gameState.currentRivalPokemon = pokemonDB.filter(function(pokemon){
      return pokemon.name == gameState.rivalPokemon
    })
      player2Img[0].src = gameState.currentRivalPokemon[0].img

      //current user and cpu initial health
      gameState.currentPokemon[0].health = calculateInitialHealth(gameState.currentPokemon)


      gameState.currentPokemon[0].originalHealth = calculateInitialHealth(gameState.currentPokemon)

      gameState.currentRivalPokemon[0].health = calculateInitialHealth(gameState.currentRivalPokemon)

      gameState.currentRivalPokemon[0].originalHealth = calculateInitialHealth(gameState.currentRivalPokemon)

      console.log(gameState)
      //user choose attack

      //cpu health goes down

      //cpu attacks

      //user health goes down

      //rock > Scissors
      //paper > Rock
      //scissors > paper

      //depending on type and defese is how hard attack will be and how much health lost

      //when health <= 0 loses

  }
  i++
}
var a = 0
while(a < attackBtnsEl.length){
  attackBtnsEl[a].onclick = function(){
    var attackName = this.dataset.attack
    gameState.currentUserAttack = attackName


    play(attackName, cpuAttack())
  }
  a++
}

var cpuAttack = function(){
  var attacks = ['rock', 'paper', 'scissors']

  return attacks[randomNumber(0,3)]

}

var calculateInitialHealth = function(user){
  // console.log(user[0].level)
   return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
}

var attackMove = function(attack, level, stack, critical, enemy, attacker){

  console.log(enemy.name + ' before: ' + enemy.health)
   var attackAmount = ((attack * level ) * (stack + critical))
   enemy.health = enemy.health - attackAmount

   var userHP = document.querySelector('.player1').querySelector('.health-bar')
   var cpuHP = document.querySelector('.player2').querySelector('.health-bar')

   if(enemy.owner == 'user'){
     var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
     userHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'
   }else{
     var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
     cpuHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'
   }



   checkWinner(enemy, attacker)
   console.log(enemy.name + ' after: ' + enemy.health)
}
var checkWinner = function(enemy, attacker){
  if(enemy.health <= 0){
    document.getElementById('battle-screen').querySelector('.winner-btn').style.display = "block";
    document.getElementById('battle-screen').querySelector('.fight-btn').style.display = "none";

    console.log('WINNER!' + attacker.name)
  }else{
    document.getElementById('battle-screen').querySelector('.winner-btn').style.display = "none";

  }
}





var play = function(userAttack, cpuAttack){
  var currentPokemon = gameState.currentPokemon[0]
  var currentRivalPokemon = gameState.currentRivalPokemon[0]
  currentPokemon.owner = 'user'
  currentRivalPokemon.owner = 'cpu'
  switch(userAttack) {
  case 'rock':
    if(cpuAttack == 'paper'){
      if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
      //user
      attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
      if(currentRivalPokemon.health >= 1){
        //cpu
        attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
        }
      }


    }
    if(cpuAttack == 'scissors'){
      if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
      //user
      attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
      if(currentRivalPokemon.health >= 1){
      //cpu
      attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
        }
      }
    }
    if(cpuAttack == 'rock'){
      if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
      //user
      attackMove(currentPokemon.attack, currentPokemon.level, .8, .1, currentRivalPokemon, currentPokemon)
      if(currentRivalPokemon.health >= 1){
      //cpu
      attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
        }
      }
    }
    break;
  case 'paper':
  if(cpuAttack == 'paper'){
    if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
    //user
    attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
    if(currentRivalPokemon.health >= 1){
    //cpu
    attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
      }
    }
  }
  if(cpuAttack == 'scissors'){
    if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
    //user
    attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
    if(currentRivalPokemon.health >= 1){
    //cpu
    attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
      }
    }
  }
  if(cpuAttack == 'rock'){
    if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
    //user
    attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
    if(currentRivalPokemon.health >= 1){
    //cpu
    attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
      }
    }
  }
    break;
  case 'scissors':
  if(cpuAttack == 'paper'){
    if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
    //user
    attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
    if(currentRivalPokemon.health >= 1){
    //cpu
    attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
      }
    }
  }
  if(cpuAttack == 'scissors'){
    if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
    //user
    attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
    if(currentRivalPokemon.health >= 1){
    //cpu
    attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .1, currentPokemon, currentRivalPokemon)
      }
    }
  }
  if(cpuAttack == 'rock'){
    if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
    //user
    attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
    if(currentRivalPokemon.health >= 1){
    //cpu
    attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
      }
    }
  }
    break;
    // code block
}

}

var randomNumber = function (min,max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var cpuPick = function(){
  gameState.rivalPokemon = pokemonsEl[randomNumber(0,3)].dataset.pokemon;

}























// // pokemon
// // create data for 3 different pokemons, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)
// var pokemons = [
//   {
//     name: 'charmander',
//     type: 'fire',
//     attack: 52,
//     stamina: 39,
//     level: 1
//   },
//   {
//     name: 'charmander',
//     type: 'fire',
//     attack: 52,
//     stamina: 39,
//     level: 1
//   },
//
// ]
//
//
// var attack = 20;
// var level = 10;
// var stack = 1.3;
// var stamina = 39;
//
// // create a formula for attacks
// console.log((attack * level ) * stack / 7)
//
//
//
// // create a formula for health
// //HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
// console.log(((0.20 * Math.sqrt(level)) * stamina) * 15)
//
//
//
//
// // let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
// // p1 vs p2
//
//
//
//
// // when one user loses all his health declare a winner
