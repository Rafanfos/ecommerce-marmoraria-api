import { AppError } from "../errors/app.error";
import { IProduct } from "../interfaces/products.interface";
import { ProductModel } from "../models/products.model";
import { getStoneImgFromS3 } from "./s3.services";

const listProductsService = async () => {
  try {
    const products = await ProductModel.find({});

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
    throw new AppError("Erro ao listar produtos", 500);
  }
};

const createProductService = async (productData: IProduct) => {
  try {
    const newProduct = await ProductModel.create(productData);

    return newProduct;
  } catch (error) {
    throw new AppError("Erro ao listar produto", 500);
  }
};

export { listProductsService, createProductService };
