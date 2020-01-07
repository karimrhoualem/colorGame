var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    //mode buttons event listeners
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            
            if(this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        });
    }
}

function setupSquares() {
    for(var i = 0; i < squares.length; i++) {
        //add click listeners to square
        squares[i].addEventListener("click", function() {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare clicked color to color in title
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!"; 
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                //reset the button so that it asks if you want to play again after winning
                resetButton.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!"; 
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    //pick a random color from the array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    //change colors of squares
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    //reset color of h1 background
    h1.style.backgroundColor = "steelblue";

    //reset success or failure message
    messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function() { 
    reset();
});

function changeColors(color) {
    //change color of every square to the correctly selected color
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    //generate random color and return the rgb color from the colors array
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //create array to store the new colors generate by specified parameter "num"
    var arr = [];
    //load array with random colors by calling randomColor()
    for(var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    //generate red
    var red = Math.floor(Math.random() * 256);
    //generate green
    var green = Math.floor(Math.random() * 256);
    //generate blue
    var blue = Math.floor(Math.random() * 256);

    //return string with rgb color
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}