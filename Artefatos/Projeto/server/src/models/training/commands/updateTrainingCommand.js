const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, Error, EErrorCode } = require('../../../utils/content/dataResult');

const { Training } = require('../training');
const { TrainingDb } = require('../../../mapping');
const { Op } = require('sequelize');

class UpdateTrainingCommand extends Command {
    constructor(
        id,
        name,
        description
    ){
        super();
        this.id = id;
        this.name = name;
        this.description = description;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");

        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");

        if (!this.description)
            return new Error(EErrorCode.InvalidParams, "Parameter code cannot be null");

        const exists = await TrainingDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Training with id: ${this.id} does not exists`);

        return null;
    }   

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { where: { id: this.id } };
        const training = new Training(
            undefined,
            this.name,
            this.description
        );

        const result = await TrainingDb.update(training, query);
        return new CommandResult(result ? 1 : 0); 
    }
}

module.exports = {
    UpdateTrainingCommand
}

