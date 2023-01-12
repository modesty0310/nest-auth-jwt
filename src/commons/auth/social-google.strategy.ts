import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";


export class SocialGoogle extends PassportStrategy(Strategy, "social-google") {
    constructor() {
        super({
           clientID: "262545709775-b12g5c2sn3pj0o9au1ei1rn6g23iekk7.apps.googleusercontent.com",
           clientSecret: "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",
           callbackURL: "http://localhost:3000/users/google",
           scope: ["profile", 'email'],
        })
    }

    async validate(accessToken, refreshToken, profile,) {
        return profile._json;
    }
}