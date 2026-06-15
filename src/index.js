import { Client, GatewayIntentBits, Events } from 'discord.js';
import { config } from 'dotenv';

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});


const TOKEN = process.env.BOT_TOKEN;

client.once(Events.ClientReady, (readyClient) =>{
    console.log(`Ready! logged as ${readyClient.user.tag}`)
})

client.login(TOKEN);