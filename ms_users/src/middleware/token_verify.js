import jwt from "jsonwebtoken";
import serverConfig from "../configs/server";

export default (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).send({error: `AccessDenied`});

    jwt.verify(token, serverConfig.jwt_secret, (error, result) => {
        if (error) return res.status(401).send({error});
        req.data = {
            _id: result.id, email: result.email,
        }
        next();
    });
}
