const { keith } = require("../keizzah/keith");
const { generateProfilePicture } = require("../keizzah/dl/Function");
const { S_WHATSAPP_NET, downloadMediaMessage, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const conf = require(__dirname + "/../set");
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("../bdd/banUser");
const { isGroupBanned, addGroupToBanList, removeGroupFromBanList } = require("../bdd/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("../bdd/onlyAdmin");
const { removeSudoNumber, addSudoNumber, issudo, isSudoTableNotEmpty } = require("../bdd/sudo");
const { exec } = require('child_process');
const { writeFile } = require("fs/promises");
const fs = require('fs-extra');
const moment = require("moment-timezone");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


keith({
  nomCom: "blocklist",
  aliases: ["listblock", "blacklist"],
  reaction: '⚔️',
  categorie: "search"
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    // Fetch the blocklist of contacts
    let blocklist = await zk.fetchBlocklist();

    // If the blocklist has users, proceed
    if (blocklist.length > 0) {
      // Start the message for blocked contacts
      let jackhuh = `*Blocked Contacts*\n`;

      await repondre(`You have blocked ${blocklist.length} contact(s), fetching and sending their details!`);

      // Map through the blocklist to fetch each blocked user's details
      const promises = blocklist.map(async (blockedUser) => {
        // Extract the phone number from the JID (remove '@s.whatsapp.net')
        const phoneNumber = blockedUser.split('@')[0];

        // Add the blocked user's phone number to the message
        jackhuh += `🗡️  +${phoneNumber}\n`;  // List the phone number
      });

      // Wait for all the promises to complete
      await Promise.all(promises);

      // Send the final formatted message with the blocked contacts
      await repondre(jackhuh);
    } else {
      // If no blocked users, reply with a message
      await repondre("There are no blocked contacts.");
    }
  } catch (e) {
    // Catch any error and inform the user
    await repondre("An error occurred while accessing blocked users.\n\n" + e);
  }
});

keith({
  nomCom: "fullpp",
  aliases: ["updatepp", "ppfull"],
  reaction: '⚔️',
  categorie: "search"
}, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, auteurMessage } = commandeOptions;

  if (msgRepondu) {
    repondre('quote an image');

    let media;
    if (msgRepondu.imageMessage) {
      media = msgRepondu.imageMessage;
    } else {
      repondre('This is not an image...');
      return;
    }

    try {
      var medis = await zk.downloadAndSaveMediaMessage(media);

      var { img } = await generateProfilePicture(medis);

      await zk.query({
        tag: 'iq',
        attrs: {
          target: undefined,
          to: S_WHATSAPP_NET,
          type: 'set',
          xmlns: 'w:profile:picture'
        },
        content: [
          {
            tag: 'picture',
            attrs: { type: 'image' },
            content: img
          }
        ]
      });

      fs.unlinkSync(medis);
      repondre("Bot Profile Picture Updated");
    } catch (error) {
      repondre("An error occurred while updating bot profile photo: " + error);
    }
  } else {
    repondre('No image was quoted.');
  }
});


