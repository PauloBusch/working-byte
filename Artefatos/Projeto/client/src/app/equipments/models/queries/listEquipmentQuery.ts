export class ListEquipmentQuery {
    public page: number;
    public limit: number;
    public sortAsc: boolean;
    public columnSort: string;
    public search: string;
    public is_disponible: boolean;
    public id_type: string;
    constructor(
        page: number,
        limit: number,
        sortAsc: boolean,
        columnSort: string,
        search: string = null,
        is_disponible: boolean = null,
        id_type: string = null
    ) {
        this.page = page;
        this.limit = limit;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
        this.search = search;
        this.is_disponible = is_disponible;
        this.id_type = id_type;
    }
}
