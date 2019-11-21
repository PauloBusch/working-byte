const { Command } = require('../../../utils/interfaces/command');
const { CommandlResult, Error, EErrorCode } = require('../../../utils/content/dataResult');

const { EquipmentDb } = require('../../../mapping');
const { Equipment } = require('../equipment');
const { Op } = require('sequelize');

class UpdateEquipmentCommand extends Command {
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
            return new Error(EErrorCode.InvalidParams, "Parameter code cannot be null");

        if (!this.type || !this.type.id || !this.type.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name require object { id: value, name: value }");

        const existsCode = await EquipmentDb.count({ where: { code: this.code, removed: false, id: { [Op.not]: this.id } } });
        if (existsCode)
            return new Error(EErrorCode.InvalidParams, `Equipment with code aready exists`);

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
        const queryType = { where: { id: this.type.id } };
        const existsType = await TypeDb.count(queryType);
        if (existsType)
            await TypeDb.update(this.type, queryType);
        else
            await TypeDb.create(this.type);
            
        const equipment = new Equipment(
            undefined,
            this.name,
            this.code,
            undefined,
            this.type.id
        );

        const result = await EquipmentDb.update(equipment, query);
        return new CommandlResult(result ? 1 : 0); 
    }
}

module.exports = {
    UpdateEquipmentCommand
}

