export class ListEquipamentQuery {
    public page: number;
    public limit: number;
    public sortAsc: boolean;
    public columnSort: string;
    public search: string;
    public is_disponible: boolean;
    constructor(
        page: number,
        limit: number,
        sortAsc: boolean,
        columnSort: string,
        search: string = null,
        is_disponible: boolean = null
    ) {
        this.page = page;
        this.limit = limit;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
        this.search = search;
        this.is_disponible = is_disponible;
    }
}