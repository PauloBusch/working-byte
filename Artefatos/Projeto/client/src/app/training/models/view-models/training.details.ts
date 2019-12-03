import { Time } from '@angular/common';

export class TrainingDetails {
    public id: string;
    public name: string;
    public training: any;
    public date: Date;
    public timeInitial: Time;
    public timeEnd: Time;

    constructor(
        id: string,
        name: string,
        training: any,
        date: Date,
        timeInitial: Time,
        timeEnd: Time
    ) {
        this.id = id;
        this.name = name;
        this.training = training;
        this.date = date;
        this.timeInitial = timeInitial;
        this.timeEnd = timeEnd;
    }
}