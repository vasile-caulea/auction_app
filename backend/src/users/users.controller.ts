import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { User } from '../database/schemas/users.schema';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { Response } from 'express';
import { GetUserResponseDto } from './dto/get-user-response.dto/get-user-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        await this.usersService.createUser(createUserDto);

        return res.status(HttpStatus.CREATED).json({
            message: 'User has been created successfully',
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user-info')
    async getUserInfo(@Req() req: any) {
        return req.user;
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<GetUserResponseDto> {
        return this.usersService.getUserById(id);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
