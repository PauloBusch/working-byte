import { Observable, Subscription } from 'rxjs';
import { QueryResult } from './QueryResult.model';
import { tap } from 'rxjs/operators';
import { EErrorCode } from './EErrorCode.model';

export class AsyncQuery<Type> {
    public list: Type[];
    public subsc: Subscription;
    public length: number;
    public loading: boolean;
    public noItems: boolean;

    private _$list: Observable<QueryResult<Type>>;

    get $list(): Observable<QueryResult<Type>> {
        return this._$list;
    }

    set $list($list: Observable<QueryResult<Type>>) {
        this.loading = true;
        this._$list = $list.pipe(tap((res) => {
            this.loading = false;
            if (res.ErrorCode ===  EErrorCode.None) {
                this.list = res.List;
                this.noItems = !res.List.length;
                this.length = res.Rows;
            }
        }));
    }
}
