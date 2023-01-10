import { IsEmail } from "class-validator";

export class CreateSocialDto{
    @IsEmail()
    email: string;
}