import { client, eCommerceDb, run } from "../data-source";

const listProductsService = async () => {
  try {
    const productsCollection = client.db(eCommerceDb).collection("products");

    const products = await productsCollection.find({}).toArray();

    return products;
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    throw new Error("Erro ao listar produtos");
  }
};

export { listProductsService };
