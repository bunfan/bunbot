const { Client } = require('discord.js');
const fs = require('fs')

exports.load_commands = (client) => {

    // Get and require events
    const event_files = fs.readdirSync('./events/').filter(file => file.endsWith('.js'))
    event_files.map((value) => require(`./events/${value}`))

    // Get Command files
    const command_files = fs.readdirSync('./modules/commands/').filter(file => file.endsWith('.js'))

    // Require and Set Commands
    var command_array = []
    command_files.map((cmd) => {
        const file = require(`./modules/commands/${cmd}`)
        if(!file?.name) return console.log(`File ${cmd} doesn't have a "name" param`)
        command_array.push(file)
        client.commands.set(file.name, file)
    })

    client.on("ready", async () => {
        // Register Commands to bot
        client.guilds.cache
            .get('789252395015733248')
            .commands.set(command_array)
    });
    
}