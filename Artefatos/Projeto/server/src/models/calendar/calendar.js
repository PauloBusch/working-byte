const { EntityBase } = require('../../utils/database/entityBase');

class Calendar extends EntityBase {
    constructor(
        id, 
        name,
        description
        //removed
    ){
        super(id);
        //this.id = id;
        this.name = name;
        this.description = description;
        //this.removed = removed;
    }
}

module.exports = {
    Calendar
}