const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('replies with your input')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('the input to echo back')
                .setRequired(true)),
        async execute(interaction) {
            const string = interaction.options.getString('options');
            await interaction.reply(option);
        },
};