"use server";

import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPerangkatById } from "../_data/perangkat";
import { PerangkatSchema, UpdateSchema } from "../_schemas/perangkat";
import { PeminjamanPerangkatSchema } from "../_schemas/peminjaman";
import { auth } from "@/auth";
import {
	getPeminjamanPerangkatUser,
	getPeminjamanUser,
} from "../_data/peminjaman";

//tambah perangkat
export const addPerangkat = async (prevState: any, formData: FormData) => {
	const validatedFields = PerangkatSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { title, jumlah, deskripsi, image } = validatedFields.data;
	const { url } = await put(image.name, image, {
		access: "public",
		multipart: true,
	});

	const tersedia = parseInt(jumlah) > 0;

	try {
		await prisma.perangkat.create({
			data: {
				nama: title,
				description: deskripsi,
				tersedia: parseInt(jumlah),
				jumlah: parseInt(jumlah),
				status: tersedia,
				img_url: url,
			},
		});
	} catch (error) {
		return {
			message: "Gagal menambah perangkat",
		};
	}
	revalidatePath("/admin/perangkat");
	redirect("/admin/perangkat");
};

//update perangkat
export const updatePerangkat = async (
	id: string,
	prevState: any,
	formData: FormData
) => {
	const validatedFields = UpdateSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const perangkat = await getPerangkatById(id);
	if (!perangkat) return { message: "Perangkat tidak ditemukan" };

	const { title, jumlah, deskripsi, image } = validatedFields.data;
	const tersedia_upd = parseInt(jumlah) - perangkat.dipinjam;
	const tersedia = tersedia_upd > 0;

	let imgPath;
	if (!image || image.size <= 0) {
		imgPath = perangkat.img_url;
	} else {
		await del(perangkat.img_url);
		const { url } = await put(image.name, image, {
			access: "public",
			multipart: true,
		});

		imgPath = url;
	}

	try {
		await prisma.perangkat.update({
			data: {
				nama: title,
				description: deskripsi,
				tersedia: tersedia_upd,
				jumlah: parseInt(jumlah),
				status: tersedia,
				img_url: imgPath,
			},
			where: { id },
		});
	} catch (error) {
		return {
			message: "Gagal edit perangkat",
		};
	}
	revalidatePath("/perangkat");
	revalidatePath("/admin/perangkat");
	redirect("/admin/perangkat");
};

//delete perangkat
export const deletePerangkat = async (id: string) => {
	const perangkat = await getPerangkatById(id);

	if (!perangkat) throw new Error("Perangkat tidak ditemukan");

	await del(perangkat.img_url);

	try {
		await prisma.perangkat.delete({ where: { id } });
	} catch (error) {
		throw new Error("Gagal menghapus perangkat");
	}
	revalidatePath("/perangkat");
	revalidatePath("/admin/perangkat");
};

//pinjam perangkat
export const addPinjamPerangkat = async (
	id: string,
	prevState: any,
	formData: FormData
) => {
	const validatedFields = PeminjamanPerangkatSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const perangkat = await getPerangkatById(id);
	if (!perangkat) return { message: "Perangkat tidak ditemukan" };

	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	const { tglpinjam, tglselesai, jumlah, keterangan } = validatedFields.data;

	const newTersedia = perangkat.tersedia - parseInt(jumlah);
	const newDipinjam = perangkat.dipinjam + parseInt(jumlah);
	const status = newTersedia > 0;

	try {
		await prisma.perangkat.update({
			data: {
				tersedia: newTersedia,
				dipinjam: newDipinjam,
				status: status,
			},
			where: { id },
		});

		await prisma.peminjamanPerangkat.create({
			data: {
				perangkatId: id,
				jumlah: parseInt(jumlah),
				tgl_mulai: tglpinjam,
				tgl_selesai: tglselesai,
				keterangan: keterangan,
				userId: session.user.id,
			},
		});
	} catch (error) {
		return {
			message: "Gagal tambah peminjaman perangkat",
		};
	}
	revalidatePath("/peminjaman");
	redirect("/perangkat");
};

export const updatePinjamPerangkat = async (id: string) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	const pinjamPerangkat = await getPeminjamanPerangkatUser(id);
	if (!pinjamPerangkat) throw new Error("Peminjaman tidak ditemukan");

	const newTersedia =
		pinjamPerangkat.perangkat.tersedia + pinjamPerangkat.jumlah;
	const newDipinjam =
		pinjamPerangkat.perangkat.dipinjam - pinjamPerangkat.jumlah;
	const status = newTersedia > 0;

	try {
		await prisma.perangkat.update({
			data: {
				tersedia: newTersedia,
				dipinjam: newDipinjam,
				status: status,
			},
			where: { id: pinjamPerangkat.perangkatId },
		});

		await prisma.peminjamanPerangkat.update({
			data: {
				isDipinjam: false,
			},
			where: {
				id,
			},
		});
	} catch (error) {
		throw new Error("Gagal update peminjaman perangkat");
	}
	revalidatePath("/peminjaman");
	redirect("/peminjaman");
};

export const perpanjangPinjamanPerangkat = async (id: string) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	const Peminjaman = await getPeminjamanPerangkatUser(id);
	if (!Peminjaman) throw new Error("Peminjaman tidak ditemukan");

	const tanggal = new Date(Peminjaman.tgl_selesai);
	tanggal.setDate(tanggal.getDate() + 1);

	try {
		await prisma.peminjamanPerangkat.update({
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
