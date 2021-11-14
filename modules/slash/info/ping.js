const {Client, CommandInteraction} = require('discord.js')


exports.ping = {

    name: 'ping',
    description: 'Returns websocket ping.',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) =>{
        interaction.reply(`Pong! (${client.ws.ping}ms)`)
    }

}
