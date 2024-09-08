import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutineModule } from './app/routines/routine.module';
import { RoutineController } from './app/routines/routine.controller';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { ExerciseModule } from './app/exercises/exercise.module';

@Module({
  imports: [RoutineModule, UserModule, AuthModule, ExerciseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
