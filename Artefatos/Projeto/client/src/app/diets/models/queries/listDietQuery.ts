export class ListDietQuery {
    public search: string;
    public limit: number;
    public page: number;
    public sortAsc: boolean;
    public columnSort: string;

    constructor(
        page: number,
        limit: number,
        sortAsc: boolean,
        columnSort: string,
        search: string = null
    ) {
        this.page = page;
        this.limit = limit;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
        this.search = search;
    }
}