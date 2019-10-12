class EntityBase {
    constructor(
        id
    ){
        this.id = id;
        this.removed = false;
    }

    remove(){
        this.removed = true;
    }
}

module.exports = {
    EntityBase
}