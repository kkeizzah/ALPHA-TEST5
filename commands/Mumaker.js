const { keith } = require("../keizzah/keith");
const mumaker = require("mumaker");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

keith({
  nomCom: "iphone",
  categorie: "Logo",
  desc: "to create a photo effect",
  reaction: "👨🏿‍💻"
}, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, ms } = commandeOptions;

  if (!msgRepondu || !msgRepondu.imageMessage) {
    return repondre("Please reply to an image with the command.");
  }

  try {
    repondre("Processing the image...");

    // Extract image URL or buffer
    const imageMessage = msgRepondu.imageMessage;
    let imageUrl = imageMessage.url;
    let imageBuffer;

    if (imageUrl) {
      // Download the image if URL is provided
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      imageBuffer = Buffer.from(response.data, 'binary');
    } else if (imageMessage.buffer) {
      // Use the buffer directly if available
      imageBuffer = imageMessage.buffer;
    } else {
      return repondre("Unable to process the image. Please ensure it's a valid image.");
    }

    // Save the image temporarily
    const tempImagePath = path.join(__dirname, 'temp_image.jpg');
    fs.writeFileSync(tempImagePath, imageBuffer);

    // Apply the effect using mumaker
    const result = await mumaker.ephoto("https://en.ephoto360.com/iphone-art-photo-frame-534.html", { image: tempImagePath });

    // Send the processed image
    await zk.sendMessage(dest, { image: { url: result.image }, caption: "*Alpha modern*" }, { quoted: ms });

    // Clean up the temporary file
    fs.unlinkSync(tempImagePath);

  } catch (error) {
    console.error("Error processing image:", error);
    repondre("An error occurred while processing the image. Please try again.");
  }
});

keith({
  nomCom: "cinema",
  categorie: "Logo",
  desc: "to create a photo effect",
  reaction: "👨🏿‍💻"
}, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, ms } = commandeOptions;

  // Check if the message contains a quoted image
  if (!msgRepondu || !msgRepondu.imageMessage) {
    return repondre("Please reply to an image with the command.");
  }

  try {
    repondre("Processing the image...");

    // Use the quoted image to apply the effect
    const result = await mumaker.ephoto(
      "https://en.ephoto360.com/cinemagraph-of-vintage-television-537.html",
      { image: msgRepondu.imageMessage.url } // Pass the image URL directly
    );

    // Send the processed image back
    await zk.sendMessage(
      dest,
      { image: { url: result.image }, caption: "*Alpha modern*" },
      { quoted: ms }
    );

  } catch (error) {
    console.error("Error processing image:", error);
    repondre("An error occurred while processing the image. Please try again.");
  }
});
