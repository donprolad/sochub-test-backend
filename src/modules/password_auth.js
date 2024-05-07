import { getUserByEmailAddressHandler } from "./db/user.js";
import { authenticateWithPassword } from "./auth/password.js";

export const loginHandler = async (email, password) => {
    const foundUser = await getUserByEmailAddressHandler(email)

    if(foundUser?.success) {
        console.log(await authenticateWithPassword(password, foundUser.data?.password))
    }  else {
        return foundUser
    }
}