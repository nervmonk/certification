const TelegramBot = require("node-telegram-bot-api");

const token = "7747514951:AAFFTHUqXQYjcJnJ04fmTZitjMCU8Gb9K4A";
const bot = new TelegramBot(token, { polling: false });
const chatId = "384307369";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);

    if (i % 5 === 0) {
      bot.sendMessage(chatId, "We got buzz with number " + i);
    }
    await delay(1000);
  }
}

fizzBuzz(30);
