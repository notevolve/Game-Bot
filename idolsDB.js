const db = require('aa-sqlite');


async function loadIdols(gender, gameSize) {
    
    try {
        await db.open('./resources/idols.db');
        const rows = await db.all("SELECT id, stagename, groupname FROM idols WHERE gender=$gender ORDER BY RANDOM() LIMIT $gameSize", {$gender:gender, $gameSize:gameSize});
        db.close();
        return rows;
    } catch (error) {
        return console.error(error);
    }
}


async function getIdols(gender, gameSize) {
    const idols = new Map();
    const rows = await loadIdols(gender, gameSize);

    await rows.forEach(row => {
        idols.set(row.id, new Idol(row.stagename, row.groupname));
    })

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

