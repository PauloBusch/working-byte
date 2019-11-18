const { Query } = require('../../../utils/interfaces/query');
const { EquipmentDb } = require('../../../mapping');
const { QueryResult } = require('../../../utils/content/dataResult');

const Op = require('sequelize');

class ListEquipmentQuery extends Query{
    constructor(
        search,
        page,
        limit,
        is_disponible,
        sortAsc,
        columnSort
    ){
        super();
        this.search = search;
        this.page = page;
        this.limit = limit;
        this.is_disponible = is_disponible;
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
            attributes: ['id', 'name', 'code', 'is_disponible'], 
            where: { removed: false },
            limit: this.limit,
            offset: (this.page - 1) * this.limit,
            order: [[this.columnSort, this.sortAsc ? 'asc' : 'desc']]
        };

        if (this.search){
            const searchLike = `%${this.search}%`;
            query.where[Op.or] = [
                { name: { [Op.like]: searchLike } },
                { code: { [Op.like]: searchLike } }
            ];
        }

        if (this.is_disponible)
            query.where.is_disponible = this.is_disponible;

        const equipments = await EquipmentDb.findAndCountAll(query);
        return new QueryResult(equipments.count, equipments.rows);
    }
}

module.exports = {
    ListEquipmentQuery
}
