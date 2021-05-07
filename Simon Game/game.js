var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOn = false;

$("h1").html("Press Any Key To Start.");

// Adds an event listener to the document
$(document).on("keypress", function () {
    if (!gameOn) {
        gameOn = true;
        level = 0;
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    
}


function nextSequence() {
    // Pick random colour and add it on top of gamePattern stack
    level += 1;
    $("h1").html(`Level ${level}`);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Make the corresponding button shine and play the corresponding sound
    var button = $(`#${randomChosenColour}`);
    button.fadeOut("fast").fadeIn("fast");
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

$(".btn").on("click", function (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
})

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);

}