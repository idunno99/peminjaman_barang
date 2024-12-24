"use client";

import { ButtonLogin } from "@/app/admin/components/Button";
import { ErrorAlert } from "@/components/Alert";
import { LogInCredentials } from "@/lib/_actions/login";
import { useFormState } from "react-dom";
import { FaLock, FaUser } from "react-icons/fa";

const FormLogin = () => {
	const [state, formAction] = useFormState(LogInCredentials, null);
	return (
		<form action={formAction} className="flex flex-col gap-2 mt-4">
			{state?.message ? <ErrorAlert>{state?.message}</ErrorAlert> : null}
			<div className="form-control">
				<label
					htmlFor="username"
					className="flex items-center gap-2 input input-md input-bordered text-primary">
					<FaUser />
					<input
						name="username"
						id="username"
						type="text"
						className="text-black grow"
						placeholder="Username"
					/>
				</label>
				<div aria-live="polite" aria-atomic="true" className="label p-0">
					{state?.error?.username ? (
						<ErrorMassage>{state?.error?.username} </ErrorMassage>
					) : null}
				</div>
			</div>
			<div className="form-control">
				<label
					htmlFor="password"
					className="flex items-center gap-2 input input-md input-bordered text-primary">
					<FaLock />
					<input
						name="password"
						id="password"
						type="password"
						className="text-black grow"
						placeholder="Password"
					/>
				</label>
				<div aria-live="polite" aria-atomic="true" className="label p-0">
					{state?.error?.password ? (
						<ErrorMassage>{state?.error?.password} </ErrorMassage>
					) : null}
				</div>
				<div className="label">
					<span className="label-text-alt">Lupa Pasword ? Hubungi Admin</span>
				</div>
			</div>
			<div className="w-full">
				<ButtonLogin />
			</div>
		</form>
	);
};

const ErrorMassage = ({ children }: { children: React.ReactNode }) => {
	return (
		<div aria-live="polite" aria-atomic="true" className="label">
			<span className="px-2 py-1 rounded-sm label-text-alt bg-error">
				{children}
			</span>
		</div>
	);
};

export default FormLogin;
