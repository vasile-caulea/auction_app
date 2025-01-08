import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        console.log('loginDto', loginDto);
        return this.authService.login(loginDto.email, loginDto.password);
    }
}

