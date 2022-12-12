import User from "../model/UserModel.js";
import bcrypt from 'bcrypt';
const createUser = (newUser) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { name, email, password, confirmPassword, phone } = newUser;
			const checkUser = await User.findOne({
				email: email
			});
            console.log(checkUser)
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
				}
			}
		} catch (err) {
			reject(err);
		}
	});
};
export default { createUser };
