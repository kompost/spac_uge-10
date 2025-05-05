import { Body, Controller, Request, HttpException, HttpStatus, Post, Put, UseGuards, Get } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { User } from '@prisma/client';
import { SignUpDto } from './signup.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    readonly secure: boolean = (process.env.TOKEN_SECURE ?? false) as boolean

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiOperation({ summary: 'Login to get an access token' })
    async login(@Request() req: Request & { user: Omit<User, 'password'> }) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    @ApiBearerAuth('access-token')
    getProfile(@Request() req: any) {
        return req.user;
    }

    @Put('register')
    @Public()
    @ApiBody({ type: LoginDto })
    @ApiOperation({ summary: 'Creates a new user and logs them in' })
    @ApiResponse({ status: 200, description: 'Registration successful, you are now loged in' })
    @ApiResponse({ status: 406, description: 'Not acceptable' })
    async register(@Body() dto: SignUpDto) {
        try {
            const newUser = await this.authService.register(dto);
            await this.authService.login(newUser);
            return { message: 'Registration successful, you are now loged in' };
        } catch (error) {
            throw new HttpException(
                `Something went worng with the creation of the login\n${error.message}`,
                HttpStatus.NOT_ACCEPTABLE
            );
        }
    }
}
