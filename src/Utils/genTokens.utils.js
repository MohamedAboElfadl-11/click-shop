import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from "uuid";

export const genAccessToken = (user) => {
    const accesstoken = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.ACCESS_TOKEN,
        { expiresIn: '7d', jwtid: uuidv4() }
    )
    return accesstoken
}

export const genRefreshToken = (user) => {
    const refreshtoken = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.REFRESH_TOKEN,
        { expiresIn: '7d', jwtid: uuidv4() }
    )
    return refreshtoken
}