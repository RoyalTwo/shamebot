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
    countDisc = await client.channels.fetch('1022161639040102451');

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
                    // behold the river of if statements
                    if (lastMessage.author.username == msg.author.username) {
                        countDisc.send(`${deletedMsg.author}:
                                > little over eager there, huh buddy? wait for someone else :heart:`
                        );
                        return;
                    }
                    if (msg.content == parseInt(lastMessage.content)) {
                        countDisc.send(`${deletedMsg.author}:
                                > woah woah woah, that's already taken`
                        );
                        return;
                    }
                    if (parseInt(lastMessage.content)) {
                        countDisc.send(`${deletedMsg.author}:
                                > oop, not time for that number right now`
                        );
                        return;
                    }
                    console.log(`Deleted message from ${deletedMsg.author.username}`);
                    countDisc.send(`${deletedMsg.author}:
                    > ${deletedMsg.content}
that doesn't look like a number :rage:`);
                    // i hate string literals sometimes
                })
                .catch(console.error);
        }
    }
});

// eslint-disable-next-line no-undef
client.login(process.env.BOT_TOKEN);