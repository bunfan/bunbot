
module.exports = {

    name: 'ping',
    description: 'Returns websocket ping.',
    run: async (client, interaction, args) =>{
        interaction.reply(`Pong! (${client.ws.ping}ms)`)
    }

}
