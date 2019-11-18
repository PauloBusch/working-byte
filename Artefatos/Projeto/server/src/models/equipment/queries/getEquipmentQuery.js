const { Query } = require('../../../utils/interfaces/query');
const { TypeDb, EquipmentDb } = require('../../../mapping');
 
class GetEquipmentQuery extends Query {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await EquipmentDb.count({ where: { id: this.id, removed: false } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Equipment with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { 
            attributes: ['id','name','code','is_disponible'],
            where: { id: this.id },
            include: [{
                model: TypeDb
            }]
        };

        const equipment = await EquipmentDb.findOne(query);
        return new QueryResult(1, [equipment]);        
    }
}

module.exports = {
    GetEquipmentQuery
}
