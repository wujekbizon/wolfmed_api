import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClerkClient, createClerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class ClerkMiddleware implements NestMiddleware {
  private clerk: ClerkClient;

  constructor() {
    this.clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionToken = req.headers.authorization?.split(' ')[1];
      if (sessionToken) {
        const session = await this.clerk.sessions.verifySession(
          sessionToken,
          '',
        );
        const user = await this.clerk.users.getUser(session.userId);
        req['user'] = {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          roles: user.publicMetadata.roles || ['user'],
        };
      }
    } catch (error) {
      console.error('Error verifying Clerk session:', error);
    }
    next();
  }
}
