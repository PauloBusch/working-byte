import { EErrorCode } from './EErrorCode.model';
import { User } from 'src/app/users/models/user.models';

export class AuthResult {
    public Auth: boolean;
    public Token: string;
    public User: User;
    public ErrorCode: EErrorCode;
    public Message: string;
}