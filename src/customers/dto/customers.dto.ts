import { IsString, MinLength } from 'class-validator';

export class AuthCredentialsCustomerDto {
   @IsString()
   firstName: string;

   @IsString()
   lastName: string;

   @IsString()
   email: string;

   @IsString()
   @MinLength(8)
   password: string;
}
