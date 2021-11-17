const glob = require ('glob')

/**
 * This class manages all of the command js file inthe "modules" folder
 */
class CommandLoader {

    constructor(){}

    //Loads Commands
    async loadCommands(client){

        // Get all event scripts
        glob('./events/*.js', [], (err, files) =>{
            files.map((value) => {
                require(value)
            })
        })

        // Get Command files
        var commandArray = []
        glob('./modules/commands/**/*.js', [], (err, files) =>{
            files.map((value) => {
                // Require all loaded files
                const file = require(value)
                if(!file?.name) return console.log(`File ${value} doesn't have a "name" param`)
                commandArray.push(file)
                client.commands.set(file.name, file)
                client.commandInfo.set(file.name, file.description)
            })
           
        })

        // Register Commands to bot when bot is running
        client.on("ready", async () => {
            client.guilds.cache
                .get('789252395015733248')
                .commands.set(commandArray)

        });

    }

} 

module.exports = CommandLoader
