const { keith } = require("../keizzah/keith");
const conf = require(__dirname + "/../set");

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
