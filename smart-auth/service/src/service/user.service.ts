import { Inject, Injectable } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { Role } from "../entity/role.model";
import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY") private userRepository: UserRepository,
    private passwordService: PasswordService
  ) {}

  async createUser(email: string, password: string, role: Role): Promise<User> {
    const newUser: User = this.userRepository.create({
      email,
      password: this.passwordService.hashPassword(password),
      role,
    });
    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async findById(id: string) {
    return await this.userRepository.findOne({ id });
  }
}
