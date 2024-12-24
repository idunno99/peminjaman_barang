import React from "react";
import { ButtonAdd } from "../components/Button";
import { getPerangkat, getPerangkatPages } from "@/lib/_data/perangkat";
import Card from "../components/Card";
import Search from "@/components/Search";
import Pagenation from "@/components/Pagenation";
import { ErrorAlert } from "@/components/Alert";

const PagePerangkat = async ({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	
	const perangkat = await getPerangkat(query, currentPage);
	const totalPages = await getPerangkatPages(query);
	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-row flex-wrap justify-between gap-2">
				<Search />
				<ButtonAdd label="perangkat">Tambah Perangkat</ButtonAdd>
			</div>
			{totalPages === 0 ? (
				<div className="w-1/3">
					<ErrorAlert>Perangkat Tidak Ditemukan</ErrorAlert>
				</div>
			) : null}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
				{perangkat.map((perangkat, index) => (
					<Card
						key={index}
						label="perangkat"
						id={perangkat.id}
						img={perangkat.img_url}
						title={perangkat.nama}
						tersedia={perangkat.tersedia}
						dipinjam={perangkat.dipinjam}
						jumlah={perangkat.jumlah}
					/>
				))}
			</div>
			<div className="place-self-center">
				<Pagenation totalPages={totalPages} />
			</div>
		</div>
	);
};

export default PagePerangkat;
