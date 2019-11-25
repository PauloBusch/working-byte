export class ListPaymentQuery {
    public search: string;

    constructor(
        search: string = null
    ) {
        this.search = search;
    }
}
