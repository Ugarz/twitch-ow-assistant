const checkTwitchMessage = require('../helpers/checkTwitchMessage')
const { REG_EMOTES } = require('../constants')
const client = require('../auth/simple')
const config = require('../helpers/config')
const ignoreBots = require('../helpers/ignoreBots')

const MESSAGES = {
  chat: require('./messages/chat'),
  whisper: require('./messages/whisper'),
  commands: {
    owrank: require('./messages/commands/owrank')
  }
}

module.exports = (channel, userstate, message, self) => {
  if(self) return;
  if(ignoreBots.includes(userstate['display-name'])) {
    console.log("its a bot, do not process", userstate['display-name'])
    return;
  };

  try {
    checkTwitchMessage(channel, userstate, message, client)

    // Process command
    if(message.startsWith(config.PREFIX)){
      // !command arg01
      const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\S+)?(.*)?/);
      const [raw, command, args] = message.match(regexpCommand)
      console.log("===========", raw, "|||", command, args)
      const response = "";
      try {
        console.log(channel, command, message)
        MESSAGES.commands[command](client, channel, userstate, message, args) || {}
      } catch {
        console.log("Error while using command, command not found", command)
        client.say(config.TWITCH_BOT_CHANNELS, `@${userstate['display-name']} La commande ${command} n'éxiste pas`)
      }
      if (typeof response === 'function') {
        client.say(channel, response(userstate['display-name'], args))
      } else if (typeof response === 'string') {
        client.say(channel, response)
      }
    }

    // Process Message by type
    // const messageType = userstate["message-type"];
    // console.log('MESSAGETYPE', messageType)

    // MESSAGES[messageType](client, channel, userstate, message)
  } catch (error) {
    console.log('Error while processing message')
    console.log(error)
  }

  //  REG_EMOTES.forEach(reg => {
  //   console.log('Does it match? ', reg)
  //   if(message.match(reg)) {
  //     client.say(channel, "match");
  //   } else {
  //     console.log('Reg do not match')
  //   }
  // });
}