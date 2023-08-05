// Import the library_settings module
import settings from "./library_settings.js";
// Import the library_scores module
import library_scores from "./library_scores.js";

import library_cards from "./library_cards.js";

// Variables to keep track of game state and player details
var flippedCards = [];
// Array containing image paths for the card
const cardsArray = ["images/card_1.png","images/card_2.png","images/card_3.png","images/card_4.png","images/card_5.png","images/card_6.png","images/card_7.png","images/card_8.png","images/card_9.png","images/card_10.png","images/card_11.png","images/card_12.png","images/card_13.png","images/card_14.png","images/card_15.png","images/card_16.png","images/card_17.png","images/card_18.png","images/card_19.png","images/card_20.png","images/card_21.png","images/card_22.png","images/card_23.png","images/card_24.png"];
// Variables to store the first and second selected images during the game
var firstSelectedImage;
var secondSelectedImage;

class Card {
    constructor(anchorTag) {
      this.img = $(anchorTag).find("img")[0];
      this.value = anchorTag.getAttribute("id");
    }
  
    isClickable() {
      return this.img.classList.contains("back");
    }
  
    isMatched(otherCard) {
      return this.value === otherCard.value;
    }
  }
  
   // Event handler for clicking on cards
   $("#cards").click((e) =>
   { 
      let img = e.target;
      var index = img.getAttribute('data-index');
      library_cards.flipCardFade(img,index);
      
      flippedCards.push(index);
      if(flippedCards.length == 1)
      {
       firstSelectedImage = img;
      }

      if(flippedCards.length == 2)
      {
       secondSelectedImage = img;

        if(flippedCards[0] == flippedCards[1])
        {
           // Increase the number of matches using the library_scores module method
           library_scores.incrementMatches();
           // Calculate and update the accuracy percentage
           var accuracyPercentage = library_scores.calculateAccuracy(settings.numberOfCards);
           updateHighScore(accuracyPercentage);
           let newHighScore = sessionStorage.getItem("highScore")
           document.getElementById("high_score").innerHTML = `HighScore : ${newHighScore}%`;
           document.getElementById("correct").innerHTML = `Correct : ${accuracyPercentage}%`;

           flippedCards = [];
           $(firstSelectedImage).fadeOut(500);
           $(secondSelectedImage).fadeOut(1000);
       }
       else
       {
        setTimeout(() => {
            flippedCards = [];
           $(firstSelectedImage).fadeOut(500);
           $(secondSelectedImage).fadeOut(500);
           firstSelectedImage.setAttribute("src", "images/back.png");
           secondSelectedImage.setAttribute("src", "images/back.png");
           $(firstSelectedImage).fadeIn(500);
           $(secondSelectedImage).fadeIn(500);
          }, 500);
           
       }
      }

      console.log("Image has been clicked");
   });


  // Function to update the high score
    function updateHighScore(highScore)
    {
    let existingHighScore = sessionStorage.getItem("highScore");

    if(highScore > existingHighScore)
    {
        sessionStorage.setItem("highScore", highScore);
    }
    
    }
  
  export default Card;
  