const { Command } = require('../../../utils/interfaces/command');
const { CommandlResult, Error, EErrorCode } = require('../../../utils/content/dataResult');

class UpdateCalendarCommand extends Command {
    constructor(
        id,
        name,
        code,
        type
    ){
        super();
        this.id = id;
        this.name = name;
        this.code = code;
        this.type = type;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");

        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");

        if (!this.code)
            return new Error(EErrorCode.InvalidParams, "Parameter code cannot be null");

        if (!this.type || !this.type.id || !this.type.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name require object { id: value, name: value }");

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
        const queryType = { where: { id: this.type.id } };
        const existsType = await TypeDb.count(queryType);
        if (existsType)
            await TypeDb.update(this.type, queryType);
        else
            await TypeDb.create(this.type);
            
        const calendar = new Calendar(
            undefined,
            this.name,
            this.code,
            this.type.id
        );

        const result = await CalendarDb.update(calendar, query);
        return new CommandlResult(result ? 1 : 0); 
    }
}

module.exports = {
    UpdateCalendarCommand
}

