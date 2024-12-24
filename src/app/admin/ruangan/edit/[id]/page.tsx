import FormEditRuangan from "@/app/admin/components/ruangan/FormEditRuangan";
import { getRuanganById } from "@/lib/_data/ruangan";
import { notFound } from "next/navigation";
import React from "react";

type PropsEditRuangan = { params: { id: string } };
const EditPageRuangan = async (props: PropsEditRuangan) => {
	const ruangan = await getRuanganById(props.params.id);
	if (!ruangan) return notFound();

	return (
		<div className="shadow-xl card card-compact bg-primary lg:card-side">
			<FormEditRuangan data={ruangan} />
		</div>
	);
};

export default EditPageRuangan;

