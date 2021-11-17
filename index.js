// get .env config 
require('dotenv').config()

// Get Permission
const PermissionHandler = require('./modules/permissions/permissions')
const permissionHandler = new PermissionHandler()

// Get Command Loader
const CommandLoader = require('./commandLoader')
const commandLoader = new CommandLoader()

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
client.commandInfo = new Map()

// Load commands
commandLoader.loadCommands(client)
permissionHandler.setCommandPermissions(client)


// Login
client.login(process.env.TOKEN)



