const { Query } = require('../../../utils/interfaces/query');
const { Error, EErrorCode } = require('../../../utils/content/dataResult');
const { PaymentsDb } = require('../../../mapping');  

class GetPaymentQuery extends Query {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await PaymentsDb.count({ where: { id: this.id, removed: false } });
        if (!exists)
            return new Error(EErrorCode.NotFound, `Payment with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){

        return 
    }
}

module.exports = {
    GetPaymentQuery
}