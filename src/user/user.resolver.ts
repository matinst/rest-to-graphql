import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Context() context): Promise<User> {
    return context.req.user;
  }

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.userService.create({ email, password });
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('password', { nullable: true }) password?: string,
    @Context() context,
  ): Promise<User> {
    // Optional: Check if user can only update their own profile
    // if (context.req.user.id !== id) {
    //   throw new ForbiddenException('You can only update your own profile');
    // }

    return this.userService.update(id, { email, password });
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Args('id', { type: () => ID }) id: string,
    @Context() context,
  ): Promise<boolean> {
    // Optional: Check if user can only delete their own profile
    // if (context.req.user.id !== id) {
    //   throw new ForbiddenException('You can only delete your own profile');
    // }

    await this.userService.remove(id);
    return true;
  }
}
