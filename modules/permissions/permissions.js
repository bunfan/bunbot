

class PermissionHandler{

    constructor(){

    }

    async setCommandPermissions(client){

        const modCommands = [
            '910615984526749706',
            '910615984526749707',
            '910619141810032641'
        ]

        const permissions = [
            {
                id: '125687298485518336',
                type: 'USER',
                permission: true,
            },
            {
                id: '789267614903959583',
                type: 'ROLE',
                permission: true,
            },
        ];
        
        client.on("ready", async () => {
       
            for (let commandId of modCommands){

                // Make each command Mod Only
                const command = await client.guilds.cache
                .get('789252395015733248')
                .commands.fetch(commandId);

                await command.permissions.add({ permissions });

            }
            
        });

    }




}

module.exports = PermissionHandler