import { z } from "zod";

export const userSchema = z.object({
	fullname: z.string().min(1, "Nama harus diisi"),
	email: z.string().min(1, "Email harus diisi"),
	username: z.string().min(1, "Username harus diisi"),
	password: z
		.string({ required_error: "Password harus diisi" })
		.min(8, "Password minimal 8 karakter")
		.max(32, "Password maksimal 32 karakter"),
	role: z.enum(["user", "admin"]),
});

export const loginSchema = z.object({
	username: z.string().min(1, "Username harus diisi"),
	password: z
		.string({ required_error: "Password harus diisi" })
		.min(8, "Password minimal 8 karakter")
		.max(32, "Password maksimal 32 karakter"),
});

export const signupSchema = z.object({
	fullname: z.string().min(1, "Nama lengkap harus diisi"),
	email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),
});