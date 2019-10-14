export class Storage {
    static get(path: string, defaultValue: any): any {
        const value = localStorage.getItem(path);
        if (!value) {
            return defaultValue;
        }

        const type = typeof(defaultValue);
        if (type === 'number') {
            return parseInt(value, 10);
        }
    }
    static set(path: string, definedValue: any) {
        localStorage.setItem(path, definedValue);
    }
}