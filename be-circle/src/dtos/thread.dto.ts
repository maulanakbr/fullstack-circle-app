import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ThreadDto {
  @IsString()
  @MaxLength(140)
  @IsNotEmpty()
  public content: string;

  @IsString()
  public image!: string;
}
