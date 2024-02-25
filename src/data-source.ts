import { MongoClient, ServerApiVersion } from "mongodb";
require("dotenv").config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const clusterUri = process.env.MONGODB_URI;

if (!username || !password || !clusterUri) {
  throw new Error(
    "As variáveis de ambiente USERNAME, PASSWORD ou MONGODB_URI não estão definidas."
  );
}

const uri = `mongodb+srv://${username}:${password}${clusterUri}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Conectado ao banco de dados com sucesso!");
  } finally {
    await client.close();
  }
}

export { run };
