export class ListUserQuery {
    public search: string;
    public is_personal: boolean;
    public limit: number;
    public page: number;
    public sortAsc: boolean;
    public columnSort: string;
    public id: string;

    constructor(
        limit: number,
        page: number,
        sortAsc: boolean,
        columnSort: string,
        search: string = null,
        is_personal: boolean = null,
        id: string = null
    ) {
        this.search = search;
        this.is_personal = is_personal;
        this.limit = limit;
        this.page = page;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
        this.id = id;
    }
}
