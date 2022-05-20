/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable max-len */
/* eslint-disable no-console */
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Starting refreshing application commands');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId), // Routes.applicationCommands(clientId) <--- Global Commands
      { body: commands },
    );

    console.log('Succesfully reloaded application commands');
  } catch (error) {
    console.error(error);
  }
})();
