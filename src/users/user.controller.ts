import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
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
    login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        return this.userService.login(loginUserDto, res);
    }

    @UseGuards(AuthGuard("local-access-jwt"))
    @Get() 
    async findMe(@Req() req){
        const email = req.user.email;
        const user = await this.userService.findOneUser(email);
        return {email: user.email,  id: user.id};
    }

    @UseGuards(AuthGuard("local-refresh-jwt"))
    @Get('restore')
    async resotreToken(@Req() req) {
        return await this.userService.getAccessToken(req.user);
    }

    @UseGuards(AuthGuard("social-google"))
    @Get("google")
    async googleLogin(@Req() req, @Res() res) {
        this.socialLogin(req, res);
    }

    @UseGuards(AuthGuard("social-naver"))
    @Get("naver")
    async naverLogin(@Req() req, @Res() res) {
        this.socialLogin(req, res);
    }

    async socialLogin(req, res: Response) {
        const email = req.user.email;
        console.log(email);
        
        await this.userService.socialLogin(email, res);
    }
}