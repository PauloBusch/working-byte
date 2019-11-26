const { EntityBase } = require('../../../utils/database/entityBase');

class DietType extends EntityBase {

    constructor(id, name){
        super(id);
        this.name = name;
    }
}

module.exports = {
    DietType
};