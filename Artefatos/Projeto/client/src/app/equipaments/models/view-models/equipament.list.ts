export class EquipamentList {
    public id: string;
    public name: string;
    public code: string;
    public is_disponible: boolean;
    public type: { name: string };
    constructor(
        id: string,
        name: string,
        code: string,
        is_disponible: boolean,
        type: { name: string }
    ) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.is_disponible = is_disponible;
        this.type = type;
    }
}