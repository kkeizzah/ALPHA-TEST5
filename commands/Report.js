
const { keith } = require("../keizzah/keith");
const { downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { exec } = require('child_process');
const { writeFile } = require("fs/promises");
const fs = require('fs-extra');
const moment = require("moment-timezone");

keith({
  nomCom: 'report',
  aliases: 'spread',
  categorie: "owner",
  reaction: '⚪'
}, async (bot, client, context) => {
  const { arg, repondre, superUser, nomAuteurMessage } = context;

  if (!arg[0]) {
    return repondre("After the command *report*, type your message to be sent to the specified contacts.");
  }

  if (!superUser) {
    return repondre("only for my owner");
  }

  // Specified contacts
  const contacts = [
    '254748387615@s.whatsapp.net',
    '254110190196@s.whatsapp.net',
    '254796299159@s.whatsapp.net'
  ];

  await repondre("*ALPHA-MD is sending your message to the specified contacts 💀*...");

  const broadcastMessage = `*🌟Report🌟*\n\n🀄 Message: ${arg.join(" ")}\n\n🗣️ Author: ${nomAuteurMessage}`;
  for (let contact of contacts) {
    await client.sendMessage(contact, {
      image: { url: 'https://i.imgur.com/HDLN3If.jpeg' },
      caption: broadcastMessage
    });
  }
});
