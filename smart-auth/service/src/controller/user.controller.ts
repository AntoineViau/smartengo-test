import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { User } from "../entity/user.entity";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(
    @Request() req,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: CreateUserDto
  ): Promise<Partial<User>> {
    if (req.user.role !== "ADMIN") {
      throw new HttpException("Forbidden", HttpStatus.UNAUTHORIZED);
    }
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
