const Discord = require('discord.js')


exports.generateEmbed = (client, title, color, thumbnail, description, footer)=>{
    let embed = new Discord.MessageEmbed()
	.setTitle(title)
	.setColor(color)
    .setThumbnail(thumbnail)
	.setDescription(description)
	.setTimestamp()
    .setFooter(footer)
    return embed
}