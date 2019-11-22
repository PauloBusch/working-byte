const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, EErrorCode } = require('../../../utils/content/dataResult');

const { Diets } = require('../diets');
const { DietDb } = require('../../../mapping');
const _ = require('lodash');

class UpdateDietCommand extends Command {
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
        const query = {where: { id: this.id } };
        const queryType = { where: { id: this.type.id } };
        const existsType = await TypeDb.count(queryType);
        if (existsType)
            await TypeDb.update(this.type, queryType);
        else
            await TypeDb.create(this.type);

        const diet = new Diets(
            this.id,
            this.name,
            this.description,
            this.type
        );

        const result = await DietDb.update(diet, query);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    UpdateDietCommand
}