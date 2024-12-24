"use client";

import { editUser } from "@/lib/_actions/users";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { ButtonCancel, ButtonSave } from "../Button";

const FormEditUser = ({ data }: { data: User }) => {
	const [state, formAction] = useFormState(editUser.bind(null, data.id), null);
	const router = useRouter();

	function handleChange() {
		router.push("/admin/pengguna");
	}

	return (
		<div className="bg-primary w-full">
			<h3 className="text-lg font-bold">Tambah Pengguna Baru</h3>
			<form action={formAction}>
				<div className="form-control">
					<label htmlFor="fullname" className="font-semibold label">
						Nama Pegawai
					</label>
					<input
						type="text"
						name="fullname"
						id="fullname"
						className="w-full text-black input input-bordered input-sm"
						placeholder="Nama Lengkap"
						defaultValue={data.name}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="email" className="font-semibold label">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="w-full text-black input input-bordered input-sm"
						placeholder="Email"
						defaultValue={data.email}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="username" className="font-semibold label">
						Username
					</label>
					<input
						type="text"
						name="username"
						id="username"
						className="w-full text-black input input-bordered input-sm"
						placeholder="Username"
						defaultValue={data.username}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="password" className="font-semibold label">
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						className="flex items-center gap-2 text-black grow input input-sm input-bordered "
						placeholder="Password"
					/>
					<div id="password-error" aria-live="polite" aria-atomic="true">
						<p className="mt-2 text-sm font-bold text-error">
							{state?.Error?.password}
						</p>
					</div>
				</div>
				<div className="form-control">
					<label htmlFor="role" className="font-semibold label">
						Role
					</label>
					<select
						name="role"
						id="role"
						className="text-black select select-bordered select-sm "
						defaultValue={data.role}>
						<option value="admin">Admin</option>
						<option value="user">User</option>
					</select>
				</div>
				<div className="modal-action">
					<ButtonSave label="update" />
					<ButtonCancel onClick={handleChange} />
				</div>
			</form>
		</div>
	);
};

export default FormEditUser;
