import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Do not ignore expiration, token must be valid
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  /**
   * Validates the JWT payload and returns the necessary user information.
   * @param {any} payload - The decoded JWT payload.
   * @returns {{ email: string }} - Returns the user's email from the payload.
   */
  async validate(payload: any): Promise<{ email: string }> {
    return { email: payload.email };
  }
}
