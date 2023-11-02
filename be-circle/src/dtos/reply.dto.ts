import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ReplyDto {
  @IsString()
  @MaxLength(120)
  @IsNotEmpty()
  public content: string;

  @IsString()
  public image!: string;
}
