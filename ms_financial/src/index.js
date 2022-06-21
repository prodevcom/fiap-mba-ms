import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import serverConfig from "./configs/server";
import financialRoutes from "./routes/financial";

// Preparando configurações do nosso serviço
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());

// Conectando no banco de dados
serverConfig.connect();

// Configurando as rotas
app.use('/financial', financialRoutes);

// Inicializando o servidor
app.listen(serverConfig.port, () => console.log(`[MS_USERS] Server is running on port ${serverConfig.port}`));

