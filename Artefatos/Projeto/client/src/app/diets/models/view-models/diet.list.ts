export class DietList {
    public id: string;
    public name: string;
    public description: string;
    public type_diet: { id: string, name:string };

    constructor(
        id: string,
        name: string,
        description: string,
        type_diet: {id: string,  name: string }
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type_diet = type_diet;
    }
}