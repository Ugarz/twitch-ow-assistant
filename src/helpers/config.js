require('dotenv').config()
const PREFIX = "!"
const {
  TWITCH_BOT_USERNAME,
  TWITCH_CLIENT_SECRET,
  TWITCH_CLIENT_ID,
  TWITCH_SCOPES,
  TWITCH_OAUTH_TOKEN,
  TWITCH_BOT_CHANNELS
} = process.env;


module.exports = {
  TWITCH_BOT_USERNAME,
  TWITCH_CLIENT_SECRET,
  TWITCH_CLIENT_ID,
  TWITCH_SCOPES,
  TWITCH_OAUTH_TOKEN,
  TWITCH_BOT_CHANNELS,
  PREFIX
}
