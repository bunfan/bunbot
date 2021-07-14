exports.load = client => {
    console.log("--- Loading Commands ---");
    exports.data.map(command => console.log(`Loading command : ${command.name.toUpperCase()}`))
    client.guilds.cache.get('789252395015733248')?.commands.set(exports.data);
}

exports.data = [

    // Bank Commands
    {
        name: 'bank',
        description: 'View Bank Data',
    },
    // Quiz commands
    {
        name: 'quiz',
        description: 'Take a sexy quiz',
    },
    // Server information
    // {
    //     name: 'serverinfo',
    //     description: 'Gets server information'
    // },
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
                require: true
            },
        ],
    },

]