import { Controller, Get, Param, ParseIntPipe, Req } from "@nestjs/common";
import { RoutineService } from "./routine.service";

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService : RoutineService){}

  @Get('list/:id')
  fetchListRoutines(@Param("id", ParseIntPipe) id : number) {
    return this.routineService.fetchListRoutines(id)
  }
}