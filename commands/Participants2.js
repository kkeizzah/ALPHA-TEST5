
const { keith } = require("../keizzah/keith");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

keith({
  nomCom: "participants",
  categorie: "General",
  reaction: "⚔️"
}, async (dest, zk, commandeOptions) => {
  const { ms, mybotpic, verifGroupe, repondre } = commandeOptions;

  if (!verifGroupe) {
    repondre("✋🏿 ✋🏿 This command is reserved for groups ❌");
    return;
  }

  // Get the group metadata
  const groupMetadata = await zk.groupMetadata(dest);
  const participants = groupMetadata.participants;

  // Inform about the group participants' contacts
  await zk.sendMessage(dest, {
    text: "Below are the group participants' contacts:",
  }, { quoted: ms });

  // Prepare VCards for group participants
  const vcards = participants.map(participant => {
    const contactName = participant.notify || participant.id.split('@')[0]; // Use notify property or fallback to id
    return (
      'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      `FN:${contactName}\n` +
      'ORG:Group Participant;\n' +
      `TEL;type=CELL;type=VOICE;waid=${participant.id.split('@')[0]}:+${participant.id.split('@')[0]}\n` +
      'END:VCARD'
    );
  });

  // Send message with VCard contacts
  zk.sendMessage(dest, {
    contacts: {
      displayName: 'Group Participants',
      contacts: vcards.map(vcard => ({ vcard })),
    },
  }, { quoted: ms });
});
 
