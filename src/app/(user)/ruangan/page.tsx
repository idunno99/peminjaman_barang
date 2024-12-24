import { getRuanganPages } from "@/lib/_data/ruangan";
import ListRuangan from "../components/ruangan/ListRuangan";
import Search from "@/components/Search";
import { ErrorAlert } from "@/components/Alert";
import Pagenation from "@/components/Pagenation";

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
	const totalPages = await getRuanganPages(query);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-row flex-wrap justify-between gap-2">
				<Search />
			</div>
			{totalPages === 0 ? (
				<div className="w-1/3">
					<ErrorAlert>Ruangan Tidak Ditemukan</ErrorAlert>
				</div>
			) : null}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
				<ListRuangan query={query} currentPage={currentPage} />
			</div>
			<div className="place-self-center">
				<Pagenation totalPages={totalPages} />
			</div>
		</div>
	);
};

export default PageRuangan;
