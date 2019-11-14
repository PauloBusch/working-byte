const { EntityBase } = require('../../utils/database/entityBase');

class Calendar extends EntityBase {
    constructor(
        id, 
        name,
        description
    ){
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        
    }
}

module.exports = {
    Calendar
}