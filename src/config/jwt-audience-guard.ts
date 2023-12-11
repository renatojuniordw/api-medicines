import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAudienceGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    const decodedToken = this.validateToken(token);

    if (
      !decodedToken ||
      !decodedToken.aud ||
      decodedToken.aud !== 'api_interchangeable_medicines'
    ) {
      throw new UnauthorizedException('Token com audiência inválida');
    }

    return super.canActivate(context);
  }

  private validateToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}
