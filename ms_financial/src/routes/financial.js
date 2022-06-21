import express from "express";
import Financial from "../model/financial";

import serverConfig from "../configs/server";
import tokenVerify from "../middleware/token_verify";

// Configurando a variável de rotas do express
const route = express.Router();

route.get('/', tokenVerify, (req, res) => {
    Financial.find({apikey: req.data.apikey}, (error, accounts) => {
        if (error) res.status(500).send({error});
        res.status(200).send({accounts});
    }).select('-password');
});

route.post('/', tokenVerify, (req, res) => {
    // Adicionando a APIKEY no corpo da requisição
    req.body.apikey = req.data.apikey;

    // Criando os dados da conta
    const model = new Financial(req.body);

    // Executando o comando de save
    model.save().then((result) => {
        return res.status(201).send({output: "Cadastro realizado", payload: result})
    }).catch((error) => {
        return res.status(500).send({error});
    });
});

route.put('/:id', tokenVerify, (req, res) => {
    Financial.findByIdAndUpdate(req.params.id, req.body, {new: false}, (error, account) => {
        if (error) res.status(500).send({error});
        return res.status(202).send({output: "Alterado"})
    });
});

export default route;