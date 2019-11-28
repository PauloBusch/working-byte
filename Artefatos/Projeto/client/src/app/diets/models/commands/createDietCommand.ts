import { Identifiers } from '@angular/compiler';

export class CreateDietCommand {
    public id: string;
    public name: string;
    public description: string[];
    public id_training: string;
    public id_user: string;
    public type: {
        id: string,
        name: string
    }

    constructor(
        id: string,
        name: string,
        description: string[],
        //id_training: string,
        //id_user: string,
        type: {
            id: string,
            name: string
        }

    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        //this.id_training = id_training;
        //this.id_user = id_user;
        this.type = type;
    }
}