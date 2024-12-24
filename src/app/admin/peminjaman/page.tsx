import Search from "@/components/Search";
import ListPeminjaman from "../components/peminjaman/ListPeminjaman";
import Pagenation from "@/components/Pagenation";
import { getAllPeminjamanPages } from "@/lib/_data/peminjaman";
import { ErrorAlert } from "@/components/Alert";

const PagePeminjaman = async ({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;

	const totalPages = await getAllPeminjamanPages(query);

	return (
		<div className="flex flex-col gap-5">
			<div className="lg:w-1/4 ">
				<Search />
			</div>
			{totalPages === 0 ? (
				<div className="w-1/3">
					<ErrorAlert>Perangkat Tidak Ditemukan</ErrorAlert>
				</div>
			) : null}
			<div className="overflow-x-auto">
				<ListPeminjaman query={query} currentPage={currentPage} />
			</div>
			<div className="place-self-center">
				<Pagenation totalPages={totalPages} />
			</div>
		</div>
	);
};

export default PagePeminjaman;
