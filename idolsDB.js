const db = require('aa-sqlite');

// Load the idols into map and return the map with getIdols method
// Each map key is the id number of that idol from the database file
// Each map value is an instance of the idol class filled with information from the database

// @TODO:
//  1. Consider changing the data structure that idols are stored into

async function loadIdols(gender, gameSize) {
  let query = 'SELECT id, stagename, groupname FROM idols ORDER BY RANDOM() LIMIT $gameSize';
  let params = { $gameSize: gameSize };

  if (gender != 'any') {
    query = 'SELECT id, stagename, groupname FROM idols WHERE gender=$gender ORDER BY RANDOM() LIMIT $gameSize';
    params = { $gender: gender, $gameSize: gameSize };
  }

  await db.open('./resources/idols.db');
  const rows = await db.all(query, params);
  db.close();
  return rows;
}

async function getIdols(gender, gameSize) {
  const idols = new Map();
  const rows = await loadIdols(gender, gameSize);

  await rows.forEach((row) => {
    idols.set(row.id, new Idol(row.stagename, row.groupname));
  });

  return idols;
}

class Idol {
  constructor(name, group) {
    this.name = name;
    this.group = group;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getGroup() {
    return this.group;
  }
}

module.exports = getIdols;
