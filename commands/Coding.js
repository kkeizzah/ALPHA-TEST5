
const cheerio = require('cheerio');
const { keith } = require("../keizzah/keith");
const { default: axios } = require("axios");
const { mediafireDl } = require("../keizzah/dl/Function");

keith({
  nomCom: "scrap",
  aliases: ["get", "find"],
  categorie: "coding",
  reaction: '🛄',
}, async (sender, zk, context) => {
  const { repondre: sendResponse, arg: args } = context;
  const urlInput = args.join(" ");

  // Check if URL starts with http:// or https://
  if (!/^https?:\/\//.test(urlInput)) {
    return sendResponse("Start the *URL* with http:// or https://");
  }

  try {
    const url = new URL(urlInput);
    const fetchUrl = `${url.origin}${url.pathname}?${url.searchParams.toString()}`;
    
    // Fetch the URL content
    const response = await fetch(fetchUrl);

    // Check if the response is okay
    if (!response.ok) {
      return sendResponse(`Failed to fetch the URL. Status: ${response.status} ${response.statusText}`);
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 104857600) {
      return sendResponse(`Content-Length exceeds the limit: ${contentLength}`);
    }

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    // Fetch the response as a buffer
    const buffer = Buffer.from(await response.arrayBuffer());

    // Handle different content types
    if (/image\/.*/.test(contentType)) {
      // Send image message
      await zk.sendMessage(sender, {
        image: { url: fetchUrl },
        caption: "> > *ALPHA MD*"
      }, { quoted: context.ms });
    } else if (/video\/.*/.test(contentType)) {
      // Send video message
      await zk.sendMessage(sender, {
        video: { url: fetchUrl },
        caption: "> > *ALPHA MD*"
      }, { quoted: context.ms });
    } else if (/text|json/.test(contentType)) {
      try {
        // Try parsing the content as JSON
        const json = JSON.parse(buffer);
        console.log("Parsed JSON:", json);
        sendResponse(JSON.stringify(json, null, 2).slice(0, 10000)); // Limit response size to 10000 characters
      } catch {
        // If parsing fails, send the raw text response
        sendResponse(buffer.toString().slice(0, 10000)); // Limit response size to 10000 characters
      }
    } else {
      // Send other types of documents
      await zk.sendMessage(sender, {
        document: { url: fetchUrl },
        caption: "> > *ALPHA MD*"
      }, { quoted: context.ms });
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    sendResponse(`Error fetching data: ${error.message}`);
  }
});
keith({
  nomCom: "web",
  aliases: ["inspectweb", "webinspect", "webscrap"],
  categorie: "coding",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg[0]) {
    return repondre('Provide a valid web link to fetch! The bot will crawl the website and fetch its HTML, CSS, JavaScript, and any media embedded in it!');
  }

  if (!arg[0].includes('https://')) {
    return repondre("That is not a valid link.");
  }

  try {
    // Use axios to fetch the webpage
    const response = await axios.get(arg[0]);
    const html = response.data;
    const $ = cheerio.load(html);

    const mediaFiles = [];
    $('img[src], video[src], audio[src]').each((i, element) => {
      let src = $(element).attr('src');
      if (src) {
        mediaFiles.push(src);
      }
    });

    const cssFiles = [];
    $('link[rel="stylesheet"]').each((i, element) => {
      let href = $(element).attr('href');
      if (href) {
        cssFiles.push(href);
      }
    });

    const jsFiles = [];
    $('script[src]').each((i, element) => {
      let src = $(element).attr('src');
      if (src) {
        jsFiles.push(src);
      }
    });

    await repondre(`**Full HTML Content**:\n\n${html}`);

    if (cssFiles.length > 0) {
      for (const cssFile of cssFiles) {
        const cssResponse = await axios.get(new URL(cssFile, arg[0]));
        const cssContent = cssResponse.data;
        await repondre(`**CSS File Content**:\n\n${cssContent}`);
      }
    } else {
      await repondre("No external CSS files found.");
    }

    if (jsFiles.length > 0) {
      for (const jsFile of jsFiles) {
        const jsResponse = await axios.get(new URL(jsFile, arg[0]));
        const jsContent = jsResponse.data;
        await repondre(`**JavaScript File Content**:\n\n${jsContent}`);
      }
    } else {
      await repondre("No external JavaScript files found.");
    }

    if (mediaFiles.length > 0) {
      await repondre(`**Media Files Found**:\n${mediaFiles.join('\n')}`);
    } else {
      await repondre("No media files (images, videos, audios) found.");
    }

  } catch (error) {
    console.error(error);
    // Return error in response
    return repondre(`An error occurred while fetching the website content: ${error.message}`);
  }
});
