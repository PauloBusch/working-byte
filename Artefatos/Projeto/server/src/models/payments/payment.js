const { EntityBase } = require('../../utils/database/entityBase');

class Payment extends EntityBase {
    constructor(
        id,
        name,
        value,
        day
    ){
        super(id);
        this.name = name;
        this.value = value;
        this.day = day;
    }
}

module.exports = {
    Payment
}