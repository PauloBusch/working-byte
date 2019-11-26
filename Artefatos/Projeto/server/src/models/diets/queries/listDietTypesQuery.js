const { Query } = require('../../../utils/interfaces/query');
const { QueryResult } = require('../../../utils/content/dataResult');
const { DietTypeDb, DietDb } = require('../../../mapping');

const { Op } = require('sequelize');

class ListDietTypesQuery extends Query {
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
            where: {}
        };

        if (this.search){
            const searchLike = `%${this.search}%`;
            query.where.name = { [Op.like]: searchLike };
        }

        if (this.id_diet){
            query.include.push({
                attributes: [],
                model: DietDb,
                where: { id: this.id_diet }
            });
        }

        const result = await DietTypeDb.findAndCountAll(query);
        return new QueryResult(result.rows.length, result.rows);
    }
}

module.exports = { 
    ListDietTypesQuery
 }
