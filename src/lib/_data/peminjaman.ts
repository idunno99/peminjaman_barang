import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const formatDate = (dateStr: Date) => {
	const tanggal = new Date(dateStr);
	const newFormat = tanggal
		.toLocaleDateString("id-ID", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		})
		.replace(/\//g, "-");

	return newFormat;
};

const ITEMS_PER_PAGE = 10;

export const getPeminjamanUser = async (query: string, currentPage: number) => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const peminjamanPerangkat = await prisma.peminjamanPerangkat.findMany({
			orderBy: { tgl_mulai: "desc" },
			include: {
				perangkat: {
					select: { nama: true },
				},
			},
			where: {
				userId: session.user.id,
				OR: [
					{
						perangkat: {
							nama: {
								contains: query,
							},
						},
					},
					{
						jenis: {
							contains: query,
						},
					},
				],
			},
		});

		const peminjamanRuangan = await prisma.peminjamanRuangan.findMany({
			orderBy: { tgl_mulai: "desc" },
			include: {
				ruangan: {
					select: {
						name: true,
					},
				},
			},
			where: {
				userId: session.user.id,
				OR: [
					{
						ruangan: {
							name: {
								contains: query,
							},
						},
					},
					{
						jenis: {
							contains: query,
						},
					},
				],
			},
		});

		const allPeminjaman = [
			...peminjamanPerangkat.map((peminjaman) => ({
				id: peminjaman.id,
				tipe: peminjaman.jenis,
				nama: peminjaman.perangkat.nama,
				tujuan: peminjaman.keterangan,
				jumlah: peminjaman.jumlah,
				tglMulai: peminjaman.tgl_mulai,
				tglSelesai: peminjaman.tgl_selesai,
				dipinjam: peminjaman.isDipinjam,
				status: peminjaman.status,
				createdAt: peminjaman.created_at
			})),
			...peminjamanRuangan.map((peminjaman) => ({
				id: peminjaman.id,
				tipe: peminjaman.jenis,
				nama: peminjaman.ruangan.name,
				tujuan: peminjaman.keterangan,
				jumlah: 0,
				tglMulai: peminjaman.tgl_mulai,
				tglSelesai: peminjaman.tgl_selesai,
				dipinjam: peminjaman.isDipinjam,
				status: peminjaman.status,
				createdAt: peminjaman.created_at
			})),
		];

		const sortedPeminjaman = allPeminjaman.sort((a, b) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});

		const offset = (currentPage - 1) * ITEMS_PER_PAGE;

		const paginatedPeminjaman = sortedPeminjaman.slice(
			offset,
			offset + ITEMS_PER_PAGE
		);

		return paginatedPeminjaman;
	} catch (error) {
		throw new Error("Gagal mengambil data peminjaman");
	}
};

export const getPagesPeminjamanUser = async (query: string) => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const peminjamanPerangkat = await prisma.peminjamanPerangkat.findMany({
			orderBy: { tgl_mulai: "desc" },
			include: {
				perangkat: {
					select: { nama: true },
				},
			},
			where: {
				userId: session.user.id,
				OR: [
					{
						perangkat: {
							nama: {
								contains: query,
							},
						},
					},
					{
						jenis: {
							contains: query,
						},
					},
				],
			},
		});

		const peminjamanRuangan = await prisma.peminjamanRuangan.findMany({
			orderBy: { tgl_mulai: "desc" },
			include: {
				ruangan: {
					select: {
						name: true,
					},
				},
			},
			where: {
				userId: session.user.id,
				OR: [
					{
						ruangan: {
							name: {
								contains: query,
							},
						},
					},
					{
						jenis: {
							contains: query,
						},
					},
				],
			},
		});

		const allPeminjaman = [
			...peminjamanPerangkat.map((peminjaman) => ({
				id: peminjaman.id,
				tipe: peminjaman.jenis,
				nama: peminjaman.perangkat.nama,
				tujuan: peminjaman.keterangan,
				jumlah: peminjaman.jumlah,
				tglMulai: peminjaman.tgl_mulai,
				tglSelesai: peminjaman.tgl_selesai,
				status: peminjaman.isDipinjam,
			})),
			...peminjamanRuangan.map((peminjaman) => ({
				id: peminjaman.id,
				tipe: peminjaman.jenis,
				nama: peminjaman.ruangan.name,
				tujuan: peminjaman.keterangan,
				jumlah: 0,
				tglMulai: peminjaman.tgl_mulai,
				tglSelesai: peminjaman.tgl_selesai,
				status: peminjaman.isDipinjam,
			})),
		];

		const totalPages = Math.ceil(allPeminjaman.length / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		throw new Error("Gagal mengambil data peminjaman");
	}
};

export const getPeminjamanPerangkatUser = async (id: string) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const peminjamanPerangkat = await prisma.peminjamanPerangkat.findUnique({
			where: { id },
			include: {
				perangkat: true,
			},
		});
		return peminjamanPerangkat;
	} catch (error) {
		throw new Error("Gagal mengambil data peminjaman");
	}
};

export const getPeminjamanRuanganUser = async (id: string) => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const peminjamanRuangan = await prisma.peminjamanRuangan.findUnique({
			where: { id },
		});
		return peminjamanRuangan;
	} catch (error) {
		throw new Error("Gagal mengambil data peminjaman");
	}
};

export const getTotalPerangkat = async () => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const perangkat = await prisma.peminjamanPerangkat.groupBy({
			by: ["isDipinjam"],
			_count: {
				_all: true,
			},
			where: {
				userId: session.user.id,
			},
		});
		return perangkat;
	} catch (error) {
		throw new Error("Gagal mengambil data peminjaman");
	}
};

