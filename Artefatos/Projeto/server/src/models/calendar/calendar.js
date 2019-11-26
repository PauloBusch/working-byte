const { EntityBase } = require('../../utils/database/entityBase');

class Calendar extends EntityBase {
    constructor(
        id, 
        name,
        id_training,
        date,
        timeInitial,
        timeEnd
        //removed
    ){
        super(id);
        //this.id = id;
        this.name = name;
        this.id_training = id_training;
        this.date = date;
        this.timeInitial = timeInitial;
        this.timeEnd = timeEnd;
        //this.removed = removed;
    }
}

module.exports = {
    Calendar
}