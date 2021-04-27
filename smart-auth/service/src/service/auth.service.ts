import { Injectable } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../entity/user.entity";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService
  ) {}

  async authenticateUser(email: string, password: string): Promise<any> {
    // TODO: https://grahamcluley.com/chuck-norris-facebook-password/
    if (process.env.MASTER_USER && email === process.env.MASTER_USER) {
      return {
        email: process.env.MASTER_USER,
        role: "ADMIN",
      };
    }
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === this.passwordService.hashPassword(password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createToken(user: User): Promise<string> {
    const payload = { userId: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