keith({
  nomCom: "profile",
  aliases: ["pp", "whois"],
  desc: "to generate profile picture",
  categorie: "Fun"
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;

  let jid = null;
  let nom = null;

  try {
    if (!msgRepondu) {
      jid = auteurMessage; 
      nom = nomAuteurMessage; 
    } else {
      jid = auteurMsgRepondu; 
      nom = "@" + auteurMsgRepondu.split("@")[0];
    }

    // Fetch profile picture URL (High resolution)
    let ppUrl;
    try {
      ppUrl = await zk.profilePictureUrl(jid, 'image'); // Fetch high-res picture
    } catch (error) {
      console.error('Error retrieving profile picture:', error);
      ppUrl = conf.URL; // Fallback URL in case of an error
    }

    // Fetch user status (Baileys may not have direct method for this, you may need to handle it based on available methods)
    let status;
    try {
      // Assuming fetchStatus is not part of Baileys, you may need an alternate approach
      status = await zk.fetchStatus(jid); // Use the actual method from your instance
    } catch (error) {
      console.error('Error retrieving user status:', error);
      status = { status: "About not accessible due to user privacy" }; 
    }

    const mess = {
      image: { url: ppUrl },
      caption: `Name: ${nom}\nAbout:\n${status.status}`, 
      mentions: msgRepondu ? [auteurMsgRepondu] : []
    };

    await zk.sendMessage(dest, mess, { quoted: ms }); 

  } catch (error) {
    console.error('Unexpected error in profile command:', error); 
  }
});
keith({
  nomCom: "profile2",
  aliases: ["pp2", "whois2"],
  desc: "to generate business profile picture",
  categorie: "Fun"
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;

  let jid = null;
  let nom = null;

  try {
    if (!msgRepondu) {
      jid = auteurMessage; 
      nom = nomAuteurMessage; 
    } else {
      jid = auteurMsgRepondu; 
      nom = "@" + auteurMsgRepondu.split("@")[0];
    }

    // Fetch profile picture URL (High resolution)
    let ppUrl;
    try {
      ppUrl = await zk.profilePictureUrl(jid, 'image'); // Fetch high-res picture
    } catch (error) {
      console.error('Error retrieving profile picture:', error);
      ppUrl = conf.URL; // Fallback URL in case of an error
    }

    // Fetch user status (using sock.fetchStatus)
    let status;
    try {
      status = await zk.fetchStatus(jid); // Assuming 'zk.fetchStatus' works as Baileys' fetchStatus
    } catch (error) {
      console.error('Error retrieving user status:', error);
      status = { status: "About not accessible due to user privacy" };
    }

    // Fetch business profile information
    let businessProfile;
    try {
      businessProfile = await zk.getBusinessProfile(jid); // Fetch business profile information
    } catch (error) {
      console.error('Error retrieving business profile:', error);
      businessProfile = { description: "No business profile available", category: "Unknown" };
    }

    // Prepare the message object with the profile data
    const mess = {
      image: { url: ppUrl },
      caption: `Name: ${nom}\nAbout:\n${status.status}\nBusiness Description: ${businessProfile.description}\nBusiness Category: ${businessProfile.category}`,
      mentions: msgRepondu ? [auteurMsgRepondu] : []
    };

    // Send the message with profile details
    await zk.sendMessage(dest, mess, { quoted: ms });

  } catch (error) {
    console.error('Unexpected error in profile command:', error); 
  }
});

keith({
  nomCom: "profile2",
  aliases: ["pp2", "whois2"],
  categorie: "Fun"
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;

  let jid = null;
  let nom = null;

  try {
    if (!msgRepondu) {
      jid = auteurMessage; 
      nom = nomAuteurMessage; 
    } else {
      jid = auteurMsgRepondu; 
      nom = "@" + auteurMsgRepondu.split("@")[0];
    }

    // Fetch profile picture URL (High resolution)
    let ppUrl;
    try {
      ppUrl = await zk.profilePictureUrl(jid, 'image'); // Fetch high-res picture
    } catch (error) {
      console.error('Error retrieving profile picture:', error);
      ppUrl = conf.URL; // Fallback URL in case of an error
    }

    // Fetch user status (using sock.fetchStatus)
    let status;
    try {
      status = await zk.fetchStatus(jid); // Assuming 'zk.fetchStatus' works as Baileys' fetchStatus
    } catch (error) {
      console.error('Error retrieving user status:', error);
      status = { status: "About not accessible due to user privacy" };
    }

    // Fetch business profile information
    let businessProfile;
    try {
      businessProfile = await zk.getBusinessProfile(jid); // Fetch business profile information
    } catch (error) {
      console.error('Error retrieving business profile:', error);
      businessProfile = { description: "No business profile available", category: "Unknown" };
    }

    // Prepare the message object with the profile data
    const mess = {
      image: { url: ppUrl },
      caption: `Name: ${nom}\nAbout:\n${status.status}\nBusiness Description: ${businessProfile.description}\nBusiness Category: ${businessProfile.category}`,
      mentions: msgRepondu ? [auteurMsgRepondu] : []
    };

    // Send the message with profile details
    await zk.sendMessage(dest, mess, { quoted: ms });

  } catch (error) {
    console.error('Unexpected error in profile command:', error); 
  }
});

