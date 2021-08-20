exports.load = client => {
    console.log("--- Loading Commands ---");
    exports.data.map(command => console.log(`Loading command : ${command.name.toUpperCase()}`))
    client.guilds.cache.get('789252395015733248')?.commands.set(exports.data);
}

exports.data = [

    // Bank Command
    {
        name: 'bank',
        description: 'View Bank Data',
    },
    // Bank Command
    // {
    //     name: 'top621',
    //     description: 'Gets the top post by favcount of any tag on e621.',
    //     options: [
    //         {
    //             name: 'tag',
    //             type: 'STRING',
    //             description: 'The tag to search',
    //             required: true,
    //         }
    //     ]
    // },
    // Role Command
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
    // Roll the dice
    // {
    //     name: "guessnumber",
    //     description: "Guess the number I'm thinking of",
    //     options: [
    //         {
    //             name: 'prizeamount',
    //             type: 'INTEGER',
    //             description: 'Highest possible number',
    //             required: false,
    //         },
    //     ],
    // },
    // Quiz commands
    // {
    //     name: 'quiz',
    //     description: 'Take a sexy quiz',
    //     options: [
    //         {
    //             name: 'category',
    //             type: 'STRING',
    //             description: 'Query category',
    //             required: true,
    //             choices: [
    //                 {
    //                     name: 'All',
    //                     value: '',
    //                 },
    //                 {
    //                     name: 'Straight',
    //                     value: 'male/female',
    //                 },
    //                 {
    //                     name: 'Gay',
    //                     value: 'male/male',
    //                 },
    //                 {
    //                     name: 'Futa',
    //                     value: 'gynomorph',
    //                 },
                
    //             ]
    //         }

    //     ]
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