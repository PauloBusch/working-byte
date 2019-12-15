const { EntityBase } = require('../../utils/database/entityBase');

class Exercise extends EntityBase {
    constructor(
        id, 
        name,
        description,
        id_training,
        id_equipment,
        repetition,
        charge,
        sessions

    ){
        super(id);
        this.name = name;
        this.description = description;
        this.id_training = id_training
        this.id_equipment = id_equipment;
        this.repetition = repetition;
        this.charge = charge;
        this.sessions = sessions;
    }
}

module.exports = {
    Exercise
}