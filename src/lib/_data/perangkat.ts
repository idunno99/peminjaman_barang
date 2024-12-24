import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 10;
export const getPerangkat = async (query: string, currentPage: number) => {
	const session = await auth();

	if (!session || !session.user) redirect("/");

	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const allPerangkat = await prisma.perangkat.findMany({
			skip: offset,
			take: ITEMS_PER_PAGE,
			orderBy: { created_at: "desc" },
			where: {
				nama: {
					contains: query,
				},
			},
		});
		return allPerangkat;
	} catch (error) {
		throw new Error("Gagal mengambil data perangkat");
	}
};

export const getPerangkatPages = async (query: string) => {
	const session = await auth();

	if (!session || !session.user) redirect("/");

	try {
		const allPerangkat = await prisma.perangkat.count({
			orderBy: { created_at: "desc" },
			where: {
				nama: {
					contains: query,
				},
			},
		});
		const totalPages = Math.ceil(Number(allPerangkat) / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		throw new Error("Gagal mengambil data perangkat");
	}
};

export const getPerangkatById = async (id: string) => {
	try {
		const Perangkat = await prisma.perangkat.findUnique({
			where: { id },
		});
		return Perangkat;
	} catch (error) {
		throw new Error("Gagal mengambil data perangkat");
	}
};

export const getValuePerangkat = async () => {
	const session = await auth();

	if (!session || !session.user) redirect("/");

	try {
		const Value = await prisma.perangkat.aggregate({
			_sum: {
				tersedia: true,
				dipinjam: true,
				jumlah: true,
			},
		});
		return Value;
	} catch (error) {
		throw new Error("Gagal mengambil data perangkat");
	}
};

export const getStokPerangkat = async (id: string) => {
	try {
		const stokPerangkat = await prisma.perangkat.findUnique({
			where: { id },
			select: { tersedia: true },
		});
		return stokPerangkat;
	} catch (error) {
		throw new Error("Gagal mengambil data perangkat");
	}
};
