const { Query } = require('../../../utils/interfaces/query');
const { DietDb, DietTypeDb} = require('../../../mapping');
const { QueryResult } = require('../../../utils/content/dataResult');

const Op = require('sequelize');

class ListDietQuery extends Query{
    constructor(
        search,
        page,
        limit,
        sortAsc,
        columnSort
    ){
        super();
        this.search = search;
        this.page = page;
        this.limit = limit;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
    }

    async GetError(){
        if (this.page && this.page <= 0)
            return new Error(EErrorCode.InvalidPararms, "Paramter page require positive");

        if (this.limit && this.limi <= 0 && this.limit > 100)
            return new Error(EErrorCode.InvalidParams, "Paratmer limit require between 1 and 100");
    
        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = {
            attributes: ['id', 'name', 'description'], 
            where: { removed: false },
            limit: this.limit,
            offset: (this.page - 1) * this.limit,
            order: [[this.columnSort, this.sortAsc ? 'asc' : 'desc']],
            include: [{
                attributes: ['name'],
                as: 'tipe_diet',
                model: DietTypeDb
            }]
        };

        if (this.search){
            const searchLike = `%${this.search}%`;
            query.where[Op.or] = [
                { name: { [Op.like]: searchLike } },
                { description: { [Op.like]: searchLike } }
            ];
        }

        const diets = await DietDb.findAndCountAll(query);
        return new QueryResult(diets.count, diets.rows);
    }
}

module.exports = {
    ListDietQuery
}