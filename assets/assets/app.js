
var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#sub-container').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "In Star Trek: The Motion Picture, a strange destructive cloud is on a course for which planet?",
  answers: ["Earth", "Archimedes", "Megatron", "Alteron"],
  correctAnswer: "Earth",
  image:"assets/images/earth.png"
}, {
  question: "In Star Trek, Spock debates whether to participate in which ritual?",
  answers: ["Kali-Fi", "Pon Farr", "Kolinahr", "Kan-Telan"],
  correctAnswer: "Kolinahr",
  image:"assets/images/kolinahr.png"
}, {
  question: "Which character in Star Trek comes up with a plan to hide the Enterprise in the gravity field of the planet Titan?",
  answers: ["Kirk", "Chekov", "Sulu", "Spock"],
  correctAnswer: "Chekov",
  image:"assets/images/chekov.png"
}, {
  question: 'Which Character in Star Trek is initially assigned to the USS Farragut instead of the Enterprise?',
  answers: ["McCoy", "Uhura", "Spock", "Kirk"],
  correctAnswer: "Uhura",
  image:"assets/images/uhura.png"
}, {
  question: 'In Star Trek: The Motion Picture, what is the name of the Federation listening post commanded by Commander Branch?',
  answers: ["Sigma IX", "Epsilon IX", "Gamma V", "Delta X"],
  correctAnswer: "Epsilon IX",
  image:"assets/images/epsilonIX.png"
}, {
  question: 'Which character in Star Trek: The Motion Picture, is a science officer for the Enterprise?',
  answers: ["Commander Shalim", "Commander Wyatt", "Commander Flynn", "Commander Sonak"],
  correctAnswer: "Commander Sonak",
  image:"assets/images/sonak.png"
}, {
  question: "At the beginning of Star Trek: The Motion Picture, Captain Kirk is on his way to a meeting with which admiral?",
  answers: ["Stamos", "Crosby", "Ryan", "Nogura"],
  correctAnswer: "Nogura",
  image:"assets/images/nogura.png"
}, {
  question: "Before resuming command of the Enterprise in Star Trek: The Motion Picture, Kirk served as Chief in what position?",
  answers: ["Starfleet Operations", "Starfleet Research", "Starfleet Intelligence", "Starfleet Recruitment"],
  correctAnswer: "Starfleet Operations",
  image:"assets/images/operations.png"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Your Results!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;ß
    clearInterval(timer);
    panel.html('<h2>Fail!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Win!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};