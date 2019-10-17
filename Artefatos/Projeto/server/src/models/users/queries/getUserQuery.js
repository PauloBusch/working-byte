const { QueryResult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { Query } = require('../../../utils/interfaces/query');

const { UserDb } = require('../../../mapping');

class GetUserQuery extends Query {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){ 
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");

        const exists = await UserDb.count({ where: { id: this.id, removed: false } });
        if (!exists)
            return new Error(EErrorCode.NotFound, "User with id does not exists");
    }

    async HasPermission(){
        // TODO: Validate with token
        return true;
    }

    async Execute(){
        const fields =  [
            'id', 
            'first_name', 
            'last_name', 
            'email',
            'address', 
            'phone', 
            'cpf', 
            'age', 
            'is_personal',
            'sexo', 
            'login'
        ];
        const query = { 
            attributes: fields,
            where: { id: this.id }
         };
        const user = await UserDb.findOne(query);
        return new QueryResult(user ? 1 : 0, [user]);
    }
}

module.exports = {
    GetUserQuery
}
