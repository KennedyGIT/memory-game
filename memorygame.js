"use strict";

var flippedCards = [];
var matchedCards = 0;
var playerName = "";
var playerScore = 0;
var highScore = 0;
var accuracy = 0;
var numberOfCards = 0;
var imageArray = ["images/blank.png","images/back.png","images/card_1.png","images/card_2.png","images/card_3.png","images/card_4.png","images/card_5.png","images/card_6.png","images/card_7.png","images/card_8.png","images/card_9.png","images/card_10.png","images/card_11.png","images/card_12.png","images/card_13.png","images/card_14.png","images/card_15.png","images/card_16.png","images/card_17.png","images/card_18.png","images/card_19.png","images/card_20.png","images/card_21.png","images/card_22.png","images/card_23.png","images/card_24.png"];
var cardsArray = ["images/card_1.png","images/card_2.png","images/card_3.png","images/card_4.png","images/card_5.png","images/card_6.png","images/card_7.png","images/card_8.png","images/card_9.png","images/card_10.png","images/card_11.png","images/card_12.png","images/card_13.png","images/card_14.png","images/card_15.png","images/card_16.png","images/card_17.png","images/card_18.png","images/card_19.png","images/card_20.png","images/card_21.png","images/card_22.png","images/card_23.png","images/card_24.png"];
var indexArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var firstSelectedImage;
var secondSelectedImage;


$(document).ready(() => {

    $("#save_settings").click(() => 
    {
        if(!validateInput())
        {
            console.log(`Validate Input result is ${validateInput()}`);
        }
        else
        {
            savePlayerDetails();
            displayCards(numberOfCards);
            loadPlayerDetails();
        }

    });

    $("#playgame").click(() => 
    {
        event.preventDefault();
        $("#cards").innerHTML = "";
        $("#tabs-3").show(500);
        $("#tabs-2").hide(500);
        $("#tabs-1").hide(500);
    });

    $("#viewrules").click(() => 
    {
        event.preventDefault();
        $("#tabs-3").hide(500);
        $("#tabs-2").show(500);
        $("#tabs-1").hide(500);
    })

    $("#settings").click(() => 
    {
        event.preventDefault();
        $("#tabs-3").show(500);
        $("#tabs-2").hide(500);
        $("#tabs-1").hide(500);
        document.getElementById("high_score").innerHTML  = "";
        document.getElementById("correct").innerHTML  = "";
    })

    $("#cards").click((e) =>
    {   
       let img = e.target;
       var index = img.getAttribute('data-index');
       $(img).fadeOut(500);
       img.setAttribute("src", cardsArray[index]);
       $(img).fadeIn(500);
       $(img).removeClass("back");
       
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
            playerScore++
            accuracy  = Math.round((playerScore * 2) / (numberOfCards) * 100);
            updateScore();
            flippedCards = [];
            $(firstSelectedImage).fadeOut(500);
            $(secondSelectedImage).fadeOut(500);
        }
        else
        {
            flippedCards = [];
            $(firstSelectedImage).fadeOut(500);
            $(secondSelectedImage).fadeOut(500);
            firstSelectedImage.setAttribute("src", "images/back.png");
            secondSelectedImage.setAttribute("src", "images/back.png");
            $(firstSelectedImage).fadeIn(500);
            $(secondSelectedImage).fadeIn(500);

        }
       }

       console.log("Image has been clicked");
    })
});




function validateInput(){
    playerName = document.getElementById("player_name").value
    if((playerName == "") || (playerName === undefined)){
        alert("Player name is blank");
        return false;
    }
    return true;
}

function savePlayerDetails()
{
    var currentHighScore = (`High Score : ${sessionStorage.getItem("highScore")}`)
    if(currentHighScore == 'High Score : null')
    {     
        sessionStorage.setItem("highScore", 0);
    }
    numberOfCards = document.getElementById("num_cards").value;
    sessionStorage.setItem("name", playerName);
    sessionStorage.setItem("score", playerScore);
    sessionStorage.setItem("accuracy", accuracy);
    $("#tabs-3").hide(500);
    $("#tabs-2").hide(500);
    $("#tabs-1").show(500);
    
}

function loadPlayerDetails()
{
    document.getElementById("player").innerHTML  = (`Player : ${sessionStorage.getItem("name")}`)
    document.getElementById("high_score").innerHTML  = (`High Score : ${sessionStorage.getItem("highScore")}%`)
    document.getElementById("correct").innerHTML  = (`Correct : ${sessionStorage.getItem("accuracy")}%`)
}

function updateHighScore(highScore)
{
    sessionStorage.setItem("highScore", highScore);
}

function preloadImages()
{
    for (let i = 0; i < imageArray.length; i++) {
        let img = new Image();
        img.src = imageArray[i];
    }
}

function displayCards(numberOfCards)
{
    clearCardsDom();

    let cardsToDisplayArray = [];
    let tempArray = indexArray.slice(0, (numberOfCards/2));
    let index = shuffle(tempArray);
    let row = $("<div></div>");
    for (let j = 0; j != tempArray.length; j++) { 
        cardsToDisplayArray.push(index[j]);
        let card = $(`<a href="#"><img></a>`);
        card.find("img").attr("src", "images/back.png");
        card.find("img").addClass("back");
        card.find("img").attr("data-index", index[j]);
        row.append(card);
    }
    let secondPartArray = shuffle(tempArray);

    for(let k = 0; k != secondPartArray.length; k++)
    {
        let card = $(`<a href="#"><img></a>`);
        card.find("img").attr("src", "images/back.png");
        card.find("img").addClass("back");
        card.find("img").attr("data-index", tempArray[k]);
        row.append(card);
    }       
    $("#cards").append(row);

}



function updateScore() {
    let accuracyPercentage = 0;
    if(playerScore > highScore)
    {
        sessionStorage.setItem("highScore", accuracy);
        document.getElementById("high_score").innerHTML  = document.getElementById("high_score").innerHTML  = (`High Score : ${sessionStorage.getItem("highScore")}%`);
    }
    document.getElementById("correct").innerHTML  = (`Correct : ${accuracy}%`);
}

function clearCardsDom(){
    // Get the cards div element by its id
    let cards = document.getElementById("cards");

    // Loop through and remove all its child elements
    while (cards.firstElementChild) {
        cards.removeChild(cards.firstElementChild);
    }
}

function endGame() {
    if (playerScore > highScore) {
        highScore = playerScore;
        sessionStorage.setItem("highScore", highScore);
    }
    $("#high_score").text(`High Score: ${highScore}`);
    alert(`You have completed the game with ${accuracy}% correct selections!`);
}

function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
}