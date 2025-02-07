import{
    IsString,
    IsPhoneNumber,
    IsNotEmpty,
    IsDate
} from 'class-validator'
import { Role } from '../../models/role';

export class LoginDTO{
    @IsPhoneNumber()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    role_id: number;

    constructor(data: any){
        this.phone_number = data.phone_number;
        this.password = data.password;
        this.role_id = data.role_id;
    }
}