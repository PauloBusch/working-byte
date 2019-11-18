const { Command } = require('../../../utils/interfaces/command');
const { Equipment } = require('../equipment');
const { EquipmentDb } = require('../../../mapping');

class RemoveEquipmentCommand extends Command {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await EquipmentDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Equipment with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { where: { id: this.id } };
        const equipmentDb = EquipmentDb.findOne(query);
        const equipment = Obj.cast(new Equipment(), equipmentDb);
        equipment.remove();

        const result = await EquipmentDb.update(equipment, query);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    RemoveEquipmentCommand
}
