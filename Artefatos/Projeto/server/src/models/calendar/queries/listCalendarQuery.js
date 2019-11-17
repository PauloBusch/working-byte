const { Query } = require('../../../utils/interfaces/query');
const { CalendarDb } = require('../../../mapping');
const { QueryResult } = require('../../../utils/content/dataResult');

const Op = require('sequelize');

class ListCalendarQuery extends Query{
    constructor(
        search,
        page,
        limit,
        name,
        sortAsc,
        columnSort
    ){
        super();
        this.search = search;
        this.page = page;
        this.limit = limit;
        this.name = name;
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
            order: [[this.columnSort, this.sortAsc ? 'asc' : 'desc']]
        };

        if (this.search){
            const searchLike = `%${this.search}%`;
            query.where[Op.or] = [
                { name: { [Op.like]: searchLike } },
                { description: { [Op.like]: searchLike } }
            ];
        }


        const calendars = await CalendarDb.findAndCountAll(query);
        return new QueryResult(calendars.count, calendars.rows);
    }
}

module.exports = {
    ListCalendarQuery
}