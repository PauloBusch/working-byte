const { Query } = require('../../../utils/interfaces/query');
const { Error, EErrorCode, QueryResult } = require('../../../utils/content/dataResult');
const { TypeDb, EquipamentDb } = require('../../../mapping');

const { Op } = require('sequelize');

class ListTypesQuery extends Query {
    constructor(
        search,
        id_equipament
    ){
        super();
        this.search = search;
        this.id_equipament = id_equipament;
    }

    async GetError(){
        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = {
            attributes: ['id', 'name'],
            where: {},
            include: []
        };

        if (this.search){
            const searchLike = `%${this.search}%`;
            query.where.name = { [Op.like]: searchLike };
        }

        if (this.id_equipament){
            query.include.push({
                attributes: [],
                model: EquipamentDb,
                where: { id_equipament: this.id_equipament }
            });
        }

        const result = await TypeDb.findAndCountAll(query);
        return new QueryResult(result.rows.length, result.rows);
    }
}

module.exports = { 
    ListTypesQuery
 }