var diceFaces = [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
var diceFaceImagePaths = [`images/dice${diceFaces[0]}.png`, `images/dice${diceFaces[1]}.png`]

var images = document.querySelectorAll("img");
images[0].setAttribute("src", diceFaceImagePaths[0]);
images[1].setAttribute("src", diceFaceImagePaths[1]);

var titleMessage;
if (diceFaces[0] == diceFaces[1]) {
  titleMessage = "Draw.";
} else if (diceFaces[0] > diceFaces[1]) {
  titleMessage = "🇫🇷 Player 1 wins!";
} else {
  titleMessage = "Player 2 wins! 🇫🇷";
}

document.querySelector("h1").innerHTML = titleMessage;
