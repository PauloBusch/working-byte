const { EntityBase } = require('../../../utils/database/entityBase');

class Type extends EntityBase {
    constructor(
        id, 
        name
    ){
        super(id);
        this.name = name;
    }
}

module.exports = {
    Type
};