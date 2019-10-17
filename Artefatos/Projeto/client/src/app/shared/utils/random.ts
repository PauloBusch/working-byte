export class Random {
    public NewId(): string {
        return Math.random().toString(36).substr(2, 8);
    }
}
