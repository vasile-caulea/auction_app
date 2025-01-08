import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../database/schemas/users.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { GetUserResponseDto } from './dto/get-user-response.dto/get-user-response.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<GetUserResponseDto> {
        const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;

        if (!objectId) {
            throw new NotFoundException('Invalid user ID');
        }

        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const plainUser = user.toObject();
        const transformedUser = plainToClass(GetUserResponseDto, plainUser, { excludeExtraneousValues: true });
        console.log('Transformed user:', transformedUser);

        return transformedUser;
    }

    async createUser(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword, createdAt: new Date() });
            await createdUser.save();
        } catch (error) {
            console.log(error);
            if (error.code === 11000)
                throw new ConflictException('Email already exists');
            else
                throw new InternalServerErrorException('Internal Server Error');
        }
    }
}
