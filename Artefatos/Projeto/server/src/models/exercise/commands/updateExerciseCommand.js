const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, Error, EErrorCode } = require('../../../utils/content/dataResult');

const { Exercise } = require('../exercise');
const { ExerciseDb } = require('../../../mapping');
const { Op } = require('sequelize');

class UpdateExerciseCommand extends Command {
    constructor(
        id,
        name,
        training
    ){
        super();
        this.id = id;
        this.name = name;
        this.training = training;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");

        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");

        if (!this.training)
            return new Error(EErrorCode.InvalidParams, "Parameter code cannot be null");

        const exists = await ExerciseDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Exercise with id: ${this.id} does not exists`);

        return null;
    }   

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { where: { id: this.id } };
        const exercise = new Exercise(
            undefined,
            this.name,
            this.training
        );

        const result = await ExerciseDb.update(exercise, query);
        return new CommandResult(result ? 1 : 0); 
    }
}

module.exports = {
    UpdateExerciseCommand
}

