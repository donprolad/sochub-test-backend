import { comparePasswordAgainstHash } from "../../../../src/modules/authorisation/login.js"
import bcrypt from "bcrypt"

describe("bcrypt compare module", () => {
    
    test("with correct password should return true", async () => {
        const password = "Passw0rd123!"
        const hash = await bcrypt.hashSync(password, 10)

        const authenticated = await comparePasswordAgainstHash(password, hash)

        expect(authenticated?.success).toBe(true)
    })

    test("with incorrect password should return false", async () => {
        const password = "Passw0rd123!"
        const hash = await bcrypt.hashSync(password, 10)

        const authenticated = await comparePasswordAgainstHash("tryingtlogin", hash)

        expect(authenticated?.success).toBe(false)
    })
})