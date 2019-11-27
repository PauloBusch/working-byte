const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, EErrorCode, Error } = require('../../../utils/content/dataResult');

const { Diets } = require('../diets');
const { DietDb, DietTypeDb } = require('../../../mapping');
const _ = require('lodash');

class CreateDietCommand extends Command {
    constructor(
        id,
        name,
        description,
        type
    ){
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");

        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");

        if (!this.description)
            return new Errror(EErrorCode.InvalidParams, "Parameter code cannot be null");

        if (!this.type || !this.type.id || !this.type.name)
        return new Error(EErrorCode.InvalidParams, "Paramter name require object { id: value, name: value }");

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){

        const queryType = { where: { id: this.type.id } };
        const existsDietType = await DietTypeDb.count(queryType);
        if (existsDietType)
            await DietTypeDb.update(this.type, queryType);
        else
            await DietTypeDb.create(this.type);

        const diet = new Diets(
            this.id,
            this.name,
            this.description,
            this.type.id
        );

        const result = await DietDb.create(diet);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    CreateDietCommand
}