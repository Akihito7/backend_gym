import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { pool } from "src/config/database";

@Injectable()
export class UserService {
  async getUserInfo(userId : string) {
    try {
      const query = `SELECT * FROM users WHERE id = $1`
      const response = await pool.query(query, [userId]);
      return response.rows[0]
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar rotinas',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}