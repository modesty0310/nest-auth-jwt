import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

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
}