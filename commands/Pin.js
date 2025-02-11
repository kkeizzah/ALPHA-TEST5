const { keith } = require("../keizzah/keith");
const { downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { exec } = require('child_process');
const { writeFile } = require("fs/promises");
const fs = require('fs-extra');
const moment = require("moment-timezone");

keith({
  nomCom: "pin",
  categorie: "Group",
  reaction: '㋛'
}, async (chatId, zk, context) => {
  const { repondre, msgRepondu, origineMessage } = context;

  // Check if the message to pin is provided
  if (!msgRepondu) {
    return repondre("Quote a message to pin");
  }

  try {
    // Pin the quoted message
    await zk.chatModify({ pin: true }, msgRepondu.key.remoteJid);
    // Send a confirmation message
    return repondre("Message successfully pinned!");
  } catch (error) {
    console.error("Error pinning message:", error);
    return repondre("Failed to pin the message.");
  }
});
