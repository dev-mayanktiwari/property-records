import { InputSchema } from "@/lib/types";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate credentials using the schema
          const parsedCredentials = InputSchema.safeParse({
            email: credentials?.email,
            password: credentials?.password,
          });
          if (!parsedCredentials.success) {
            throw new Error("Invalid input format");
          }
          const { email, password } = parsedCredentials.data;
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user) {
            throw new Error("No user found with this email");
          }
          // Verify password
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            throw new Error("Incorrect password");
          }
          return {
            id: String(user.id),
            email: user.email,
          };
        } catch (error) {
          console.error("Error validating credentials:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },
});

export { handler as GET, handler as POST };
