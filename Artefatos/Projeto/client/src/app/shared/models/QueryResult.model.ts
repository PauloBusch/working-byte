import { EErrorCode } from './EErrorCode.model';

export class QueryResult<Type> {
    public ErrorCode: EErrorCode;
    public Message: string;
    public List: Array<Type>;
    public Rows: number;
}