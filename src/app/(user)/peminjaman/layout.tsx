import HeaderPage from "@/components/HeaderPage";
import { Metadata } from "next";
import { MdHistory } from "react-icons/md";

export const metadata: Metadata = {
	title: "Peminjaman",
	description: "Peminjaman",
};

const RuanganLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-5">
			<HeaderPage>
				<MdHistory className="size-8" />
				<h1 className="text-lg">Peminjaman</h1>
			</HeaderPage>
			{children}
		</div>
	);
};

export default RuanganLayout;
