import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({
    secret: "xama44"
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports : [AuthService]
})
export class AuthModule { }