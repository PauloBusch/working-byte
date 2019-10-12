const { CommandResult, Error, EErrorCode, Obj } = require('../../../utils/content/dataResult');
const { Command } = require('../../../utils/interfaces/command');

const { User } = require('../user');
const { UserDb } = require('../../../mapping');

class RemoveUserCommand extends Command {
    constructor(
        id
    ){
        super();
        this.id = id;

    }
    
    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, 'Parameter id cannot be null');

        const exists = await UserDb.count({ where: { id: this.id, removed: false } });
        if (!exists)
            return new Error(EErrorCode.DuplicateUnique, `User with id cannot exists`);
            
        return null;
    }
    
    async HasPermission(){
        // TODO: Validate with token
        return true;
    }

    async Execute(){
        const query = { where: { id: this.id } };
        const userDb = await UserDb.findOne(query);
        const user = Obj.cast(new User(), userDb);
        user.remove();

        const result = await UserDb.update(user, query);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    RemoveUserCommand
}