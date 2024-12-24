import { formatDate, getAllPeminjamanUser } from "@/lib/_data/peminjaman";
import { numberItems } from "@/lib/utils";
import { ButtonAcc, ButtonDecl } from "../Button";

const ListPeminjaman = async ({
	limit,
	query,
	currentPage,
}: {
	limit?: number;
	query: string;
	currentPage: number;
}) => {
	const allPeminjaman = await getAllPeminjamanUser(query, currentPage);

	const displayedPeminjaman = limit
		? allPeminjaman.slice(0, limit)
		: allPeminjaman;

	return (
		<>
			<table className="table text-center rounded-none text-primary">
				<thead className="w-full text-white bg-primary">
					<tr>
						<th>No</th>
						<th>Nama Pegawai</th>
						<th>Nama Perangkat/Ruangan</th>
						<th>Jenis</th>
						<th>Tujuan</th>
						<th>Jumlah</th>
						<th>Tgl Pinjam</th>
						<th>Tgl Selesai</th>
						<th>Status</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{displayedPeminjaman.map((allPeminjaman, index) => (
						<tr key={index} className="hover">
							<td>{numberItems(index, currentPage)}</td>
							<td>{allPeminjaman.pegawai}</td>
							<td>{allPeminjaman.nama}</td>
							<td>{allPeminjaman.tipe}</td>
							<td>{allPeminjaman.tujuan}</td>
							<td>{allPeminjaman.jumlah}</td>
							<td>{formatDate(allPeminjaman.tglMulai)}</td>
							<td>{formatDate(allPeminjaman.tglSelesai)}</td>
							<td className="items-center">
								{(allPeminjaman.status === "Selesai" && (
									<p className="badge badge-lg badge-success text-white p-2">
										Selesai
									</p>
								)) ||
									(allPeminjaman.status === "Diproses" && (
										<p className="badge badge-lg badge-neutral text-white p-2">
											Diproses
										</p>
									)) ||
									(allPeminjaman.status === "Ditolak" && (
										<p className="badge badge-lg badge-error text-white p-2">
											Ditolak
										</p>
									)) ||
									(allPeminjaman.status === "Dipinjam" && (
										<p className="badge badge-lg badge-info text-white p-2">Dipinjam</p>
									))}
							</td>
							<td>
								{allPeminjaman.status === "Diproses" ? (
									<div className="flex flex-row items-center justify-center gap-2">
										<ButtonAcc
											idPeminjaman={allPeminjaman.id}
											label={allPeminjaman.tipe}
										/>
										<ButtonDecl
											idPeminjaman={allPeminjaman.id}
											label={allPeminjaman.tipe}
										/>
									</div>
								) : (
									<p>-</p>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ListPeminjaman;
