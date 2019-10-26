const { EntityBase } = require('../../utils/database/entityBase');

class Equipament extends EntityBase {
    constructor(
        id, 
        name,
        is_disponible
    ){
        super();
        this.id = id;
        this.name = name;
        this.is_disponible = is_disponible;
    }
}

module.exports = {
    Equipament
}