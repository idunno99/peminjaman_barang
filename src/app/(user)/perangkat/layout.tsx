import HeaderPage from "@/components/HeaderPage";
import { Metadata } from "next";
import { MdDevices } from "react-icons/md";

export const metadata: Metadata = {
	title: "Perangkat",
	description: "Perangkat",
};

const PerangkatLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-5">
			<HeaderPage>
				<MdDevices className="size-8" />
				<h1 className="text-lg">Perangkat TI</h1>
			</HeaderPage>
			{children}
		</div>
	);
};

export default PerangkatLayout;
