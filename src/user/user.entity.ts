import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../post/post.entity';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ unique: true })
  @Field()
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @Column()
  @Field()
  @ApiProperty({
    description: 'User password (bcrypt hashed)',
    example: '$2b$10$example.hashed.password.string',
  })
  password: string;

  @OneToMany(() => Post, post => post.author)
  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  @ApiProperty({
    description: 'Account creation timestamp',
    example: '2023-12-09T10:00:00.000Z',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field()
  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-12-09T10:00:00.000Z',
  })
  updatedAt: Date;
}
