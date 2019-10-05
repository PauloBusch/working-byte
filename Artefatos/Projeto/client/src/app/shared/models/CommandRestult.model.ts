import { EErrorCode } from './EErrorCode.model';

export class CommadResult {
    public ErrorCode: EErrorCode;
    public Message: string;
    public Rows: number;
    public Data: any;
}