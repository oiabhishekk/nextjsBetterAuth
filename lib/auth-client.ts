import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({
    plugins: [
        emailOTPClient()
    ],
    baseURL: "http://localhost:3000"
})

