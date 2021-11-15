const Discord = require('discord.js')

// Command
module.exports = {

    name: 'serverinfo',
    description: "Get server info",
    run: async (client, interaction, options) =>{

        let embed = new Discord.MessageEmbed()
        .setAuthor(`Server Information : ${interaction.guild.name}`, interaction.guild.iconURL())
        .setDescription(`

        **General Information**

        - Server Name : ${interaction.guild.name}
        - Server ID : ${interaction.guild.id}
        - Server Owner : <@${interaction.guild.ownerId}>
        - Vanity URL : https://discord.gg/${interaction.guild.vanityURLCode} 

        **Member Information**

        - Total Members : ${interaction.guild.memberCount}
        - Total Boosts : ${interaction.guild.premiumSubscriptionCount}
        - Boost Tier : ${interaction.guild.premiumTier}

        **Enabled Features**

        ${interaction.guild.features.join("\n")}

        **Emojis**
        
        ${interaction.guild.emojis.cache.map(e => e).join(" ")}

        **Other information**

        - Partner Status : ${interaction.guild.partnered ? "Parterned" : "Not Partnered"}
        - Preferred Locale : ${interaction.guild.preferredLocale}
        - NSFW Level : ${interaction.guild.nsfwLevel}

        `)
        .setTimestamp()
        .setFooter(`requested by #${interaction.user.tag}`, interaction.user.avatarURL([{format:"png"}]))
        await interaction.reply({ embeds: [embed] })

    }


    
}





