const { EntityBase } = require('../../utils/database/entityBase');
const { NewId } = require('../../utils/database/random');

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

    remove(){
        super.remove();
        
        this.name = `${NewId()}-${this.name}`;//UQ_name
    }
}

module.exports = {
    Payment
}