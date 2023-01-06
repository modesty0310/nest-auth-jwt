import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { LoginUserDto } from "./dto/login-uiser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
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

    async login(loginUserDto: LoginUserDto) {
        const {email, password} = loginUserDto;
        const user = await this.findOneUser(email);
        
        if(!user) throw new UnauthorizedException("이메일과 비밀번호를 확인해 주세요.");

        const isPasswordCompare = await bcrypt.compare(password, user.password);

        if(!isPasswordCompare) throw new UnauthorizedException("이메일과 비밀번호를 확인해 주세요");

        const payload = { email: email, sub: user.id };
    }

    async findOneUser(email: string): Promise<User> | null {
        return await this.userRepository.findOne({where: {email}});
    }
}