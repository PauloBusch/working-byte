const { Error, QueryResult } = require('../../../utils/content/dataResult');
const { Query } = require('../../../utils/interfaces/query');
const { EvaluationDb } = require('../../../mapping');

class GetEvaluationQuery extends Query {
    constructor(
        id
    ){
        super();
        this.id = id;        
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");

        const exists = await EvaluationDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Evaluation with id: ${this.id} doest not exists`);
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { 
            attributes: ['id', 'imc', 'peso', 'altura', 'id_user_avaliador', 'id_user_avaliado'],
            where: { id: this.id }
         };
        const evaluation = await EvaluationDb.findOne(query);

        return new QueryResult(1, [evaluation]);
    }
}

module.exports = {
    GetEvaluationQuery
}