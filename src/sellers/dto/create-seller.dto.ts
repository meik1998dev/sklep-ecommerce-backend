import { IsString, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(8)
  password: string;

  email: string;
}
