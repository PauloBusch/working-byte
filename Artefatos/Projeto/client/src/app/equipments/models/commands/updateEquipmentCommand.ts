export class UpdateEquipmentCommand {
    public id: string;
    public name: string;
    public code: string;
    constructor(
        id: string,
        name: string,
        code: string
    ) {
        this.id = id;
        this.name = name;
        this.code = code;
    }
}
