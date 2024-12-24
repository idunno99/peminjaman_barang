"use client";

import type { Perangkat } from "@prisma/client";
import Image from "next/image";
import { useFormState } from "react-dom";
import { ButtonCancel, ButtonSave } from "../Button";
import { useRouter } from "next/navigation";
import { addPinjamPerangkat } from "@/lib/_actions/perangkat";

const FormPinjamPerangkat = ({ data }: { data: Perangkat }) => {
	const [state, formAction] = useFormState(
		addPinjamPerangkat.bind(null, data.id),
		null
	);
	const router = useRouter();

	function handleChange() {
		router.push("/perangkat");
	}

	return (
		<>
			<figure className="relative aspect-square lg:w-2/5">
				<Image
					src={data.img_url}
					alt="Perangkat"
					fill
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-contain object-center w-full h-full p-5 bg-white aspect-square"
				/>
			</figure>
			<div className="justify-center card-body lg:w-3/5">
				<h2 className="text-2xl font-bold card-title">{data.nama}</h2>
				<h3 className="font-bold">Stok : {data.tersedia}</h3>
				<h3 className="font-bold">Deskripsi :</h3>
				<p className="overflow-y-auto text-sm lg:text-base line-clamp-5 lg:line-clamp-none text-ellipsis">
					{data.description}
				</p>
				<form action={formAction}>
					<div className="form-control">
						<label htmlFor="tglpinjam" className="font-semibold label">
							Tanggal Peminjaman :
						</label>
						<input
							type="date"
							id="tglpinjam"
							name="tglpinjam"
							className="text-black mb-2 input input-bordered input-sm"
							placeholder="Tanggal Peminjaman"
						/>
						<div aria-live="polite" aria-atomic="true">
							<p className="bg-white text-error font-semibold rounded-md px-2">
								{state?.error?.tglpinjam}
							</p>
						</div>
					</div>
					<div className="form-control">
						<label htmlFor="tglselesai" className="font-semibold label">
							Tanggal Selesai :
						</label>
						<input
							type="date"
							id="tglselesai"
							name="tglselesai"
							className="text-black mb-2 input input-bordered input-sm"
							placeholder="Tanggal Selesai Peminjaman"
						/>
						<div aria-live="polite" aria-atomic="true">
							<p className="bg-white text-error font-semibold rounded-md px-2">
								{state?.error?.tglselesai}
							</p>
						</div>
					</div>
					<div className="form-control">
						<label htmlFor="jumlah" className="font-semibold label">
							Jumlah Perangkat yang dipinjam:
						</label>
						<input
							type="number"
							id="jumlah"
							name="jumlah"
							className="text-black mb-2 input input-bordered input-sm"
							placeholder="0"
							min={1}
						/>
						<div aria-live="polite" aria-atomic="true">
							<p className="bg-white text-error font-semibold rounded-md px-2">
								{state?.error?.jumlah}
							</p>
						</div>
					</div>
					<div className="form-control">
						<label htmlFor="keterangan" className="font-semibold label">
							Keterangan :
						</label>
						<input
							type="text"
							id="keterangan"
							name="keterangan"
							className="text-black mb-2 input input-bordered input-sm"
							placeholder="Kebutuhan Peminjaman"
						/>
						<div aria-live="polite" aria-atomic="true">
							<p className="bg-white text-error font-semibold rounded-md px-2">
								{state?.error?.keterangan}
							</p>
						</div>
					</div>
					<input
						type="hidden"
						name="stok"
						value={data.tersedia}
						className="hidden"
					/>
					<div className="justify-end mt-5 card-actions">
						<ButtonSave label="add" notTersedia={!data.status} />
						<ButtonCancel onClick={handleChange} />
					</div>
				</form>
			</div>
		</>
	);
};

export default FormPinjamPerangkat;
