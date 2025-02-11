
const { keith } = require("../keizzah/keith");
const { downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { exec } = require('child_process');
const { writeFile } = require("fs/promises");
const fs = require('fs-extra');
const moment = require("moment-timezone");

keith({
  nomCom: 'reportgc',
  aliases: 'spread',
  categorie: "owner",
  reaction: '⚪'
}, async (bot, client, context) => {
  const { arg, repondre, superUser, nomAuteurMessage, origineMessage, verifGroupe } = context;

  if (!verifGroupe) {
    return repondre("This command works in groups only");
  }

  if (!arg[0]) {
    return repondre("After the command *broadcast*, type your message to be sent to all group participants in their inbox.");
  }

  if (!superUser) {
    return repondre("You are too weak to do that");
  }

  await repondre("*ALPHA-MD is sending your message to group participants 💀*...");

  const broadcastMessage = `*🌟Report🌟*\n\n🀄 Message: ${arg.join(" ")}\n\n🗣️ Author: ${nomAuteurMessage}`;

  // Fetch participants of the specific group where the command is issued
  const groupMetadata = await client.groupMetadata(origineMessage);
  const participants = groupMetadata.participants.map(participant => participant.id);

  for (let participant of participants) {
    await client.sendMessage(participant, {
      image: { url: 'https://i.imgur.com/HDLN3If.jpeg' },
      caption: broadcastMessage
    });
  }
});
