import { Client, GatewayIntentBits, Events, Collection } from "discord.js";
import { config } from "dotenv";
import * as commands from "../commands/utility/index.js";

config();
const TOKEN = process.env.BOT_TOKEN;

//Bot loggin
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! logged as ${readyClient.user.tag}`);
});

//à check
client.commands = new Collection();
for (const command of Object.values(commands)) {
  client.commands.set(command.data.name, command);
}

//interaction
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
  }
});

client.login(TOKEN);
