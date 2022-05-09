import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Define how to extract token from header.
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_TOKEN
        })
    }
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}