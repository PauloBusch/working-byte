export class Random {
    static NewId(): string {
        return Math.random().toString(36).substr(2, 8);
    }
}
