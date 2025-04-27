import { cloudinary } from "../../../Config/cloudinary.config.js";
import { comparing } from "../../../Utils/crypto.utils.js";

// get profile service
export const getProfileService = async (req, res) => {
    const user = req.loginUser;

    const userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        phone: user.phone,
        DOB: user.DOB,
        username: user.username,
        profilePicture: user.profilePic.secure_url
    };

    res.status(200).json({ profile: userData })
}

// update profile service
export const updateProfileService = async (req, res) => {

    const user = req.loginUser;
    const updatedData = req.body;

    const allowedUpdates = ['firstName', 'lastName', 'gender', 'DOB', 'bio', 'phone']

    allowedUpdates.forEach(element => {
        if (updatedData[element]) {
            user[element] = updatedData[element]
        }
    })

    await user.save()

    const userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        phone: user.phone,
        DOB: user.DOB,
        username: user.username,
        profilePicture: user.profilePic.secure_url
    };

    res.status(200).json({ message: 'profile updated successfully', userData })
}

// change password
export const changePasswordService = async (req, res) => {
    const user = req.loginUser;
    const updatedPasswordData = req.body;
    const isPasswordMathed = await comparing(updatedPasswordData.oldPassword, user.password);
    if (!isPasswordMathed) return res.status(409).json({ message: "wrong passwrd" });
    user.password = updatedPasswordData.password;
    await user.save()
    res.status(200).json({ message: 'password changed successfully' })
}

// delete account service
export const deleteAccountService = async (req, res) => {

    const user = req.loginUser;
    
    user.deletedAt = new Date();
    
    await user.save();
    
    res.status(200).json({ message: 'account deleted successfully' })
}

// upload profile picture
export const uploadProfilePicService = async (req, res) => {

    const user = req.loginUser
    const { file } = req

    if (!file) return res.status(400).json({ message: "picture is required" })

    // if user has a profile picture and he want to upload new one, delete old pic and add new pic
    if (user.profilePic && user.profilePic.secure_url) await cloudinary().uploader.destroy(user.profilePic.public_id)

    const { secure_url, public_id } = await cloudinary().uploader.upload(
        file.path,
        {
            folder: `${process.env.CLOUDINARY_FOLDER}/Customers/Profile`,
            resource_type: 'image'
        }
    )

    user.profilePic = { secure_url, public_id }
    await user.save()

    res.status(200).json({ message: 'User profile picture uploaded successfully' })
}

// delete profile picture
export const deletProfilepictureService = async (req, res) => {

    const user = req.loginUser

    if (user.profilePic && user.profilePic.secure_url) {

        await cloudinary().uploader.destroy(user.profilePic.public_id)

        user.profilePic = null;
        await user.save();

        return res.status(200).json({ message: 'Profile picture deleted successfully' });
    }

    res.status(400).json({ message: 'No profile picture to delete' });
}
