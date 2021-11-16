const { Client } = require('discord.js');
const fs = require('fs')
const glob = require ('glob')

exports.load_commands = async (client) => {

    // Get all event scripts
    glob('./events/*.js', [], (err, files) =>{
        files.map((value) => {
            require(value)
            console.log(`Loaded Event ${value}`)
        })
    })

    // Get Command files
    var command_array = []
     glob('./modules/commands/**/*.js', [], (err, files) =>{
        files.map((value) => {
            const file = require(value)
            if(!file?.name) return console.log(`File ${value} doesn't have a "name" param`)
            command_array.push(file)
            client.commands.set(file.name, file)
            console.log(`Loaded Command ${value}`)
        })
    })

    client.on("ready", async () => {
        // Register Commands to bot
        client.guilds.cache
            .get('789252395015733248')
            .commands.set(command_array)
    });
    
}