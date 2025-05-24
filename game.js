var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var usrChosColor = [];
let started = false;
var level = 0;

function nextSequence() {
  usrChosColor = [];
  $(".starter").html("Level : " + level);
  level++;
  var random_number = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[random_number];
  gamePattern.push(randomChosenColour);
  flashButton(randomChosenColour);
  soundevent(random_number);
  console.log("Game Pattern:", gamePattern);
}

function soundevent(number) {
  const sound = new Audio("./" + buttonColours[number] + ".mp3");
  sound.play().catch(err => {
    console.error("Error playing sound:", err);
  });
}

function flashButton(color) {
  const $butt = $("." + color);
  $butt.css({
    transform: "scale(1.1)",
    transition: "transform 0.2s ease"
  });
  setTimeout(() => {
    $butt.css("transform", "scale(1)");
  }, 200);
}

function scaleOnClick() {
  $(".box").off("click").on("click", function () {
    const clickedColor = buttonColours.find(color => $(this).hasClass(color));
    usrChosColor.push(clickedColor);
    flashButton(clickedColor);
    const sound = new Audio("./" + clickedColor + ".mp3");
    sound.play().catch(err => {
      console.error("Error playing sound:", err);
    });
    checkAnswer(usrChosColor.length - 1);
  });
}

function checkAnswer(currentIndex) {
  if (usrChosColor[currentIndex] === gamePattern[currentIndex]) {
    if (usrChosColor.length === gamePattern.length) {
      setTimeout(() => {nextSequence();}, 1000);
    } else {
        scaleOnClick();
    }
  } 
  else {
    gameOver();
  }
}

function gameOver() {
  const wrongSound = new Audio("./wrong.mp3");
  wrongSound.play();
  $(".starter").html("game-over");
  setTimeout(() => {$(".starter").html("Game Over! Click here to Restart");}, 200);
  gamePattern = [];
  usrChosColor = [];
  level = 0;
  started = false;
}

$(".starter").click(function () {
  if (!started) {
    started = true;
    $(".starter").html("Level : " + level);
    nextSequence();
    scaleOnClick();
  }
});
