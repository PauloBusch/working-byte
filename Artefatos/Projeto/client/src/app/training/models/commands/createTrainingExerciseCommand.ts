import { Time } from '@angular/common';

export class CreateTrainingExerciseCommand{
    public id: string;
    public name: string;
    public description: string;
    public id_training: string;
    public id_equipment: string;
    public repeat: number;
    public charge: number;
    public sessions: number;

    constructor(
        id: string,
        name: string,
        description: string,
        id_training: string,
        id_equipment: string,
        repeat: number,
        charge: number,
        sessions: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.id_equipment = id_equipment;
        this.id_training = id_training;
        this.repeat = repeat;
        this.charge = charge;
        this.sessions = sessions;
    }
}