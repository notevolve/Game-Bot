module.exports = {
  name: 'interactionCreate',
  once: false,
  execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    command.execute(interaction);
  },
};
