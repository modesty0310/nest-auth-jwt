import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
        const result = await this.userRepository.save({
            email,
            password
        });
        return result
    }
}