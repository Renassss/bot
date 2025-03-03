// const TelegramBot = require('node-telegram-bot-api');
// const axios = require('axios');

// // Replace with your Telegram bot token from BotFather
// const TELEGRAM_BOT_TOKEN = '7757718708:AAGfRSFfClsSQiXTnGWD2shlen9du9Fe3kM';
// const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// let chatId = null;
// let previousPrice = null; // Variable to store the previous price
// let lowPrice = null;      // Variable to store the low price
// let highPrice = null;     // Variable to store the high price
// let showPriceUpdates = true; // Variable to control whether price updates should be shown

// // When you start the bot, it will store your chat ID
// bot.on('message', (msg) => {
//     chatId = msg.chat.id;
//     bot.sendMessage(chatId, '✅ Bot started! I will now send you updates on price changes when transactions occur.\nTo set a low price, use /setLowPrice <price>\nTo set a high price, use /setHighPrice <price>.\nTo toggle price updates, use /showPriceUpdates to enable/disable.');
//     startPolling();
// });

// // Command to set the low price
// bot.onText(/\/setLowPrice (\d+(\.\d+)?)/, (msg, match) => {
//     const newLowPrice = parseFloat(match[1]);
//     lowPrice = newLowPrice;
//     bot.sendMessage(chatId, `✅ Low price set to $${newLowPrice}`);
// });

// // Command to set the high price
// bot.onText(/\/setHighPrice (\d+(\.\d+)?)/, (msg, match) => {
//     const newHighPrice = parseFloat(match[1]);
//     highPrice = newHighPrice;
//     bot.sendMessage(chatId, `✅ High price set to $${newHighPrice}`);
// });

// // Command to unset the low price (reset it to null)
// bot.onText(/\/unsetLowPrice/, (msg) => {
//     lowPrice = null;
//     bot.sendMessage(chatId, '✅ Low price has been unset. No more alerts for the low price.');
// });

// // Command to unset the high price (reset it to null)
// bot.onText(/\/unsetHighPrice/, (msg) => {
//     highPrice = null;
//     bot.sendMessage(chatId, '✅ High price has been unset. No more alerts for the high price.');
// });

// // Command to toggle price updates on/off
// bot.onText(/\/showPriceUpdates/, (msg) => {
//     showPriceUpdates = !showPriceUpdates;
//     const status = showPriceUpdates ? "enabled" : "disabled";
//     bot.sendMessage(chatId, `✅ Price update notifications are now ${status}.`);
// });

// // Function to fetch data from OKX API
// async function fetchPairData() {
//     const url = `https://api.dexscreener.com/latest/dex/tokens/0x8B9ABDD229ec0C4A28E01b91aacdC5dAAFc25C2b`;

//     try {
//         const response = await axios.get(url);
//         console.log('BNB Price:', response.data.pairs[0]);
//         return response.data.pairs[0]; // Extracting the relevant data
//     } catch (error) {
//         console.error('Error fetching data:', error.message);
//         return null;
//     }
// }


// // Function to start polling
// function startPolling() {
//     setInterval(async () => {
//         if (!chatId) return;

//         const data = await fetchPairData();
//         console.log

//         if (data) {
//             const currentPrice = parseFloat(data.priceUsd); // Current price from OKX API

//             // If the price has changed and price updates are enabled, send a message
//             if (previousPrice !== null && currentPrice !== previousPrice && showPriceUpdates) {
//                 // Send a price update message
//                 const priceUpdateMessage =
// `💲 Price Update:
// 📊 New Price: $${currentPrice.toFixed(8)}`;

//                 bot.sendMessage(chatId, priceUpdateMessage);

//                 // Check if the price reached the low price
//                 if (lowPrice !== null && currentPrice <= lowPrice) {
//                     const lowPriceMessage =
// `🚨 Low Price Reached:
// 💲 Price: $${currentPrice.toFixed(8)}
// ✅ The price has dropped below your target of $${lowPrice.toFixed(8)}!`;

//                     bot.sendMessage(chatId, lowPriceMessage);
//                 }

