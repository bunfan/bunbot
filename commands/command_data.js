exports.load = client => {
    console.log("--- Loading Commands ---");
    exports.data.map(command => console.log(`Loading command : ${command.name.toUpperCase()}`))
    client.guilds.cache.get('789252395015733248')?.commands.set(exports.data);
}

exports.data = [
    {
        name: 'bb',
        description: 'All Beat Banger Related Commands',
        options: [
            {
                name: 'mods',
                description: "Download some sexy mods",
                type: 'SUB_COMMAND'
            },
            {
                name: 'faq',
                description: "For info about all things Beat Banger",
                type: 'SUB_COMMAND'
            }
        ]
    },
    {
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
        ]
    },
    // Coin flip
    {
        name: 'coinflip',
        description: 'Flip a coin',
    },
    // Info
    {
        name: 'info',
        description: 'Information',
        options: [
            {
                name: 'server',
                description: "Get server info",
                type: 'SUB_COMMAND',
            },
            {
                name: 'user',
                description: "Get user info",
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'user',
                        description: 'User to get',
                        type: 'USER',
                        required: true
                    }
                ]
            },
            
        ],
    },
    // Dice Roll
    {   
        name: 'roll',
        description: 'Roll the dice',
        options: [
            {
                name: 'maximum',
                type: 'INTEGER',
                description: 'Number of sides on die',
                required: false,
            },
        ]
    },
    // Profile
    {
        name: 'profile',
        description: 'Information about YOU!',
        options: [
            {
                name: 'user',
                type: 'USER',
                description: 'User to view',
                required: false,
            }
        ],
    },
    // Report a user
    {
        name: 'report',
        description: 'Report a user',
        options: [
            {
                name: 'user',
                type: 'USER',
                description: 'User to report',
                required: true,
            },
            {
                name:'report',
                type:'STRING',
                description:'Incedent details',
                required: true,
            },
        ],
    },
    // Pay another user
    {
        name: 'pay',
        description: 'Pay a user some BunBucks',
        options: [
            {
                name:'user',
                type:'USER',
                description:'User to pay',
                required: true
            },
            {
                name:'amount',
                type:'INTEGER',
                description:'amount to pay',
                required: true
            },
        ],
    },

]