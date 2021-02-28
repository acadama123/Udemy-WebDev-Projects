var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var curPos = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer();
});

function checkAnswer() {
    if (userClickedPattern[curPos] === gamePattern[curPos]) {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            curPos = 0;
            setTimeout(nextSequence, 1000);
        } else {
            curPos += 1
        }
    } else {
        displayGameOver();
        startOver();
    }
}

function nextSequence() {
    level += 1;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    let buttonAudio = new Audio("sounds/" + name + ".mp3");
    buttonAudio.play();
}

function displayGameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver() {
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
    curPos = 0;
    started = false;
}
