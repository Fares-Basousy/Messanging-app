import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/Auth.dto';
import { SigninAuthDto } from './dto/Auth.signin.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log(dto)

    return this.authService.signup(dto);
  }
  @Post('signin')
  signin(@Body() dto: SigninAuthDto) {
    return this.authService.signin(dto);
  }
}
