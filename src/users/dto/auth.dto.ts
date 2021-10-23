import { IsBoolean, IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {
   @IsString()
   email: string;

   @IsString()
   @MinLength(8)
   password: string;

   @IsBoolean()
   isSeller: boolean;
}
