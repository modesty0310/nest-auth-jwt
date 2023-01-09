import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

export class LocalAccessToken extends PassportStrategy(Strategy, "local-access-jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "secret",
        })
    }

    async validate(payload) {
        return payload;
    }
}

export class LocalRefreshToken extends PassportStrategy(Strategy, "local-refresh-jwt") {
    constructor() {
        super({
            jwtFromRequest: (req: Request) => {
                return req.cookies['refresh_token']
            },
            secretOrKey: "secret",
        })
    }

    async validate(payload) {        
        return payload;
    }
}