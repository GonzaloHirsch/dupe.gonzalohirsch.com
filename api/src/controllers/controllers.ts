import { Request, Response, NextFunction } from 'express';
import { isValidUrl } from '../utils/utils';
import asyncHandler from 'express-async-handler';
import { detectProduct } from './productControllers';

export const runCommand = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { url } = req.body;

    if (!isValidUrl(url)) {
      throw new Error(`Invalid URL ${url}.`);
    }

    const schemaProduct = await detectProduct(url);
    if (schemaProduct === null) {
      res.status(404).send();
    }

    res.send(schemaProduct);
  },
);
