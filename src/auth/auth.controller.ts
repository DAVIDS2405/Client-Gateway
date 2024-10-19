import { Controller, Get, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const login = await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto),
      );
      return login;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      const register = await firstValueFrom(
        this.client.send('auth.register.user', registerUserDto),
      );
      return register;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@User() user: CurrentUser, @Token() token: string) {
    console.log(user);

    return { user, token };
  }
}
