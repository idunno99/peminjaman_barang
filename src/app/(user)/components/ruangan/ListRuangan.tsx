import { getRuangan } from "@/lib/_data/ruangan";
import CardUser from "../CardUser";

const ListRuangan = async ({
	limit,
	query,
	currentPage,
}: {
	limit?: number;
	query: string;
	currentPage: number;
}) => {
	const allRuangan = await getRuangan(query, currentPage);

	const displayedRuangan = limit ? allRuangan.slice(0, limit) : allRuangan;

	return (
		<>
			{displayedRuangan.map((ruangan, index) => (
				<CardUser
					key={index}
					label="ruangan"
					id={ruangan.id}
					img={ruangan.img_url}
					title={ruangan.name}
					status={ruangan.tersedia}>
					{ruangan.description}
				</CardUser>
			))}
		</>
	);
};

export default ListRuangan;
