import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('signln')
  async login() {
    return this.authService.signln()
  }

  @Post('signup')
  async function(@Body() body) {
    return this.authService.signup(body)
  }
}