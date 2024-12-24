import { getValueRuangan } from "@/lib/_data/ruangan";
import React from "react";
import { CardInfoDipinjam, CardInfoTersedia, CardInfoTotal } from "../CardInfo";
import { BsFillHousesFill } from "react-icons/bs";

const InfoRuangan = async () => {
	const value = await getValueRuangan();
	return (
		<div className="flex flex-row gap-5 w-full justify-between">
			<div className="flex flex-col gap-5">
				<CardInfoTersedia label="Ruangan" value={value.ada}>
					<BsFillHousesFill className="size-20" />
				</CardInfoTersedia>
				<CardInfoDipinjam label="Ruangan Dipinjam" value={value.dipinjam}>
					<BsFillHousesFill className="size-20" />
				</CardInfoDipinjam>
			</div>
			<CardInfoTotal label="Ruangan" value={value.total}>
				<BsFillHousesFill className="size-20" />
			</CardInfoTotal>
		</div>
	);
};

export default InfoRuangan;
