const Discord = require('discord.js')
const e621 = require('e621')
const e = new e621("komdog", process.env.E621)

module.exports = {

    name: 'e621',
    description: 'All e621 related commands',
    options: [
        {
            name: 'top',
            description: "Get the top e621 post with any tag",
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'tags',
                    description: "Tags to search",
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'random',
            description: "Get a random e621 with post any tag",
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'tags',
                    description: "Tags to search",
                    type: 'STRING',
                    required: true
                }
            ]
        },
    ],
    run: async (client, interaction, options) => {

        if (options.getSubcommand() == 'top'){

        // Get options
        var tags = options.getString('tags')

        // Query e621
        var query = await e.getPosts([tags, 'order:favcount'],1)
        if (query.length < 1) return interaction.reply({content: `Could not find posts for "${tags}""`, ephemeral: true})

        // Create URL from query
        var url = `https://e621.net/posts/${query[0].id}`

        interaction.reply({content: url})

        }

        if (options.getSubcommand() == 'random'){

            // Get options
            var tags = options.getString('tags')
    
            // Query e621
            var query = await e.getPosts([tags, 'order:random score:>50'],1)
            if (query.length < 1) return interaction.reply({content: `Could not find posts for "${tags}""`, ephemeral: true})
    
            // Create URL from query
            var url = `https://e621.net/posts/${query[0].id}`
    
            interaction.reply({content: url})
    
        }

    }

    

}


