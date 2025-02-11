const { keith } = require("../keizzah/keith");
const axios = require("axios");

keith({
  nomCom: "quotet",
  categorie: "modern-logo",
  reaction: "✋"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, msgRepondu } = commandeOptions;
  const text = arg.join(" ");
  if (msgRepondu) {
    console.log(msgRepondu);

    // Check if there's no image message
    if (!msgRepondu.imageMessage) {
      repondre("Please quote an image.");
      return;
    }

    try {
      // Message content
      const messageText = `Reply with below numbers to generate logo

1 ➠ sweet love 💕😘
2 ➠ lightning pubg
3 ➠ intro video 📷
4 ➠ tiger 🐯 video logo

*Enjoy 😂*`;

      const contextInfo = {
        mentionedJid: [ms.sender], // Mention the sender
        externalAdReply: {
          title: "𝗔𝗟𝗣𝗛𝗔 𝗠𝗗",
          body: "Regards, Keithkeizzah",
          thumbnailUrl: "https://files.catbox.moe/09c9r1.jpg",
          sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      };

      const messageToSend = {
        text: messageText,
        contextInfo,
      };

      // Send the message
      const sentMessage = await zk.sendMessage(dest, messageToSend, { quoted: ms });

      // Event listener for message responses
      zk.ev.on('messages.upsert', async (update) => {
        const message = update.messages[0];
        if (!message.message || !message.message.extendedTextMessage) {
          return;
        }

        const responseText = message.message.extendedTextMessage.text.trim();
        if (message.message.extendedTextMessage.contextInfo && message.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
          // Handle different logo choices based on number
          let logoUrl;
          switch (responseText) {
            case '1':
              logoUrl = await fetchLogoUrl("https://en.ephoto360.com/cinemagraph-of-vintage-television-537.html", msgRepondu.imageMessage);
              break;
            case '2':
              logoUrl = await fetchLogoUrl("https://en.ephoto360.com/cinemagraph-of-vintage-television-537.html", msgRepondu.imageMessage);
              break;
            case '3':
              logoUrl = await fetchLogoUrl("https://en.ephoto360.com/cinemagraph-of-vintage-television-537.html", msgRepondu.imageMessage);
              break;
            case '4':
              logoUrl = await fetchLogoUrl("https://en.ephoto360.com/iphone-art-photo-frame-534.html", msgRepondu.imageMessage);
              break;
            // Add additional cases as required
            default:
              return repondre("*_Invalid number. Please reply with a valid number._*");
          }

          // Send the logo if URL is found
          if (logoUrl) {
            await zk.sendMessage(dest, {
              image: { url: logoUrl },
              caption: `*Downloaded by Alpha Md*`,
            }, { quoted: ms });
          }
        }
      });
    } catch (error) {
      console.log(error);
      repondre(`Error: ${error}`);
    }
  }
});

// Function to fetch the logo URL using axios
const fetchLogoUrl = async (url, imageMessage) => {
  try {
    const response = await axios.get(`https://api-pink-venom.vercel.app/api/logo`, {
      params: { url, imageMessage }
    });
    console.log(response.data); // Log full API response for debugging

    // Check if the response contains the correct structure
    if (response.data.result && response.data.result.download_url) {
      return response.data.result.download_url;
    } else {
      console.error("No download_url found in API response");
      return null;
    }
  } catch (error) {
    console.error("Error fetching logo:", error);
    return null;
  }
};
