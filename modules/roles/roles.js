const Discord = require('discord.js')

exports.getRole = (interaction, id) => {
    let roles = interaction.values

    let selected_roles = []
    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        if (id == "add_role") {
            selected_roles.push(`<@&${role}>`)
            interaction.member.roles.add(role)
        }
        else if (id == "remove_role") {
            selected_roles.push(`<@&${role}>`)
            interaction.member.roles.remove(role)
        }
        
    }

    if (id == "add_role") {
        interaction.update({content: `You now have roles : ${selected_roles}`, components: []})
    }
    else if (id == "remove_role") {
        interaction.update({content: `You've removed the roles : ${selected_roles}`, components: []})
    }

    
}

exports.createMenu = (interaction, id) => {

    let options = [
        {
            label: "Voice Chat",
            value: "833367931773517854",
            description: "Be notified when a voice chat is going on!",
            emoji: '🎙️',
        },
        {
            label: "Streams",
            value: "867156271215018044",
            description: "Be notified when a stream is happening!",
            emoji: '🎥',
        },
        {
            label: "Party Up",
            value: "867161102273609758",
            description: "Be notified when the gamers squad up!",
            emoji: '🎮',
        },
    ]

    let description = (id == "add_role" ? "Choose roles to add" : "Choose roles to remove")

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageSelectMenu()
            .setCustomId(id)
            .setPlaceholder(description)
            .setMinValues(1)
            .setMaxValues(3)
            .addOptions(options)
    )

    interaction.reply({content: "Select your desired role from this menu!", components: [row], ephemeral: true})

}