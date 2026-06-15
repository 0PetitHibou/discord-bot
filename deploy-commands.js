import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import * as commands from "./commands/utility/index.js";

config();
const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const body = Object.values(commands).map((cmd) => cmd.data.toJSON());
const rest = new REST({ version: "10" }).setToken(TOKEN);

try {
  console.log("Enregistrement des commandes...");
  await rest.put(Routes.applicationCommands(CLIENT_ID), { body });
  console.log("Commandes enregistrées !");
} catch (err) {
  console.error(err);
}
