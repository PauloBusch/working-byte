const { Query } = require('../../../utils/interfaces/query');
const { QueryResult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { EvaluationDb, UserDb } = require('../../../mapping');

const _ = require('lodash');
const { Op } = require('sequelize');

class ListEvaluationQuery extends Query {
    constructor(
        page,
        limit,
        sortColumn,
        sortAsc,
        rangeDate,
        rangeImc,
        rangePeso,
        rangeAltura,
        id_user_avaliador,
        id_user_avaliado,
    ){
        super();
        this.page = page;
        this.limit = limit;
        this.sortColumn = sortColumn;
        this.sortAsc = sortAsc;
        this.rangeDate = rangeDate;
        this.rangeImc = rangeImc;
        this.rangePeso = rangePeso;
        this.rangeAltura = rangeAltura; 
        this.id_user_avaliado = id_user_avaliado;
        this.id_user_avaliador = id_user_avaliador;
    }

    async GetError(){
        if (!this.page || this.page <= 0)
            return new Error(EErrorCode.invalidParams, "Parameter page require positive");

        if (!this.limit || this.limit <= 0 || this.limit > 100)
            return new Error(EErrorCode.InvalidParams, "Parameter limit require between 1 and 100");

        if (this.rangeDate != undefined && (this.rangeDate.start == undefined || this.rangeDate.end == undefined))
            return new Error(EErrorCode.InvalidParams, "Parameter rangeDate require object { start: value, and: value }");

        if (this.rangeImc != undefined && (this.rangeImc.start == undefined || this.rangeImc.end == undefined))
            return new Error(EErrorCode.InvalidParams, "Parameter rangeImc require object { start: value, end: value }");

        if (this.rangePeso != undefined && (this.rangePeso.start == undefined || this.rangePeso == undefined))
            return new Error(EErrorCode.InvalidParams, "Parameter rangePeso require object { start: value, end: value }");

        if (this.rangeAltura != undefined && (this.rangeAltura.start == undefined || this.rangeAltura.end == undefined))
            return new Error(EErrorCode.InvalidParams, "Parameter rangeAltura require object { start: value, end: value }");

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const sorts = ['evaluation_created', 'imc', 'peso', 'altura', 'avaliador_name', 'avaliado_name'];
        if (!this.sortColumn || !sorts.some(f => f == this.sortColumn))
            this.sortColumn = 'evaluation_created';
        
        const mapped = [
            { key: 'avaliador_name', col: '`user`.name' }
        ];

        const bindSort = mapped.find(m => m.key == this.sortColumn);
        if (bindSort){
            this.sortColumn = bindSort.col;
        }

        const query = { 
            attributes: ['id', 'imc', 'peso', 'altura'],
            where: { } ,
            limit: this.limit,
            offset: (this.page - 1) * this.limit,
            order: [[
                this.sortColumn,
                this.sortAsc ? 'asc' : 'desc'
            ]],
            include: [{
                attributes: ['first_name', 'last_name'],
                as: 'avaliado',
                model: UserDb
            },{
                attributes: ['first_name', 'last_name'],
                as: 'avaliador',
                model: UserDb
            }]
        };


        if (this.id_user_avaliado)
            query.where.id_user_avaliado = this.id_user_avaliado;

        if (this.id_user_avaliador)
            query.where.id_user_avaliador = this.id_user_avaliador;

        if (this.rangeDate){
            query.where.evaluation_created = {
                [Op.between]: [
                    this.rangeDate.start, 
                    this.rangeDate.end
                ]
            };
        }

        if (this.rangeImc){
            query.where.imc = {
                [Op.between]: [
                    this.rangeImc.start,
                    this.rangeImc.end
                ] 
            };
        }

        if (this.rangePeso){
            query.where.peso = {
                [Op.between]: [
                    this.rangePeso.start,
                    this.rangePeso.end
                ]
            };
        }

        if (this.rangeAltura){
            query.where.altura = {
                [Op.between]: [
                    this.rangeAltura.start,
                    this.rangeAltura.end
                ]
            };
        }

        const evaluations = await EvaluationDb.findAndCountAll(query);
        return new QueryResult(evaluations.rows.length, evaluations.rows);
    }
}

module.exports = {
    ListEvaluationQuery
}