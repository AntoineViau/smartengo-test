import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordService {
  hashPassword(password: string): string {
    const hasher = crypto.createHash('SHA256');
    return hasher
      .update(`${process.env.SECRET_PASSWORD_SALT}${password}`)
      .digest('hex');
  }
}
