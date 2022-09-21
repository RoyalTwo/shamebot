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

client.once('ready', () => {
    console.log('Ready!');
});

let monitoredChannel = null;
let lastMessage = null;
// should use separate files but it's a simple bot
client.on("messageCreate", async msg => {
    // really should use slash commands instead and check for permissions
    if (msg.content.includes('+channel ')) {
        const msgArray = msg.content.split(' ');
        // add error handling later
        const channelID = msgArray[1];
        monitoredChannel = await client.channels.fetch(channelID);

        const lastMessageCollection = await monitoredChannel.messages.fetch({ limit: 1 })
        lastMessage = lastMessageCollection.first()
    }

    if (msg.author.bot) return;
    if (msg.channelId == monitoredChannel.id) {
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
                    monitoredChannel.send('bad human. do better next time :)');
                })
                .catch(console.error);
        }
    }
})

client.login(process.env.BOT_TOKEN);