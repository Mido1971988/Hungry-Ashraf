import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
        },
      },

      async authorize(credentials, req) {
        try {
          if (!credentials || !credentials.username || !credentials.password)
            return null;

          const response = await fetch("http://localhost:3000/api/listOfUsers");
          const userList = await response.json();

          let user = userList.filter(
            (oneUser: { id: string; name: string; password: string }) => {
              if (
                credentials?.username === oneUser.name &&
                credentials?.password === oneUser.password
              ) {
                return true;
              }
            }
          )[0];
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (e) {
          console.log("Failed to Fetch Users from server");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
