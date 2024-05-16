import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

export const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // console.log('Received title:', req.body.title);
      // console.log('Received artist:', req.body.artist);
      if (typeof req.body.data === 'string') {
        req.body.data = JSON.parse(req.body.data);
      }
      // if (typeof req.body.title === 'string') {
      //   req.body.title = JSON.parse(req.body.title);
      // }
      // if (typeof req.body.artist === 'string') {
      //   req.body.artist = JSON.parse(req.body.artist);
      // }
      await schema.parseAsync({
        body: req.body,
        data: req.body.data,
        title: req.body.title,
        artist: req.body.artist,
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
