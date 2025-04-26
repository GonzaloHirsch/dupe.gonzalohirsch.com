import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { detectSchemaProduct } from './productControllers';
import { gateOnURL } from '../utils/gate';
import { isValidUrl } from '../utils/utils';
import { getCurrentClient } from '../db/clients';
import { ISchemaProduct } from '../models/schemaProduct';

// Getter for the current database client.
const client = getCurrentClient();

export const detectProduct = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { url } = req.body;

    // Gating logic.
    gateOnURL(url);

    // If we don't detect a product, we won't store that in the DB.
    let schemaProduct = await detectSchemaProduct(url);
    if (schemaProduct === null) {
      res.status(404).send();
    }

    // Store the schemaProduct in the DB.
    client.storeSchemaProduct(url, schemaProduct as ISchemaProduct);

    // TODO: Map the schema product to a product model.

    res.status(200).send(schemaProduct);
  },
);

export const findProductDupes = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { url } = req.body;

    // Gating logic.
    gateOnURL(url);

    // TODO: Look for product in the DB. If we dont, say that we didn´t detect a product.
    const isOriginalInDB = true;
    if (!isOriginalInDB) {
      res.status(404).send();
    }

    // TODO: Get the product from the DB.
    // Probably limit the number of products to 10.
    const potentialDupes: string[] = [];

    // Performs the dupe detection on the rest. Make sure to filter out nulls.
    const dupeProducts = (
      await Promise.all(
        potentialDupes
          // Filter out invalid URLs.
          .filter((url: string) => isValidUrl(url))
          // Map the potential dupes to schema products with promises.
          .map(async (potentialDupe: string) => {
            return {
              product: await detectSchemaProduct(potentialDupe),
              url: potentialDupe,
            };
          }),
      )
    ).filter((dupe) => dupe !== null && dupe.product !== null);

    // TODO: Store the results in the DB.
    // TODO: Map the schema product to a product model.

    res.status(204).send(dupeProducts);
  },
);
