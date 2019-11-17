const { CommandResult, Error, EErrorCode, Obj } = require('../../../utils/content/dataResult');
const { Command } = require('../../../utils/interfaces/command');

const { Calendar } = require('../calendar');
const { CalendarDb } = require('../../../mapping');

class RemoveCalendarCommand extends Command {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await CalendarDb.count({ where: { id: this.id, removed: false } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Calendar with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { raw: true, where: { id: this.id } };
        const calendarDb = CalendarDb.findOne(query);
        const cal = Obj.cast(new Calendar(), calendarDb);
        cal.remove();
        const result = await CalendarDb.update(cal, query);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    RemoveCalendarCommand
}