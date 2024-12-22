import { Controller, Get } from '@nestjs/common';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
