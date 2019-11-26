const { EntityBase } = require('../../utils/database/entityBase');

class Training extends EntityBase {
    constructor(
        id, 
        name,
        description
    ){
        super(id);
        this.name = name;
        this.description = description;
    }
}

module.exports = {
    Training
}