const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('replies with information about the server'),
	async execute(interaction) {
		await interaction.reply(`\`\`\`\nServer Name: ${interaction.guild.name}\nMember Count: ${interaction.guild.memberCount}\nCreation Date: ${interaction.guild.createdAt}\`\`\``);
	},
};