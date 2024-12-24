"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";
import { ButtonCancel, ButtonSave } from "../Button";
import { addRuangan } from "@/lib/_actions/ruangan";

const FormAddRuangan = () => {
	const [state, formAction] = useFormState(addRuangan, null);
	const [preview, setPreview] = useState("");
	const router = useRouter();

	function handleChange() {
		router.push("/admin/ruangan");
	}

	const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files?.[0];

		if (image) {
			setPreview(URL.createObjectURL(image));
		} else {
			setPreview("");
		}
	};

	return (
		<>
			<figure className="lg:w-2/5">
				{preview ? (
					<Image
						src={preview}
						alt="Album"
						width={500}
						height={500}
						className="object-contain object-center w-full h-full p-5 bg-white aspect-square"
					/>
				) : null}
			</figure>
			<div className="justify-center card-body lg:w-3/5">
				<h3 className="text-lg font-bold">Tambah Ruangan</h3>
				<form action={formAction}>
					<div className="form-control">
						<label htmlFor="title" className="font-semibold label">
							Nama Ruangan
						</label>
						<input
							type="text"
							name="title"
							id="title"
							className="w-full text-black mb-2 input input-bordered input-sm"
							placeholder="Nama Perangkat"
						/>
						<div aria-live="polite" aria-atomic="true">
							<p className="bg-white text-error font-semibold rounded-md px-2">
								{state?.error?.title}
							</p>
						</div>
					</div>
					<div className="form-control">
						<label htmlFor="lokasi" className="font-semibold label">
							Lokasi
						</label>
						<input
							type="text"
							id="lokasi"
							name="lokasi"
							className="w-full text-black mb-2 input input-bordered input-sm"
							placeholder="Lokasi ruangan"
						/>
						<div aria-live="polite" aria-atomic="true">
							<p className="bg-white text-error font-semibold rounded-md px-2">
								{state?.error?.lokasi}
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
							className="leading-normal text-black mb-2 textarea textarea-bordered textarea-sm"></textarea>
					</div>
					<div className="form-control">
						<label htmlFor="image" className="font-semibold label">
							Gambar Ruangan
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
						<ButtonSave label="add" />
						<ButtonCancel onClick={handleChange} />
					</div>
				</form>
			</div>
		</>
	);
};

export default FormAddRuangan;
