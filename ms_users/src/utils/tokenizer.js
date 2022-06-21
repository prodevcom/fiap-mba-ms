import jwt from "jsonwebtoken";
import serverConfig from "../configs/server";

export default (id, email) => jwt.sign({
    id, email
}, serverConfig.jwt_secret, {
    expiresIn: serverConfig.jwt_expires,
});