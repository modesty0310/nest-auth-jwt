import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalStrategy } from "src/commons/auth/jwt-local.strategy";
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
        LocalStrategy
    ],
    controllers: [
        UserController,
    ]
})
export class UserModule {}