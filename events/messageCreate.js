module.exports = {
    name: 'messageCreate',
    once: false,

    execute(message) {

        if (message.author.bot) return;

        if (message.content.indexOf(message.client.config.prefix) !== 0) return;

        const args = message.content.slice(message.client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();


        const cmd = message.client.commands.get(command);
        if (!cmd) return;

        cmd.execute(message.client, message, args);
    }
}