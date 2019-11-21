export class CreateEquipmentCommand {
    public id: string;
    public name: string;
    public code: string;
    public type: {
        id: string,
        name: string
    };
    constructor(
        id: string,
        name: string,
        code: string,
        type: {
            id: string,
            name: string
        }
    ) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.type = type;
    }
}
