import User from "../model/UserModel.js";
import bcrypt from 'bcrypt';
import { generalAccessToken, generalRefreshToken } from "../middleware/jwt.js";
const createUser = (newUser) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { name, email, password, confirmPassword, phone } = newUser;
			const checkUser = await User.findOne({
				email: email
			});
			if (checkUser !== null) {
				return res.status(200).json({
					status: "ERR",
					message: "is Email is already",
				});
			} else {
                const hash = bcrypt.hashSync(password, 10)
				const createUser = await User.create({
					name,
					email,
					password:hash,
					confirmPassword,
					phone,
				});
				if (createUser) {
					resolve({
						status: "OK",
						message: "success",
						data: createUser,
					});
				} else {
					resolve({
						status: 'Ok',
						message: "error password incorrect",
					})
				}
			}
		} catch (err) {
			reject(err);
		}
	});
};
const loginUser = (newUser) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { name, email, password, confirmPassword, phone } = newUser;
			const checkUser = await User.findOne({
				email: email
			});
			if (checkUser === null) {
				return res.status(200).json({
					status: "ERR",
					message: "user is not defined",
				});
			} else {
				const comp = bcrypt.compareSync(password, checkUser.password);
				if (comp) {
					const access_token = generalAccessToken({
						id: checkUser._id,
						isAdmin: checkUser.isAdmin
					})
					const refresh_token = generalRefreshToken({
						id: checkUser._id,
						isAdmin: checkUser.isAdmin
					})
					resolve({
						status: "OK",
						message: "logged successfully!!!",
						data: checkUser,
						access_Token: access_token,
						refresh_token
					});
					
				} else {
					return res.status(200).json({
						status: "ERR",
						message: "user is not defined",
					});
				}
			}
		} catch (err) {
			reject(err);
		}
	});
}
const updateUser = (userId, data) => {
	return new Promise(async (resolve, reject) => {
		const checkUser = await User.findOne({
			_id: userId,
		})
		if (checkUser === null) {
			return res.status(200).json({
				status: "ERR",
				message: "the user is not defined"
			})
		}
		const updatedUser = await User.findByIdAndUpdate(userId, data)
	})
}
export default { createUser, loginUser, updateUser };
