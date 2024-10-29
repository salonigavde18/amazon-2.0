import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Google provider
import FacebookProvider from "next-auth/providers/facebook"; // Facebook provider

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID, // Facebook Client ID
      clientSecret: process.env.FACEBOOK_SECRET, // Facebook Client Secret
    }),
    // ...add more providers here if needed
  ],
  // Additional NextAuth options can be added here
};

export default NextAuth(authOptions);
