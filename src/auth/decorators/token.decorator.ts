import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.token);

    if (!request.token) {
      throw new InternalServerErrorException(
        'Token not found in request (AuthGuard called?)',
      );
    }

    return request.token;
  },
);
