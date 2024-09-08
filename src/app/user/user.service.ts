import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { pool } from "src/config/database";

@Injectable()
export class UserService {
  async getUserInfo() {
    try {
      const query = `SELECT * FROM users WHERE id = 1`
      const response = await pool.query(query);
      return response.rows
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar rotinas',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}