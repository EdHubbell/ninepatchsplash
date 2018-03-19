var Jimp = require("jimp");


var args = process.argv.slice(2);

console.log('File to be used to create 9 patch images: ' + args[0]);





Jimp.read(args[0], function (err, image) {
  if (err) throw err;


  console.log(image.bitmap.width);


  // MDPI is 320×480 dp = 320x480px (The Default x1)
  // LDPI is 0.75 x MDPI = 240x360px
  // HDPI is 1.5 x MDPI = 480x720px
  // XHDPI is 2 x MDPI = 640x960px
  // XXHDPI is 3 x MDPI = 960x1440px
  // XXXHDPI is 4 x MDPI = 1280x1920px

  // We'll use 256 here for the nice rescale factor of 4 down from 1024.
  make9p(image.clone(), "MDPI_splashscreen.9.png", 256, 320, 480);
  // Normally we can just take 20 off the width and use that.  
  make9p(image.clone(), "LDPI_splashscreen.9.png", 200, 200, 320);
  make9p(image.clone(), "HDPI_splashscreen.9.png", 460, 480, 800);
  make9p(image.clone(), "XHDPI_splashscreen.9.png", 620, 720, 1280);
  make9p(image.clone(), "XXHDPI_splashscreen.9.png", 940, 960, 1600);
  // // For the big one, don't resize at all.
  make9p(image.clone(), "XXXHDPI_splashscreen.9.png", 1024, 1280, 1920);


});



function make9p(image, filename, imageSize, splashWidth, splashHeight) {

  // Resize the source image so it will fit on the splash. Square image. 
  // Based use of bicubic method on this post: https://blog.codinghorror.com/better-image-resizing/
  image.resize(imageSize, imageSize, Jimp.RESIZE_BICUBIC);

  // Get the image background color so we know what to fill in.
  // This just assumes that the upper left corner is the same as the rest of the image. 
  var backColor = image.getPixelColor(0,0)

  var ninepWidth = splashWidth + 2;
  var ninepHeight = splashHeight + 2;

  var imageNew = new Jimp(ninepWidth, ninepHeight, 0xFFFFFF00, function (err, imageNew) {
    if (err) throw err;

    // Set the correct pixels so the borders of the 9 patch image will stretch.
    // Remember that the source image should have a consistent border color.
    imageNew.setPixelColor(0x000000FF, 1, 0); // sets the colour of that pixel
    imageNew.setPixelColor(0x000000FF, 0, 1); // sets the colour of that pixel

    imageNew.setPixelColor(0x000000FF, ninepWidth - 2, 0); // sets the colour of that pixel
    imageNew.setPixelColor(0x000000FF, 0, ninepHeight - 2); // sets the colour of that pixel

    // Set the background of the entire image. 
    for (x = 0; x < ninepWidth - 2; x++) {
      for (y = 0; y < ninepHeight - 2; y++) {
        imageNew.setPixelColor(backColor, x + 1, y + 1); // sets the colour of that pixel
      }
    }


    // Find where we want to paste in the square image.  
    var xOffset =  parseInt((splashWidth - imageSize)/2) + 1;
    var yOffset = parseInt((splashHeight - imageSize)/2) + 1;

    // Paste the initial image into our larger portrait splashscreen.
    imageNew.blit(image, xOffset, yOffset);

    imageNew.write(filename); // save

    console.log("Created " + filename);
  }
)};


    //  image.resize(image.bitmap.width + 2, image.bitmap.height + 2)            // resize
    // //      .quality(60)                 // set JPEG quality
    // //      .greyscale()                 // set greyscale
    //       .write('test2.png'); // save
