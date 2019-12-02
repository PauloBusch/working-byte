export class ListTrainingQuery {
    public search: string;
    public limit: number;
    public page: number;
    public sortAsc: boolean;
    public columnSort: string;

    constructor(
        page: number = 1,
        limit: number = 1000,
        sortAsc: boolean = false,
        columnSort: string = "training_created",
        search: string = null
    ) {
        this.page = page;
        this.limit = limit;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
        this.search = search;
    }
}
