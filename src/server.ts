import { app } from "./app";
import { main } from "./data-source";

const port = 3001;

(async () => {
  try {
    await main();
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Erro durante a inicialização do servidor:", error);
  }
})();
