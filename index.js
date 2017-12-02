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
  make9p(image.clone(), "MDPI_splashscreen.9.png", 256);
  // Normally we can just take 20 off the width and use that.  
  make9p(image.clone(), "LDPI_splashscreen.9.png", 220);
  make9p(image.clone(), "HDPI_splashscreen.9.png", 460);
  make9p(image.clone(), "XHDPI_splashscreen.9.png", 620);
  make9p(image.clone(), "XXHDPI_splashscreen.9.png", 940);
  // For the big one, don't resize at all.
  make9p(image.clone(), "XXXHDPI_splashscreen.9.png", 1024);


});



function make9p(image, filename, imageSize) {


  image.resize(imageSize, imageSize);

  var ninepWidth = image.bitmap.width + 2;
  var ninepHeight = image.bitmap.height + 2;

  
  var imageNew = new Jimp(ninepWidth, ninepHeight, 0xFFFFFF00, function (err, imageNew) {
    if (err) throw err;


    // Set the correct pixels so the borders of the image will stretch.
    // Remember that the source image should have a consistent border color.
    imageNew.setPixelColor(0x000000FF, 1, 0); // sets the colour of that pixel
    imageNew.setPixelColor(0x000000FF, 0, 1); // sets the colour of that pixel

    imageNew.setPixelColor(0x000000FF, ninepWidth - 2, 0); // sets the colour of that pixel
    imageNew.setPixelColor(0x000000FF, 0, ninepHeight - 2); // sets the colour of that pixel


    // Is there a faster way? Who cares. Plenty fast and easy to read.

    for (x = 0; x < image.bitmap.width; x++) {

      for (y = 0; y < image.bitmap.height; y++) {

        imageNew.setPixelColor(image.getPixelColor(x,y), x + 1, y + 1); // sets the colour of that pixel

      }

    }


    imageNew.write(filename); // save

    console.log("Created " + filename);
  }
)};


    //  image.resize(image.bitmap.width + 2, image.bitmap.height + 2)            // resize
    // //      .quality(60)                 // set JPEG quality
    // //      .greyscale()                 // set greyscale
    //       .write('test2.png'); // save
