// function to set name
var getPlayerName = function () {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name + ".");
  return name;
}

// function that asks player if they want to fight or skip
var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // conditional recursive function call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // changes the entire string to lower case
  promptFight = promptFight.toLowerCase();

  // If player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerInfo.money for skipping, but don't let them go in the negative
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      console.log("Player has decided to skip and lost 10 dollars. Player now has " + playerInfo.money + " dolllars.");
      // return true if player wants to leave
      return true;
    } else {
      return false;
    }
  } 

};

// function to fight in the game
var fight = function(enemyInfo) {
  //keep track of who goes first
  var isPlayerTurn = true;
  //randomly changes turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemyInfo.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      // generate random damage value based on player's attack power
      var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
      
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      enemyInfo.health = Math.max(0, enemyInfo.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemyInfo.name + '. ' + enemyInfo.name + ' now has ' + enemyInfo.health + ' health remaining.'
      );

      // check enemy's health
      if (enemyInfo.health <= 0) {
        window.alert(enemyInfo.name + ' has died!');

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        console.log('Player has been awarded 20 dollars for winning. You now have ' + playerInfo.money + ' dollars.');

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemyInfo.name + ' still has ' + enemyInfo.health + ' health left.');
      }
      //player gets attacked first
    } else {
        // generate random damage value based on enemy's attack power
        var damage = randomNumber(enemyInfo.attack - 3, enemyInfo.attack);
        // remove players's health by subtracting the amount set in the enemy.attack variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
          enemyInfo.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
        );

        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + ' has died!');
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
        }
      }
      //switch turn order for nect round
      isPlayerTurn = !isPlayerTurn;
  }
};



// function to shop in the game
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL(1) your health, UPGRADE(2) your attack, or LEAVE(3) the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      console.log('You have chosen to refill health. Your health is now ' + playerInfo.health + ' and the remaining money is ' + playerInfo.money + '.');
      break;
    case 2:
      playerInfo.upgradeAttack();
      console.log('You have chosen to upgrade attack. Your attack is now ' + playerInfo.attack + ' and the remaining money is ' + playerInfo.money + '.');
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    console.log('You have won the game. Final total for ' + playerInfo.name + '. Health is ' + playerInfo.health + ', money is ' + playerInfo.money + ' and attack power is ' + playerInfo.attack + '.');
  } else {
    window.alert("You've lost your robot in battle.");
    console.log('You have lost the game. Final total for ' + playerInfo.name + '. Health is ' + playerInfo.health + ', money is ' + playerInfo.money + ' and attack power is ' + playerInfo.attack + '.');
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// function to start the game
var startGame = function() {
  //reset player stats
  playerInfo.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
        // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        console.log("You have attack power of " + playerInfo.attack + ", health of " + playerInfo.health + ", and " + playerInfo.money + " dollars.");
  
        // pick new enemy to fight based on the index of the enemy.names array
        var pickedEnemyObj = enemyInfo[i];
      
        // reset enemy.health before starting new fight
        pickedEnemyObj.health = randomNumber(40, 60);
    
        // use debugger to pause script from running and check what's going on at that moment in the code
        // debugger;
    
        // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
        fight(pickedEnemyObj);
        // if player is still alive and we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
          // ask if player wants to use the store before next round
          var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

          // if yes, take them to the store() function
          if (storeConfirm) {
          shop();
          }
        }
      } else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
      }
  }

  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

// player info
var playerInfo = {
  name: getPlayerName(), 
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
      console.log("You did not have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
      console.log("You did not have enough money!");
    }
  }
};
// You can also log multiple values at once like this
// console.log(playerInfo.name, playerInfo.attack, playerInfo.health);
// console.log('Player name is ' + playerInfo.name + '. Player has attack strength of ' + playerInfo.attack + '. Player has ' + playerInfo.health + ' total health and ' + playerInfo.money + ' total money.')

// enemy info
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

//start the game when the page loads
startGame();