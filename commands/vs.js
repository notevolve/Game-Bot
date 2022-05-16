const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const getIdols  = require('../idolsDB.js');

// Slash command version of the versus game
module.exports = {
    name: "vs",
    async execute(client, message, args) {
        let gender = 'any';
        let gameSize = 32;
        const argSize = args.length;

        if(argSize === 1) {
            if(validType(args[0])) {
                gender = setType(args[0]);
            } else if (validSize(args[0], message)) {
                gameSize = args[0];
            }
        } 
        else if (argSize === 2) {
            if(validType(args[0])) {
                gender = setType(args[0]);
            } 
            if (validSize(args[1],message)) {
                gameSize = args[1];
            }
        }

        
        console.log(`type: ${gender}, size: ${gameSize}`)
        
        let idols = await getIdols(gender, gameSize);
        // console.log(idols);
        let text = "";
        let num = 0;
        idols.forEach((value, key) => {
            // console.log(text);
            num++;
            text += value.getName() + ", "
            if(num % 10 == 0) {
                text += "\n"
            }
        })

        message.reply(`${text}`);

        
    // let idols = await getIdols(gender, gameSize);
    // const attachment = new MessageAttachment('./resources/images/placeholder.png');

    // interaction.reply(`${gender} game\nidol1 vs idol2`);
    // interaction.channel.send({ files: [attachment] });

    },
};

function validSize(string, message) {
    const num = parseInt(string, 10);
    switch (num) {
        case NaN:
            message.reply('not a valid game size, defaulting to 32');
            return false;
        case 32:
            return true;
        case 64:
            return true;
        case 128:
            return true;
        case 256:
            return true;
        case 512:
            return true;
        case 1024:
            return true;
        default:
            message.reply('not a valid game size, defaulting to 32');
            return false;
    }
}

function validType(string) {
    if (string === 'girl' || string === 'boy') {
        return true;
    } else {
        return false;
    }
}

function setType(string) {
    if (string === 'girl') {
        return 'F';
    } else {
        return 'M';
    }
}