const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, Error, EErrorCode } = require('../../../utils/content/dataResult');

const { Exercise } = require('../exercise');
const { ExerciseDb } = require('../../../mapping');
const _ = require('lodash');

class CreateExerciseCommand extends Command {
    constructor(
        id,
        name,
        training,
        date,
        timeInitial,
        timeEnd
    ){
        super();
        this.id = id;
        this.name = name;
        this.training = training;
        this.date = date;
        this.timeInitial = timeInitial;
        this.timeEnd = timeEnd;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");
            
        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");
            
        if (!this.training)
            return new Errror(EErrorCode.InvalidParams, "Parameter code cannot be null");
        
            if (!this.date)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");
            
        if (!this.timeInitial)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");
            
        if (!this.timeEnd)
            return new Errror(EErrorCode.InvalidParams, "Parameter code cannot be null");

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){

        const Cal = new Exercise(
            this.id,
            this.name,
            this.training,
            this.date,
            this.timeInitial,
            this.timeEnd
        );

        const result = await ExerciseDb.create(Cal);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    CreateExerciseCommand
}