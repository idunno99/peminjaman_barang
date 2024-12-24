"use client";

import {
	accPinjamPerangkat,
	accPinjamRuangan,
	decPinjamPerangkat,
	decPinjamRuangan,
} from "@/lib/_actions/peminjaman";
import { deletePerangkat } from "@/lib/_actions/perangkat";
import { deleteRuangan } from "@/lib/_actions/ruangan";
import { deleteUser } from "@/lib/_actions/users";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useFormStatus } from "react-dom";
import { FaCheck, FaX } from "react-icons/fa6";

const ButtonDelete = ({ onClick }: { onClick?: () => void }) => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="text-white btn btn-sm btn-error w-full"
			onClick={onClick}>
			{pending ? "Iya..." : "Iya"}
		</button>
	);
};

export const DeleteUser = ({
	id,
	modal,
}: {
	id: string;
	modal: () => void;
}) => {
	const deleteUserbyId = deleteUser.bind(null, id);

	return (
		<form action={deleteUserbyId}>
			<ButtonDelete onClick={modal} />
		</form>
	);
};

export const DeletePerangkat = ({
	id,
	modal,
}: {
	id: string;
	modal: () => void;
}) => {
	const deletePerangkatbyId = deletePerangkat.bind(null, id);
	return (
		<form action={deletePerangkatbyId}>
			<ButtonDelete onClick={modal} />
		</form>
	);
};

export const DeleteRuangan = ({
	id,
	modal,
}: {
	id: string;
	modal: () => void;
}) => {
	const deleteRuanganbyId = deleteRuangan.bind(null, id);
	return (
		<form action={deleteRuanganbyId}>
			<ButtonDelete onClick={modal} />
		</form>
	);
};

export const ButtonSave = ({ label }: { label: string }) => {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			className={clsx("text-white btn btn-info", {
				"opacity-50 cursor-progress": pending,
			})}
			disabled={pending}>
			{label === "add" ? (
				<>{pending ? "Tambah..." : "Tambah"}</>
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

export const ButtonEdit = ({ id, label }: { id: string; label: string }) => {
	return (
		<Link href={`/admin/${label}/edit/${id}`}>
			<button className="text-white btn btn-sm btn-info w-full">Edit</button>
		</Link>
	);
};

export const ButtonAdd = ({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) => {
	return (
		<Link href={`/admin/${label}/add`}>
			<button type="button" className="mr-2 text-white btn btn-neutral btn-sm">
				{children}
			</button>
		</Link>
	);
};

export const ButtonLogin = () => {
	const { pending } = useFormStatus();
	return (
		<button type="submit" disabled={pending} className="w-full btn btn-neutral">
			{pending ? "Login..." : "Login"}
		</button>
	);
};

export const ButtonAcc = ({
	idPeminjaman,
	label,
}: {
	idPeminjaman: string;
	label: string;
}) => {
	const { pending } = useFormStatus();
	const accPeminjamanPerangkat = accPinjamPerangkat.bind(null, idPeminjaman);
	const accPeminjamanRuangan = accPinjamRuangan.bind(null, idPeminjaman);
	return (
		<>
			{(label === "perangkat" && (
				<form action={accPeminjamanPerangkat}>
					<button type="submit" className="btn btn-sm btn-info text-white">
						<span className="hidden lg:block">
							{pending ? "..." : <FaCheck />}
						</span>
					</button>
				</form>
			)) ||
				(label === "ruangan" && (
					<form action={accPeminjamanRuangan}>
						<button type="submit" className="btn btn-sm btn-info text-white">
							<span className="hidden lg:block">
								{pending ? "..." : <FaCheck />}
							</span>
						</button>
					</form>
				))}
		</>
	);
};

export const ButtonDecl = ({
	idPeminjaman,
	label,
}: {
	idPeminjaman: string;
	label: string;
}) => {
	const { pending } = useFormStatus();
	const decPeminjamanPerangkat = decPinjamPerangkat.bind(null, idPeminjaman);
	const decPeminjamanRuangan = decPinjamRuangan.bind(null, idPeminjaman);
	return (
		<>
			{(label === "perangkat" && (
				<form action={decPeminjamanPerangkat}>
					<button type="submit" className="btn btn-sm btn-error text-white">
						<span className="hidden lg:block">{pending ? "..." : <FaX />}</span>
					</button>
				</form>
			)) ||
				(label === "ruangan" && (
					<form action={decPeminjamanRuangan}>
						<button type="submit" className="btn btn-sm btn-error text-white">
							<span className="hidden lg:block">
								{pending ? "..." : <FaX />}
							</span>
						</button>
					</form>
				))}
		</>
	);
};

export const SeeAll = () => {
	return (
		<Link href={`/admin/peminjaman`}>
			<button
				type="button"
				className="w-full text-white btn btn-primary btn-sm">
				Lihat Semua
			</button>
		</Link>
	);
};
