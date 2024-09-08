
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }
  async canActivate(context: ExecutionContext) {
    const { headers } = context.switchToHttp().getRequest();
    if (!headers.authorization) throw new UnauthorizedException("Invalid token")
    const [, token] = headers.authorization.split(" ");
    const isValidToken = await this.authService.checkToken(token);
    return isValidToken
  }
}