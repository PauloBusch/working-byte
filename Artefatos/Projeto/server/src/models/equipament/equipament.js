const { EntityBase } = require('../../utils/database/entityBase');

class Equipament extends EntityBase {
    constructor(
        id, 
        name,
        code,
        is_disponible
    ){
        super();
        this.id = id;
        this.name = name;
        this.code = code;
        this.is_disponible = is_disponible;
    }
}

module.exports = {
    Equipament
}