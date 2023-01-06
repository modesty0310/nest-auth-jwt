import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-uiser.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {        
        return this.userService.create(createUserDto)
    }
    @Post("login")
    login(@Body() loginUserDto: LoginUserDto) {
        this.userService.login(loginUserDto);
    }
}