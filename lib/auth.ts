
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";
import { EmailTemplate } from "./EmailTemplete";

export const auth = betterAuth({
 database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
  emailAndPassword: {
    enabled: true, 
  }, 
  plugins: [
        emailOTP({ 
          async sendVerificationOTP({ email, otp, type}) { 
					const { data, error } = await resend.emails.send({
          from: 'AbhishekLMS <onboarding@resend.dev>',
          to: [email],
          subject: "AbhishekLMS – Your One-Time Verification Code",
          react: EmailTemplate({ firstName: 'there' ,otp}),
  });

				}, 
        }) 
    ],
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID, 
      clientSecret: env.GITHUB_CLIENT_SECRET, 
    }, 
  }, 
});