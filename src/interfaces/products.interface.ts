interface IProduct {
  name: string;
  category: string;
  path: string;
  description: string;
  price: number;
}

interface IProductDocument extends Document, IProduct {}

export { IProductDocument, IProduct };
