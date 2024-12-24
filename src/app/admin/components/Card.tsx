import Image from "next/image";
import React from "react";
import { ButtonEdit } from "./Button";
import DeleteModal from "./DeleteModal";

type CardProps = {
	label: string;
	img: string;
	title: string;
	tersedia?: number;
	dipinjam?: number;
	jumlah?: number;
	lokasi?: string;
	status?: boolean;
	children?: React.ReactNode;
	id: string;
};
const Card = ({
	label,
	img,
	title,
	tersedia,
	dipinjam,
	jumlah,
	lokasi,
	status,
	children,
	id,
}: CardProps) => {
	return (
		<div className="shadow-xl card card-compact bg-primary">
			<figure className="relative aspect-square">
				<Image
					src={img}
					alt="Gambar Produk"
					fill
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-contain object-center w-full p-5 bg-white aspect-square"
				/>
			</figure>
			{label === "ruangan" ? (
				<CardRuangan title={title} lokasi={lokasi} status={status} id={id}>
					{children}
				</CardRuangan>
			) : (
				<CardPerangkat
					title={title}
					tersedia={tersedia}
					dipinjam={dipinjam}
					jumlah={jumlah}
					id={id}
				/>
			)}
		</div>
	);
};

const CardRuangan = ({
	title,
	lokasi,
	status,
	children,
	id,
}: {
	title: string;
	lokasi?: string;
	status?: boolean;
	children: React.ReactNode;
	id: string;
}) => {
	return (
		<div className="card-body gap-3">
			<h2 className="card-title">{title}</h2>
			<div className="flex flex-row justify-start items-start gap-2 flex-wrap">
				<div>
					<h2 className="text-sm text-white card-title badge badge-info">
						{lokasi}
					</h2>
				</div>
				<div>
					<p className="text-sm font-semibold card-title badge text-primary">
						{status ? "Tersedia" : "Dipinjam"}
					</p>
				</div>
			</div>
			<p className="text-ellipsis line-clamp-2">{children}</p>
			<div className="justify-start card-actions">
				<ButtonEdit id={id} label="ruangan" />
				<DeleteModal id={id} label="ruangan">Ruangan akan di hapus?</DeleteModal>
			</div>
		</div>
	);
};

const CardPerangkat = ({
	title,
	tersedia,
	dipinjam,
	jumlah,
	id,
}: {
	title: string;
	tersedia?: number;
	dipinjam?: number;
	jumlah?: number;
	id: string;
}) => {
	return (
		<div className="gap-3 card-body">
			<h2 className="text-base card-title">{title}</h2>
			<div className="overflow-x-auto">
				<table className="table text-center text-white rounded-none table-xs ">
					<thead className="text-white">
						<tr>
							<th>Tersedia</th>
							<th>Dipinjam</th>
							<th>Jumlah</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{tersedia}</td>
							<td>{dipinjam}</td>
							<td>{jumlah}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="justify-start card-actions">
				<ButtonEdit id={id} label="perangkat" />
				<DeleteModal id={id} label="perangkat">Perangkat akan di hapus?</DeleteModal>
			</div>
		</div>
	);
};

export default Card;
