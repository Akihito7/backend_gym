import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { pool } from "src/config/database";
import { compare, hash } from "bcrypt"


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  async signln(body: any) {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [body.email])
    if (!user.rows[0]) throw new UnauthorizedException('Incorrect email or password');
    const passwordMatch = await compare(body.password, user.rows[0].password);
    if (!passwordMatch) throw new UnauthorizedException('Incorrect email or password');
    const token = await this.generateToken(user.rows[0].id);
    return {
      token
    }
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

  async checkToken(token : string){
    try {
      const isValid = this.jwtService.verify(token);
      return isValid;
    } catch (error) {
        throw new UnauthorizedException("Invalid token")
    }
  }
}