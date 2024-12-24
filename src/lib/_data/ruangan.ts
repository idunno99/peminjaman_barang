import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 10;
export const getRuangan = async (query: string, currentPage: number) => {
	const session = await auth();

	if (!session || !session.user) redirect("/");
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const allRuangan = await prisma.ruangan.findMany({
			skip: offset,
			take: ITEMS_PER_PAGE,
			orderBy: { created_at: "desc" },
			where: {
				name: {
					contains: query,
				},
			},
		});
		return allRuangan;
	} catch (error) {
		throw new Error("Gagal mengambil data ruangan");
	}
};

export const getRuanganPages = async (query: string) => {
	const session = await auth();

	if (!session || !session.user) redirect("/");

	try {
		const allRuangan = await prisma.ruangan.count({
			orderBy: { created_at: "desc" },
			where: {
				name: {
					contains: query,
				},
			},
		});
		const totalPages = Math.ceil(Number(allRuangan) / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		throw new Error("Gagal mengambil data ruangan");
	}
};

export const getRuanganById = async (id: string) => {
	const session = await auth();

	if (!session || !session.user) redirect("/");

	try {
		const Ruangan = await prisma.ruangan.findUnique({
			where: { id },
		});
		return Ruangan;
	} catch (error) {
		throw new Error("Gagal mengambil data ruangan");
	}
};

export const getValueRuangan = async () => {
	const session = await auth();

	if (!session || !session.user) redirect("/");

	try {
		const ada = await prisma.ruangan.count({
			where: {
				tersedia: true,
			},
		});
		const total = await prisma.ruangan.count();
		const dipinjam = total - ada;
		return {
			ada: ada,
			dipinjam: dipinjam,
			total: total,
		};
	} catch (error) {
		throw new Error("Gagal mengambil data ruangan");
	}
};
