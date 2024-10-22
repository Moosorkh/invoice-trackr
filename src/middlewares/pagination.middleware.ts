import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set default page and limit if not provided
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    // Ensure the page and limit are positive numbers
    req.query.page = Math.max(page, 1).toString();
    req.query.limit = Math.max(limit, 1).toString();

    next(); // Continue to the next middleware or the controller
  }
}
