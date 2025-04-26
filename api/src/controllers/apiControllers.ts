import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { detectSchemaProduct } from './productControllers';
import { gateOnURL } from '../utils/gate';

export const detectProduct = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { url } = req.body;

    // Gating logic.
    gateOnURL(url);

    const schemaProduct = await detectSchemaProduct(url);
    if (schemaProduct === null) {
      res.status(404).send();
    }

    res.send(schemaProduct);
  },
);