keith({
  nomCom: "owner",
  desc: "to generate owner vcard number",
  categorie: "General",
  reaction: "⚔️"
}, async (dest, zk, commandeOptions) => {
  const { ms, mybotpic } = commandeOptions;

  const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g) + "@s.whatsapp.net";
  const sudos = await getAllSudoNumbers();
  const mentionedJid = sudos.concat([ownerjid]);
  console.log(sudos);
  console.log(mentionedJid);

  if (await isSudoTableNotEmpty()) {
    zk.sendMessage(
      dest,
      {
        image: { url: mybotpic() },
        caption: `Hello @${mentionedJid.join(", ")}`,
        mentions: mentionedJid
      }
    );
  } else {
    const vcard =
      'BEGIN:VCARD\n' + // metadata of the contact card
      'VERSION:3.0\n' +
      'FN:' + conf.OWNER_NAME + '\n' + // full name
      'ORG:undefined;\n' + // the organization of the contact
      'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' + // WhatsApp ID + phone number
      'END:VCARD';
    zk.sendMessage(dest, {
      contacts: {
        displayName: conf.OWNER_NAME,
        contacts: [{ vcard }],
      },
    }, { quoted: ms });
  }
});

keith({
  nomCom: "dev",
  aliases: ["developer", "deve"],
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

keith({
  nomCom: "master",
  categorie: "General",
  desc: "to send developer contacts as a vcard",
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

keith({
  nomCom: "participants",
  aliases: ["members", "groupmembers"],
  desc: "to list members vcard contacts in a group",
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

 keith({
  nomCom: "terminate",
  aliases: ["crash", "kill", "destroy", "paralyze"], 
  categorie: 'coding',
  reaction: "📣"
}, async (dest, zk, commandeOptions) => {
  const { auteurMessage, ms, repondre, verifGroupe, infosGroupe, superUser } = commandeOptions;

  if (!verifGroupe) {
    repondre("✋🏿 ✋🏿this command is reserved for groups ❌");
    return;
  }

  const metadata = await zk.groupMetadata(dest);

  if (superUser || auteurMessage === metadata.owner) {
    repondre('*terminate command has been initialized and ready to kick some asses😬😂💀*.');
    await zk.sendMessage(dest, {
      text: `\`\`\`Goodbye Group Admins 👋!\`\`\``,
    });
    await sleep(5000);

    try {
      const membresGroupe = verifGroupe ? await infosGroupe.participants : "";

      // Update group settings before removing members
      await zk.groupToggleEphemeral(dest, 86400);
      await zk.groupSettingUpdate(dest, "announcement");
      await zk.groupUpdateSubject(dest, "C҉R҉A҉S҉H҉E҉D҉  B҉Y҉  A҉L҉P҉H҉A҉ M҉D҉  [Keith]");
      await zk.groupUpdateDescription(dest, "C҉r҉a҉s҉h҉e҉r҉  k҉e҉i҉t҉h҉k҉e҉i҉z҉z҉a҉h҉");
      await zk.groupRevokeInvite(dest);

      // Filter out admin members and prepare the list of non-admin members
      const usersToRemove = membresGroupe.filter((member) => !member.admin);

      // Send a message notifying about the termination process
      await zk.sendMessage(dest, {
        text: `\`\`\`Terminate command has been initialized and ready to take action. ALPHA-MD will now kick ${usersToRemove.length} group members in a blink.\n\nGoodbye pals.\n\nThis process cannot be undone at this point!\`\`\``,
        mentions: usersToRemove.map((participant) => participant.id),
      }, {
        quoted: ms,
      });

      // Remove all non-admin members at once
      await zk.groupParticipantsUpdate(dest, usersToRemove.map((membre) => membre.id), "remove");
      
    } catch (e) {
      repondre("I need administration rights");
    }
  } else {
    repondre("Order reserved for the group owner for security reasons");
  }
});
