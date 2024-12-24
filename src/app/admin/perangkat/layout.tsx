import HeaderPage from "@/components/HeaderPage";
import React from "react";
import { MdDevices } from "react-icons/md";

export const metadata = {
	title: "Perangkat TI",
};

const LayoutPerangkat = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-5">
			<HeaderPage>
				<MdDevices className="size-7" />
				<h1 className="text-lg">Perangkat TI</h1>
			</HeaderPage>
			{children}
		</div>
	);
};

export default LayoutPerangkat;
