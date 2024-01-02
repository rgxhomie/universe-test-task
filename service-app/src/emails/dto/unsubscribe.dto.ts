import { IsEmail, IsNotEmpty } from "class-validator";

export class UnSubscribeDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}