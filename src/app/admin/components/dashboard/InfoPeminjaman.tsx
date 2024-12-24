import { getAllPeminjaman } from "@/lib/_actions/users";
import React from "react";

const InfoPeminjaman = async () => {
	const Total = await getAllPeminjaman();
	return (
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
	);
};

export default InfoPeminjaman;
