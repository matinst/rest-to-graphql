import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class User {
  @Field(() => ID)
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Field()
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @Field()
  @ApiProperty({
    description: 'User password (bcrypt hashed)',
    example: '$2b$10$example.hashed.password.string',
  })
  password: string;

  @Field()
  @ApiProperty({
    description: 'Account creation timestamp',
    example: '2023-12-09T10:00:00.000Z',
  })
  createdAt: Date;

  @Field()
  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-12-09T10:00:00.000Z',
  })
  updatedAt: Date;
}
