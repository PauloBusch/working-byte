const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, Error, EErrorCode } = require('../../../utils/content/dataResult');

const { Equipment } = require('../equipment');
const { EquipmentDb } = require('../../../mapping');
const _ = require('lodash');

class CreateEquipmentCommand extends Command {
    constructor(
        id,
        name,
        code,
        type
    ){
        super();
        this.id = id;
        this.name = name;
        this.code = code;
        this.type = type;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");
            
        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");
            
        if (!this.code)
            return new Errror(EErrorCode.InvalidParams, "Parameter code cannot be null");

        if (!this.type || !this.type.id || !this.type.name)
            return new Error(EErrorCode.InvalidParams, "Parameter type require object { id: value, name: value }");

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const queryType = { where: { id: this.type.id } };
        const existsType = await TypeDb.count(queryType);
        if (existsType)
            await TypeDb.update(this.type, queryType);
        else
            await TypeDb.create(this.type);

        const equipment = new Equipment(
            this.id,
            this.name,
            this.code,
            this.type.id
        );

        const result = await EquipmentDb.create(equipment);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    CreateEquipmentCommand
}
