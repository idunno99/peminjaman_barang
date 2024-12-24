"use client";

import { useState } from "react";
import { DeletePerangkat, DeleteRuangan, DeleteUser } from "./Button";

const DeleteModal = ({
	id,
	label,
	children,
}: {
	id: string;
	label: string;
	children: React.ReactNode;
}) => {
	const [modal, setModal] = useState(false);
	function handleChange() {
		setModal(!modal);
	}

	return (
		<div>
			<button
				className="text-white btn btn-sm btn-error"
				onClick={handleChange}>
				Hapus
			</button>
			<input
				type="checkbox"
				checked={modal}
				onChange={handleChange}
				className="modal-toggle"
				aria-label="open modal"
			/>
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box bg-primary text-white text-sm text-center">
					<h3 className="font-bold text-lg">Peringatan!</h3>
					<p className="py-4">{children}</p>
					<div className="modal-action mt-0 justify-center">
						{(label === "ruangan" && (
							<DeleteRuangan id={id} modal={handleChange} />
						)) ||
							(label === "perangkat" && (
								<DeletePerangkat id={id} modal={handleChange} />
							)) ||
							(label === "user" && <DeleteUser id={id} modal={handleChange} />)}
						<button
							className="btn btn-info btn-sm text-white"
							onClick={handleChange}>
							Tidak
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
