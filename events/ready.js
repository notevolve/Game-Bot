module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`ready, logged in as ${client.user.tag}`);
    client.user.setActivity('dn', { type: 'LISTENING' });
  },
};
