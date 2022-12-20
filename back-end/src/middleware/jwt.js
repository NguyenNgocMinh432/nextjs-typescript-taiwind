import jwt from "jsonwebtoken"
export const generalAccessToken = (payload) => {
    const SIGNATURE = process.env.SIGNATURE;
    const accessToken = jwt.sign({
        payload
    }, SIGNATURE, { expiresIn: '30s' } )
    return accessToken
}

export const generalRefreshToken = (payload) => {
    const SIGNATURE = process.env.SIGNATURE;
    const accessToken = jwt.sign({
        payload
    }, SIGNATURE, { expiresIn: '365d' } )
    return accessToken
}