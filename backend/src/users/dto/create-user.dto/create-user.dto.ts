import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8, 50)
    password: string;

    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    birthDate: Date;

    @IsNotEmpty()
    @Length(1, 20)
    firstName: string;

    @IsNotEmpty()
    @Length(1, 20)
    lastName: string;
}
