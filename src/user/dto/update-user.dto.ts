import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User email address',
    example: 'newemail@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'User password (minimum 6 characters) - will be hashed with bcrypt',
    example: 'newpassword123',
    minLength: 6,
  })
  @IsOptional()
  @MinLength(6)
  password?: string;
}
