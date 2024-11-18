// Get the canvas element and its drawing context
const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");

// Array of background images to cycle through
const backgroundImages = ["images/backgrounds/teaset.png", "images/backgrounds/ducks.png", "images/backgrounds/cats.png", "images/backgrounds/clouds.png"];
let backgroundIndex = 0;
let currentBackgroundImage = null;

// Array of text images to cycle through
const textImages = ["images/text/Bday.png", "images/text/Congrats.png", "images/text/Thanks.png","images/text/Think.png"];
let textIndex = 0;
let currentTextImage = null;

function changeBackgroundImage() {
    const bgImage = new Image();
    bgImage.src = backgroundImages[backgroundIndex];
    bgImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        currentBackgroundImage = bgImage;
        // Redraw the current text image if it exists
        if (currentTextImage) {
            drawTextImage(currentTextImage);
        }
    };
    backgroundIndex = (backgroundIndex + 1) % backgroundImages.length;
}

function changeTextImage() {
    const textImage = new Image();
    textImage.src = textImages[textIndex];
    textImage.onload = function() {
        // Clear the canvas and redraw the background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (currentBackgroundImage) {
            ctx.drawImage(currentBackgroundImage, 0, 0, canvas.width, canvas.height);
        }
        drawTextImage(textImage); // Draw the new text image
        currentTextImage = textImage;
    };
    textIndex = (textIndex + 1) % textImages.length;
}

function drawTextImage(textImage) {
    // Calculate the x and y positions to center the text image on the canvas
    const xPosition = (canvas.width - textImage.width) / 2;
    const yPosition = (canvas.height - textImage.height) / 2;
    ctx.drawImage(textImage, xPosition, yPosition);
}

function saveCardAsImage() {
    const imageURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "greeting_card.png";
    link.click();

    // Trigger the modal display manually when the button is clicked
    const modal = document.getElementById("thanks-modal");
    modal.style.display = "flex"; // Show the modal

    // Auto-hide the modal after 4 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 4000); 
}


function sendCardAsEmail() {
    const imageURL = canvas.toDataURL("image/png");

    const subject = encodeURIComponent("Check out this Greeting Card I made!");
    const body = encodeURIComponent("Hi there,\n\nI created this greeting card for you!\n\nPlease find the card attached.");
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}


// Define the audio element
const audio = new Audio("audio/Kawaii! - Bad Snacks.mp3"); // Replace with the actual path of your audio file

// Get the miffy and moofy image elements
const miffyImage = document.querySelector("img[src='images/decor/miffy.png']");
const moofyImage = document.querySelector("img[src='images/decor/moofy.png']");

// Play audio when miffy image is clicked
miffyImage.addEventListener("click", () => {
    audio.play();
});

// Stop audio when moofy image is clicked
moofyImage.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0; // Reset the audio to the start
});
