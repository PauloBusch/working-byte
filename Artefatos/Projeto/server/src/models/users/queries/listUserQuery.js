const { QueryResult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { Query } = require('../../../utils/interfaces/query');

const { UserDb } = require('../../../mapping');
const _ = require('lodash');
const { Op } = require('sequelize');

class ListUserQuery extends Query {
    constructor(
        search,
        is_personal,
        limit,
        page,        
        sortAsc,
        columnSort
    ){
        super();
        this.search = search;
        this.is_personal = is_personal;
        this.limit = limit;
        this.page = page;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
    }

    async GetError(){
        if (!this.limit || this.limit <= 0 || this.limit > 100)
            return new Error(EErrorCode.InvalidParams, "Parameter limit require between 1 and 100");

        if (!this.page || this.page <= 0)
            return new Error(EErrorCode.InvalidParams, "Parameter page require positive");

        return null;
    }

    async HasPermission(){
        // TODO: Validate with token
        return true;
    }

    async Execute(){
        const fields =  [
            'id', 
            'first_name', 
            'last_name', 
            'email',
            'address', 
            'phone', 
            'cpf', 
            'age', 
            'is_personal',
            'sexo', 
            'login'
        ];
        if(!this.columnSort || !_.some(fields, f => f == this.columnSort))
            this.columnSort = 'user_created';

        const query = {
            attributes: fields,
            where: { removed: false },
            limit: this.limit,
            offset: this.limit * (this.page - 1),
            order: [[this.columnSort, this.sortAsc ? 'asc' : 'desc']]
        };

        if (this.search){
            const searchLike = `%${this.search}%`;
            query.where[Op.or] = [
                { first_name: { [Op.like]: searchLike } },
                { last_name: { [Op.like]: searchLike } },
                { email: { [Op.like]: searchLike } },
                { login: { [Op.like]: searchLike } }
            ]
        }

        if (this.is_personal != null && this.is_personal != undefined)
            query.where.is_personal = this.is_personal;

        const users = await UserDb.findAndCountAll(query);
        return new QueryResult(users.count, users.rows);
    };


}

module.exports = {
    ListUserQuery
}