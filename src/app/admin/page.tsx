import HeaderPage from "@/components/HeaderPage";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import InfoPerangkat from "./components/dashboard/InfoPerangkat";
import InfoRuangan from "./components/dashboard/InfoRuangan";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import InfoPeminjaman from "./components/dashboard/InfoPeminjaman";
import ListPeminjaman from "./components/peminjaman/ListPeminjaman";
import { SeeAll } from "./components/Button";

const DashboardAdminPage = async () => {
	const session = await auth();

	if (!session || !session.user || session.user.role !== "admin") redirect("/");

	return (
		<div className="flex flex-col gap-5">
			<HeaderPage>
				<FaCircleUser className="size-8" />
				<h1 className="text-lg">{session?.user?.name}</h1>
				<p className="badge badge-warning">Admin</p>
			</HeaderPage>
			<div className="overflow-y-auto w-full">
				<ListPeminjaman limit={5} query="" currentPage={1} />
			</div>
			<SeeAll />
			<div className="flex flex-col flex-wrap lg:grid lg:grid-cols-2 gap-5 ">
				<InfoPerangkat />
				<InfoRuangan />
			</div>
			<div>
				<InfoPeminjaman />
			</div>
		</div>
	);
};

export default DashboardAdminPage;
