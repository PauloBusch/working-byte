const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, EErrorCode } = require('../../../utils/content/dataResult');

const { Diets } = require('../diets');
const { DietDb } = require('../../../mapping');
const _ = require('lodash');

class RemoveDietCommand extends Command {
    constructor(
        id
    ) {
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await EquipamentDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Diet with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }
    async Execute(){
        const query = { where: { id: this.id } };
        const dietDb = DietDb.findOne(query);
        const diet = Obj.cast(new diet(), dietDb);
        diet.remove();

        const result = await DietDb.update(diet, query);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    RemoveDietCommand
}