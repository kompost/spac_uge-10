import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    readonly secure: boolean = (process.env.TOKEN_SECURE ?? false) as boolean

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
            secure: this.secure,
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000,
        });

        return { message: 'Login successful' };
    }

    @Put('register')
    @ApiBody({ type: LoginDto })
    @ApiOperation({ summary: 'Creates a new user and logs them in' })
    @ApiResponse({ status: 200, description: 'Registration successful, you are now loged in' })
    @ApiResponse({ status: 406, description: 'Not acceptable' })

    async register(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        try {
            this.authService.register(dto);
            this.login(dto, response);
            return { message: 'Registration successful, you are now loged in' };
        } catch (error) {
            throw new HttpException(
                `Something went worng with the creation of the login\n${error.message}`,
                HttpStatus.NOT_ACCEPTABLE
            );
        }
    }
}
