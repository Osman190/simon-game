const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let start = false;
let level = 0;

$('body').on("keypress", function(e){
  if (!start) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    start = true;
  }
})

$('.btn').on('click', function(e) {
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    wrong(currentLevel);
    startOver()
  }
}

function wrong(currentLevel) {
  if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
    $('#level-title').text(`Game Over, Press Any Key to Restart`);
    playSound("wrong");
    $(`body`).addClass("game-over");
    setTimeout(function(){ 
      $(`body`).removeClass("game-over")}, 200)
      
  }
}

function animations(color) {  
  let btn = $(`#${color}`);
  btn.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function nextSequence() {
  level++;
  $('#level-title').text(`level ${level}`);
  const randomNum = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
  animations(randomChosenColour);
  playSound(randomChosenColour);
}

function playSound(color) {
  const audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function animatePress(currentColour){
  if(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function(){ 
      $(`#${currentColour}`).removeClass("pressed")}, 100)
  }
  
}

function startOver() {
  start = false;
  gamePattern = [];
  userClickedPattern = []
  level = 0;
}