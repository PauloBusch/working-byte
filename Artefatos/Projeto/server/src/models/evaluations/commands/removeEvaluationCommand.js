const { Command } = require('../../../utils/interfaces/command');
const { CommandRestult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { Evaluation } = require('../evaluation');
const { EvaluationDb } = require('../../../mapping');

class RemoveEvaluationCommand extends Command {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");

        const exists = await EvalutaionDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Evaluation with id: ${this.id} cannot exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { where: { id: this.id } };
        const evaluationDb = await EvalutaionDb.findOne(query);
        const evaluation = Obj.cast(new Evaluation(), evaluationDb);
        evaluation.remove();

        const result = await EvalutaionDb.update(evaluation, query);
        return new CommandRestult(result ? 1 : 0);
    }
}

module.exports = {
    RemoveEvaluationCommand
}