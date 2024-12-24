import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/_schemas/user";
import { compareSync } from "bcrypt-ts";
import { Adapter } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma) as Adapter,
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	providers: [
		Credentials({
			credentials: {
				username: {},
				password: {},
			},
			authorize: async (credentials) => {
				const validatedFields = loginSchema.safeParse(credentials);

				if (!validatedFields.success) {
					return null;
				}

				const { username, password } = validatedFields.data;

				const user = await prisma.user.findUnique({
					where: { username },
				});

				if (!user || !user.password) {
					throw new Error("User tidak ditemukan");
				}

				const passwordValid = compareSync(password, user.password);

				if (!passwordValid) return null;

				return user;
			},
		}),
	],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const protectRoutes = [
				"/",
				"/perangkat",
				"/ruangan",
				"/peminjaman",
				"/admin",
			];

			if (
				(!isLoggedIn && protectRoutes.includes(nextUrl.pathname)) ||
				(!isLoggedIn && nextUrl.pathname.startsWith("/admin"))
			) {
				return Response.redirect(new URL("/login", nextUrl));
			}

			if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
				return Response.redirect(new URL("/", nextUrl));
			}
			return true;
		},
		jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},

		session({ session, token }) {
			session.user.id = token.sub;
			session.user.role = token.role;
			return session;
		},
	},
});
