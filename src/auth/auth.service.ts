import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService){}
  async validateuUser(id: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(id);

  }
}
