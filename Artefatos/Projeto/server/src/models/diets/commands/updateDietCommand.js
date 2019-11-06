const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, EErrorCode } = require('../../../utils/content/dataResult');

const { Diets } = require('../diets');
const { DietDb } = require('../../../mapping');
const _ = require('lodash');

class UpdateDietCommand extends Command {
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
        const query = {where: { id: this.id } };

        const diet = new Diets(
            this.id,
            this.name,
            this.description
        );

        const result = await DietDb.update(diet, query);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    UpdateDietCommand
}