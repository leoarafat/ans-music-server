/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

export const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (typeof req.body.data === 'string') {
        req.body.data = JSON.parse(req.body.data);
      }
      await schema.parseAsync({
        body: req.body,
        data: req.body.data,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
        files: req.files,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
