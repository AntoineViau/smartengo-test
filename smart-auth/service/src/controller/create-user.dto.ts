import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/entity/role.model";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  role!: Role;
}
