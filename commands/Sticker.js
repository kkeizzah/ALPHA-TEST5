const { keith } = require('../keizzah/keith');
const axios = require("axios");
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("../bdd/banUser");
const { addGroupToBanList, isGroupBanned, removeGroupFromBanList } = require("../bdd/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("../bdd/onlyAdmin");
const { removeSudoNumber, addSudoNumber, issudo } = require("../bdd/sudo");
//const conf = require("../set");
//const fs = require('fs');
const sleep = (ms) => {
  return new Promise((resolve) => { setTimeout(resolve, ms) });
};

keith({
  nomCom: "stickersearch",
  aliases: "ssearch",
  categorie: 'Search',
  reaction: "🍁"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg, nomAuteurMessage } = commandeOptions;

  if (!arg[0]) {
    repondre("where is the request ? !");
    return;
  }

  const gifSearchTerm = arg.join(" ");
  const tenorApiKey = "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c"; // Remplacez par votre clé d'API Tenor

  try { for ( i = 0 ; i < 5 ; i++) {
    const gif = await axios.get(
      `https://tenor.googleapis.com/v2/search?q=${gifSearchTerm}&key=${tenorApiKey}&client_key=my_project&limit=8&media_filter=gif`
    );

    const gifUrl = gif.data.results[i].media_formats.gif.url;

    
   

    // Assurez-vous de remplacer les valeurs manquantes dans la création du sticker
    const packname = nomAuteurMessage; // Remplacez par le nom de votre pack de stickers

    const stickerMess = new Sticker(gifUrl, {
      pack: packname,
      author: 'ALPHA-MD',
      type: StickerTypes.FULL,
      categories: ["🤩", "🎉"],
      id: "12345",
      quality: 60,
      background: "transparent",
    });
    const stickerBuffer2 = await stickerMess.toBuffer();
    zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms }); }
  } catch (error) {
    console.error("Erreur lors de la recherche de stickers :", error);
    repondre("Erreur lors de la recherche de stickers.");
  }
});

keith({ nomCom: "tgs", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, nomAuteurMessage, superUser } = commandeOptions;

  if (!superUser) {
    repondre('Only Mods can use this command');
    return;
  }

  // const apikey = conf.APILOLHUMAIN
  // if (apikey === null || apikey === 'null') { repondre('Veillez vérifier votre apikey ou si vous en avez pas , veiller crée un compte sur api.lolhuman.xyz et vous en procurer une.'); return; };

  if (!arg[0]) {
    repondre("Put a telegram sticker link");
    return;
  }

  let lien = arg.join(' ');

  let name = lien.split('/addstickers/')[1];

  let api = 'https://api.telegram.org/bot7025486524:AAGNJ3lMa8610p7OAIycwLtNmF9vG8GfboM/getStickerSet?name=' + encodeURIComponent(name);

  try {
    let stickers = await axios.get(api);

    let type = null;

    if (stickers.data.result.is_animated === true || stickers.data.result.is_video === true) {
      type = 'animated sticker';
    } else {
      type = 'not animated sticker';
    }

    let msg = `*Alpha Md tgsticker*

*Name:* ${stickers.data.result.name}
*Type:* ${type}
*Length:* ${(stickers.data.result.stickers).length}

Downloading...`;

    await repondre(msg);

    for (let i = 0; i < (stickers.data.result.stickers).length; i++) {
      let file = await axios.get(`https://api.telegram.org/bot7025486524:AAGNJ3lMa8610p7OAIycwLtNmF9vG8GfboM/getFile?file_id=${stickers.data.result.stickers[i].file_id}`);

      let buffer = await axios({
        method: 'get',
        url: `https://api.telegram.org/file/bot7025486524:AAGNJ3lMa8610p7OAIycwLtNmF9vG8GfboM/${file.data.result.file_path}`,
        responseType: 'arraybuffer',
      });

      const sticker = new Sticker(buffer.data, {
        pack: nomAuteurMessage,
        author: "ALPHA-MD",
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 50,
        background: '#000000'
      });

      const stickerBuffer = await sticker.toBuffer(); // Convert the sticker to a buffer

      await zk.sendMessage(
        dest,
        {
          sticker: stickerBuffer, // Use the buffer directly in the message object
        },
        { quoted: ms }
      );
    }

  } catch (e) {
    repondre("We got an error: " + e.message);
  }
});
