import { EErrorCode } from './EErrorCode.model';

export class CommandResult {
    public Rows: number;
    public Data: any;
    public ErrorCode: EErrorCode;
    public Message: string;
}