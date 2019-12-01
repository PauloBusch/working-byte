import { Time } from '@angular/common';

export class UpdateTrainingCommand{
    public id: string;
    public name: string;
    public exercise: string;
    public date: Date;
    public timeInitial: Time;
    public timeEnd: Time;

    constructor(

    id: string,
    name: string,
    exercise: string,
    date: Date,
    timeInitial: Time,
    timeEnd: Time
    ){
        this.id = id;
        this.name = name;
        this.exercise = exercise;
        this.date = date;
        this.timeInitial = timeInitial;
        this.timeEnd = timeEnd;
    }
}