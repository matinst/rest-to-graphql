import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

@Entity('posts')
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @ApiProperty({
    description: 'Unique identifier for the post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column()
  @Field()
  @ApiProperty({
    description: 'Post title',
    example: 'My First Blog Post',
  })
  title: string;

  @Column('text')
  @Field()
  @ApiProperty({
    description: 'Post content',
    example: 'This is the content of my blog post...',
  })
  content: string;

  @Column({ name: 'author_id' })
  authorId: string;

  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  @Field(() => User)
  @ApiProperty({
    description: 'Author of the post',
    type: () => User,
  })
  author: User;

  @OneToMany(() => Comment, comment => comment.post)
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  @ApiProperty({
    description: 'Post creation timestamp',
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
