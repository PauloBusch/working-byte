const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, EErrorCode } = require('../../../utils/content/dataResult');

class CreateEquipamentCommand extends Command {
    constructor(
        id,
        name
    ){
        super();
        this.id = id;
        this.name = name;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");

        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");

        return null;
    }

    async HasPermission(){

    }

    async Execute(){

    }
}

module.exports = {
    CreateEquipamentCommand
}