//                 // Check if the price reached the high price
//                 if (highPrice !== null && currentPrice >= highPrice) {
//                     const highPriceMessage =
// `🚨 High Price Reached:
// 💲 Price: $${currentPrice.toFixed(8)}
// ✅ The price has risen above your target of $${highPrice.toFixed(8)}!`;

//                     bot.sendMessage(chatId, highPriceMessage);
//                 }
//             }

//             // Update the previous price with the current price
//             previousPrice = currentPrice;
//         } else {
//             console.log('No pair data found');
//         }
//     }, 1000); // Poll every 1 second (adjust as needed)
// }



// const axios = require('axios');
// const crypto = require('crypto');

// // OKX API Credentials (Replace with your actual keys)
// const OKX_API_KEY = '6f27386c-6b13-46a3-8176-a23f84fc4d03';
// const OKX_SECRET_KEY = '0D8CCD068DC957C08BB86494864A72CB';
// const OKX_PASSPHRASE = 'Sixp@666';

// // Function to generate the OK-ACCESS-SIGN header
// function generateSignature(timestamp, method, requestPath, body) {
//     const prehash = timestamp + method + requestPath + (body ? JSON.stringify(body) : '');
//     return crypto.createHmac('sha256', OKX_SECRET_KEY).update(prehash).digest('base64');
// }

// // Function to fetch real-time token price
// async function fetchTokenPrice(chainIndex, tokenAddress) {
//     const url = '/api/v5/wallet/token/current-price'; // OKX API Path
//     const baseUrl = 'https://www.okx.com';

//     const requestBody = [
//         {
//             chainIndex: chainIndex,
//             tokenAddress: tokenAddress
//         }
//     ];

//     const timestamp = new Date().toISOString();
//     const signature = generateSignature(timestamp, 'POST', url, requestBody);

//     const headers = {
//         'Content-Type': 'application/json',
//         'OK-ACCESS-KEY': OKX_API_KEY,
//         'OK-ACCESS-SIGN': signature,
//         'OK-ACCESS-TIMESTAMP': timestamp,
//         'OK-ACCESS-PASSPHRASE': OKX_PASSPHRASE
//     };

//     try {
//         const response = await axios.post(baseUrl + url, requestBody, { headers });
//         console.log('Response:', response.data);

//         if (response.data.code === '0') {
//             const priceData = response.data.data[0];
//             console.log('Token Price:', priceData.price);
//             return parseFloat(priceData.price);
//         } else {
//             console.error('Error:', response.data.msg);
//             return null;
//         }
//     } catch (error) {
//         console.error('Request Error:', error.response?.data || error.message);
//         return null;
//     }
// }


// fetchTokenPrice(56, '0xf117DFCB241c0003d5e2FC72F288755C17a46980'); // Wrapped BNB on BSC



//// this ONE WORKS WELLLLLLL

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const crypto = require('crypto');

// Replace with your Telegram bot token from BotFather
const TELEGRAM_BOT_TOKEN = '7757718708:AAGfRSFfClsSQiXTnGWD2shlen9du9Fe3kM';
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// OKX API Credentials
const OKX_API_KEY = '6f27386c-6b13-46a3-8176-a23f84fc4d03';
const OKX_SECRET_KEY = '0D8CCD068DC957C08BB86494864A72CB';
const OKX_PASSPHRASE = 'Sixp@666';

// Function to generate the OK-ACCESS-SIGN header
function generateSignature(timestamp, method, requestPath, body) {
    const prehash = timestamp + method + requestPath + (body ? JSON.stringify(body) : '');
    return crypto.createHmac('sha256', OKX_SECRET_KEY).update(prehash).digest('base64');
}

// Function to fetch token price from OKX API
async function fetchTokenPrice(chainIndex, tokenAddress) {
    const url = '/api/v5/wallet/token/real-time-price'; // OKX API Path
    const baseUrl = 'https://www.okx.com';

    const requestBody = [
        {
            chainIndex: chainIndex,
            tokenAddress: tokenAddress
        }
    ];

    const timestamp = new Date().toISOString();
    const signature = generateSignature(timestamp, 'POST', url, requestBody);

    const headers = {
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': OKX_API_KEY,
        'OK-ACCESS-SIGN': signature,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': OKX_PASSPHRASE
    };

    try {
        const response = await axios.post(baseUrl + url, requestBody, { headers });
        console.log('Response:', response.data);

        if (response.data.code === '0') {
            const priceData = response.data.data[0];
            console.log('Token Price:', priceData.price);
            return parseFloat(priceData.price);
        } else {
            console.error('Error:', response.data.msg);
            return null;
        }
    } catch (error) {
        console.error('Request Error:', error.response?.data || error.message);
        return null;
    }
}

