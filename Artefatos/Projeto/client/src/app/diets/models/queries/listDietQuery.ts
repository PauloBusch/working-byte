export class ListDietQuery {
    public search: string;
    public limit: number;
    public page: number;
    public sortAsc: boolean;
    public columnSort: string;
    public id_type_diet: string;

    constructor(
        page: number,
        limit: number,
        sortAsc: boolean,
        columnSort: string,
        search: string = null,
        id_type_diet: string = null
    ) {
        this.page = page;
        this.limit = limit;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
        this.search = search;
        this.id_type_diet = id_type_diet;
    }
}