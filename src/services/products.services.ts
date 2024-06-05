import { AppError } from "../errors/app.error";
import {
  IEditProduct,
  IProduct,
  IProductDocument,
} from "../interfaces/products.interface";
import { ProductModel } from "../models/products.model";

const listProductsService = async (
  page: number,
  results: number,
  category?: string,
  tags?: string
): Promise<{
  page: number;
  results: number;
  previous: number | null;
  next: number | null;
  totalPages: number;
  products: IProductDocument[];
}> => {
  try {
    let query: { category: string; tags: any } = {} as {
      category: string;
      tags: any;
    };

    if (category) {
      query.category = category;
    }

    if (tags) {
      query.tags = { $regex: tags, $options: "i" };
    }

    if (!page) {
      page = 1;
    }

    if (!results) {
      results = 10;
    }

    const totalProducts = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / results);
    const skip = (page - 1) * results;

    const previous = page - 1 <= 0 ? null : page - 1;
    const next = page + 1 > totalPages ? null : page + 1;

    const products = await ProductModel.find(query).skip(skip).limit(results);

    return { page, previous, next, results, totalPages, products };
  } catch (error) {
    console.log(error);
    throw new AppError("Erro ao listar produtos", 500);
  }
};

const createProductService = async (
  productData: IProduct
): Promise<IProductDocument> => {
  try {
    const newProduct = await ProductModel.create(productData);

    return newProduct;
  } catch (error) {
    throw new AppError("Erro ao criar produto", 500);
  }
};

const updateProductService = async (
  productData: IEditProduct
): Promise<IProductDocument> => {
  const { _id, ...updatedFields } = productData;

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    _id,
    updatedFields
  );

  if (updatedProduct) {
    return updatedProduct;
  }

  throw new AppError("Erro ao atualizar produto", 404);
};

const deleteProductService = async (
  userId: string,
  deleteId: string
): Promise<void> => {
  await ProductModel.deleteById(deleteId, userId);

  return;
};

export {
  listProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
};
