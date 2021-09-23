const { BLOCKED_WORDS } = require('../constants')

/**
 * Check the message
 * @param {Object} userstate The user state
 * @param {Object} message The message
 */
function checkTwitchMessage(channel, userstate, message, client){
  message = message.toLocaleLowerCase()
  let shouldSendMessage = false

  shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLocaleLowerCase()))

  if(shouldSendMessage) {
    console.log('Found something to block')
    client.deletemessage(channel, userstate.id)
      .then(() => client.say(channel, `@${userstate.username}, désolé ton message a été supprimé.`))
      .catch(error => console.log('Error while deleting message', error))
  }
}

module.exports = checkTwitchMessage;
