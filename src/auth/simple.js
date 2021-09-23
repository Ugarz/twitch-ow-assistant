const tmi = require('tmi.js');

const config = require('../helpers/config')
const chans = config.TWITCH_BOT_CHANNELS.split(',');

console.log("Bot logged in with chans", chans)


const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: config.TWITCH_BOT_USERNAME,
		password: config.TWITCH_OAUTH_TOKEN
	},
	channels: chans
});

client.connect();

module.exports = client;
