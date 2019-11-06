export class ListDietQuery {
    public search: string;
    public limit: number;
    public page: number;
    public sortAsc: boolean;
    public columnSort: string;

    constructor(
        limit: number,
        page: number,
        sortAsc: boolean,
        columnSort: string,
        search: string = null
    ) {
        this.limit = limit;
        this.page = page;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
        this.search = search;
    }
}