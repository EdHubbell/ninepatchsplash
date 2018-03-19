# ninepatchsplash

If you are a mobile developer, chances are you will need to create Android splash screens at some point. Then you will have to deal with nine patch files. This can be a pain, especially if you are doing cross platform development and don't really get too deep into Android specific development. 

This project is designed to take a large png file and convert it into a set of Android splash screens. You can start with a .png that is 1024x1024 and it will create multiple splash screens for Android. It adds a transparent border to the image and sets 4 black pixels that basically tell Android to only stretch the borders, please. 

To run it: 
node index.js 1024.png

Code is pretty simple. 

Change Notes:
Edited in March 2018 because the 9 patch images on my Pixel didn't stretch all the way into 
the upper left hand corner. So we make full rectangular images now instead of square ones that 
we expect to stretch properly.
