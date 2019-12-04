const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, Error, EErrorCode } = require('../../../utils/content/dataResult');

const { Training } = require('../training');
const { TrainingDb } = require('../../../mapping');
const _ = require('lodash');

class CreateTrainingCommand extends Command {
    constructor(
        id,
        name,
        description
    ){
        super();
        this.id = id;
        this.name = name;
        this.description = description
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");
            
        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");
            
        if (!this.description)
            return new Errror(EErrorCode.InvalidParams, "Parameter code cannot be null");
        

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){

        const Cal = new Training(
            this.id,
            this.name,
            this.description,
            this.date,
            this.timeInitial,
            this.timeEnd
        );

        const result = await TrainingDb.create(Cal);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    CreateTrainingCommand
}