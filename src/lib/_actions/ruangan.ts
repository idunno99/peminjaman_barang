"use server";

import { RuanganSchema, UpdateRuanganSchema } from "../_schemas/ruangan";
import { del, put } from "@vercel/blob";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getRuanganById } from "../_data/ruangan";
import { PeminjamanRuanganSchema } from "../_schemas/peminjaman";
import { auth } from "@/auth";
import { getPeminjamanRuanganUser } from "../_data/peminjaman";

export const addRuangan = async (prevState: any, formData: FormData) => {
	const validatedFields = RuanganSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { title, lokasi, deskripsi, image } = validatedFields.data;
	const { url } = await put(image.name, image, {
		access: "public",
		multipart: true,
	});

	try {
		await prisma.ruangan.create({
			data: {
				name: title,
				lokasi: lokasi,
				description: deskripsi,
				img_url: url,
			},
		});
	} catch (error) {
		return {
			message: "Gagal menambah ruangan",
		};
	}
	revalidatePath("/admin/ruangan");
	redirect("/admin/ruangan");
};

export const EditRuangan = async (
	id: string,
	prevState: any,
	formData: FormData
) => {
	const validatedFields = UpdateRuanganSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const ruangan = await getRuanganById(id);
	if (!ruangan) return { message: "Ruangan tidak ditemukan" };

	const { title, lokasi, deskripsi, image } = validatedFields.data;
	let imgPath;

	if (!image || image.size <= 0) {
		imgPath = ruangan.img_url;
	} else {
		await del(ruangan.img_url);
		const { url } = await put(image.name, image, {
			access: "public",
			multipart: true,
		});

		imgPath = url;
	}

	try {
		await prisma.ruangan.update({
			data: {
				name: title,
				lokasi: lokasi,
				description: deskripsi,
				img_url: imgPath,
			},
			where: { id },
		});
	} catch (error) {
		return {
			message: "Gagal menambah ruangan",
		};
	}
	revalidatePath("/ruangan");
	revalidatePath("/admin/ruangan");
	redirect("/admin/ruangan");
};

export const deleteRuangan = async (id: string) => {
	const ruangan = await getRuanganById(id);

	if (!ruangan) throw new Error("Ruangan tidak ditemukan");

	await del(ruangan.img_url);

	try {
		await prisma.ruangan.delete({ where: { id } });
	} catch (error) {
		throw new Error("Gagal menghapus ruangan");
	}
	revalidatePath("/ruangan");
	revalidatePath("/admin/ruangan");
};

export const addPinjamRuangan = async (
	id: string,
	prevState: any,
	formData: FormData
) => {
	console.log(Object.fromEntries(formData.entries()));

	const validatedFields = PeminjamanRuanganSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const ruangan = await getRuanganById(id);
	if (!ruangan) return { message: "Perangkat tidak ditemukan" };

	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	const { tglpinjam, tglselesai, keterangan } = validatedFields.data;

	try {
		await prisma.ruangan.update({
			data: {
				tersedia: false,
			},
			where: { id },
		});

		await prisma.peminjamanRuangan.create({
			data: {
				userId: session.user.id,
				ruanganId: id,
				tgl_mulai: tglpinjam,
				tgl_selesai: tglselesai,
				keterangan: keterangan,
			},
		});
	} catch (error) {
		return {
			message: "Gagal meminjaman ruangan",
		};
	}
	revalidatePath("/peminjaman");
	redirect("/ruangan");
};

export const updatePinjamRuangan = async (id: string) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	const pinjamRuangan = await getPeminjamanRuanganUser(id);
	if (!pinjamRuangan) throw new Error("Peminjaman tidak ditemukan");

	try {
		await prisma.ruangan.update({
			data: {
				tersedia: true,
			},
			where: { id: pinjamRuangan.ruanganId },
		});

		await prisma.peminjamanRuangan.update({
			data: {
				isDipinjam: false,
			},
			where: {
				id,
			},
		});
	} catch (error) {
		throw new Error("Gagal meminjam ruangan");
	}
	revalidatePath("/peminjaman");
	redirect("/peminjaman");
};

export const perpanjangPinjamanRuangan = async (id: string) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	const Peminjaman = await getPeminjamanRuanganUser(id);
	if (!Peminjaman) throw new Error("Peminjaman tidak ditemukan");

	const tanggal = new Date(Peminjaman.tgl_selesai);
	tanggal.setDate(tanggal.getDate() + 1);

	try {
		await prisma.peminjamanRuangan.update({
			data: {
				tgl_selesai: tanggal,
				status: "Diproses",
			},
			where: {
				id,
			},
		});
	} catch (error) {
		throw new Error("Gagal perpanjang peminjaman perangkat");
	}
	revalidatePath("/peminjaman");
	redirect("/peminjaman");
};
