import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 10;

export const getUsers = async (query: string, currentPage: number) => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const getUsers = await prisma.user.findMany({
			skip: offset,
			take: ITEMS_PER_PAGE,
			where: {
				OR: [
					{
						name: {
							contains: query,
						},
					},
					{
						email: {
							contains: query,
						},
					},
				],
			},
		});
		return getUsers;
	} catch (error) {
		throw new Error("Gagal mengambil data user");
	}
};

export const getUserById = async (id: string) => {
	try {
		const User = await prisma.user.findUnique({
			where: { id },
		});
		return User;
	} catch (error) {
		throw new Error("Gagal mengambil data user");
	}
};

export const getRoleUser = async (username: string) => {
	try {
		const Role = await prisma.user.findUnique({
			where: { username },
			select: { role: true },
		});
		return Role;
	} catch (error) {
		throw new Error("Gagal mengambil data user");
	}
};

export const getUsersPage = async (query: string) => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) redirect("/login");

	try {
		const getUsers = await prisma.user.count({
			where: {
				OR: [
					{
						name: {
							contains: query,
						},
					},
					{
						email: {
							contains: query,
						},
					},
				],
			},
		});

		const totalPages = Math.ceil(Number(getUsers) / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		throw new Error("Gagal mengambil data user");
	}
};
