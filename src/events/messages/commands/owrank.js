const isEmpty = require('lodash/isEmpty')
const fetchOwPlayer = require('../../../services/fetchOwPlayer.js')

module.exports = async (client, channel, userstate, message, args) => {
  const username = userstate['display-name']
  console.log('ergerthgrethrthdthrjyhdrtjytjy', message)
  console.log('args owrank', args)
  try {
    if(isEmpty(args)) {
      throw new Error('Donne moi au moins ton tag bnet!')
    }
    let cleanedArgs = args.split(' ')
    // Clean array
    cleanedArgs = cleanedArgs.filter(item => item);
    console.log('cleanedArgs', cleanedArgs)
    // rating is the ranked cotes average
    // Details ranked cotes are in rankDetails
    const { btag, rating, rankDetails, endorsement } = await fetchOwPlayer(cleanedArgs);
    console.log("===== BG ", rankDetails, rating)
    const reversedBtag = btag.replace('-', "#")

    let message = `@${username} Les côtes de ${reversedBtag} sont `

    const userRoles = []
    const roles = {
      tank: "TANK",
      damage: "DPS",
      support: "HEAL"
    }

    for (var role in rankDetails) {
      if (rankDetails.hasOwnProperty(role)) {
         userRoles.push(`${roles[role]} : ${rankDetails[role]}`)
      }
    }
    message += userRoles.join(", ")
    if(endorsement && endorsement >= 3) {
      message += ` en plus c'est un bg avec un endorsement à ${endorsement}!`
    }
    return client.say(channel, message)
  } catch (error) {
    if (error.response && error.response.status === 404) {
      client.say(channel, "Désolé je n'ai pas trouvé ce compte. Vérifie ton battletag ?")
    } else {
      client.say(channel, error.message)
    }
  }
}