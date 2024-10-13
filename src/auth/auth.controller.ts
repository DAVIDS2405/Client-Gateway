import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const register = await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto),
      );
      return register;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto);
  }

  @Get('verify')
  verify(@Param('id') id: string) {
    return this.client.send('auth.verify.user', {});
  }
}
