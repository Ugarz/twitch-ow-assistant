const constants = require('../../../constants')

module.exports = (client, channel, userstate, message) => {
  const username = userstate['display-name']

  // If it's the first time for a user
  if (userstate['first-msg']) {
    return client.say(channel, `Hello ${username}! Soit le/la bienvenu.e ici !`)
  }
  // Be polite
  if (constants.hello.includes(message.toLowerCase())) {
    return client.say(channel, `Hello ${username}!👋`)
  }
  // Warn Streamlabs
  if (message === "Kappa") {
    client.say(channel, `Kappa`)
  }
  console.log("controlled message", message)
}