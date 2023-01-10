import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { LoginUserDto } from "./dto/login-uiser.dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { CreateSocialDto } from "./dto/create-social.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async create(createUserDto: CreateUserDto):Promise<User> {
        const {email, password} = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await this.userRepository.save({
            email,
            password: hashedPassword
        });
        return result
    }

    async login(loginUserDto: LoginUserDto, res: Response) {
        const {email, password} = loginUserDto;
        
        const user = await this.findOneUser(email);
        console.log(email, password, user);
        
        if(!user) throw new UnauthorizedException("이메일과 비밀번호를 확인해 주세요.");

        const isPasswordCompare = await bcrypt.compare(password, user.password);

        if(!isPasswordCompare) throw new UnauthorizedException("이메일과 비밀번호를 확인해 주세요");
        await this.setRefreshToken(user, res);
        
        return await this.getAccessToken(user);
    }

    private async setRefreshToken(user: User | CreateSocialDto, res: Response) {
        const payload = { email: user.email, sub: user.id };
        const refresh_token =  this.jwtService.sign(
            {payload},
            {secret: 'secret', expiresIn: '1h'}
        );      
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000 //30 day
        });
    }

    async getAccessToken(user: User) {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(
            {payload},
            {secret: 'secret', expiresIn: '1h'}
        )
    }

    async findOneUser(email: string): Promise<User> | null {
        return await this.userRepository.findOne({where: {email}});
    }

    async socialCreate(createSocialDto: CreateSocialDto):Promise<User> {
        const email = createSocialDto.email;
        const result = await this.userRepository.save({
            email,
        });
        return result
    }

    async googleLogin(email: string, res: Response) {
        let user = this.userRepository.findOne({where: {email}});
        if (!user) {
            user = await this.socialCreate({email});
        }
        await this.setRefreshToken(user, res);
    }
}