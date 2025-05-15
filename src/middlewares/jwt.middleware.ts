import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.ip;
    (req as any)['ip-client'] = ip;

    const authHeader = req?.headers?.authorization;
    const token = authHeader && authHeader?.split(' ')[1];
    if (!authHeader || !token) {
      next();
      return;
      // throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.PRIVATE_KEY,
      });
      req['user'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
