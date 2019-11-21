const { EntityBase } = require('../../utils/database/entityBase');

class Calendar extends EntityBase {
    constructor(
        id, 
        name,
        description,
        date,
        timeInitial,
        timeEnd
        //removed
    ){
        super(id);
        //this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.timeInitial = timeInitial;
        this.timeEnd = timeEnd;
        //this.removed = removed;
    }
}

module.exports = {
    Calendar
}