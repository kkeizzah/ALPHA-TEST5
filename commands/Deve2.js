
const { keith } = require("../keizzah/keith");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

keith({
  nomCom: "devel",
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

  // Function to send VCard
  const sendVCard = async (contact) => {
    const vcard = 
      'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      `FN:${contact.name}\n` +
      'ORG:undefined;\n' +
      `TEL;type=CELL;type=VOICE;waid=${contact.number}:${contact.number}\n` +
      'END:VCARD';

    await zk.sendMessage(dest, {
      contacts: {
        displayName: contact.name,
        contacts: [{ vcard }]
      }
    }, { quoted: ms });
  };

  // Send each contact one by one
  for (const contact of devContacts) {
    await sendVCard(contact);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between messages
  }
});
 
