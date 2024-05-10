"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const data_source_1 = require("./data-source");
const port = process.env.PORT || 4000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, data_source_1.main)();
        app_1.app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Erro durante a inicialização do servidor:", error);
    }
}))();
//# sourceMappingURL=server.js.map