import { ObjectId } from 'mongodb';
import { ISchemaProduct } from '../schemaProduct';

export interface IDBSchemaProduct extends ISchemaProduct {
  _id: ObjectId;
}
