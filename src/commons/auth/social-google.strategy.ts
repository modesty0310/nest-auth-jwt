import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";


export class SocialGoogle extends PassportStrategy(Strategy, "social-google") {
    constructor() {
        super({
           clientID: process.env.GOOGLE_ID,
           clientSecret: process.env.GOOGLE_SECRET,
           callbackURL: "http://localhost:3000/users/google",
           scope: ["profile", 'email'],
        })
    }

    async validate(accessToken, refreshToken, profile,) {
        return profile._json;
    }
}