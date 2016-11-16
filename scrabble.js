

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
  var currentWord = [];

  for(var i = 0; i < arrayLength; i++) {
    var wordScore = this.score(wordArray[i]); //check the score for each word in the array
    if (wordScore >= maxScore) {
      if (wordScore > maxScore) {
        currentWord = []; //reset the array because this word has a higher score than any that are in there
        currentWord.push(wordArray[i]);
        maxScore = wordScore;
      } else {
        currentWord.push(wordArray[i]) //add to the array if there is more than one word with this score
      }
    }
  } // returns an array of words if there is a tie

  //if current word length is 1, return that word, else do more logic

  if (currentWord.length > 0) {
    if (currentWord.length == 1) {
      return currentWord[0]; //return the only word in the array
    } else {

    }
  } else {
    return "Something has gone horribly wrong.";
  }
console.log(maxScore);
console.log(currentWord);


};










var newScrabble = new Scrabble();
  var testWord = newScrabble.score("ALLISON");
  console.log(testWord);

console.log("testing highestScoreFrom")
  var newScrabble = new Scrabble();
    var testArray = newScrabble.highestScoreFrom(["ALLISON", "yellow", "sand"]);
    console.log(testArray);




Scrabble.prototype.helloWorld = function() {
  return 'hello world!';
};

module.exports = Scrabble;
