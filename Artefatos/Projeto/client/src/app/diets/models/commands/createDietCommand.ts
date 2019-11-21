export class CreateDietCommand {
    public id: string;
    public name: string;
    public description: string[];
    public id_training: string;
    public id_user: string;
    public id_diet_type: string;

    constructor(
        id: string,
        name: string,
        description: string[],
        //id_training: string,
        //id_user: string,
        id_diet_type: string

    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        //this.id_training = id_training;
        //this.id_user = id_user;
        this.id_diet_type = id_diet_type;
    }
}