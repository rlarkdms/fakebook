import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Define how to extract token from header.
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    // If controller have @UseGuards(AuthGuard('jwt')) decorator, validate JWT in this method
    async validate(payload: any) {
        return true;
    }
}
