const { EntityBase } = require('../../utils/database/entityBase');

class Exercise extends EntityBase {
    constructor(
        id, 
        name,
        repetition,
        charge,
        id_equipment

    ){
        super(id);
        this.name = name;
        this.repetition = repetition;
        this.charge = charge;
        this.id_equipment = id_equipment;
    }
}

module.exports = {
    Exercise
}