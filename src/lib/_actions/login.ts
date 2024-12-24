"use server";
import { loginSchema, signupSchema } from "../_schemas/user";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { getRoleUser } from "../_data/users";

export const signUpCredentilas = async (formData: FormData) => {
	const validatedFields = signupSchema.safeParse(
		Object.fromEntries(formData.entries())
	);
};

export const LogInCredentials = async (
	prevState: unknown,
	formData: FormData
) => {
	const validatedFields = loginSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { username, password } = validatedFields.data;

	const Role = await getRoleUser(username);

	try {
		await signIn("credentials", {
			username,
			password,
			redirectTo: `${Role?.role === "admin" ? "/admin" : "/"}`,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { message: "Username atau password salah" };
				default:
					return { message: "Akun belum terdaftar" };
			}
		}
		throw error;
	}
};

export const LogOut = async () => {
	await signOut({ redirectTo: "/login" });
};
