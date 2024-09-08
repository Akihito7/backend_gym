import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { pool } from "src/config/database";
import { hash } from "bcrypt"


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  async signln() {
    return "ok"
  }

  async signup(body: any) {
    const user = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [body.username, body.email]);
    if (user.rows[0]) throw new ConflictException('Email or username is already in use');
    body.password = await hash(body.password, 8);
    const params = [
      body.name,
      body.username,
      body.email,
      body.password
    ];
    const query = `
    INSERT INTO users (name,username,email,password) 
    VALUES ($1, $2, $3, $4)
    `
    await pool.query(query, params);
    return null;
  }

  private async generateToken(userId: number) {
    return this.jwtService.sign(String(userId));
  }
}