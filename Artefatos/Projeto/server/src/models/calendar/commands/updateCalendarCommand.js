const { Command } = require('../../../utils/interfaces/command');
const { CommandlResult, Error, EErrorCode } = require('../../../utils/content/dataResult');

const { Calendar } = require('../calendar');
const { CalendarDb } = require('../../../mapping');
const { Op } = require('sequelize');

class UpdateCalendarCommand extends Command {
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

        const exists = await CalendarDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Calendar with id: ${this.id} does not exists`);

        return null;
    }   

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { where: { id: this.id } };
        const calendar = new Calendar(
            undefined,
            this.name,
            this.description
        );

        const result = await CalendarDb.update(calendar, query);
        return new CommandlResult(result ? 1 : 0); 
    }
}

module.exports = {
    UpdateCalendarCommand
}

