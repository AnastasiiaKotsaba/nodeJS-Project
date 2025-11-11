import { userService } from "./user.service";
import { UserControllerContract } from "./user.types";

export const userController: UserControllerContract = {
    registration: async (req, res) => {
        const body = req.body

        const response = await userService.registration(body)
        res.status(200).json(response)
    },
    login: async (req, res) => {
        const body = req.body

        const response = await userService.login(body)
        res.status(200).json(response)
    }
}