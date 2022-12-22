import UserService from "../services/UserService.js";
const regex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const UserController = {
	createUser: async (req, res) => {
		try {
			const { name, email, password, confirmPassword, phone, isAdmin } = req.body;
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
					isAdmin,
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
			const data = await UserService.loginUser({
				name,
				email,
				password,
				confirmPassword,
				phone,
			});
			return res.status(200).json(data);
		}
	},
	updateUser: async (req, res, next) => {
		try {
			const userId = req.params.id;
			const data = req.body;
			if (!userId) {
				return res.status(200).json({
					status: "ERR",
					message: "the is userId is required",
				});
			}
			const response = await UserService.updateUser(userId, data);
			return res.status(200).json(response);
		} catch (err) {}
	},
	deleteUser: async (req, res) => {
		try {
			const userId = req.params.id;
			if (!userId) {
				return res.status(200).json({
					status: "ERR",
					message: "the is userId is required",
				});
			}
			const response = await UserService.deleteUser(userId);
			return res.status(200).json(response);
		} catch (err) {}
	},
	getAll: async (req, res) => {
		try {
			const response = await UserService.getAllUser();
			return res.status(200).json(response);
		} catch (err) {}
	},
	getDetailUser: async (req, res) => {
		try {
			const userId = req.params.id;
			console.log(userId);
			if (!userId) {
				return res.status(200).json({
					status: "ERR",
					message: "the is userId is required",
				});
			}
			const response = await UserService.getDetailUser(userId);
			return res.status(200).json({
				status: "OK",
				message: "get detail successfully",
				data: response,
			});
		} catch (err) {}
	},
	refreshToken: async (req, res) => {
		try {
			const token = req.headers.token.split(' ')[1];
			if (!token) {
				return res.status(200).json({
					status: "ERR",
					message: "token is required",
				});
			}
			const response = await UserService.refreshTokenServices(token);
			return res.status(200).json({
				status: "OK",
				message: "get detail successfully",
				data: response,
			});
		} catch (err) {}
	},
};
export default UserController;
