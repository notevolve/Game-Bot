module.exports = {
    name: 'messageCreate',
    once: false,

    execute(message) {

        // Limit which servers the bot accepts commands from for now
        if(message.channel.id != "970486807735173120" && message.channel.id != "934154938026688572") return; 

        if (message.author.bot) return;
        
        if (message.content.indexOf(message.client.config.prefix) !== 0) return;
        
        const args = message.content.slice(message.client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        
        const cmd = message.client.commands.get(command);
        if (!cmd) return;
        
        cmd.execute(message.client, message, args);
    }
}