import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateProfileDto {
  @IsOptional()
  @IsString()
  public company!: string;

  @IsOptional()
  @IsString()
  public location!: string;

  @IsOptional()
  @IsString()
  public website!: string;

  @IsOptional()
  @IsString()
  public bio!: string;

  @IsNotEmpty()
  @IsString()
  public skills!: string;

  @IsNotEmpty()
  @IsString()
  public status!: string;

  @IsOptional()
  @IsString()
  public youtube!: string;

  @IsOptional()
  @IsString()
  public twitter!: string;

  @IsOptional()
  @IsString()
  public instagram!: string;

  @IsOptional()
  @IsString()
  public linkedin!: string;

  @IsOptional()
  @IsString()
  public facebook!: string;
}