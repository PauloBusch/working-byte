const { Command } = require('../../../utils/interfaces/command');
const { EvaluationDb } = require('../../../mapping');

class CreateEvaluationCommand extends Command {
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
        if ()
        
        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){

    }
}

module.exports = {
    CreateEvaluationCommand
}