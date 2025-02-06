import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module'; // 👈 Import PrismaModule

@Module({
  imports: [PrismaModule], // 👈 Make sure PrismaModule is included
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
