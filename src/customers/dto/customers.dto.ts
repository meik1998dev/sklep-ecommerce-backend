import { IsString, MinLength } from 'class-validator';

export class AuthCredentialsCustomerDto {
   @IsString()
   email: string;

   @IsString()
   @MinLength(8)
   password: string;
}
