import { Time } from '@angular/common';

export class CalendarList {
    public id: string;
    public name: string;
    public description: string;
    public date: Date;
    public timeInitial: Time;
    public timeEnd: Time;

    constructor(
        id: string,
        name: string,
        description: string,
        date: Date,
        timeInitial: Time,
        timeEnd: Time
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.timeInitial = timeInitial;
        this.timeEnd = timeEnd;
    }
}