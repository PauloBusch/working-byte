const { QueryResult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { Query } = require('../../../utils/interfaces/query');
const { ExerciseDb, EquipmentDb } = require('../../../mapping');
 
class GetExerciseQuery extends Query {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await ExerciseDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Exercise with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const fields =  [
            'id', 
            'name', 
            'repetition', 
            'charge', 
            'sessions'
        ];
        const query = { 
            attributes: fields,
            where: { id: this.id },
            include: [{
                attributes: ['name'],
                as: 'equipment',
                model: EquipmentDb
            }]
         };

        const exercise = await ExerciseDb.findOne(query);
        return new QueryResult(exercise ? 1 : 0, [exercise]);        
    }
}

module.exports = {
    GetExerciseQuery
}