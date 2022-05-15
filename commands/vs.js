const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const getIdols  = require('../idolsDB.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vs')
        .setDescription('starts a new versus game')
        .addStringOption(option => 
            option.setName('sex')
                .setDescription('gender of idols')
                .setRequired(false)
                .addChoices({ name: 'girl', value: 'F' }, { name: 'boy', value: 'M'},))
        .addIntegerOption(option => 
            option.setName('game_size')
                .setDescription('size of game')
                .setRequired(false)
                .addChoices( { name: '32', value: 32 }, { name: '64', value: 64 }, { name: '128', value: 128 }, { name: '256', value: 256 }, { name: '512', value: 512 }, { name: '1024', value: 1024 } ) ),
        async execute(interaction) {

            let gender = interaction.options.getString('sex');
            let gameSize = interaction.options.getInteger('game_size');

            await getIdols(gender, gameSize);

            // const attachment = new MessageAttachment('./resources/images/placeholder.png');
            interaction.reply(`${gender} game\nidol1 vs idol2`);
            // interaction.channel.send({ files: [attachment] });
        },
};

function startGame () {

}

