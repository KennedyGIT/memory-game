// Settings object to store player name and number of images used for the game
const settings = {
    // Accessor property to get and set the player name in session storage
    get playerName() {
      return document.getElementById("player_name").value;;
    },
    set playerName(name) {
      sessionStorage.setItem("name", name);
    },
  
    // Accessor property to get and set the number of images used for the game in session storage
    get numberOfCards() {
      const storedNumberOfCards = sessionStorage.getItem("numberOfCards");
      return storedNumberOfCards ? parseInt(storedNumberOfCards) : 0;
    },
    set numberOfCards(count) {
      sessionStorage.setItem("numberOfCards", count);
    }
  };
  
  // Export the settings object
  export default settings;
  