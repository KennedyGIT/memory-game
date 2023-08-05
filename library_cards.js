
var library_cards = (function () {
    // Private variables to store image paths and card attributes
    var blankCard = "images/blank.png";
    var backCard = "images/back.png";
    var numberOfImages = 24;
    // Another array with the same image paths as cardsArray
    var cardsArray = ["images/card_1.png","images/card_2.png","images/card_3.png","images/card_4.png","images/card_5.png","images/card_6.png","images/card_7.png","images/card_8.png","images/card_9.png","images/card_10.png","images/card_11.png","images/card_12.png","images/card_13.png","images/card_14.png","images/card_15.png","images/card_16.png","images/card_17.png","images/card_18.png","images/card_19.png","images/card_20.png","images/card_21.png","images/card_22.png","images/card_23.png","images/card_24.png"];
  
    // Private function to preload images
    function preloadImages() {
      for (let i = 0; i < imageArray.length; i++) {
        let img = new Image();
        img.src = imageArray[i];
      }
    }
  
    // Private function to create HTML for the cards
    function createCardHtml(index) {
      let card = $(`<a href="#"><img></a>`);
      card.find("img").attr("src", backCard);
      card.find("img").addClass("back");
      card.find("img").attr("data-index", index);
      return card;
    }
  
    // Public method to flip a card using a fade effect
    function flipCardFade(img, index) {
      $(img).fadeOut(500);
        img.setAttribute("src", cardsArray[index]);
        $(img).fadeIn(500);
        $(img).removeClass("back");
      };
    
    // Public read-only properties to access the card attributes
    return {
      preloadImages: preloadImages,
      createCardHtml: createCardHtml,
      flipCardFade: flipCardFade,
      blankCard: blankCard,
      backCard: backCard,
      numberOfImages: numberOfImages
    };
  })();
  
  // Export the library_js module
  export default library_cards;
  