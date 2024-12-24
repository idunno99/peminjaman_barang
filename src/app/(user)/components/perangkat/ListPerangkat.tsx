import { getPerangkat } from "@/lib/_data/perangkat";
import CardUser from "../CardUser";

const ListPerangkat = async ({
	limit,
	query,
	currentPage,
}: {
	limit?: number;
	query: string;
	currentPage: number;
}) => {

	const allPerangkat = await getPerangkat(query, currentPage);

	const displayedPerangkat = limit
		? allPerangkat.slice(0, limit)
		: allPerangkat;

	return (
		<>
			{displayedPerangkat.map((perangkat, index) => (
				<CardUser
					key={index}
					label="perangkat"
					id={perangkat.id}
					img={perangkat.img_url}
					title={perangkat.nama}
					jumlah={perangkat.tersedia}
					status={perangkat.status}>
					{perangkat.description}
				</CardUser>
			))}
		</>
	);
};

export default ListPerangkat;
