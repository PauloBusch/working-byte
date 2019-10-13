import { HttpParams } from '@angular/common/http';

export class Content {
    static GetParams(obj: any): { params: HttpParams } {
        let params = new HttpParams();
        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            if (value !== null && value !== undefined) {
                params = params.append(key, value);
            }

        });
        return { params };
    }
}
