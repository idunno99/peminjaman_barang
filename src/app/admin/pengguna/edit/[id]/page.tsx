import FormEditUser from "@/app/admin/components/pengguna/FormEditUser";
import { getUserById } from "@/lib/_data/users";
import { notFound } from "next/navigation";
import React from "react";

type PropsEditUser = { params: { id: string } };
const EditPage = async (props: PropsEditUser) => {
	const user = await getUserById(props.params.id);
	if (!user) return notFound();

	return (
		<div className="text-sm modal-box bg-primary m-auto">
			<FormEditUser data={user} />
		</div>
	);
};

export default EditPage;
