import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { detectSchemaProduct } from './productControllers';
import { gateOnURL } from '../utils/gate';

export const detectProduct = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { url } = req.body;

    // Gating logic.
    gateOnURL(url);

    // If we don't detect a product, we won't store that in the DB.
    const schemaProduct = await detectSchemaProduct(url);
    if (schemaProduct === null) {
      res.status(404).send();
    }

    // TODO: Store the schemaProduct in the DB.
    // TODO: Map the schema product to a product model.

    res.status(200).send(schemaProduct);
  },
);
