import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreatePilotDto {
  @IsNotEmpty()
  @Length(2, 20)
  fname!: string;

  @IsNotEmpty()
  @Length(2, 20)
  lname!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  phoneNumber!: string;
}