import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiOperation({ summary: 'Login to get an access token' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const token = this.authService.login(dto);

        response.cookie('accessToken', token, {
            httpOnly: true,
            secure: false, // TODO: set to true in production
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000,
        });

        return { message: 'Login successful' };
    }
}
