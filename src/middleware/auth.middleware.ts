import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      // Verify JWT token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET|| 'my-secret-key');
      const user = await this.prisma.user.findUnique({ where: { id: decoded.userId } });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      (req as any).user = user;
      console.log((req as any).user);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
