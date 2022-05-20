const getIdols = require('./idolsDB');

async function main() {
  const idols = await getIdols('F', 32);
  console.log(idols);
}

main();
