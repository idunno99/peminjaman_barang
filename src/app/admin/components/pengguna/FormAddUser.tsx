"use client";

import { addUser } from "@/lib/_actions/users";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { ButtonCancel, ButtonSave } from "../Button";
import { ErrorAlert } from "@/components/Alert";

const FormAddUser = () => {
	const [state, formAction] = useFormState(addUser, null);
	const router = useRouter();

	function handleChange() {
		router.push("/admin/pengguna");
	}

	return (
		<div className="bg-primary w-full">
			<h3 className="text-lg font-bold mb-1">Tambah Pengguna Baru</h3>
			{state?.message ? <ErrorAlert>{state?.message}</ErrorAlert> : null}
			<form action={formAction}>
				<div className="form-control">
					<label htmlFor="fullname" className="font-semibold label">
						Nama Pegawai
					</label>
					<input
						type="text"
						name="fullname"
						id="fullname"
						className="w-full text-black input input-bordered "
						placeholder="Nama Lengkap"
					/>
					<p className="mt-2 text-sm bg-white rounded-sm px-2 font-bold text-error">
						{state?.Error?.fullname}
					</p>
				</div>
				<div className="form-control">
					<label htmlFor="email" className="font-semibold label">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="w-full text-black input input-bordered "
						placeholder="Email"
					/>
					<p className="mt-2 text-sm bg-white rounded-sm px-2 font-bold text-error">
						{state?.Error?.email}
					</p>
				</div>
				<div className="form-control">
					<label htmlFor="username" className="font-semibold label">
						Username
					</label>
					<input
						type="text"
						name="username"
						id="username"
						className="w-full text-black input input-bordered "
						placeholder="Username"
					/>
					<p className="mt-2 text-sm bg-white rounded-sm px-2 font-bold text-error">
						{state?.Error?.username}
					</p>
				</div>
				<div className="form-control">
					<label htmlFor="password" className="font-semibold label">
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						className="flex items-center gap-2 text-black grow input  input-bordered "
						placeholder="Password"
					/>
					<div id="password-error" aria-live="polite" aria-atomic="true">
						<p className="mt-2 text-sm bg-white rounded-sm px-2 font-bold text-error">
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
						className="text-black select select-bordered">
						<option value="admin">Admin</option>
						<option value="user">User</option>
					</select>
				</div>
				<div className="modal-action">
					<ButtonSave label="add" />
					<ButtonCancel onClick={handleChange} />
				</div>
			</form>
		</div>
	);
};

export default FormAddUser;
