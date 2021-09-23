module.exports = {
  title: "MP",
  description: "Les messages privés",
  function : (client, channel, userstate, message) => {
    console.log('received a whisper')
  }
}