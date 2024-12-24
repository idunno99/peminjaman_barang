import { getValuePerangkat } from "@/lib/_data/perangkat";
import React from "react";
import { CardInfoDipinjam, CardInfoTersedia, CardInfoTotal } from "../CardInfo";
import { MdDevices } from "react-icons/md";

const InfoPerangkat = async () => {
	const valuePerangkat = await getValuePerangkat();
	return (
		<div className="flex flex-row gap-5 w-full justify-between">
			<div className="flex flex-col gap-5">
				<CardInfoTersedia
					label="Perangkat"
					value={valuePerangkat._sum.tersedia}>
					<MdDevices className="size-20" />
				</CardInfoTersedia>
				<CardInfoDipinjam
					label="Perangkat Dipinjam"
					value={valuePerangkat._sum.dipinjam}>
					<MdDevices className="size-20" />
				</CardInfoDipinjam>
			</div>
			<CardInfoTotal label="Perangkat" value={valuePerangkat._sum.jumlah}>
				<MdDevices className="size-20" />
			</CardInfoTotal>
		</div>
	);
};

export default InfoPerangkat;
