export class ListDietTypeQuery {
    public search: string;
    public id_diet: string;

    constructor(
        search: string = null,
        id_diet: string = null
    ){
        this.search = search;
        this.id_diet = id_diet;
    }
}