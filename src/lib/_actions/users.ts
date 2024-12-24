"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { userSchema } from "../_schemas/user";
import { getUserById } from "../_data/users";
import { hashSync } from "bcrypt-ts";
import {
	getAllPerangkat,
	getAllRuangan,
	getTotalPerangkat,
	getTotalRuangan,
} from "../_data/peminjaman";

export const addUser = async (prevState: any, formData: FormData) => {
	const validatedFields = userSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			Error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { fullname, email, username, password, role } = validatedFields.data;

	const hashedPassowrd = hashSync(password, 10);

	try {
		await prisma.user.create({
			data: {
				name: fullname,
				username,
				email,
				password: hashedPassowrd,
				role,
			},
		});
	} catch (error) {
		return {
			message: "username sudah digunakan",
		};
	}
	revalidatePath("/admin/pengguna");
	redirect("/admin/pengguna");
};

export const deleteUser = async (id: string) => {
	const user = await getUserById(id);

	if (!user) throw new Error("User tidak ditemukan");

	try {
		await prisma.user.delete({ where: { id } });
	} catch (error) {
		throw new Error("Gagal menghapus user");
	}
	revalidatePath("/admin/pengguna");
};

export const editUser = async (
	id: string,
	prevState: any,
	formData: FormData
) => {
	const validatedFields = userSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			Error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const user = await getUserById(id);
	if (!user) return { message: "User tidak ditemukan" };

	const { fullname, email, username, password, role } = validatedFields.data;

	const hashedPassowrd = hashSync(password, 10);

	try {
		await prisma.user.update({
			data: {
				name: fullname,
				email: email,
				username: username,
				password: hashedPassowrd,
				role: role,
			},
			where: { id },
		});
	} catch (error) {
		return {
			message: "Gagal mengedit user",
		};
	}
	revalidatePath("/admin/pengguna");
	redirect("/admin/pengguna");
};

export const totalPeminjaman = async () => {
	const valuePerangkat = await getTotalPerangkat();
	const valueRuangan = await getTotalRuangan();

	const totalPerangkatDipinjam =
		valuePerangkat.find((item) => item.isDipinjam === true)?._count._all || 0;
	const totalPerangkatSelesai =
		valuePerangkat.find((item) => item.isDipinjam === false)?._count._all || 0;
	const totalRuanganDipinjam =
		valueRuangan.find((item) => item.isDipinjam === true)?._count._all || 0;
	const totalRuanganSelesai =
		valueRuangan.find((item) => item.isDipinjam === false)?._count._all || 0;

	const Dipinjam = totalPerangkatDipinjam + totalRuanganDipinjam;
	const Selesai = totalPerangkatSelesai + totalRuanganSelesai;
	const Total = Dipinjam + Selesai;

	return { Dipinjam, Selesai, Total };
};

export const getAllPeminjaman = async () => {
	const valuePerangkat = await getAllPerangkat();
	const valueRuangan = await getAllRuangan();

	const totalPerangkatDipinjam =
		valuePerangkat.find((item) => item.isDipinjam === true)?._count._all || 0;
	const totalPerangkatSelesai =
		valuePerangkat.find((item) => item.isDipinjam === false)?._count._all || 0;
	const totalRuanganDipinjam =
		valueRuangan.find((item) => item.isDipinjam === true)?._count._all || 0;
	const totalRuanganSelesai =
		valueRuangan.find((item) => item.isDipinjam === false)?._count._all || 0;

	const Dipinjam = totalPerangkatDipinjam + totalRuanganDipinjam;
	const Selesai = totalPerangkatSelesai + totalRuanganSelesai;
	const Total = Dipinjam + Selesai;

	return { Dipinjam, Selesai, Total };
};
