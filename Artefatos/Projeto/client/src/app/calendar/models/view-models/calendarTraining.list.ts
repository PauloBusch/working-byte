import { Time } from '@angular/common';

export class CalendarTrainingList {
    public id: string;
    public name: string;
    public description: string;

    constructor(
        id: string,
        name: string,
        description: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}