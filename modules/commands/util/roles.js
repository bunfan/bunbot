const Discord = require('discord.js')

// Roles
const role_array = [
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
    {
        label: "Server Events",
        value: "897709016510234684",
        description: "Be notified when server event are happening",
        emoji: '🎟️',
    },
]

// Command
module.exports = {

    name: 'role',
    description: 'Manage your roles!',
    options: [
        {
            name: 'add',
            description: "Give yourself some roles",
            type: 'SUB_COMMAND',
        },
        {
            name: 'remove',
            description: "Remove your roles",
            type: 'SUB_COMMAND',
        },
    ],
    run: async (client, interaction, options) =>{

        let description = (options.getSubcommand() == "add" ? "Choose roles to add" : "Choose roles to remove")
        let id = options.getSubcommand()

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId(id)
                .setPlaceholder(description)
                .setMinValues(1)
                .setMaxValues(3)
                .addOptions(role_array)
        )
    
        interaction.reply({content: "Select your desired role from this menu!", components: [row], ephemeral: true})

    },
    selected: async (client, interaction, custom_id, values) =>{

        let selected_roles = []

        for (let i = 0; i < values.length; i++) {
            const role = values[i];
            if (custom_id == "add") {
                selected_roles.push(`<@&${role}>`)
                interaction.member.roles.add(role)
            }
            else if (custom_id == "remove") {
                selected_roles.push(`<@&${role}>`)
                interaction.member.roles.remove(role)
            }
            
        }

        if (custom_id == "add") {
            interaction.update({content: `You now have roles : ${selected_roles}`, components: []})
        }
        else if (custom_id == "remove") {
            interaction.update({content: `You've removed the roles : ${selected_roles}`, components: []})
        }
    }



    
}





