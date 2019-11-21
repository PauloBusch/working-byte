const { Query } = require('../../../utils/interfaces/query');
const { QueryResult } = require('../../../utils/content/dataResult');
const { TypeDb, DietDb } = require('../../../mapping');

const { Op } = require('sequelize');

class ListTypesQuery extends Query {
    constructor(
        search,
        id_diet
    ){
        super();
        this.search = search;
        this.id_diet = id_diet;
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

        if (this.id_diet){
            query.include.push({
                attributes: [],
                model: DietDb,
                where: { id_diet: this.id_diet }
            });
        }

        const result = await TypeDb.findAndCountAll(query);
        return new QueryResult(result.rows.length, result.rows);
    }
}

module.exports = { 
    ListTypesQuery
 }
