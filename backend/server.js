import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";

dotenv.config({ path: "./backend/config/config.env" });

connectDatabase(); // make sure call it after dotenv
// cloudinary connect hear in my code 
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// print a working massage on browser screen
app.get("/", (request, response) => {
  response.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TESTING  Message</title>
        <style>
            html, body {
                height: 100%;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
            }
        </style>
    </head>
    <body>
    <h1> HAR HAR MOHADEV </h1> 
    <br>
    <h4>Working</h4>
    </body>
    </html>
  `);
});



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT} `);
});
