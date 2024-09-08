import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { pool } from "src/config/database";

@Injectable()
export class RoutineService {
  async fetchListRoutines(id: number) {
    try {
      const response = await pool.query("SELECT * FROM routines WHERE user_id = $1", [id]);
      return response.rows
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar rotinas',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async fetchRoutineWithExercises(routineId: number) {
    try {
      const query = `
     SELECT
    r.id AS routine_id,
    r.name AS routine_name,
    r.description,
    json_agg(
      json_build_object(
        'name', e.name,
        'gif', e.gif,
        'series', (
          SELECT json_agg(
            json_build_object(
              'series_number', s.series_number,
              'reps', s.reps,
              'weight', s.weight
            )
          )
          FROM routine_series AS s
          WHERE s.routine_exercise_id = re.id
        )
      )
    ) AS exercises
FROM
    routines AS r
JOIN
    routine_exercises AS re ON re.routine_id = r.id
JOIN
    exercises AS e ON e.id = re.exercise_id
WHERE
    r.user_id = 1
    AND r.id = $1
GROUP BY
    r.id, r.name, r.description;
    `;
    const result = await pool.query(query, [routineId]);
    return result.rows[0];
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar rotinas',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}