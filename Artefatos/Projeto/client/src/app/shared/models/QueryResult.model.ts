import { EErrorCode } from './EErrorCode.model';

export class QueryResult<Type> {
    public Rows: number;
    public List: Array<Type>;
    public ErrorCode: EErrorCode;
    public Message: string;
}