import UserService from "../services/UserService.js";
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const UserController = {
	createUser: async (req, res) => {
		try {
			const { name, email, password, confirmPassword, phone } = req.body;
			if (!name || !email || !password || !confirmPassword || !phone) {
				return res.status(200).json({
					status: "ERR",
					message: "The input is required",
				});
			} else if (!regex.test(email)) {
				return res.status(200).json({
					status: "ERR",
					message: "The input is email",
				});
			} else if (password !== confirmPassword) {
				return res.status(200).json({
					status: "ERR",
					message: "pass fall",
				});
			} else {
				const data = await UserService.createUser({
					name,
					email,
					password,
					confirmPassword,
					phone,
				});
				return res.status(200).json(data);
			}
		} catch (err) {
			return res.status(400).json({
				err: err,
			});
		}
	},
	loginUser: async (req, res, next) => {
		const { name, email, password, confirmPassword, phone } = req.body;
		if ( !name || !email || !password || !confirmPassword || !phone ) {
			return res.status(200).json({
				status: "ERR",
				message: "The input is required",
			});
		} else if (!regex.test(email)) {
			return res.status(200).json({
				status: "ERR",
				message: "The input is email",
			});
		} else if (password !== confirmPassword) {
			return res.status(200).json({
				status: "ERR",
				message: "pass fall",
			});
		} else {
			const data = await UserService.loginUser({
				name,
				email,
				password,
				confirmPassword,
				phone,
			});
			return res.status(200).json(data);
		}
	}
};
export default UserController;