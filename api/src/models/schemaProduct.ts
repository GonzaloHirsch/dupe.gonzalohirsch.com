export interface ISchemaProduct {
  '@context'?: string;
  '@type'?: 'Product';
  aggregateRating?: {
    '@type'?: 'AggregateRating';
    ratingValue?: number;
    reviewCount?: number;
  };
  brand?: {
    '@type'?: 'Brand';
    name?: string;
  };
  category?: string;
  description?: string;
  image?: string;
  mpn?: string;
  name?: string;
  offers?: {
    '@type'?: 'Offer';
    price?: string;
    priceCurrency?: string;
    url?: string;
    availability?: string;
  };
  review?: {
    '@type'?: 'Review';
    author?: {
      '@type'?: 'Person';
      name?: string;
    };
    itemReviewed?: {
      '@type'?: 'Thing';
      image?: string;
      name?: string;
    };
    datePublished?: string;
    description?: string;
    name?: string;
    reviewRating?: {
      '@type'?: 'Rating';
      bestRating?: number;
      ratingValue?: number;
      worstRating?: number;
    };
  }[];
  url?: string;
  _id?: string;
}

export interface ISchemaProductWrapper {
  unnamed?: ISchemaProduct;
}
