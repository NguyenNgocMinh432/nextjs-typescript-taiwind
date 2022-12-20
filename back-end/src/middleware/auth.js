import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authMiddleware = (req, res, next) => {
    const signature = process.env.SIGNATURE;
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, signature, (err, decode) => {
        if (err) {
            return res.status(404).json({
                status: "ERR",
                message: "The authentication"
            })
        }
        if (decode) {
            const {payload} = decode;
            if ( payload?.isAdmin ) {
                next();
            } else {
                return res.status(404).json({
                    status: "ERR",
                    message: "The authentication"
                })
            }
        }
    })
}

export const authUserMiddleware = (req, res, next) => {
    const signature = process.env.SIGNATURE;
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id
    jwt.verify(token, signature, (err, decode) => {
        if (err) {
            return res.status(404).json({
                status: "ERR",
                message: "The authentication"
            })
        }
        if (decode) {
            const {payload} = decode;
            if ( payload?.isAdmin || payload?.id === userId ) {
                next();
            } else {
                return res.status(404).json({
                    status: "ERR",
                    message: "The authentication"
                })
            }
        }
    })
}