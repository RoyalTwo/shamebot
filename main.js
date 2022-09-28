import * as dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const resMessagesFile = fs.readFileSync('./messages.json', 'utf-8');
const resMessagesObj = JSON.parse(resMessagesFile);
const resHeader = (resMessagesObj.header).join(' ');
const resMessages = resMessagesObj.content;

let lastMessage = null;
let countChan = null;
let countDisc = null;

client.once('ready', async () => {
    console.log('Ready!');

    // remove and switch to database
    // hyland server channels
    countChan = await client.channels.fetch('1007371696212279356');
    countDisc = await client.channels.fetch('1022161639040102451');

    // testing server channels
    /* countChan = await client.channels.fetch('1004202416314515466');
    countDisc = await client.channels.fetch('1003409641130164234'); */

    const lastMessageCollection = await countChan.messages.fetch({ limit: 1 });
    lastMessage = lastMessageCollection.first();
});

client.on("messageCreate", async msg => {
    if (msg.author.bot) return;
    if (msg.channelId == countChan.id) {
        if (msg.content == (parseInt(lastMessage.content) + 1) && lastMessage.author.username != msg.author.username) {
            lastMessage = msg;
        }
        else {
            msg.delete()
                .then(deletedMsg => {
                    console.log(deletedMsg.content[0]);
                    // behold the river of if statements
                    if (lastMessage.author.username == msg.author.username) {
                        let rand = Math.floor(Math.random() * (resMessages.sameAuthor.length - 1));
                        countDisc.send(`${transformHeader(deletedMsg)}
                        ${resMessages.sameAuthor[rand]}`);
                        return;
                    }
                    if (msg.content == parseInt(lastMessage.content)) {
                        let rand = Math.floor(Math.random() * (resMessages.takenNum.length - 1));
                        countDisc.send(`${transformHeader(deletedMsg)}
                        ${resMessages.takenNum[rand]}`);
                        return;
                    }
                    if (deletedMsg.content[0] == "0") {
                        let rand = Math.floor(Math.random() * (resMessages.leadingZero.length - 1));
                        countDisc.send(`${transformHeader(deletedMsg)} ${resMessages.takenNum[rand]}`);
                        return;
                    }
                    if (parseInt(msg.content)) {
                        let rand = Math.floor(Math.random() * (resMessages.wrongNum.length - 1));
                        countDisc.send(`${transformHeader(deletedMsg)}
                        ${resMessages.wrongNum[rand]}`);
                        return;
                    }

                    let rand = Math.floor(Math.random() * (resMessages.notNum.length - 1));
                    countDisc.send(`${transformHeader(deletedMsg)}
                    ${resMessages.notNum[rand]}`);

                    console.log(`Deleted message from ${deletedMsg.author.username}`);
                })
                .catch(console.error);
        }
    }
});

function transformHeader(msg) {
    let newString = resHeader.replace('{AUTHOR}', msg.author);
    newString = newString.replace('{MSG}', msg.content);
    return newString;
}

// eslint-disable-next-line no-undef
client.login(process.env.BOT_TOKEN);