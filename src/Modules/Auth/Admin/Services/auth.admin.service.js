import AdminModel from "../../../../Database/Models/admin.model.js";
import { comparing } from "../../../../Utils/crypto.utils.js";
import { genAccessToken, genRefreshToken } from "../../../../Utils/genTokens.utils.js";
// import logger from "../../../../Utils/logger.utils.js";

// admin login service
export const loginAdminService = async (req, res) => {
    const loginData = req.body;

    const admin = await AdminModel.findOne({ email: loginData.email })
    if (!admin) return res.status({ message: 'wrong email or password' })
    
    const password = await comparing(loginData.password, admin.password)
    if (!password) return res.status({ message: 'wrong email or password' })
    
    // logger.info(`Login attempt for email: ${admin.email}`);

    const accesstoken = genAccessToken(admin)
    const refreshtoken = genRefreshToken(admin)

    admin.loginTime = new Date();

    await admin.save()
    res.status(200).json({ message: 'Login successfully', tokens: { accesstoken, refreshtoken } })
}

// create admin service
export const createAdminService = async (req, res) => {
    const adminData = req.body;
    const isEmailExist = await AdminModel.findOne({ email: adminData.email });
    if (isEmailExist) return res.status(200).json(404).json({ message: 'email admin already exist' })
    await AdminModel.create(adminData)
    res.status(200).json({ message: 'admin created successfully' })
}