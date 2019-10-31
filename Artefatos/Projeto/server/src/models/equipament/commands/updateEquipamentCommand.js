const { Command } = require('../../../utils/interfaces/command');
const { CommandlResult, Error, EErrorCode } = require('../../../utils/content/dataResult');

class UpdateEquipamentCommand extends Command {
    constructor(
        id,
        name,
        code
    ){
        super();
        this.id = id;
        this.name = name;
        this.code = code;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");

        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");

        if (!this.code)
            return new Error(EErrorCode.InvalidParams, "Parameter code cannot be null");

        const exists = await EquipamentDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Equipament with id: ${this.id} does not exists`);

        return null;
    }   

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { where: { id: this.id } };
        const equipament = new Equipament(
            undefined,
            this.name,
            this.code
        );

        const result = await EquipamentDb.update(equipament, query);
        return new CommandlResult(result ? 1 : 0); 
    }
}

module.exports = {
    UpdateEquipamentCommand
}

