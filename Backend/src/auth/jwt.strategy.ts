import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.jwt,
      ]),
      secretOrKey: 'your_jwt_secret', 
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}
