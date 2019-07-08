var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['red','blue','green','yellow'];
var started = false;
var level = 0;

$(document).keydown(function(){
  if (!started){
    $('.level-title').text('level ' + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else{
    var wrong = new Audio('sounds/wrong.mp3');
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key To Restart');
    startOver();
  }
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $('#'+currentColor).addClass('pressed');
  setTimeout(function(){
    $('#'+currentColor).removeClass('pressed');
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animatePress(randomChosenColor);
  playSound(randomChosenColor);

}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}
