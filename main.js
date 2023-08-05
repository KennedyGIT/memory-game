// Import the library_settings module
import settings from "./library_settings.js";
// Import the library_scores module
import library_scores from "./library_scores.js";
// Import the library_cards module
import library_cards from "./library_cards.js";
// Import the library_card module
import card from "./library_card.js";


// Array containing sequential numbers from 0 to 23
var indexArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];



// When the document is ready, setup event handlers and perform actions
$(document).ready(() => {
    // Event handler for the tabs
    $("#tabs").tabs({
        collapsible: true,
        activate: () => {
            // Change the arrow icon as "arrow down" on all tabs that are inactive
            $(".ui-tabs-anchor .fa").removeClass("fa-angle-up").addClass("fa-angle-down");
    
            // Set the arrow icon as "arrow up" on the active tab
            $(".ui-tabs-active .fa").removeClass("fa-angle-down").addClass("fa-angle-up");
        }  
    });

    // Event handler for the "Save Settings" button
    $("#save_settings").click(() => 
    {
      saveSettings();
    });

    // Event handler for the "Play Game" button
    $("#playgame").click(() => 
    {
        event.preventDefault();
        // Clear the "cards" div and show the game tab while hiding the other tabs
        $("#cards").innerHTML = "";
        $("#tabs-3").show(500);
        $("#tabs-2").hide(500);
        $("#tabs-1").hide(500);
    });

    // Event handler for the "View Rules" button
    $("#viewrules").click(() => 
    {
        event.preventDefault();
        // Show the rules tab while hiding the other tabs
        $("#tabs-3").hide(500);
        $("#tabs-2").show(500);
        $("#tabs-1").hide(500);
    });

    // Event handler for the "Settings" button
    $("#settings").click(() => 
    {
      newGame();
    });

    $("#new_game").click(() =>
    {
      newGame();
    })
  
  });


  function saveSettings()
  {
      // Validate input and proceed only if input is valid
      if (!validateInput()) {
        console.log(`Validate Input result is ${validateInput()}`);
      } else {
        // Save player details, display cards, and load player details
        savePlayerDetails();
        displayCards(settings.numberOfCards);
        loadPlayerDetails();
    }
  }

  function newGame()
  {
    event.preventDefault();
    // Show the settings tab while hiding the other tabs
    $("#tabs-3").show(500);
    $("#tabs-2").hide(500);
    $("#tabs-1").hide(500);
    document.getElementById("high_score").innerHTML  = "";
    document.getElementById("correct").innerHTML  = "";
  }

   
  // Function to validate player name input
  function validateInput()
  {
      if ((settings.playerName == "") || (settings.playerName === undefined)){
          alert("Player name is blank");
          return false;
      }
      return true;
  }

// Function to save player details to sessionStorage
function savePlayerDetails()
{
    var currentHighScore = (`High Score : ${sessionStorage.getItem("highScore")}`);
    if (currentHighScore == 'High Score : null')
    {     
      sessionStorage.setItem("highScore", 0);
    }
    settings.numberOfCards = document.getElementById("num_cards").value;
    sessionStorage.setItem("name", settings.playerName);
    sessionStorage.setItem("score", library_scores.getMatches());
    sessionStorage.setItem("accuracy", library_scores.calculateAccuracy());
    $("#tabs-3").hide(500);
    $("#tabs-2").hide(500);
    $("#tabs-1").show(500);
}

// Function to load player details from sessionStorage
function loadPlayerDetails()
{
    document.getElementById("player").innerHTML  = (`Player : ${sessionStorage.getItem("name")}`);
    document.getElementById("high_score").innerHTML  = (`High Score : ${sessionStorage.getItem("highScore")}%`);
    document.getElementById("correct").innerHTML  = (`Correct : ${0}%`);
}

// Function to display cards
function displayCards(numberOfCards)
{
    clearCardsDom();

    let cardsToDisplayArray = [];
    let tempArray = indexArray.slice(0, numberOfCards / 2);
    let index = shuffle(tempArray);
    let row = $("<div></div>");
    for (let j = 0; j < tempArray.length; j++) {
      cardsToDisplayArray.push(index[j]);
      let card = library_cards.createCardHtml(index[j]);
      row.append(card);
    }
    let secondPartArray = shuffle(tempArray);

    for (let k = 0; k < secondPartArray.length; k++) {
      let card = library_cards.createCardHtml(tempArray[k]);
      row.append(card);
    }
    $("#cards").append(row);
}


// Function to clear the cards from the DOM
function clearCardsDom(){
    // Get the cards div element by its id
    let cards = document.getElementById("cards");

    // Loop through and remove all its child elements
    while (cards.firstElementChild) {
        cards.removeChild(cards.firstElementChild);
    }
}


// Function to shuffle an array using Fisher-Yates algorithm
function shuffle(array) {
    var tmp, current, top = array.length;
    if (top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
}
