import { getPerangkatById } from "@/lib/_data/perangkat";
import { notFound, redirect } from "next/navigation";
import FormPeminjaman from "../../components/perangkat/FormPinjamPerangkat";
import { auth } from "@/auth";

type PropsEditPerangkat = { params: { id: string } };

const DetailPerangkat = async (props: PropsEditPerangkat) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");
	
	const perangkat = await getPerangkatById(props.params.id);
	if (!perangkat) return notFound();

	return (
		<div className="shadow-xl card card-compact bg-primary lg:card-side">
			<FormPeminjaman data={perangkat} />
		</div>
	);
};

export default DetailPerangkat;
