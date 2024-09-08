import { Injectable } from "@nestjs/common";
import { pool } from "src/config/database";

@Injectable()
export class RoutineService {
  async fetchListRoutines(id : number){
    const response = await pool.query("SELECT * FROM routines WHERE user_id = $1", [id]);
    return response.rows
  }
}