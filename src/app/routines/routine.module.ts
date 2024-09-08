import { Module } from "@nestjs/common";
import { RoutineController } from "./routine.controller";
import { RoutineService } from "./routine.service";
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers : [RoutineController],
  providers : [RoutineService],
  imports : [AuthModule]
})
export class RoutineModule {}