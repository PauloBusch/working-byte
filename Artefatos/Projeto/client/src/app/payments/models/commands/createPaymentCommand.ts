export class CreatePaymentCommand {
    public id: string;
    public name: string;
    public value: number;
    public day: number;

    constructor(
        id: string,
        name: string,
        value: number,
        day: number
    ) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.day = day;
    }
}
