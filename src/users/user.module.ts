import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalAccessToken, LocalRefreshToken } from "src/commons/auth/jwt-local.strategy";
import { SocialGoogle } from "src/commons/auth/social-google.strategy";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({}),
    ],
    providers: [
        UserService,
        LocalAccessToken,
        LocalRefreshToken,
        SocialGoogle
    ],
    controllers: [
        UserController,
    ]
})
export class UserModule {}