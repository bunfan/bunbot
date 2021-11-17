// const Discord = require('discord.js')
const Discord = require('discord.js')

module.exports = {

    name: 'help',
    description: 'Lists all commands',
    run: async (client, interaction, options) =>{

        var desc = "Here's a list of all usable commands\n ---\n"
        for (let [key,value] of client.commandInfo){
            desc += `\`${key}\` : ${value}\n`
        }

        let embed = new Discord.MessageEmbed()
        .setAuthor('Command List', client.user.avatarURL())
        .setDescription(desc)

        interaction.reply({embeds:[embed]})
  
    }

}
