import { app } from "./app";
import { main } from "./data-source";

const port = process.env.PORT || 4000;

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
