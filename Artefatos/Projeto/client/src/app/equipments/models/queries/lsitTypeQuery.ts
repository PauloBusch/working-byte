export class ListTypeQuery {
    public search: string;
    public id_equipment: number;
    constructor(
        search: string = null,
        id_equipment: number = null
    ){
        this.search = search;
        this.id_equipment = id_equipment;
    }
}
