// get .env config 
require('dotenv').config()

// Get loader file
const loader = require('./loader')

// Gets the discord client
const { Client, Intents, Collection } = require('discord.js');

// const globPromise = promisify(glob)


// Get the proper intents for the bot
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
module.exports = client

client.commands = new Collection()

// Load commands
loader.load_commands(client)

// Login
client.login(process.env.TOKEN)



