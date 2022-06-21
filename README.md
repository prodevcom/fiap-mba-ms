# Avaliação do Curso de Microsserviços
### Professor: Edilson Jesus da Silva

---

Esta atividade foi desenvolvida a carater avaliativo.
Seus dados e configurações não contém informações sigilosas ou de risco expositivo.

---

Banco de dados: MongoDB

Após inicializar o serviço do MongoDB, vá nos arquivos:
``ms_users/src/configs/server.js`` e ``ms_financial/src/configs/server.js``
e altere a linha: 
```js
const db_path = "mongodb://localhost:27017/db_financial?retryWrites=true&w=majority"
```
Informando a conexão do seu banco de dados local.

---

Para rodar o sistema, você precisa abrir dois terminais de comando,
acesse as pastas ms_users/ms_financial e execute os seguintes comandos:

```shell
yarn // Instalando as dependências
yarn run dev // Executando o sistema com nodemon
```

---

**Usuários - Rotas:**

[POST] Cadastrar: ``http://localhost:11900/users/register`` 

[POST] Autenticar: ``http://localhost:11900/auth``

[GET] Listar: ``http://localhost:11900/users --header token=``

[POST] Alterar senha: ``http://localhost:11900/users/update-password  --header token=``

**Financeiro - Rotas**

[POST] Cadastrar: ``http://localhost:11901/financial/  --header token=``

[PUT] Alterar: ``http://localhost:11901/financial/:id  --header token=``

[GET] Listar: ``http://localhost:11901/financial  --header token=``

