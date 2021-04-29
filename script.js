// script.js

const img = new Image(); // used to load image from <input> and draw to canvas


//image input
const imageInput = document.getElementById("image-input");

imageInput.addEventListener('change', () => {
  
  const selectedFile = imageInput.files[0];
  const image = URL.createObjectURL(selectedFile);

  console.log(selectedFile);
  console.log(image);

  img.src = image;
  img.alt = selectedFile.name;


  //img.src = URL(…. filename)
  //URL.createObjectURL()
  //[input-element].value
});

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO

  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected

  const canvas = document.getElementById('user-image');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const newCoords = getDimmensions(canvas.width, canvas.height, img.width, img.height);
  console.log(newCoords);
  ctx.drawImage(img, newCoords.startX, newCoords.startY, newCoords.width, newCoords.height);

});


// form submit
const submit = document.querySelector('button[type="submit"]');

submit.addEventListener('submit', (event) => {
  
  console.log('pressed');
  event.preventDefault();

  const topText = document.getElementById('text-top').value;
  const bottomText = document.getElementById('text-bottom').value;

  const canvas = document.getElementById('user-image');
  const ctx = canvas.getContext('2d');

  console.log(topText, bottomText);
  
  ctx.font = '48px sans-serif';
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  ctx.fillText(topText, canvas.width/2, 40);
  ctx.fillText(bottomText, canvas.width/2, canvas.height-40);


  // const buttonGroup = document.getElementById("button-group");
  // const clearButton = buttonGroup.getElementsByTagName("button")[0];
  // const readTextButton = buttonGroup.getElementsByTagName("button")[1];

  // clearButton.disabled = true;
  // readTextButton.disabled = true;

});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
