const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

require('dotenv').config();

const functons = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functons) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events")
    client.handleCommands(commandFolders, "./src/commands")
    client.login(process.env.token);
})();