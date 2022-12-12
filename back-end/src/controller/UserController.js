import UserService from "../services/UserService.js"
const UserController = {
    createUser: async (req, res) => {
        const regex = "/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;"
        try {
            const {name,email,password,confirmPassword,phone} = req.body;
            if ( !name || !email || !password || !confirmPassword || !phone) {
                return res.status(200).json({
                    status: "ERR",
                    message: "The input is required"
                })
            // } else if (!regex.test(email)) {
            //     return res.status(200).json({
            //         status: "ERR",
            //         message: "The input is email"
            //     })
            // } else if (password !== confirmPassword) {
            //     return res.status(200).json({
            //         status: "ERR",
            //         message: "pass fall"
            //     })
            } else {
                const data = await UserService.createUser({
                    name,email,password,confirmPassword,phone
                })
                return res.status(200).json(data)
            }
        }
        catch(err) {
            return res.status(400).json({
                err: err
            })
        }
    }
}
export default UserController