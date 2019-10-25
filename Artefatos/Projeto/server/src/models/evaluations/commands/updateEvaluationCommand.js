const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { Evaluation } = require('../evaluation');
const { EvaluationDb } = require('../../../mapping');

class UpdateEvaluationCommand extends Command {
    constructor(
        id,
        imc,
        peso,
        altura,
        id_user_avaliador,
        id_user_avaliado
    ){
        super();
        this.id = id;
        this.imc = imc;
        this.peso = peso;
        this.altura = altura;
        this.id_user_avaliador = id_user_avaliador;
        this.id_user_avaliado = id_user_avaliado;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");
        
        if (!this.imc || this.imc <= 0)
            return new Error(EErrorCode.InvalidParams, "Parameter imc require positive");

        if (!this.peso || this.peso < 10 || this.peso > 500)
            return new Error(EErrorCode.InvalidParams, "Parameter peso require between 10 and 500");

        if (!this.altura || this.altura < 1.0 || this.altura > 5.0)
            return new Error(EErrorCode.InvalidParams, "Parameter altura require between 1.0 and 5.0");

        if (!this.id_user_avaliado)
            return new Error(EErrorCode.InvalidParams, "Parameter id_user_avaliado cannot be null");

        if (!this.id_user_avaliador)
            return new Error(EErrorCode.InvalidParams, "Parameter id_user_avaliador cannot be null");

        const exists = await EvaluationDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFound, `Evaluation with id: ${this.id} cannot exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { where: { id: this.id } };
        const evaluation = new Evaluation(
            undefined,
            this.imc,
            this.peso,
            this.altura,
            this.id_user_avaliador,
            this.id_user_avaliado
        );

        const result = await EvaluationDb.update(evaluation, query);
        return new CommandResult(result ? 1 : 0);
    }
} 

module.exports = {
    UpdateEvaluationCommand
}