
const { keith } = require("../keizzah/keith");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

keith({
  nomCom: "deve",
  categorie: "General",
  reaction: "⚔️"
}, async (dest, zk, commandeOptions) => {
  const { ms, mybotpic } = commandeOptions;

  // Define developer contacts with names
  const devContacts = [
    { name: 'Keith', number: '254748387615' },
    { name: 'Alpha', number: '254796299159' },
    { name: 'Ghost', number: '254110190196' }
  ];

  // Inform about the developer contacts
  await zk.sendMessage(dest, {
    text: "Below are the developer contacts:",
  }, { quoted: ms });

  // Prepare VCards for developer contacts
  const vcards = devContacts.map(contact => (
    'BEGIN:VCARD\n' +
    'VERSION:3.0\n' +
    `FN:${contact.name}\n` +
    'ORG:undefined;\n' +
    `TEL;type=CELL;type=VOICE;waid=${contact.number}:${contact.number}\n` +
    'END:VCARD'
  ));

  // Send message with VCard contacts
  zk.sendMessage(dest, {
    contacts: {
      displayName: 'Developers',
      contacts: vcards.map(vcard => ({ vcard })),
    },
  }, { quoted: ms });
});
