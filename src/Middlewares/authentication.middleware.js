import jwt from "jsonwebtoken";
import BlackListTokensModel from "../Database/Models/blackListTokens.model.js";
import CustomerModel from "../Database/Models/customer.model.js";
import AdminModel from "../Database/Models/admin.model.js";

const modelType = {
    admin: AdminModel,
    customer: CustomerModel,
}

const authenticationMiddlware = (modelName) => {
    return async (req, res, next) => {

        const { accesstoken } = req.headers;
        if (!accesstoken) return res.status(400).json({ message: 'access token required' });

        const decodedAccesstoken = jwt.verify(accesstoken, process.env.ACCESS_TOKEN);

        const isTokenBlackListed = await BlackListTokensModel.findOne({ tokenId: decodedAccesstoken.jti })
        if (isTokenBlackListed) return res.status(401).json({ message: "Token expired please, Login again" })
        
        const Model = modelType[modelName]
        if (!Model) return res.status(409).json({ message: "Invalid model type provided in middleware" });

        const user = await Model.findById(decodedAccesstoken._id)
        if (!user) return res.status(404).json({ message: "user not found please, signup" })
        
        if (user.deletedAt) return res.status(400).json({ message: 'this account is deleted' })
        
        req.loginUser = user;
        
        req.loginUser.token = {
            tokenId: decodedAccesstoken.jti,
            expiryDate: decodedAccesstoken.exp
        }
        next()
    }
}

export default authenticationMiddlware;