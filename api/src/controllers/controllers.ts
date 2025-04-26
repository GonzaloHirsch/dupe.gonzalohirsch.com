import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { detectProduct } from './productControllers';
import { gateOnURL } from '../utils/gate';

export const runCommand = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { url } = req.body;

    // Gating logic.
    gateOnURL(url);

    const schemaProduct = await detectProduct(url);
    if (schemaProduct === null) {
      res.status(404).send();
    }

    res.send(schemaProduct);
  },
);
