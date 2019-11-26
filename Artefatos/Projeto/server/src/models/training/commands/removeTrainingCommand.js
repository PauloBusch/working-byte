const { CommandResult, Error, EErrorCode, Obj } = require('../../../utils/content/dataResult');
const { Command } = require('../../../utils/interfaces/command');

const { Training } = require('../training');
const { TrainingDb } = require('../../../mapping');

class RemoveTrainingCommand extends Command {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await TrainingDb.count({ where: { id: this.id, removed: false } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Training with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { raw: true, where: { id: this.id } };
        const trainingDb = TrainingDb.findOne(query);
        const cal = Obj.cast(new Training(), trainingDb);
        cal.remove();
        const result = await TrainingDb.update(cal, query);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    RemoveTrainingCommand
}