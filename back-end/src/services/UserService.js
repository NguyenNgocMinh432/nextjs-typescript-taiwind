import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import { generalAccessToken, generalRefreshToken } from "../middleware/jwt.js";
const createUser = (newUser) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { name, email, password, confirmPassword, phone, isAdmin } = newUser;
			const checkUser = await User.findOne({
				email: email,
			});
			if (checkUser !== null) {
				return res.status(200).json({
					status: "ERR",
					message: "is Email is already",
				});
			} else {
				const hash = bcrypt.hashSync(password, 10);
				const access_token = generalAccessToken(newUser);
				const refresh_token = generalRefreshToken(newUser);
				const createUser = await User.create({
					name,
					email,
					password: hash,
					confirmPassword,
					phone,
					isAdmin,
					access_token,
					refresh_token
				});
				if (createUser) {
					resolve({
						status: "OK",
						message: "success",
						data: createUser,
						access_Token: access_token,
						refresh_token,
					});
				} else {
					resolve({
						status: "Ok",
						message: "error password incorrect",
					});
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
				email: email,
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
						isAdmin: checkUser.isAdmin,
					});
					const refresh_token = generalRefreshToken({
						id: checkUser._id,
						isAdmin: checkUser.isAdmin,
					});
					resolve({
						status: "OK",
						message: "logged successfully!!!",
						data: checkUser,
						access_Token: access_token,
						refresh_token,
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
};
const updateUser = (userId, data) => {
	return new Promise(async (resolve, reject) => {
		const checkUser = await User.findOne({
			_id: userId,
		});
		if (checkUser === null) {
			resolve({
				status: "ERR",
				message: "the user is not defined",
			});
		}
		const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });
		console.log(updatedUser);
		resolve({
			status: "SUCCESS",
			message: "update successfully",
			data: updatedUser,
		});
	});
};
const deleteUser = (userId) => {
	return new Promise(async (resolve, reject) => {
		const checkUser = await User.findOne({
			_id: userId,
		});
		if (checkUser === null) {
			resolve({
				status: "ERR",
				message: "the user is not defined",
			});
		}
		const updatedUser = await User.findByIdAndDelete(userId);
		resolve({
			status: "SUCCESS",
			message: "delete successfully",
			data: updatedUser,
		});
	});
};
const getAllUser = () => {
	return new Promise(async(resolve, reject) => {
		const response = await User.find();
		resolve({
			status: "SUCCESS",
			message: "get user successfully",
			data: response
		});
	})
}
const getDetailUser = (userId) => {
	console.log("userId", userId);
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.find({
				_id:userId
			})
			if (!user) {
				resolve({
					status: 'error',
					message: "user is not defined"
				})
			}
			resolve({
				status: 'success',
				message: "get detail successfully",
				data: user
			})
		} catch (err) {

		}
	})
}
export default { createUser, loginUser, deleteUser, getAllUser, getDetailUser };
