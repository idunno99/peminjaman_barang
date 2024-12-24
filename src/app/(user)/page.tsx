import { auth } from "@/auth";
import HeaderPage from "@/components/HeaderPage";
import Link from "next/link";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import ListPerangkat from "./components/perangkat/ListPerangkat";
import ListRuangan from "./components/ruangan/ListRuangan";
import { totalPeminjaman } from "@/lib/_actions/users";
import { redirect } from "next/navigation";

const Dashboard = async () => {
	const session = await auth();

	if (!session || !session.user || session.user.role !== "user")
		redirect("/admin");

	const Total = await totalPeminjaman();

	return (
		<div className="flex flex-col gap-5">
			<HeaderPage>
				<FaCircleUser className="size-8" />
				<h1 className="text-lg">{session?.user?.name}</h1>
			</HeaderPage>
			<section className="container flex flex-row gap-2 w-full flex-wrap md:flex-nowrap">
				<div className="bg-neutral cardInfo">
					<h1 className="">Peminjaman Berlangsung</h1>
					<p className="">{Total.Dipinjam}</p>
				</div>
				<div className="bg-success cardInfo">
					<h1 className="">Peminjaman Selesai</h1>
					<p className="">{Total.Selesai}</p>
				</div>
				<div className="bg-secondary cardInfo">
					<h1 className="">Total Peminjaman</h1>
					<p className="">{Total.Total}</p>
				</div>
			</section>
			<section className="container">
				<div className="bg-primary text-white rounded-md px-2 py-1 mb-5">
					<Link href="/perangkat">
						<span className="flex flex-row items-center text-xl font-bold">
							<h1>Perangkat TI</h1>
							<MdKeyboardArrowRight className="ml-2 size-8" />
						</span>
					</Link>
				</div>
				<div className="container grid grid-cols-2 gap-5 md:grid-cols-5">
					<ListPerangkat limit={5} query="" currentPage={1} />
				</div>
			</section>
			<section className="container">
				<div className="bg-primary text-white rounded-md px-2 py-1 mb-5">
					<Link href="/perangkat">
						<span className="flex flex-row items-center text-xl font-bold">
							<h1>Ruangan</h1>
							<MdKeyboardArrowRight className="ml-2 size-8" />
						</span>
					</Link>
				</div>
				<div className="container grid grid-cols-2 gap-5 md:grid-cols-5">
					<ListRuangan limit={5} query="" currentPage={1} />
				</div>
			</section>
		</div>
	);
};

export default Dashboard;
