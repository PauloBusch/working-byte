const { CommandResult, Error, EErrorCode, Obj } = require('../../../utils/content/dataResult');
const { Command } = require('../../../utils/interfaces/command');

const { Exercise } = require('../exercise');
const { ExerciseDb } = require('../../../mapping');

class RemoveExerciseCommand extends Command {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await ExerciseDb.count({ where: { id: this.id, removed: false } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Exercise with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { raw: true, where: { id: this.id } };
        const exerciseDb = ExerciseDb.findOne(query);
        const cal = Obj.cast(new Exercise(), exerciseDb);
        cal.remove();
        const result = await ExerciseDb.update(cal, query);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    RemoveExerciseCommand
}