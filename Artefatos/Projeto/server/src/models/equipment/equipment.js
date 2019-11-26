const { NewId } = require('../../utils/database/random');  
const { EntityBase } = require('../../utils/database/entityBase');

class Equipment extends EntityBase {
    constructor(
        id, 
        name,
        code,
        is_disponible,
        id_type
    ){
        super();
        this.id = id;
        this.name = name;
        this.code = code;
        this.is_disponible = is_disponible;
        this.id_type = id_type;
    }

    remove(){
        super.remove();

        this.code = `${this.code} - ${NewId()}`;
    }
}

module.exports = {
    Equipment
}
