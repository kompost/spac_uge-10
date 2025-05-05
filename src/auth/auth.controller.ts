import { Request, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiOperation({ summary: 'Login to get an access token' })
    async login(@Request() req: { user: any }) {
        return this.authService.login(req.user);
    }

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('logout')
    @ApiOperation({ summary: 'Logout from the API' })
    async logout(@Request() req: any) {
        return req.logout();
    }

    @Get('profile')
    @ApiBearerAuth('access-token')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
