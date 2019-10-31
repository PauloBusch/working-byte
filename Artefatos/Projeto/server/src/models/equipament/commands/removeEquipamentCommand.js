const { Command } = require('../../../utils/interfaces/command');
const { Equipament } = require('../equipament');
const { EquipamentDb } = require('../../../mapping');

class RemoveEquipamentCommand extends Command {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

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
        const equipamentDb = EquipamentDb.findOne(query);
        const equipament = Obj.cast(new Equipament(), equipamentDb);
        equipament.remove();

        const result = await EquipamentDb.update(equipament, query);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    RemoveEquipamentCommand
}