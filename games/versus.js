const { MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const getIdols = require('../idolsDB');

// ! TODO
//  3. Figure out image library
//  4. Figure out stats migration
//  5. Clean up unneeded code

async function startGame(game) {
  await game.loadIdols();
  run(game);
}

async function run(game) {
  let running = true;
  const attachment = new MessageAttachment('./resources/images/placeholder.png');

  while (running) {
    const idolLeft = game.getIdol();
    const idolRight = game.getIdol();

    const botMsg = await game.channel.send({ content: `**@${game.author.username}**\n Idols Remaining: ${game.idolsRemaining()}\n ${idolLeft.group} ${idolLeft.name} vs ${idolRight.group} ${idolRight.name}`, components: [buttons], files: [attachment] });

    const filter = (i) => i.user.id === game.author.id;
    await botMsg.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 1000 * 60 * 5 })

      .then((i) => {
        if (i.customId === 'left' && i.user.id === game.author.id) {
          game.addWin(idolLeft, idolRight);
        } else if (i.customId === 'right' && i.user.id === game.author.id) {
          game.addWin(idolRight, idolLeft);
        }
      })
      .catch((err) => {
        running = false;
      });

    botMsg.delete();

    if (game.bracket.length === 0 && game.winners.length !== 1) {
      game.nextBracket();
    } else if (game.bracket.length === 0 && game.winners.length === 1) {
      game.setComplete();
      running = false;
    }
  }

  if (game.isComplete()) {
    const winner = game.getWinner();
    game.channel.send(`${winner.group} ${winner.name} is the winner`);
  } else {
    // game.channel.send('Game is over');
  }
}

class Game {
  constructor(server, channel, author, client, message) {
    this.server = server;
    this.channel = channel;
    this.author = author;
    this.client = client;
    this.gender = 'any';
    this.size = 32;
    this.winners = [];
    this.bracket = [];
    this.losers = [];
    this.message = message;
    this.complete = false;
  }

  setGender(gender) {
    this.gender = gender;
  }

  setSize(size) {
    this.size = size;
  }

  async loadIdols() {
    this.bracket = await getIdols(this.gender, this.size);
  }

  getIdol() {
    return this.bracket.pop();
  }

  addWin(winner, loser) {
    this.winners.push(winner);
    this.losers.push(loser);
  }

  nextBracket() {
    this.bracket = Array.from(this.winners);
    this.winners = [];
  }

  getWinner() {
    return this.winners[0];
  }

  idolsRemaining() {
    return this.winners.length + this.bracket.length + 2;
  }

  setComplete() {
    this.complete = true;
  }

  isComplete() {
    return this.complete;
  }
}

const buttons = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setCustomId('left')
      .setLabel('Left')
      .setStyle('PRIMARY'),
    new MessageButton()
      .setCustomId('right')
      .setLabel('Right')
      .setStyle('PRIMARY'),
  );

module.exports = { startGame, Game };
