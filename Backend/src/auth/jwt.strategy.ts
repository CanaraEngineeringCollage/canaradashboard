import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          console.log('Request Cookies:', req?.cookies); // Debug cookie
          return req?.cookies?.jwt;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload Attempt:', payload); // Debug payload
    if (!payload?.id || !payload?.email) {
      console.log('Invalid payload structure:', payload);
      throw new UnauthorizedException('Invalid token payload');
    }
    console.log('JWT Payload Validated:', { id: payload.id, email: payload.email });
    return { id: payload.id, email: payload.email };
  }
}
