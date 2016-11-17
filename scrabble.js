

var Scrabble = function() {
  this.letterValues = {
    a: 1,
    b: 3,
    c: 3,
    d: 2,
    e: 1,
    f: 4,
    g: 2,
    h: 4,
    i: 1,
    j: 8,
    k: 5,
    l: 1,
    m: 3,
    n: 1,
    o: 1,
    p: 3,
    q: 10,
    r: 1,
    s: 1,
    t: 1,
    u: 1,
    v: 4,
    w: 4,
    x: 8,
    y: 4,
    z: 10
  };
};

Scrabble.prototype.score = function(word) {
  var wordLetters = word.toLowerCase().split("");
  var lettersLength = word.length;
  var valueOfLetters = this.letterValues;
  var total = 0;

  wordLetters.forEach(function(letter) {
    var letterScore = valueOfLetters[letter];
    total += letterScore;
  });

  if (lettersLength == 7) {
    total += 50;
  }

  return total;
};

Scrabble.prototype.highestScoreFrom = function(arrayOfWords) {
  var wordArray = arrayOfWords;
  var arrayLength = wordArray.length;
  var maxScore = 0;
  var topWordArray = [];

  for(var i = 0; i < arrayLength; i++) { //iterate through the array of words
    var wordScore = this.score(wordArray[i]); //check the score for each word in the array
    if (wordScore >= maxScore) {
      if (wordScore > maxScore) {
        topWordArray = []; //reset the array because this word has a higher score than any that are in there
        topWordArray.push(wordArray[i]);
        maxScore = wordScore;
      } else {
        topWordArray.push(wordArray[i]); //add to the array if there is more than one word with this score
      }
    }
  } // returns an array of words if there is a tie

  //return the word with the highest score - taking into account ties
  if (topWordArray.length > 0) {
    if (topWordArray.length == 1) {
      return topWordArray[0]; //return the only word in the array
    } else {
      tieBreaker(topWordArray); //call the tiebreaker function to fin the winning word
    }
  } else {
    return "Something has gone horribly wrong.";
  }
};

var tieBreaker = function(arrayOfWords) {
  var lengthOfWord = 7;
  var smallWord = null;

  arrayOfWords.forEach(function(word) {
    if (word.length == 7) {
      return word;
    } else if (word.length < lengthOfWord){
      lengthOfWord = word.length;
      smallWord = word;
    }
  });
  return smallWord;
};

var Player = function(name) {
  this._name = name;
  this._plays = [];
  this._game = new Scrabble(); //this assignment will need to have a different value when we consider more than one player in a game - maybe a way to find a particular `instance` of Scrabble?
};

Player.prototype.play = function(word) {
  if (this.hasWon() === false) {
    this._plays.push(word);
  } else {
    return false;
  }
};

Player.prototype.totalScore = function() {
  var scoreOfAll = 0;
  var playsArrayLength = this._plays.length;

  for(var i = 0; i < playsArrayLength; i++) {
    var thisWordScore = this._game.score(this._plays[i]);
    scoreOfAll += thisWordScore;
  }
  return scoreOfAll;
};

Player.prototype.hasWon = function() {
  if (this.totalScore() < 100) {
    return false;
  } else {
    return true;
  }
};

Player.prototype.highestScoringWord = function() {
  topWord = newScrabble.highestScoreFrom(this._plays);
  return topWord;
};

Player.prototype.highestWordScore = function() {
  topWord = this.highestScoringWord();
  topWordScore = newScrabble.score(topWord);
  return topWordScore;
};

// console.log("==============TESTS===========");
//
// console.log("======testing score");
// var newScrabble = new Scrabble();
//   var testWord = newScrabble.score("ALLISON");
//   console.log(testWord);
//
// console.log("======testing highestScoreFrom");
//   var newScrabble = new Scrabble();
//     var testArray = newScrabble.highestScoreFrom(["ALLISON", "yellow", "sand", "zzzzzz"]);
//     console.log(testArray);
//
// console.log("======testing player");
// var newPlayer = new Player("Allison");
// console.log(newPlayer._name);
// console.log(newPlayer._plays);
//
// console.log("======testing .play");
// newPlayer.play("slime");
// console.log(newPlayer._plays);
// newPlayer.play("grime");
// console.log(newPlayer._plays);
//
// console.log("======testing .totalScore");
// console.log(newPlayer.totalScore());
//
// console.log("======testing .haswon");
// console.log(newPlayer.hasWon());
// newPlayer.play("zzzzzzz");
// console.log(newPlayer._plays);
// console.log(newPlayer.totalScore());
//
// console.log("======testing .highestScoringWord");
// console.log(newPlayer.highestScoringWord());
//
// console.log("======testing .highestWordScore");
// console.log(newPlayer.highestWordScore());
//
// Scrabble.prototype.helloWorld = function() {
//   return 'hello world!';
// };

module.exports = Scrabble;