// Telegram bot setup
let chatId = null;
let previousPrice = null; // Variable to store the previous price
let lowPrice = null;      // Variable to store the low price
let highPrice = null;     // Variable to store the high price
let showPriceUpdates = true; // Variable to control whether price updates should be shown

// When you start the bot, it will store your chat ID
bot.on('message', (msg) => {
    chatId = msg.chat.id;
    bot.sendMessage(chatId, '✅ Bot started! I will now send you updates on price changes when transactions occur.\nTo set a low price, use /setLowPrice <price>\nTo set a high price, use /setHighPrice <price>.\nTo toggle price updates, use /showPriceUpdates to enable/disable.');
    startPolling();
});

// Command to set the low price
bot.onText(/\/setLowPrice (\d+(\.\d+)?)/, (msg, match) => {
    const newLowPrice = parseFloat(match[1]);
    lowPrice = newLowPrice;
    bot.sendMessage(chatId, `✅ Low price set to $${newLowPrice}`);
});

// Command to set the high price
bot.onText(/\/setHighPrice (\d+(\.\d+)?)/, (msg, match) => {
    const newHighPrice = parseFloat(match[1]);
    highPrice = newHighPrice;
    bot.sendMessage(chatId, `✅ High price set to $${newHighPrice}`);
});

// Command to unset the low price (reset it to null)
bot.onText(/\/unsetLowPrice/, (msg) => {
    lowPrice = null;
    bot.sendMessage(chatId, '✅ Low price has been unset. No more alerts for the low price.');
});

// Command to unset the high price (reset it to null)
bot.onText(/\/unsetHighPrice/, (msg) => {
    highPrice = null;
    bot.sendMessage(chatId, '✅ High price has been unset. No more alerts for the high price.');
});

// Command to toggle price updates on/off
bot.onText(/\/showPriceUpdates/, (msg) => {
    showPriceUpdates = !showPriceUpdates;
    const status = showPriceUpdates ? "enabled" : "disabled";
    bot.sendMessage(chatId, `✅ Price update notifications are now ${status}.`);
});

// Function to start polling
function startPolling() {
    setInterval(async () => {
        if (!chatId) return;

        // Fetch the token price from OKX
        const currentPrice = await fetchTokenPrice(56, '0xf117dfcb241c0003d5e2fc72f288755c17a46980'); 

        if (currentPrice !== null) {
            console.log('Current Price:', currentPrice);

            // If the price has changed and price updates are enabled, send a message
            if (previousPrice !== null && currentPrice !== previousPrice && showPriceUpdates) {
                const priceUpdateMessage =
`
Price: $${currentPrice.toFixed(4)}`;

                bot.sendMessage(chatId, priceUpdateMessage);

                // Check if the price reached the low price
                if (lowPrice !== null && currentPrice <= lowPrice) {
                    const lowPriceMessage =
`🚨 Low Price Reached:
💲 Price: $${currentPrice.toFixed(4)}
✅ The price has dropped below your target of $${lowPrice.toFixed(4)}!`;

                    bot.sendMessage(chatId, lowPriceMessage);
                }

                // Check if the price reached the high price
                if (highPrice !== null && currentPrice >= highPrice) {
                    const highPriceMessage =
`🚨 High Price Reached:
💲 Price: $${currentPrice.toFixed(4)}
✅ The price has risen above your target of $${highPrice.toFixed(4)}!`;

                    bot.sendMessage(chatId, highPriceMessage);
                }
            }

            // Update the previous price with the current price
            previousPrice = currentPrice;
        } else {
            console.log('No token price found');
        }
    }, 1000); // Poll every 1 second (adjust as needed)
}

// Start the bot


