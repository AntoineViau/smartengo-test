import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./auth/jwt.strategy";
import { LocalStrategy } from "./auth/local.strategy";
import { UserController } from "./controller/user.controller";
import { DatabaseModule } from "./database/database.module";
import { entitiesProviders } from "./database/entities.providers";
import { AuthService } from "./service/auth.service";
import { PasswordService } from "./service/password.service";
import { UserService } from "./service/user.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../env/${process.env.NODE_ENV || "dev"}.env`,
    }),
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || "48h" },
    }),
  ],
  controllers: [UserController],
  providers: [
    ...entitiesProviders,
    PasswordService,
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
