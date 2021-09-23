const axios = require('axios')
const isEmpty = require('lodash/isEmpty');
const { client } = require( 'tmi.js' );

module.exports = async (args) => {
  console.log("fetchOwPlayer", args)

  // Find btag
  const battleTag = args.find(arg => arg.match(/^(\S+)#(\d){3,5}/gm));
  console.log('BattleTag', battleTag);
  if (isEmpty(battleTag)) {
    const error = new Error('Il semble que ton tag bnet ne soit pas bon')
    throw error;
  }

  // Find platform
  let platform = args.find(arg => arg.match(/(pc|psn|xbl|nintendo-switch)/gmi));
  console.log('platform', platform);
  if (isEmpty(platform)) {
    platform = "pc"
    console.log('using default platform', platform);
  }

  // Find region
  let region = args.find(arg => arg.match(/(eu|us|asia)/gmi));
  console.log('region', region);
  if (isEmpty(region)) {
    region = "eu"
    console.log('using default region', region);
  }

  const replacedTag = battleTag.split("#").join(",").replace(',', '-')
  const reformatedTag = replacedTag.charAt(0).toUpperCase() + replacedTag.slice(1)
  const url = `https://ow-api.com/v1/stats/${platform}/${region}/${reformatedTag}/profile`

  console.log("Calling url", url)

  return await axios.get(encodeURI(url))
    .then(response => {
      const rawData = response.data;
      console.log(`Found data for ${reformatedTag}`, rawData)
      if (isEmpty(rawData.ratings)) {
        console.log("Empty ratings", rawData)
        const error = new Error (`Je n'ai pas trouvé de placement pour ce compte! on dirait que ${battleTag} est un.e fainéant.e de la ranked!`)
        error.status = "LAZY_RANKED"
        error.tag = reformatedTag;
        throw error
      }
      const rankDetails = rawData.ratings.reduce((acc, curr) => {
        acc[curr.role] = curr.level
        return acc;
      }, {})
      const responseData = {
        btag: reformatedTag,
        rating: rawData.rating,
        rankDetails,
        endorsement: rawData.endorsement
      }
      return responseData
    })
    .catch(error => {
      console.log("Error while fetching Ow data", error)
      throw error
    })
}