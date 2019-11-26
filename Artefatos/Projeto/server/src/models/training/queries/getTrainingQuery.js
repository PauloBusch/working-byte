const { QueryResult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { Query } = require('../../../utils/interfaces/query');
const { TrainingDb } = require('../../../mapping');
 
class GetTrainingQuery extends Query {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await TrainingDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Training with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const fields =  [
            'id', 
            'name', 
            'description'
        ];
        const query = { 
            attributes: fields,
            where: { id: this.id }
         };

        const training = await TrainingDb.findOne(query);
        return new QueryResult(training ? 1 : 0, [training]);        
    }
}

module.exports = {
    GetTrainingQuery
}