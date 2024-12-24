"use client";

import { updatePerangkat } from "@/lib/_actions/perangkat";
import type { Perangkat } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { ButtonCancel, ButtonSave } from "../Button";
import { useRouter } from "next/navigation";

const FormEdit = ({ data }: { data: Perangkat }) => {
	const [state, formAction] = useFormState(
		updatePerangkat.bind(null, data.id),
		null
	);

	const [preview, setPreview] = useState(data.img_url);
	const router = useRouter();

	const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files?.[0];

		if (image) {
			setPreview(URL.createObjectURL(image));
		} else {
			setPreview("");
		}
	};

	function handleChange() {
		router.push("/admin/perangkat");
	}

	return (
		<>
			<figure className="relative aspect-square lg:w-2/5">
				{preview ? (
					<Image
						src={preview}
						alt="Album"
						fill
						priority
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-contain object-center w-full h-full p-5 bg-white aspect-square"
					/>
				) : null}
			</figure>
			<div className="justify-center card-body lg:w-3/5">
				<h3 className="text-lg font-bold">Edit Perangkat</h3>
				<form action={formAction}>
					<div className="form-control">
						<label htmlFor="title" className="font-semibold label">
							Nama Perangkat
						</label>
						<input
							type="text"
							name="title"
							id="title"
							className="w-full text-black mb-2 input input-bordered input-sm"
							placeholder="Nama Perangkat"
							defaultValue={data.nama}
						/>
						<div aria-live="polite" aria-atomic="true">
							<p className="bg-white text-error font-semibold rounded-md px-2">
								{state?.error?.title}
							</p>
						</div>
					</div>
					<div className="form-control">
						<label htmlFor="jumlah" className="font-semibold label">
							Jumlah Stok
						</label>
						<input
							type="number"
							id="jumlah"
							name="jumlah"
							className="w-full text-black mb-2 input input-bordered input-sm"
							placeholder="0"
							min={0}
							defaultValue={data.jumlah}
						/>
						<div aria-live="polite" aria-atomic="true">
							<p className="bg-white text-error font-semibold rounded-md px-2">
								{state?.error?.jumlah}
							</p>
						</div>
					</div>
					<div className="form-control">
						<label htmlFor="deskripsi" className="font-semibold label">
							Deskripsi
						</label>
						<textarea
							id="deskripsi"
							name="deskripsi"
							placeholder="Deskripsi Perangkat"
							className="leading-normal text-black mb-2 textarea textarea-bordered textarea-sm"
							defaultValue={data.description}></textarea>
					</div>
					<div className="form-control">
						<label htmlFor="image" className="font-semibold label">
							Gambar Perangkat
						</label>
						<input
							id="image"
							name="image"
							type="file"
							accept="image/*"
							className="text-black mb-2 file-input file-input-bordered file-input-sm"
							onChange={loadImage}
						/>
						<div aria-live="polite" aria-atomic="true">
							<p className="bg-white text-error font-semibold rounded-md px-2">
								{state?.error?.image}
							</p>
						</div>
					</div>
					<div className="justify-end mt-5 card-actions">
						<ButtonSave label="update" />
						<ButtonCancel onClick={handleChange} />
					</div>
				</form>
			</div>
		</>
	);
};

export default FormEdit;
