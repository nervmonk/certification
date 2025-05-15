const TelegramBot = require('node-telegram-bot-api');

const token = '7747514951:AAFFTHUqXQYjcJnJ04fmTZitjMCU8Gb9K4A';
const bot = new TelegramBot(token, {polling: false});
const chatId = '384307369';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        let output = '';
        if (i % 3 === 0) {
            output += 'Fizz';
        }
        if (i % 5 === 0) {
            output += 'Buzz';
        }
        if (output !== '') {
            bot.sendMessage(chatId, output);
        } else {
            console.log(i);
        }
        await delay(1000); // Wait 10 seconds
    }
}

// Run FizzBuzz for the first 100 numbers
// tresholdTest(10);



async function anotherTest(n) {
    for (let i = 1; i <= n; i++) {
        if(i % 50 == 0){
            bot.sendMessage(chatId, "Hello World " + i);
        }
    }
}


// const balance = 10

async function tresholdTest(balance) {
    const treshold = 5
    for (let i = 1; i <= balance; i++) {
        if(i === treshold){
            bot.sendMessage(chatId, "Treshold alert!! Remaining balance= " + i);
        }

        if(i === balance){
            bot.sendMessage(chatId, "Danger!! Run out of balance= " + i);
        }

        console.log(i);

        await delay(1000);
        
    }
}


tillaTest(30)

async function tillaTest(n){
    for(let i = 1; i <= n; i++){
        if(i % 5 == 0){
            bot.sendMessage(chatId, "Mang Ir ganteng banget cuyy " + i);
        }
        console.log(i);
        await delay(1000)
        
    }
}