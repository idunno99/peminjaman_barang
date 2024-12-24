import FormEdit from "@/app/admin/components/perangkat/FormEdit";
import { getPerangkatById } from "@/lib/_data/perangkat";
import { notFound } from "next/navigation";
import React from "react";

type PropsEditPerangkat = { params: { id: string } };
const EditPagePerangkat = async (props: PropsEditPerangkat) => {
	const perangkat = await getPerangkatById(props.params.id);
	if (!perangkat) return notFound();

	return (
		<div className="shadow-xl card card-compact bg-primary lg:card-side ">
			<FormEdit data={perangkat} />
		</div>
	);
};

export default EditPagePerangkat;
