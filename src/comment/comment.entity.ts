import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../post/post.entity';

@Entity('comments')
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @ApiProperty({
    description: 'Unique identifier for the comment',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column('text')
  @Field()
  @ApiProperty({
    description: 'Comment content',
    example: 'This is a great post! Thanks for sharing.',
  })
  content: string;

  @Column({ name: 'post_id' })
  postId: string;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  @Field(() => Post)
  @ApiProperty({
    description: 'Post this comment belongs to',
    type: () => Post,
  })
  post: Post;

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  @ApiProperty({
    description: 'Comment creation timestamp',
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
