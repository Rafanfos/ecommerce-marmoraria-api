import { run } from "./data-source";
import { app } from "./app";

const port = 3001;

(async () => {
  try {
    await run();
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Erro durante a inicialização do servidor:", error);
  }
})();
