const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('replies with information about the user'),
	async execute(interaction) {
		await interaction.reply(`\`\`\`\nUser Tag: @${interaction.user.tag}\nUser ID: ${interaction.user.id}\nCreation Date: ${interaction.user.createdAt}\`\`\``);
	},
};

// server settings => integrations => select your bot => click the command => disable command, save => reenable and save