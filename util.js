class Util{

    constructor(){}

    updateUserCount(client){
        // Sets channel to show total server member count
        var bunfan_server = client.guilds.resolve('789252395015733248')
        var member_channel = bunfan_server.channels.resolve('872999670488629270')
        member_channel.setName(`👫 Member Count : ${bunfan_server.memberCount}`)
        console.log(`Channel updated to ${bunfan_server.memberCount}`)
   }

}

module.exports = Util