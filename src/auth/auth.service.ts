import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

//   async signup(data: { firstName?: string; lastName?: string; address?: string; email: string; country?: string; district?: string; mobileNumber?: string; password: string }) {
//     const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });

//     if (existingUser) {
//       throw new BadRequestException('User already exists');
//     }

//     const hashedPassword = await bcrypt.hash(data.password, 10);

//     const user = await this.prisma.user.create({
//       data: {
//         ...data,
//         password: hashedPassword,
//       },
//     });

//     return { message: 'User registered successfully' };
//   }

  async signup(data: {
    firstName?: string;
    lastName?: string;
    address?: string;
    email: string;
    country?: string;
    district?: string;
    mobileNumber?: string;
    password: string;
  }) {
    // Check if the user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
  
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);
  
    // Create the user
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      }as Prisma.UserCreateInput,
    });
  
    return { message: 'User registered successfully' };
  }

  async login(data: { email: string; password: string }) {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
  
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
  
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    // Generate JWT Token
    const token = this.jwtService.sign({ userId: user.id, email: user.email });
  
    // Remove password from user object before returning response
    const { password, ...userWithoutPassword } = user;
  
    return {
      message: 'Login successful',
      token,
      user: userWithoutPassword, // Return user details
    };
  }
  
}
