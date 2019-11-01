export class ListTypeQuery {
    public search: string;
    public id_equipament: number;
    constructor(
        search: string = null,
        id_equipament: number = null
    ){
        this.search = search;
        this.id_equipament = id_equipament;
    }
}