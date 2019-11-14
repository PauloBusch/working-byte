const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, Error, EErrorCode } = require('../../../utils/content/dataResult');

const { Calendar } = require('../calendar');
const { CalendarDb } = require('../../../mapping');
const _ = require('lodash');

class CreateCalendarCommand extends Command {
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
            return new Errror(EErrorCode.InvalidParams, "Parameter code cannot be null");

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){

        const Cal = new Calendar(
            this.id,
            this.name,
            this.description
        );

        const result = await CalendarDb.create(Cal);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    CreateCalendarCommand
}