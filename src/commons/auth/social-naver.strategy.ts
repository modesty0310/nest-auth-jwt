import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver";


export class SocialNaver extends PassportStrategy(Strategy, "social-naver") {
    constructor() {
        super({
           clientID: process.env.NAVER_ID,
           clientSecret: process.env.NAVER_ID,
           callbackURL: "http://localhost:3000/users/naver",
        })
    }

    async validate(accessToken, refreshToken, profile,) {
        console.log(profile);
        
        return profile._json;
    }
}