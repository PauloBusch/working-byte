const { Query } = require('../../../utils/interfaces/query');
const { Error, EErrorCode, QueryResult } = require('../../../utils/content/dataResult');
const { TypeDb, EquipmentDb } = require('../../../mapping');

const { Op } = require('sequelize');

class ListTypesQuery extends Query {
    constructor(
        search,
        id_equipment
    ){
        super();
        this.search = search;
        this.id_equipment = id_equipment;
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

        if (this.id_equipment){
            query.include.push({
                attributes: [],
                model: EquipmentDb,
                where: { id_equipment: this.id_equipment }
            });
        }

        const result = await TypeDb.findAndCountAll(query);
        return new QueryResult(result.rows.length, result.rows);
    }
}

module.exports = { 
    ListTypesQuery
 }
