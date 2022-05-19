const startGame = require('../games/versus.js');

//@TODO:
//  1. Refactor

module.exports = {
    name: "vs",
    async execute(client, message, args) {

        const game = {
            server: client.guilds.cache.get(message.guild.id),
            channel: client.channels.cache.get(message.channel.id),
            author: message.author,
            client: client,
            gender: 'any',
            size: 32,
        }

        const argSize = args.length;
        
        if(argSize === 1) {
            if(validType(args[0])) {
                game.gender = setType(args[0]);
            } else if (validSize(args[0], message)) {
                game.size = args[0];
            }
        } 
        else if (argSize === 2) {
            if(validType(args[0])) {
                game.gender = setType(args[0]);
            } 
            if (validSize(args[1],message)) {
                game.size = args[1];
            }
        }

        await startGame(game);
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