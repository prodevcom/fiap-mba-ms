import mongoose from "mongoose";

export default {
    port: 11901, jwt_secret: "#V$Code%", jwt_expires: "2d", salt: 10, connect: () => {
        const db_path = "mongodb://localhost:27017/db_financial?retryWrites=true&w=majority"
        mongoose.connect(db_path, {
            useNewUrlParser: true, useUnifiedTopology: true
        }, () => console.log('[MS_USERS] Banco de dados conectado'));
    },
}
