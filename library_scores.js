// Create the library_scores module using an IIFE and the module pattern
var library_scores = (function () {
    // Private variables to keep track of game state
    var matches = 0;
    var turns = 0;
  
    // Private function to save scores to local storage
    function saveScores() {
      sessionStorage.setItem("highScore", getHighScore());
    }
  
    // Private function to get the high score from local storage
    function getHighScore() {
      return parseInt(sessionStorage.getItem("highScore")) || 0;
    }
  
    // Public method to increment the number of matches
    function incrementMatches() {
      matches++;
      saveScores();
    }
  
    // Public method to increment the number of turns
    function incrementTurns() {
      turns++;
    }
  
    // Public method to get the current number of matches
    function getMatches() {
      return matches;
    }
  
    // Public method to calculate the accuracy percentage
    function calculateAccuracy(numberOfCards) {
      if(matches > (numberOfCards/2))
      {
        matches = 1;
      }
      return Math.round((matches * 2) / numberOfCards * 100);
    }
  
    // Public method to compare scores and update high score
    function compareScores() {
      var highScore = getHighScore();
      var accuracy = calculateAccuracy(settings.numberOfCards);
      if (accuracy > highScore) {
        sessionStorage.setItem("highScore", accuracy);
      }
    }
  
    // Public method to display the high score
    function displayHighScore() {
      var highScore = getHighScore();
      $("#high_score").text(`High Score: ${highScore}%`);
    }
  
    // Return public methods and properties
    return {
      incrementMatches: incrementMatches,
      incrementTurns: incrementTurns,
      getMatches: getMatches,
      calculateAccuracy: calculateAccuracy,
      compareScores: compareScores,
      displayHighScore: displayHighScore
    };
  })();
  
  // Export the library_scores module
  export default library_scores;
  