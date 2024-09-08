import { Injectable } from "@nestjs/common";
import { pool } from "src/config/database";

@Injectable()
export class ExerciseService {
  async fetchManyExercises(){
    const query = "SELECT * FROM exercises";
    const response = await pool.query(query);
    return response.rows
  }
}