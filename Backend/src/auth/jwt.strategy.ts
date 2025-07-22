import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
console.log("JWT Strategy Loaded",process.env.JWT_SECRET);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.jwt,
      ]),
      secretOrKey: process.env.JWT_SECRET, 
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}
