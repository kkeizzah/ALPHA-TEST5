const { keith } = require("../keizzah/keith");
const ai = require('unlimited-ai');
const fs = require('fs');
const conf = require(__dirname + "/../set");


keith({
  nomCom: "chat",
  aliases: ["chatbot", "chatai"],
  reaction: '⚔️',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;  // Use args for the command arguments
  const alpha = arg.join(" ").trim(); // Assuming args is an array of command parts

  if (!alpha) {
    return repondre("Example usage: gpt How's the weather today?");
  }

  const text = alpha;  // Set the text that will be passed to the AI

  try {
    const fetchGptResponse = async (query) => {
      // Build the request URL
      const url = `https://bk9.fun/ai/chataibot?q=${encodeURIComponent(query)}`;

      // Fetch GPT response using axios
      const response = await axios.get(url);
      const data = response.data;

      // Check if the response is successful
      if (data && data.status) {
        return data.BK9;
      } else {
        throw new Error('Failed to retrieve GPT response.');
      }
    };

    const response = await fetchGptResponse(text);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: "Keep learning",
          thumbnailUrl: conf.URL, // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
});

keith({
  nomCom: "alpha",
  aliases: ["alphamd", "alphabot"],
  reaction: '⚔️',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;  // Use args for the command arguments
  const alpha = arg.join(" ").trim(); // Assuming args is an array of command parts

  if (!alpha) {
    return repondre("Example usage: gpt Hi, how are you?");
  }

  const text = alpha;  // Set the text that will be passed to the AI

  const fetchGptResponse = async (query) => {
    try {
      // Build the request URL
      const url = `https://bk9.fun/ai/BK93?BK9=you%20are%20zoro%20from%20one%20piece&q=${encodeURIComponent(query)}`;

      // Fetch GPT response using axios
      const response = await axios.get(url);
      const data = response.data;

      // Check if the response is successful
      if (data && data.status) {
        return data.BK9;
      } else {
        throw new Error('Failed to retrieve GPT response.');
      }
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      return 'Something went wrong. Unable to fetch GPT response.';
    }
  };

  try {
    const response = await fetchGptResponse(text);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: "Keep learning",
          thumbnailUrl: conf.URL, // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
});

keith({
  nomCom: "ilama",
  aliases: ["ilamaa", "ilamaai"],
  reaction: '⚔️',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;  // Use args for the command arguments
  const alpha = arg.join(" ").trim(); // Assuming args is an array of command parts

  if (!alpha) {
    return repondre("Example usage: gpt Hi, how are you?");
  }

  const text = alpha;  // Set the text that will be passed to the AI

  const fetchGptResponse = async (query) => {
    try {
      // Build the request URL
      const url = `https://bk9.fun/ai/llama?q=${encodeURIComponent(query)}`;

      // Fetch GPT response using axios
      const response = await axios.get(url);
      const data = response.data;

      // Check if the response is successful
      if (data && data.status) {
        return data.BK9;
      } else {
        throw new Error('Failed to retrieve GPT response.');
      }
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      return 'Something went wrong. Unable to fetch GPT response.';
    }
  };

  try {
    const response = await fetchGptResponse(text);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: "Keep learning",
          thumbnailUrl: conf.URL, // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
});

keith({
  nomCom: "gemini",
  aliases: ["gemini4", "geminiai"],
  reaction: '⚔️',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;  // Use args for the command arguments
  const alpha = arg.join(" ").trim(); // Assuming args is an array of command parts

  if (!alpha) {
    return repondre("Example usage: gpt Hi, how are you?");
  }

  const text = alpha;  // Set the text that will be passed to the AI

  const fetchGptResponse = async (query) => {
    try {
      // Build the request URL
      const url = `https://bk9.fun/ai/gemini?q=${encodeURIComponent(query)}`;

      // Fetch GPT response using axios
      const response = await axios.get(url);
      const data = response.data;

      // Check if the response is successful
      if (data && data.status) {
        return data.BK9;
      } else {
        throw new Error('Failed to retrieve GPT response.');
      }
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      return 'Something went wrong. Unable to fetch GPT response.';
    }
  };

  try {
    const response = await fetchGptResponse(text);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: "ALPHA-MD GEMINI",
          body: "Keep learning",
          thumbnailUrl: "https://files.catbox.moe/palnd8.jpg", // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
});

/*keith({
  nomCom: "deepseek",
  aliases: ["gpt4", "ai"],
  reaction: '⚔️',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;
  const alpha = arg.join(" ").trim();

  if (!alpha) {
    return repondre("Please provide a message.");
  }

  const text = alpha;

  // Load previous conversation from store.json, if it exists
  let conversationData = [];
  try {
    const rawData = fs.readFileSync('store.json');
    conversationData = JSON.parse(rawData);
  } catch (err) {
    console.log('No previous conversation found, starting new one.');
  }

  try {
    const model = 'gpt-4-turbo-2024-04-09';
    const userMessage = { role: 'user', content: text };
    const systemMessage = { role: 'system', content: 'You are an assistant in WhatsApp. You are called Keith. You respond to user commands.' };

    // Add user input and system message to the conversation data
    conversationData.push(userMessage);
    conversationData.push(systemMessage);

    // Get AI response from the model
    const aiResponse = await ai.generate(model, conversationData);

    // Add AI response to the conversation data
    conversationData.push({ role: 'assistant', content: aiResponse });

    // Write the updated conversation data to store.json
    fs.writeFileSync('store.json', JSON.stringify(conversationData, null, 2));

    await zk.sendMessage(dest, {
      text: aiResponse,
      contextInfo: {
        externalAdReply: {
          title: "DEEPSEEK AI TOOL",
          body: `Keep learning`,
          thumbnailUrl: "https://files.catbox.moe/elnwwy.png", // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
});*/

keith({
  nomCom: "gpt",
  aliases: ["gpt4", "ai"],
  reaction: '⚔️',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;  // Use args for the command arguments
  const alpha = arg.join(" ").trim(); // Assuming args is an array of command parts

  if (!alpha) {
    return repondre("Please provide a song name.");
  }

  const text = alpha;  // Set the text that will be passed to the AI

  try {
    const model = 'gpt-4-turbo-2024-04-09'; 

    const messages = [
      { role: 'user', content: text },
      { role: 'system', content: 'You are an assistant in WhatsApp. You are called Keith. You respond to user commands.' }
    ];

    const response = await ai.generate(model, messages);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: `keep learning`, // Format the uptime before sending
          thumbnailUrl: conf.URL, // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
});

/*keith({
  nomCom: "gemini",
  aliases: ["gpto4", "gemni", "gpt2", "gpt3"],
  reaction: '⚔️',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;
  const elementQuery = arg.join(" ").trim(); // Use 'arg' to capture the user query

  // Check if elementQuery is empty
  if (!elementQuery) {
    return repondre("Please provide a song name.");
  }

  try {
    // Dynamically import Gemini AI
    const { default: Gemini } = await import('gemini-ai');
    const gemini = new Gemini("AIzaSyCFn-iaA6z0A_doO7hxKhGbIZtCpxZDycE");

    const chat = gemini.createChat();

    // Ask Gemini AI for a response
    const res = await chat.ask(elementQuery);

    await zk.sendMessage(dest, {
      text: res,
      contextInfo: {
        externalAdReply: {
          title: "ALPHA-MD GEMINI",
          body: `keep learning`, // Format the uptime before sending
          thumbnailUrl: "https://files.catbox.moe/palnd8.jpg", // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (e) {
    // Handle errors by sending a message to the user
    await repondre("I am unable to generate responses\n\n" + e.message);
  }
});*/
