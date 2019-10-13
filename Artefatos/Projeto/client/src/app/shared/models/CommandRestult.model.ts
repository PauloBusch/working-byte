import { EErrorCode } from './EErrorCode.model';

export class CommadResult {
    public Rows: number;
    public Data: any;
    public ErrorCode: EErrorCode;
    public Message: string;
}