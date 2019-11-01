const { Query } = require('../../../utils/interfaces/query');
const { Error, EErrorCode, QueryResult } = require('../../../utils/content/dataResult');
const { TypeDb } = require('../../../mapping');

const { Op } = require('sequelize');

class ListTypesQuery extends Query {
    constructor(
        limit,
        search,
        id_equipament
    ){
        super();
        this.limit = limit;
        this.search = search;
        this.id_equipament = id_equipament;
    }

    async GetError(){
        if (!this.limit || this.limit <= 0 || this.limit > 100)
            return new Error(EErrorCode.InvalidParams, "Parameter limit require between 1 and 100");

            return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = {
            attributes: ['id', 'name'],
            where: {},
            offset: this.limit
        };

        if (this.search){
            const searchLike = `%${this.search}%`;
            query.where.name = { [Op.like]: searchLike };
        }

        if (this.id_equipament){
            query.where.id_equipament = this.id_equipament;
        }

        const result = await TypeDb.findAndCountAll(query);
        return new QueryResult(result.rows.length, result.rows);
    }
}