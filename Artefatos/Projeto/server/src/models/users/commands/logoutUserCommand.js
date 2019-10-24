const { Command } = require('../../../utils/interfaces/command');
const { AuthResult } = require('../../../utils/content/dataResult');

class LogoutUserCommand extends Command {
    constructor(){
        super();
    }

    async GetError(){
        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        return new AuthResult(false);
    }
}

module.exports = {
    LogoutUserCommand
}