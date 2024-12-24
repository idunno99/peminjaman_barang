import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import FormPinjamRuangan from "../../components/ruangan/FormPinjamRuangan";
import { getRuanganById } from "@/lib/_data/ruangan";

type PropsEditRuangan = { params: { id: string } };

const DetailRuangan = async (props: PropsEditRuangan) => {
	const session = await auth();
	if (!session || !session.user || !session.user.id) redirect("/login");

	const ruangan = await getRuanganById(props.params.id);
	if (!ruangan) return notFound();

	return (
		<div className="shadow-xl card card-compact bg-primary lg:card-side">
			<FormPinjamRuangan data={ruangan} />
		</div>
	);
};

export default DetailRuangan;
