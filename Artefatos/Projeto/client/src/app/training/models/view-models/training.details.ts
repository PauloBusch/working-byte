import { Time } from '@angular/common';

export class TrainingDetails {
    public id: string;
    public name: string;
    public description: any;
    // public date: Date;
    // public timeInitial: Time;
    // public timeEnd: Time;

    constructor(
        id: string,
        name: string,
        description: any,
        // date: Date,
        // timeInitial: Time,
        // timeEnd: Time
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        // this.date = date;
        // this.timeInitial = timeInitial;
        // this.timeEnd = timeEnd;
    }
}