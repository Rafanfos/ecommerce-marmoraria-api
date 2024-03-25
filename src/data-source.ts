import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const clusterUri = process.env.MONGODB_URI;

if (!username || !password || !clusterUri) {
  throw new Error(
    "As variáveis de ambiente USERNAME, PASSWORD ou MONGODB_URI não estão definidas."
  );
}

const uri = `mongodb+srv://${username}:${password}${clusterUri}`;

const options = { dbName: "e-commerce-marmoraria" };

async function main() {
  await mongoose.connect(uri, options);
  console.log("Conectado ao banco de dados com sucesso!");
}

export { main };
