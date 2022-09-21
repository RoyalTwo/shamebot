import * as dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});


let lastMessage = null;
let countChan = null;
let countDisc = null;

client.once('ready', async () => {
    console.log('Ready!');
    countChan = await client.channels.fetch('1007371696212279356');
    countDisc = await client.channels.fetch('1022161639040102451')

    const lastMessageCollection = await countChan.messages.fetch({ limit: 1 })
    lastMessage = lastMessageCollection.first()
});

// should use separate files but it's a simple bot
client.on("messageCreate", async msg => {
    if (msg.author.bot) return;
    if (msg.channelId == countChan.id) {
        // this is the worst code i have ever written, perfect
        // only works with a single server, and has to be reset if it ever goes down
        // or as i like to call it, "well-designed"
        if (msg.content == (parseInt(lastMessage.content) + 1)) {
            console.log('its fine');
            lastMessage = msg;
        }
        else {
            msg.delete()
                .then(deletedMsg => {
                    console.log(`Deleted message from ${deletedMsg.author.username}`);
                    countDisc.send('bad human. do better next time :)');
                })
                .catch(console.error);
        }
    }
})

client.login(process.env.BOT_TOKEN);