"use client";

import {
	perpanjangPinjamanPerangkat,
	updatePinjamPerangkat,
} from "@/lib/_actions/perangkat";
import {
	perpanjangPinjamanRuangan,
	updatePinjamRuangan,
} from "@/lib/_actions/ruangan";
import clsx from "clsx";
import Link from "next/link";
import { useFormStatus } from "react-dom";

export const ButtonPinjam = ({
	id,
	label,
	notTersedia,
}: {
	id: string;
	label: string;
	notTersedia?: boolean;
}) => {
	return (
		<button
			className={`text-white btn btn-sm btn-neutral w-full ${
				notTersedia ? "cursor-not-allowed" : ""
			}`}
			disabled={notTersedia}>
			<Link href={notTersedia ? `` : `/${label}/${id}`}>Pinjam</Link>
		</button>
	);
};

export const ButtonSave = ({
	label,
	notTersedia,
}: {
	label: string;
	notTersedia?: boolean;
}) => {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			className={clsx("text-white btn btn-neutral", {
				"opacity-50 cursor-progress": pending,
				"cursor-not-allowed": notTersedia,
			})}
			disabled={notTersedia || pending}>
			{label === "add" ? (
				<>{pending ? "Pinjam..." : "Pinjam"}</>
			) : (
				<>{pending ? "Update..." : "Update"}</>
			)}
		</button>
	);
};

export const ButtonCancel = ({ onClick }: { onClick: () => void }) => {
	return (
		<button
			type="button"
			className="btn btn-error text-white btn-md"
			onClick={onClick}>
			Batal
		</button>
	);
};

const ButtonSelesai = () => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="btn btn-info btn-sm text-white">
			{pending ? "Selesai..." : "Selesai"}
		</button>
	);
};

export const ButtonEdit = () => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="btn btn-neutral btn-sm text-white">
			{pending ? "Perpanjang..." : "Perpanjang"}
		</button>
	);
};

export const Selesai = ({
	idPeminjaman,
	label,
}: {
	idPeminjaman: string;
	label: string;
}) => {
	const finishPerangkat = updatePinjamPerangkat.bind(null, idPeminjaman);
	const finishRuangan = updatePinjamRuangan.bind(null, idPeminjaman);
	return (
		<>
			{(label === "perangkat" && (
				<form action={finishPerangkat}>
					<ButtonSelesai />
				</form>
			)) ||
				(label === "ruangan" && (
					<form action={finishRuangan}>
						<ButtonSelesai />
					</form>
				))}
		</>
	);
};

export const Perpanjang = ({
	idPeminjaman,
	label,
}: {
	idPeminjaman: string;
	label: string;
}) => {
	const perpanjangPerangkat = perpanjangPinjamanPerangkat.bind(
		null,
		idPeminjaman
	);
	const perpanjangRuangan = perpanjangPinjamanRuangan.bind(null, idPeminjaman);
	return (
		<>
			{(label === "perangkat" && (
				<form action={perpanjangPerangkat}>
					<ButtonEdit />
				</form>
			)) ||
				(label === "ruangan" && (
					<form action={perpanjangRuangan}>
						<ButtonEdit />
					</form>
				))}
		</>
	);
};
