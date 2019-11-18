export class EquipmentDetails {
    public id: string;
    public name: string;
    public code: string;
    public is_disponible: boolean;
    public id_type: string;
    constructor(
        id: string,
        name: string,
        code: string,
        is_disponible: boolean,
        id_type: string
    ) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.is_disponible = is_disponible;
        this.id_type = id_type;
    }
}
