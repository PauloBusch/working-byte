const { EntityBase } = require('../../utils/database/entityBase');

class Training extends EntityBase {
    constructor(
        id, 
        name,
        description,
        id_personal,
        id_athlete,
        frequency
    ){
        super(id);
        this.name = name;
        this.description = description;
        this.id_personal = id_personal;
        this.id_athlete = id_athlete;
        this.frequency = frequency;
    }
}

module.exports = {
    Training
}