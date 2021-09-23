# About
I need something to check live ranking scores of people.

# How does it work anyway ?
You ask for informations on an Overwatch player with the `!owrank` command in your Twitch chat.
The bot is connected to the unofficial Overwatch API https://ow-api.com/

To work properly, **the user you are looking for <u>must have an open career in Overwatch</u>**, otherwise we can't fetch informations.

## Commands
Use commmands in chat

```sh
!owrank [btag] [platform] [region]
# !owrank carbo#21717 pc eu
```
Bot replies to the sender in chat like so
```
@Carbow Les côtes de Carbo#21717 sont TANK : 3207, DPS : 2543, HEAL : 2641
```

If you mispelled the btag
```
Désolé je n'ai pas trouvé ce compte. Vérifie ton battletag ?
```
### Bonus
**Default region** is `eu` and **default platform** is `pc`.

So you can omit them in command, but you will have to tell it if you belong to another platform `(pc|psn|xbl|nintendo-switch)` or region `(eu|us|asia)`.

# Installation
Clone the repo

Créer un fichier `.env` avec ces entitées
```bash
TWITCH_BOT_USERNAME=
# It has to be a user account, we may want to create a dedicated bot account
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
TWITCH_OAUTH_TOKEN=
# See in Resource how to "Fetch your Oauth token"
TWITCH_REDIRECT_URI=
TWITCH_SCOPES=
TWITCH_BOT_CHANNELS=
# TWITCH_BOT_CHANNELS must be separated by a coma like : user1,user2,user3
```


# Resources
- [Using the un-official Ow-api](https://ow-api.com/)
- [Fetch your Oauth token](https://twitchapps.com/tmi/)
> Expiration date 2 months
- [How to Build a Twitch Bot Using TMI.JS (a moderator bot).](https://youtu.be/7uSjKbAUHXg)
- [TechnoTim Twitch bot](https://github.com/techno-tim/techno-boto-twitch)
- [Twitch Doc - Tokens](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth)
