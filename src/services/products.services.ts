import { AppError } from "../errors/app.error";
import {
  IEditProduct,
  IProduct,
  IProductDocument,
} from "../interfaces/products.interface";
import { ProductModel } from "../models/products.model";
import { getStoneImgFromS3 } from "./s3.services";

const listProductsService = async (
  category?: string,
  tags?: string
): Promise<IProductDocument[]> => {
  try {
    let query: { category: string; tags: any } = {} as {
      category: string;
      tags: any;
    };

    if (category) {
      query.category = category;
    }

    // Se houver uma consulta de pesquisa, adicione-a à consulta
    if (tags) {
      query.tags = { $regex: tags, $options: "i" };
    }

    const products = await ProductModel.find(query);

    const productsWithFullUrls = await Promise.all(
      products.map(async (product) => {
        try {
          const updatedProduct = product;

          const s3Img = await getStoneImgFromS3(
            updatedProduct.path,
            updatedProduct.category
          );
          updatedProduct.path = s3Img;

          return updatedProduct;
        } catch (error) {
          console.error("Erro ao obter imagem do S3 para o produto:", error);
          return product;
        }
      })
    );

    return productsWithFullUrls;
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

  return updatedProduct;
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
