import jwt from "jsonwebtoken";
import serverConfig from "../configs/server";

export default (id, apikey) => jwt.sign({
    id, apikey
}, serverConfig.jwt_secret, {
    expiresIn: serverConfig.jwt_expires,
});