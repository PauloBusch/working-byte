const { Query } = require('../../../utils/interfaces/query');
const { QueryResult } = require('../../../utils/content/dataResult');
const { PaymentsDb } = require('../../../mapping');

const { Op } = require('sequelize');

class ListPaymentQuery extends Query {
    constructor(
        search
    ){
        super();
        this.search = search;
    }

    async GetError(){
        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const fields = [
            'id',
            'name',
            'value',
            'day'
        ];

        const query = {
            attributes: fields,
            where: { removed: false }
        };

        if (this.search){
            const searchLike = `%${this.search}%`;
            query.where.name = { [Op.like]: searchLike };
        }

        const payments = await PaymentsDb.findAndCountAll(query);
        return new QueryResult(payments.count, payments.rows);
    }
}

module.exports = {
    ListPaymentQuery
}