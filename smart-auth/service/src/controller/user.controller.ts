import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { User } from "../entity/user.entity";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "./create-user.dto";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post()
  async registerUser(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: CreateUserDto
  ): Promise<Partial<User>> {
    const newUser = await this.userService.createUser(
      dto.email,
      dto.password,
      dto.role
    );
    return { id: newUser.id };
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    const token = await this.authService.createToken(req.user);
    return {
      access_token: token,
    };
  }
}
