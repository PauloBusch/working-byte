const { EntityBase } = require('../../utils/database/entityBase');

class Diets extends EntityBase {
    constructor(
        id,
        name,
        description,
        id_type
    ){
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.id_type = id_type;
    }
}


module.exports = {
    Diets
}