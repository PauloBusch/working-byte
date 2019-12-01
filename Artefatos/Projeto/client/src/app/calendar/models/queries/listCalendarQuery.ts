export class ListCalendarQuery {
    public search: string;
    public limit: number;
    public page: number;
    public sortAsc: boolean;
    public columnSort: string;
    public id_athlete: string;

    constructor(
        page: number = null,
        limit: number = null,
        sortAsc: boolean = null,
        columnSort: string = null,
        search: string = null,
        id_athlete: string = null
    ) {
        this.page = page;
        this.limit = limit;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
        this.search = search;
        this.id_athlete = id_athlete;
    }
}