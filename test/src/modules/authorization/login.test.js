import { comparePasswordAgainstHash } from "../../../../src/modules/authorisation/login.js"
import { lock } from "../../../../src/modules/authorisation/resolver.js"
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

describe("lock payload resolver", () => {

    
    test("start locking user, should increase the failed login count from 0 to 1", () => {
        const user = {
            data: {
                email: "somecoolemailaddress@domain.com",
                account_locked: false,
                failed_logins: 0
            }
        }
        
        const lockAccountPayload = lock({...user?.data})["LOCK"]


        expect(lockAccountPayload?.where?.email).toBe("somecoolemailaddress@domain.com")
        expect(lockAccountPayload?.data?.account_locked).toBe(false)
        expect(lockAccountPayload?.data?.failed_logins).toBe(1)
    })

    test("start unlocking user, should reset the failed login count to 0 from any number less than 3", () => {
        const user = {
            data: {
                email: "somecoolemailaddress@domain.com",
                account_locked: true,
                failed_logins: 3
            }
        }
        
        const lockAccountPayload = lock({...user?.data})["UNLOCK"]


        expect(lockAccountPayload?.where?.email).toBe("somecoolemailaddress@domain.com")
        expect(lockAccountPayload?.data?.account_locked).toBe(false)
        expect(lockAccountPayload?.data?.failed_logins).toBe(0)
    })  
})