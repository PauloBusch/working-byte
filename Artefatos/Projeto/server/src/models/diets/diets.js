const { EntityBase } = require('../../utils/database/entityBase');

class Diets extends EntityBase {
    constructor(
        id,
        name,
        description,
        id_type_diet
    ){
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.id_type_diet = id_type_diet;
    }
}


module.exports = {
    Diets
}