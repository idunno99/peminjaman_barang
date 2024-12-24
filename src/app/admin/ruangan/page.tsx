import React from "react";
import { ButtonAdd } from "../components/Button";
import { getRuangan, getRuanganPages } from "@/lib/_data/ruangan";
import Card from "../components/Card";
import Search from "@/components/Search";
import Pagenation from "@/components/Pagenation";
import { ErrorAlert } from "@/components/Alert";

const PageRuangan = async ({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;

	const ruangan = await getRuangan(query, currentPage);

	const totalPages = await getRuanganPages(query);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-row flex-wrap justify-between gap-2">
				<Search />
				<ButtonAdd label="ruangan">Tambah Ruangan</ButtonAdd>
			</div>
			{totalPages === 0 ? (
				<div className="w-1/3">
					<ErrorAlert>Ruangan Tidak Ditemukan</ErrorAlert>
				</div>
			) : null}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
				{ruangan.map((ruangan, index) => (
					<Card
						key={index}
						label="ruangan"
						id={ruangan.id}
						img={ruangan.img_url}
						title={ruangan.name}
						lokasi={ruangan.lokasi}
						status={ruangan.tersedia}>
						{ruangan.description}
					</Card>
				))}
			</div>
			<div className="place-self-center">
				<Pagenation totalPages={totalPages} />
			</div>
		</div>
	);
};

export default PageRuangan;
