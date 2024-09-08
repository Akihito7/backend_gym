import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutineModule } from './app/routines/routine.module';
import { RoutineController } from './app/routines/routine.controller';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [RoutineModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
