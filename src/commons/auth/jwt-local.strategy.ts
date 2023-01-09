import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class LocalStrategy extends PassportStrategy(Strategy, "local-jwt") {
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