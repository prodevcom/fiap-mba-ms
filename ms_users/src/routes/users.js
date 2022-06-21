import express from "express";
import bcrypt from "bcrypt";
import {v4 as uuid4} from "uuid";
import User from "../model/user";

import serverConfig from "../configs/server";
import tokenVerify from "../middleware/token_verify";

// Configurando a variável de rotas do express
const route = express.Router();

// Rotas públicas para utilização dos usuários
route.post('/register', (req, res) => {
    try {
        bcrypt.hash(req.body.password, serverConfig.salt, (error, result) => {
            // Caso aconteça um erro na criptografia, print do erro
            if (error) throw `Erro ao cryptografar a senha -> ${error}`;

            // Substituindo a senha para o valor criptografado
            req.body.password = result;
            req.body.apikey = uuid4();

            // Criando a classe do usuário baseado no Schema construído
            const model = new User(req.body);

            // Executando o comando de save
            model.save().then((result) => {
                return res.status(201).send({output: "Cadastro realizado", payload: result})
            }).catch((error) => {
                return res.status(500).send({error});
            });
        });
    } catch (error) {
        return res.status(500).send({error: true});
    }
});

// Rotas privadas que necessitam de credenciais válidas
route.get('/', tokenVerify, (req, res) => {
    User.find((error, users) => {
        if (error) res.status(500).send({error});
        res.status(200).send({users});
    }).select('-password');
});

route.post('/update-password', tokenVerify, (req, res) => {
    User.findOne({email: req.data.email}, (error, user) => {
        if (error) res.status(500).send({error});
        if (!user) res.status(400).send({error: 'NotFound'});
        bcrypt.compare(req.body.password, user.password, (error, same) => {
            if (!same) res.status(403).send({error: 'CredentialsInvalid'});
            bcrypt.hash(req.body.newPassword, serverConfig.salt, (error, result) => {
                User.findByIdAndUpdate(user._id, {password: result}, {new: false}, (error, user) => {
                    if (error) res.status(500).send({error});

                    console.log(user);

                    res.status(200).send({success: true});
                });
            });
        });
    });
});


export default route;