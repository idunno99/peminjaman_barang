import { auth } from "@/auth";
import { formatDate, getPeminjamanUser } from "@/lib/_data/peminjaman";
import { redirect } from "next/navigation";
import React from "react";
import { Perpanjang, Selesai } from "../Button";
import { numberItems } from "@/lib/utils";

const ListPeminjaman = async ({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/");

	const allPeminjaman = await getPeminjamanUser(query, currentPage);

	if (!allPeminjaman?.length)
		return <h1 className="font-semibold text-primary">Belum Ada Peminjaman</h1>;

	return (
		<table className="table text-center rounded-none table-pin-rows table-pin-cols text-primary ">
			<thead>
				<tr className="text-white *:bg-primary">
					<th>No</th>
					<td>Nama</td>
					<td>Jenis</td>
					<td>Tujuan</td>
					<td>Jumlah</td>
					<td>Tgl Pinjam</td>
					<td>Tgl Selesai</td>
					<td>Status</td>
					<td>Aksi</td>
				</tr>
			</thead>
			<tbody className="font-semibold">
				{allPeminjaman.map((allPeminjaman, index) => (
					<tr key={index} className="hover">
						<th>{numberItems(index, currentPage)}</th>
						<td>{allPeminjaman.nama}</td>
						<td>{allPeminjaman.tipe}</td>
						<td>{allPeminjaman.tujuan}</td>
						<td>{allPeminjaman.jumlah}</td>
						<td>{formatDate(allPeminjaman.tglMulai)}</td>
						<td>{formatDate(allPeminjaman.tglSelesai)}</td>
						<td>
							{(allPeminjaman.status === "Selesai" && (
								<p className="badge badge-lg badge-success text-white p-2">Selesai</p>
							)) ||
								(allPeminjaman.status === "Diproses" && (
									<p className="badge badge-lg badge-neutral text-white p-2">Diproses</p>
								)) ||
								(allPeminjaman.status === "Ditolak" && (
									<p className="badge badge-lg badge-error text-white p-2">Ditolak</p>
								)) ||
								(allPeminjaman.status === "Dipinjam" && (
									<p className="badge badge-lg badge-info text-white p-2">Dipinjam</p>
								))}
						</td>
						<td className="flex flex-wrap items-center justify-center gap-2">
							{allPeminjaman.status === "Dipinjam" ? (
								<>
									<Selesai
										idPeminjaman={allPeminjaman.id}
										label={allPeminjaman.tipe}
									/>
									<Perpanjang
										idPeminjaman={allPeminjaman.id}
										label={allPeminjaman.tipe}
									/>
								</>
							) : (
								<p className="">-</p>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ListPeminjaman;
