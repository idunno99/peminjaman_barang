import HeaderPage from "@/components/HeaderPage";
import { Metadata } from "next";
import { BsFillHousesFill } from "react-icons/bs";

export const metadata: Metadata = {
	title: "Ruangan",
	description: "Ruangban",
};

const RuanganLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-5">
			<HeaderPage>
				<BsFillHousesFill className="size-8" />
				<h1 className="text-lg">Ruangan</h1>
			</HeaderPage>
			{children}
		</div>
	);
};

export default RuanganLayout;
