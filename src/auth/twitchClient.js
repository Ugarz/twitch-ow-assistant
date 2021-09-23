const tmi  = require('tmi.js');
const axios = require('axios').default;


const {
	TWITCH_BOT_USERNAME,
  TWITCH_CLIENT_SECRET,
  TWITCH_CLIENT_ID,
  TWITCH_SCOPES
} = require('../helpers/config');


let TWITCH_OAUTH_TOKEN = "";

async function validateToken(){
  console.log('Trying to validate token: ', TWITCH_OAUTH_TOKEN)

  const axiosConfig = {
    headers : {
      Authorization: `OAuth ${TWITCH_OAUTH_TOKEN}`
    }
  }

  try {
    const response = await axios.get("https://id.twitch.tv/oauth2/validate", axiosConfig)
    if (response.data.client_id === TWITCH_CLIENT_ID) {
      console.log('Client Id seems okay', response.data.client_id === TWITCH_CLIENT_ID)
      return true;
    }
    return false;
  } catch (error) {
    if(error.response.data && error.response.data.status == 401 ){
      console.log("Error while validating token", error.response.data)
      return false;
    }
    console.log('error response', error.response.data)
  }
}

function connectTheBot(token) {
  console.log('connecting the bot with token', token)
    return new Promise((resolve, reject) => {
      const tmiOptions = {
        options: { debug: true },
        connection: {
          reconnect: true
        },
        identity: {
          username: TWITCH_BOT_USERNAME,
          password: `oauth:${token}`
        },
        channels: [ "carbow" ]
      }
      const client = new tmi.Client(tmiOptions);
      client
        .connect()
        .catch(error => {
          console.log("Error while connecting the Bot", error)
          reject(error)
        });
      return resolve(client)
    })
}

async function fetchAccessToken() {
  console.log('Fetching new access token')
  const clientCredUrl = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=${TWITCH_SCOPES}`
  console.log(clientCredUrl)

  return await axios.post(clientCredUrl)
    .then(response => {
      console.log('Token fetched', response.data)
      TWITCH_OAUTH_TOKEN = response.data.access_token
      return response.data.access_token;
    })
    .catch(error => console.log("Error while fetching token", error.response.data));
}


const initializeBot = new Promise(async (resolve, reject) => {
  const isAccessTokenValid = await validateToken()

  if (!isAccessTokenValid) {
    TWITCH_OAUTH_TOKEN = await fetchAccessToken().catch(error => reject(error))
    console.log("TWITCH_OAUTH_TOKEN", TWITCH_OAUTH_TOKEN)
  }
  const client = await connectTheBot(TWITCH_OAUTH_TOKEN).catch(error => reject(error))
  resolve(client);
})


// module.exports = initializeBot

initializeBot
  .then(client => {
    console.log('ready')

  })
  .catch(e => console.error)