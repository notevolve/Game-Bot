/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const { MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const getIdols = require('../idolsDB');

// @TODO:
//  1. Figure out collectors
//  2. Code the game loop
//  3. Figure out image library
//  4. Figure out stats migration
//  5. Clean up unneeded code

async function startGame(game) {
  game.idols = await getIdols(game.gender, game.size);

  showInfo(game);

  const attachment = new MessageAttachment('./resources/images/placeholder.png');
  game.channel.send({ content: `type: ${game.gender}, size: ${game.size}`, components: [buttons], files: [attachment] });

  // await run();
}

// async function run() {
// }

// format this properly later (or not no one will ever see it)
function showInfo(game) {
  let list = '';
  let c = 1;
  game.idols.forEach((value) => {
    list += `${value.getName()}, `;
    if (c % 8 === 0) list += '\n\t\t\t\t\t\t\t\t';
    c++;
  });

  game.channel.send(`\`\`\`Game Info {
        server:
                server name:    ${game.server.name},
                server id:      ${game.server.id},
        channel:
                channel name:   ${game.channel.name},
                channel id:     ${game.channel.id},
        player:
                player name:    ${game.author.username},
                player id:      ${game.author.id},
        game:
                game type:      ${game.gender},
                game size:      ${game.size}
                game idols:     ${list}
    }\`\`\``);
}

// Fix formatting later (bad on mobile)
const buttons = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setCustomId('left')
      .setLabel('Left')
      .setStyle('PRIMARY'),
    // new MessageButton()
    //   .setCustomId('filler')
    //   .setLabel('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀')
    //   .setStyle('SECONDARY'),
    new MessageButton()
      .setCustomId('right')
      .setLabel('Right')
      .setStyle('PRIMARY'),
  );

module.exports = startGame;
