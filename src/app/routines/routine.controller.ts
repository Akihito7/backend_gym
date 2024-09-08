import { Controller, Get, NotFoundException, Param, ParseIntPipe, Req, UseGuards } from "@nestjs/common";
import { RoutineService } from "./routine.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) { }

  @Get('list/:id')
  @UseGuards(AuthGuard)
  fetchListRoutines(@Param("id", ParseIntPipe) id: number) {
    return this.routineService.fetchListRoutines(id)
  }

  @Get(':routineId')
  fetchRoutineWithExercises(@Param("routineId", ParseIntPipe) routineId: number) {
    return this.routineService.fetchRoutineWithExercises(routineId)
  }
}