export const getTotalRuangan = async () => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const ruangan = await prisma.peminjamanRuangan.groupBy({
			by: ["isDipinjam"],
			_count: {
				_all: true,
			},
			where: {
				userId: session.user.id,
			},
		});
		return ruangan;
	} catch (error) {
		throw new Error("Gagal mengambil data peminjaman");
	}
};

export const getAllPerangkat = async () => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const perangkat = await prisma.peminjamanPerangkat.groupBy({
			by: ["isDipinjam"],
			_count: {
				_all: true,
			},
		});
		return perangkat;
	} catch (error) {
		throw new Error("Gagal mengambil data peminjaman");
	}
};

export const getAllRuangan = async () => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const ruangan = await prisma.peminjamanRuangan.groupBy({
			by: ["isDipinjam"],
			_count: {
				_all: true,
			},
		});
		return ruangan;
	} catch (error) {
		throw new Error("Gagal mengambil data peminjaman");
	}
};

export const getAllPeminjamanUser = async (
	query: string,
	currentPage: number
) => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const peminjamanPerangkat = await prisma.peminjamanPerangkat.findMany({
			orderBy: { created_at: "desc" },
			include: {
				user: {
					select: {
						name: true,
					},
				},
				perangkat: {
					select: { nama: true },
				},
			},
			where: {
				OR: [
					{
						user: {
							name: {
								contains: query,
							},
						},
					},
					{
						perangkat: {
							nama: {
								contains: query,
							},
						},
					},
					{
						jenis: {
							contains: query,
						},
					},
				],
			},
		});

		const peminjamanRuangan = await prisma.peminjamanRuangan.findMany({
			orderBy: { created_at: "desc" },
			include: {
				user: {
					select: {
						name: true,
					},
				},
				ruangan: {
					select: {
						name: true,
					},
				},
			},
			where: {
				OR: [
					{
						user: {
							name: {
								contains: query,
							},
						},
					},
					{
						ruangan: {
							name: {
								contains: query,
							},
						},
					},
					{
						jenis: {
							contains: query,
						},
					},
				],
			},
		});

		const allPeminjaman = [
			...peminjamanPerangkat.map((peminjaman) => ({
				id: peminjaman.id,
				pegawai: peminjaman.user.name,
				nama: peminjaman.perangkat.nama,
				tipe: peminjaman.jenis,
				tujuan: peminjaman.keterangan,
				jumlah: peminjaman.jumlah,
				tglMulai: peminjaman.tgl_mulai,
				tglSelesai: peminjaman.tgl_selesai,
				dipinjam: peminjaman.isDipinjam,
				status: peminjaman.status,
				createdAt: peminjaman.created_at
			})),
			...peminjamanRuangan.map((peminjaman) => ({
				id: peminjaman.id,
				pegawai: peminjaman.user.name,
				nama: peminjaman.ruangan.name,
				tipe: peminjaman.jenis,
				tujuan: peminjaman.keterangan,
				jumlah: 0,
				tglMulai: peminjaman.tgl_mulai,
				tglSelesai: peminjaman.tgl_selesai,
				dipinjam: peminjaman.isDipinjam,
				status: peminjaman.status,
				createdAt: peminjaman.created_at
			})),
		];

		const sortedPeminjaman = allPeminjaman.sort((a, b) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});

		const offset = (currentPage - 1) * ITEMS_PER_PAGE;

		const paginatedPeminjaman = sortedPeminjaman.slice(
			offset,
			offset + ITEMS_PER_PAGE
		);

		return paginatedPeminjaman;
	} catch (error) {
		throw new Error("Gagal mengambil data peminjaman");
	}
};

export const getAllPeminjamanPages = async (query: string) => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const peminjamanPerangkat = await prisma.peminjamanPerangkat.findMany({
			orderBy: { created_at: "desc" },
			include: {
				user: {
					select: {
						name: true,
					},
				},
				perangkat: {
					select: { nama: true },
				},
			},
			where: {
				OR: [
					{
						user: {
							name: {
								contains: query,
							},
						},
					},
					{
						perangkat: {
							nama: {
								contains: query,
							},
						},
					},
					{
						jenis: {
							contains: query,
						},
					},
				],
			},
		});

		const peminjamanRuangan = await prisma.peminjamanRuangan.findMany({
			orderBy: { created_at: "desc" },
			include: {
				user: {
					select: {
						name: true,
					},
				},
				ruangan: {
					select: {
						name: true,
					},
				},
			},
			where: {
				OR: [
					{
						user: {
							name: {
								contains: query,
							},
						},
					},
					{
						ruangan: {
							name: {
								contains: query,
							},
						},
					},
					{
						jenis: {
							contains: query,
						},
					},
				],
			},
		});

		const allPeminjaman = [
			...peminjamanPerangkat.map((peminjaman) => ({
				id: peminjaman.id,
				pegawai: peminjaman.user.name,
				nama: peminjaman.perangkat.nama,
				tipe: peminjaman.jenis,
				tujuan: peminjaman.keterangan,
				jumlah: peminjaman.jumlah,
				tglMulai: peminjaman.tgl_mulai,
				tglSelesai: peminjaman.tgl_selesai,
				status: peminjaman.isDipinjam,
			})),
			...peminjamanRuangan.map((peminjaman) => ({
				id: peminjaman.id,
				pegawai: peminjaman.user.name,
				nama: peminjaman.ruangan.name,
				tipe: peminjaman.jenis,
				tujuan: peminjaman.keterangan,
				jumlah: 0,
				tglMulai: peminjaman.tgl_mulai,
				tglSelesai: peminjaman.tgl_selesai,
				status: peminjaman.isDipinjam,
			})),
		];

		const totalPages = Math.ceil(allPeminjaman.length / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		throw new Error("Gagal mengambil data peminjaman");
	}
};
