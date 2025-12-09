import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);

    return this.prisma.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const updateData: any = { ...data };

    // Hash password if it's being updated
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, this.saltRounds);
    }

    return this.prisma.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.prisma.user.delete({
      where: { id },
    });
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.prisma.user.findUnique({
      where: { email },
    });
  }
}
