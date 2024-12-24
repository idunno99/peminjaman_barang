"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
	getPeminjamanPerangkatUser,
	getPeminjamanRuanganUser,
} from "../_data/peminjaman";

export const accPinjamPerangkat = async (id: string) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	const pinjamPerangkat = await getPeminjamanPerangkatUser(id);
	if (!pinjamPerangkat) throw new Error("Peminjaman tidak ditemukan");

	try {
		await prisma.peminjamanPerangkat.update({
			data: {
				status: "Dipinjam",
			},
			where: {
				id,
			},
		});
	} catch (error) {
		throw new Error("Gagal update peminjaman perangkat");
	}
	revalidatePath("/admin/peminjaman");
	redirect("/admin/peminjaman");
};

export const decPinjamPerangkat = async (id: string) => {
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
				status: "Ditolak",
			},
			where: {
				id,
			},
		});
	} catch (error) {
		throw new Error("Gagal update peminjaman perangkat");
	}
	revalidatePath("/admin/peminjaman");
	redirect("/admin/peminjaman");
};

export const accPinjamRuangan = async (id: string) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	const pinjamRuangan = await getPeminjamanRuanganUser(id);
	if (!pinjamRuangan) throw new Error("Peminjaman tidak ditemukan");

	try {
		await prisma.peminjamanRuangan.update({
			data: {
				status: "Dipinjam",
			},
			where: {
				id,
			},
		});
	} catch (error) {
		throw new Error("Gagal update peminjaman ruangan");
	}
	revalidatePath("/admin/peminjaman");
	redirect("/admin/peminjaman");
};

export const decPinjamRuangan = async (id: string) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	const pinjamRuangan = await getPeminjamanRuanganUser(id);
	if (!pinjamRuangan) throw new Error("Peminjaman tidak ditemukan");

	try {
		await prisma.peminjamanRuangan.update({
			data: {
				isDipinjam: false,
				status: "Ditolak",
			},
			where: {
				id,
			},
		});
	} catch (error) {
		throw new Error("Gagal update peminjaman ruangan");
	}
	revalidatePath("/admin/peminjaman");
	redirect("/admin/peminjaman");
};
