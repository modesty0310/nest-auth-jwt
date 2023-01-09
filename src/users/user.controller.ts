import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
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
        return this.userService.login(loginUserDto);
    }
    @UseGuards(AuthGuard("local-jwt"))
    @Get() 
    findMe(@Req() req){
        const email = req.user.email;
        return this.userService.findOneUser(email)
    }

}